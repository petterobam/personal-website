#!/usr/bin/env bash
set -euo pipefail

#=============================================================
# personal-website 一键部署脚本 (GitHub Pages via gh CLI)
#=============================================================
# 用法:
#   ./deploy.sh              # 触发 GitHub Actions 部署到 GitHub Pages
#   ./deploy.sh --dry-run    # 只构建不推送，用于本地预览
#   ./deploy.sh --help       # 查看帮助
#=============================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# ── 颜色 ───────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

info()    { echo -e "${BLUE}[INFO]${NC}  $*"; }
success() { echo -e "${GREEN}[OK]${NC}    $*"; }
warn()    { echo -e "${YELLOW}[WARN]${NC}  $*"; }
error()   { echo -e "${RED}[ERROR]${NC} $*"; exit 1; }

WORKFLOW_FILE="deploy.yml"
DRY_RUN=false

# ── 参数解析 ─────────────────────────────────────────────
for arg in "$@"; do
  case "$arg" in
    --dry-run)  DRY_RUN=true ;;
    --help|-h)
      cat <<EOF
personal-website 一键部署脚本 (GitHub Pages)

用法:
  ./deploy.sh              触发 GitHub Actions 部署到 GitHub Pages
  ./deploy.sh --dry-run    只在本地构建，不触发远程部署
  ./deploy.sh --help       显示帮助信息

前提条件:
  1. 已安装 Node.js >= 18
  2. 已安装 GitHub CLI (gh): https://cli.github.com/
  3. 已登录 gh:  gh auth login
  4. 项目已关联 GitHub 仓库

流程:
  环境检查 → 本地构建验证 → gh workflow run → gh run watch
EOF
      exit 0
      ;;
    *) warn "未知参数: $arg" ;;
  esac
done

echo ""
echo "============================================"
echo "  personal-website 一键部署 (GitHub Pages)"
echo "============================================"
echo ""

# ── 前置检查 ─────────────────────────────────────────────
info "检查运行环境..."

command -v node >/dev/null 2>&1 || error "未找到 node，请先安装 Node.js (>=18): https://nodejs.org/"
command -v npm  >/dev/null 2>&1 || error "未找到 npm"

NODE_VERSION=$(node -v | sed 's/v//' | cut -d. -f1)
if [[ "$NODE_VERSION" -lt 18 ]]; then
  error "Node.js 版本过低 (当前: $(node -v))，需要 >= 18"
fi
success "Node.js $(node -v)"

command -v gh >/dev/null 2>&1 || error "未找到 gh CLI，请先安装: https://cli.github.com/"
success "gh CLI $(gh --version | head -1)"

# 检查 gh 登录状态
if ! gh auth status >/dev/null 2>&1; then
  error "gh 未登录，请先执行: gh auth login"
fi
success "gh 已登录"

# 检查仓库关联
REPO_NAME=$(gh repo view --json nameWithOwner -q '.nameWithOwner' 2>/dev/null) || \
  error "当前目录未关联 GitHub 仓库，请先执行:\n  gh repo create <name> --source=. --push\n  或\n  gh repo clone <owner>/<repo>"
success "GitHub 仓库: $REPO_NAME"

# ── 安装依赖 ─────────────────────────────────────────────
if [ ! -d "node_modules" ]; then
  info "安装依赖..."
  npm install --no-audit --no-fund
else
  info "node_modules 已存在，跳过安装"
fi
success "依赖就绪"

# ── 本地构建验证 ─────────────────────────────────────────
DIST_DIR="docs/.vuepress/dist"

info "本地构建验证..."
npm run docs:build

if [ ! -d "$DIST_DIR" ]; then
  error "构建产物目录 $DIST_DIR 不存在，构建可能失败"
fi
success "本地构建通过"

# ── dry-run 模式 ─────────────────────────────────────────
if [ "$DRY_RUN" = true ]; then
  echo ""
  success "Dry-run 模式：本地构建完成，跳过远程部署。"
  info "本地预览: npx serve $DIST_DIR"
  exit 0
fi

# ── 检查 workflow 是否存在 ───────────────────────────────
info "检查 GitHub Actions workflow..."
if ! gh workflow view "$WORKFLOW_FILE" >/dev/null 2>&1; then
  error "未找到 workflow '$WORKFLOW_FILE'，请确认 .github/workflows/$WORKFLOW_FILE 已推送到远程仓库"
fi
success "workflow '$WORKFLOW_FILE' 已就绪"

# ── 触发部署 ─────────────────────────────────────────────
info "触发 GitHub Actions 部署..."
gh workflow run "$WORKFLOW_FILE"
success "workflow 已触发"

# 等待 run 出现（刚触发可能有几秒延迟）
info "等待 workflow run 启动..."
sleep 3

# 获取最新一次 run
RUN_ID=$(gh run list --workflow="$WORKFLOW_FILE" --limit 1 --json databaseId -q '.[0].databaseId' 2>/dev/null) || \
  error "无法获取 workflow run ID"
info "Run ID: $RUN_ID"

# 实时跟踪 run 状态
info "跟踪部署进度..."
echo ""
if gh run watch "$RUN_ID" --exit-status; then
  echo ""
  success "========================================="
  success "  🚀 部署完成！"
  success "========================================="

  # 获取 Pages URL
  PAGES_URL=$(gh api "repos/$REPO_NAME/pages" --jq '.html_url' 2>/dev/null) || true
  if [ -n "${PAGES_URL:-}" ]; then
    info "访问地址: $PAGES_URL"
  else
    info "请在 GitHub 仓库 Settings → Pages 中查看站点地址"
  fi
else
  echo ""
  error "部署失败！请查看日志: gh run view $RUN_ID --log"
fi

echo ""
