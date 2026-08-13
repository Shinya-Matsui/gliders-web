#!/bin/sh
# Cloudflare Pages のビルドスクリプト。
#
# Pages にはファイル単位の除外機能（Workers Assets の .assetsignore 相当）が無いため、
# 配信対象を dist/ に明示的に組み立てる allowlist 方式を採る。
# これによりリポジトリ直下に新しいファイルが増えても、意図せず公開されることはない。
#
# 対応する Pages の設定:
#   Build command    : sh ./build.sh
#   Build output dir : dist

set -eu

OUT=dist

rm -rf "$OUT"
mkdir -p "$OUT"

# 配信するファイル
cp index.html favicon.svg llms.txt robots.txt sitemap.xml "$OUT/"

# 配信するディレクトリ
cp -R css js assets "$OUT/"

# ディレクトリ内に紛れ込んだ非配信ファイルを除去
find "$OUT" -name 'CLAUDE.md' -delete
find "$OUT" -name '.DS_Store' -delete

echo "--- built files ---"
find "$OUT" -type f | sort
