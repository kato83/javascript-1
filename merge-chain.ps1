# merge-chain.ps1
[CmdletBinding()]
param(
  [string]$Remote = "origin"
)

$ErrorActionPreference = 'Stop'

function Info($msg) { Write-Host "[INFO] $msg" }
function Die($msg)  { Write-Error $msg; exit 1 }

# Git ���|�W�g���m�F
try {
  git rev-parse --git-dir *> $null
} catch {
  Die "Git ���|�W�g�����Ŏ��s���Ă��������B"
}

# ��ƃc���[���N���[�����m�F�i���ǐՂ͖����j
function IsTrackedClean {
  git diff --quiet
  $a = $LASTEXITCODE
  git diff --cached --quiet
  $b = $LASTEXITCODE
  return (($a -eq 0) -and ($b -eq 0))
}

if (-not (IsTrackedClean)) {
  Die "��ƃc���[�ɖ��R�~�b�g�̕ύX������܂��B�R�~�b�g or �X�^�b�V�����Ă��������B"
}

# ���݃u�����`
$CurrentBranch = (git rev-parse --abbrev-ref HEAD).Trim()
Info "���݃u�����`: $CurrentBranch"

# 01�`13 �̌��
$candidates = 1..13 | ForEach-Object { '{0:00}' -f $_ }

# �Ώۃu�����`����
$targets = @()
if ($CurrentBranch -eq 'main') {
  $targets = $candidates
} elseif ($CurrentBranch -match '^(0[1-9]|1[0-3])$') {
  $curNum = [int]$CurrentBranch
  foreach ($n in $curNum+1..13) {
    $targets += ('{0:00}' -f $n)
  }
} else {
  Die "main �܂��� 01�`13 �̃u�����`��Ŏ��s���Ă��������i����: $CurrentBranch�j"
}

if ($targets.Count -eq 0) {
  Info "�㑱�̑Ώۃu�����`������܂���B�����͍s���܂���B"
  exit 0
}

# fetch
Info "�����[�g($Remote)���� fetch ���c"
git fetch --prune $Remote | Out-Null

$sourceBranch = $CurrentBranch
$origBranch   = $sourceBranch

# �u�����`���݊m�F�֐�
function RemoteRefExists($remote, $branch) {
  git show-ref --verify --quiet "refs/remotes/$remote/$branch"
  return ($LASTEXITCODE -eq 0)
}
function LocalRefExists($branch) {
  git show-ref --verify --quiet "refs/heads/$branch"
  return ($LASTEXITCODE -eq 0)
}

try {
  # ���u�����`���ŐV��
  if (RemoteRefExists $Remote $sourceBranch) {
    Info "���u�����` $sourceBranch �� fast-forward pull�c"
    git checkout -q $sourceBranch | Out-Null
    git pull --ff-only $Remote $sourceBranch | Out-Null
  }

  foreach ($tgt in $targets) {
    # ���݃`�F�b�N
    $hasLocal  = LocalRefExists $tgt
    $hasRemote = RemoteRefExists $Remote $tgt

    if (-not $hasLocal -and -not $hasRemote) {
      Info "�u�����` $tgt �����݂��Ȃ����߃X�L�b�v�B"
      continue
    }

    if (-not $hasLocal -and $hasRemote) {
      Info "���[�J���� $tgt �������̂ō쐬�i$Remote/$tgt ��ǐՁj"
      git checkout -q -t "$Remote/$tgt" | Out-Null
    }

    Info "=== $tgt ���X�V�J�n ==="
    git checkout -q $tgt | Out-Null

    if (RemoteRefExists $Remote $tgt) {
      git pull --ff-only $Remote $tgt | Out-Null
    }

    Info "�}�[�W: $sourceBranch �� $tgt"
    git merge --no-ff --no-edit $sourceBranch

    if ($LASTEXITCODE -ne 0) {
      Write-Warning "�R���t���N�g���������܂����i$sourceBranch �� $tgt�j�B"
      Write-Host "������Ɏ������s���Ă�������:`n  git add -A`n  git commit`n  git push $Remote $tgt"
      exit 2
    }

    Info "push: $tgt"
    git push $Remote $tgt | Out-Null
    Info "=== $tgt �X�V���� ==="
  }
}
finally {
  try { git checkout -q $origBranch | Out-Null } catch { }
}

Info "���ׂĂ̑Ώۃu�����`���X�V���܂����B"
