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
# 404.html を置くと Pages が不明なパスに対して 404 ステータスで返す
cp index.html 404.html favicon.svg llms.txt robots.txt sitemap.xml "$OUT/"

# Pages の設定ファイル（配信はされず、ヘッダー定義として解釈される）
cp _headers "$OUT/"

# 配信するディレクトリ
cp -R css js assets "$OUT/"

# ディレクトリ内に紛れ込んだ非配信ファイルを除去
find "$OUT" -name 'CLAUDE.md' -delete
find "$OUT" -name '.DS_Store' -delete

echo "--- built files ---"
find "$OUT" -type f | sort
