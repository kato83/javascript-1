# merge-chain.ps1
[CmdletBinding()]
param(
  [string]$Remote = "origin"
)

$ErrorActionPreference = 'Stop'

function Info($msg) { Write-Host "[INFO] $msg" }
function Die($msg)  { Write-Error $msg; exit 1 }

# Git リポジトリ確認
try {
  git rev-parse --git-dir *> $null
} catch {
  Die "Git リポジトリ内で実行してください。"
}

# 作業ツリーがクリーンか確認（未追跡は無視）
function IsTrackedClean {
  git diff --quiet
  $a = $LASTEXITCODE
  git diff --cached --quiet
  $b = $LASTEXITCODE
  return (($a -eq 0) -and ($b -eq 0))
}

if (-not (IsTrackedClean)) {
  Die "作業ツリーに未コミットの変更があります。コミット or スタッシュしてください。"
}

# 現在ブランチ
$CurrentBranch = (git rev-parse --abbrev-ref HEAD).Trim()
Info "現在ブランチ: $CurrentBranch"

# 01～13 の候補
$candidates = 1..13 | ForEach-Object { '{0:00}' -f $_ }

# 対象ブランチ決定
$targets = @()
if ($CurrentBranch -eq 'main') {
  $targets = $candidates
} elseif ($CurrentBranch -match '^(0[1-9]|1[0-3])$') {
  $curNum = [int]$CurrentBranch
  foreach ($n in $curNum+1..13) {
    $targets += ('{0:00}' -f $n)
  }
} else {
  Die "main または 01～13 のブランチ上で実行してください（今は: $CurrentBranch）"
}

if ($targets.Count -eq 0) {
  Info "後続の対象ブランチがありません。処理は行いません。"
  exit 0
}

# fetch
Info "リモート($Remote)から fetch 中…"
git fetch --prune $Remote | Out-Null

$sourceBranch = $CurrentBranch
$origBranch   = $sourceBranch

# ブランチ存在確認関数
function RemoteRefExists($remote, $branch) {
  git show-ref --verify --quiet "refs/remotes/$remote/$branch"
  return ($LASTEXITCODE -eq 0)
}
function LocalRefExists($branch) {
  git show-ref --verify --quiet "refs/heads/$branch"
  return ($LASTEXITCODE -eq 0)
}

try {
  # 元ブランチを最新化
  if (RemoteRefExists $Remote $sourceBranch) {
    Info "元ブランチ $sourceBranch を fast-forward pull…"
    git checkout -q $sourceBranch | Out-Null
    git pull --ff-only $Remote $sourceBranch | Out-Null
  }

  foreach ($tgt in $targets) {
    # 存在チェック
    $hasLocal  = LocalRefExists $tgt
    $hasRemote = RemoteRefExists $Remote $tgt

    if (-not $hasLocal -and -not $hasRemote) {
      Info "ブランチ $tgt が存在しないためスキップ。"
      continue
    }

    if (-not $hasLocal -and $hasRemote) {
      Info "ローカルに $tgt が無いので作成（$Remote/$tgt を追跡）"
      git checkout -q -t "$Remote/$tgt" | Out-Null
    }

    Info "=== $tgt を更新開始 ==="
    git checkout -q $tgt | Out-Null

    if (RemoteRefExists $Remote $tgt) {
      git pull --ff-only $Remote $tgt | Out-Null
    }

    Info "マージ: $sourceBranch → $tgt"
    git merge --no-ff --no-edit $sourceBranch

    if ($LASTEXITCODE -ne 0) {
      Write-Warning "コンフリクトが発生しました（$sourceBranch → $tgt）。"
      Write-Host "解消後に次を実行してください:`n  git add -A`n  git commit`n  git push $Remote $tgt"
      exit 2
    }

    Info "push: $tgt"
    git push $Remote $tgt | Out-Null
    Info "=== $tgt 更新完了 ==="
  }
}
finally {
  try { git checkout -q $origBranch | Out-Null } catch { }
}

Info "すべての対象ブランチを更新しました。"
