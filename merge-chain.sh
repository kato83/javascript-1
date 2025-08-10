#!/usr/bin/env bash
# merge-chain.sh
# main または 01～13 の連番ブランチから、後続ブランチへ順次マージ & push します。
set -euo pipefail

REMOTE="${REMOTE:-origin}"

die()  { echo "ERROR: $*" >&2; exit 1; }
info() { echo "[INFO] $*"; }

# Git リポジトリ確認
git rev-parse --git-dir >/dev/null 2>&1 || die "Git リポジトリ内で実行してください。"

# 作業ツリーがクリーンか確認
if ! git diff-index --quiet HEAD --; then
  die "作業ツリーに未コミットの変更があります。コミット or スタッシュしてください。"
fi

current_branch="$(git rev-parse --abbrev-ref HEAD)"
info "現在ブランチ: ${current_branch}"

# 連番ブランチのリスト
candidates=()
for i in $(seq -w 01 13); do
  candidates+=("$i")
done

targets=()
if [[ "$current_branch" == "main" ]]; then
  targets=("${candidates[@]}")
elif [[ "$current_branch" =~ ^(0[1-9]|1[0-3])$ ]]; then
  cur_num=$((10#${current_branch}))
  for n in $(seq $((cur_num + 1)) 13); do
    targets+=("$(printf '%02d' "$n")")
  done
else
  die "main または 01～13 のブランチ上で実行してください。"
fi

if [[ ${#targets[@]} -eq 0 ]]; then
  info "後続の対象ブランチがありません。処理は行いません。"
  exit 0
fi

# fetch
info "リモート(${REMOTE})から fetch 中…"
git fetch --prune "${REMOTE}"

source_branch="${current_branch}"
orig_branch="${source_branch}"
trap 'git checkout -q "${orig_branch}" >/dev/null 2>&1 || true' EXIT

# 元ブランチを最新化
if git rev-parse --verify -q "${REMOTE}/${source_branch}" >/dev/null; then
  info "元ブランチ ${source_branch} を fast-forward pull…"
  git checkout -q "${source_branch}"
  git pull --ff-only "${REMOTE}" "${source_branch}" || true
fi

for tgt in "${targets[@]}"; do
  # 対象ブランチが存在するかチェック（ローカル or リモート）
  if git show-ref --verify --quiet "refs/heads/${tgt}"; then
    :
  elif git show-ref --verify --quiet "refs/remotes/${REMOTE}/${tgt}"; then
    info "ローカルに ${tgt} が無いので作成（${REMOTE}/${tgt} を追跡）"
    git checkout -q -t "${REMOTE}/${tgt}"
  else
    info "ブランチ ${tgt} が存在しないためスキップ。"
    continue
  fi

  info "=== ${tgt} を更新開始 ==="
  git checkout -q "${tgt}"

  if git rev-parse --verify -q "${REMOTE}/${tgt}" >/dev/null; then
    git pull --ff-only "${REMOTE}" "${tgt}" || true
  fi

  info "マージ: ${source_branch} → ${tgt}"
  if ! git merge --no-ff --no-edit "${source_branch}"; then
    echo "⚠️ コンフリクト発生（${source_branch} → ${tgt}）。解消後に push してください。"
    exit 2
  fi

  info "push: ${tgt}"
  git push "${REMOTE}" "${tgt}"
  info "=== ${tgt} 更新完了 ==="
done

info "処理完了。"
