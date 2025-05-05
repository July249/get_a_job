#!/bin/bash

CONTENT_DIR="docs/content"
INDEX_FILE="$CONTENT_DIR/index.md"
TMP_FILE="$CONTENT_DIR/index.tmp.md"

# 자동 생성 영역 시작/끝 마커
START_MARK="<!-- AUTO-GENERATED-CONTENT:START -->"
END_MARK="<!-- AUTO-GENERATED-CONTENT:END -->"

# 기존 파일에서 헤더와 고정 영역 추출
awk -v mark="$START_MARK" 'index($0, mark){exit} {print}' "$INDEX_FILE" > "$TMP_FILE"
echo "$START_MARK" >> "$TMP_FILE"
echo "" >> "$TMP_FILE"

# 자동 생성 목록 추가
find "$CONTENT_DIR" -type f -name "*.md" ! -name "index.md" ! -name "index.tmp.md" | sort | while read file; do
  [ -z "$file" ] && continue  # 빈 줄이면 건너뜀
  relpath="./${file#$CONTENT_DIR/}"
  title=$(grep '^title:' "$file" | head -1 | sed 's/^title:[ ]*//')
  [ -z "$title" ] && title=$(basename "$file" .md)
  description=$(grep '^description:' "$file" | head -1 | sed 's/^description:[ ]*//')
  echo "- [${title}](${relpath})" >> "$TMP_FILE"
  if [ -n "$description" ]; then
    echo "  $description" >> "$TMP_FILE"
  fi
  echo "" >> "$TMP_FILE"
done

echo "$END_MARK" >> "$TMP_FILE"

# 기존 파일에서 자동 생성 영역 이후 부분 추가
awk -v mark="$END_MARK" 'f; index($0, mark){f=1}' "$INDEX_FILE" >> "$TMP_FILE"

mv "$TMP_FILE" "$INDEX_FILE"
echo "index.md 자동 생성 완료!"