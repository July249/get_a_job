#!/bin/bash

CONTENT_DIR="docs/content"
CONFIG_FILE="docs/.vitepress/config.ts"
TMP_FILE="docs/.vitepress/config.tmp.ts"

START_MARK="// AUTO-GENERATED-SIDEBAR:START"
END_MARK="// AUTO-GENERATED-SIDEBAR:END"

# START_MARK까지 복사 (마커 포함)
awk -v mark="$START_MARK" 'index($0, mark) {print; exit} {print}' "$CONFIG_FILE" > "$TMP_FILE"

# 자동 생성 항목 추가
find "$CONTENT_DIR" -type f -name "*.md" ! -name "index.md" | sort | while read file; do
  relpath="/content${file#$CONTENT_DIR}"
  relpath="${relpath%.md}" # .md 확장자 제거
  title=$(grep '^title:' "$file" | head -1 | sed 's/^title:[ ]*//')
  [ -z "$title" ] && title=$(basename "$file" .md)
  echo "            { text: '${title}', link: '${relpath}' }," >> "$TMP_FILE"
done

# END_MARK부터 끝까지 복사 (마커 포함)
awk -v mark="$END_MARK" 'f; index($0, mark) {print; f=1}' "$CONFIG_FILE" >> "$TMP_FILE"

# 변경사항 있을 때만 덮어쓰기
if ! diff -q "$TMP_FILE" "$CONFIG_FILE" > /dev/null; then
  mv "$TMP_FILE" "$CONFIG_FILE"
  echo "config.ts sidebar 자동 생성 완료! (변경사항 반영됨)"
else
  rm "$TMP_FILE"
  echo "변경사항 없음. 기존 config.ts 유지."
fi