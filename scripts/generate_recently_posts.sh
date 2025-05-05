#!/bin/bash

CONTENT_DIR="docs/content"
POSTS_JSON="docs/public/data/posts.json"
TMP_JSON="docs/public/data/posts.tmp.json"

# 임시 JSON 파일 초기화
echo "[" > "$TMP_JSON"

# 모든 마크다운 파일을 찾아서 메타데이터 추출
files=($(find "$CONTENT_DIR" -type f -name "*.md" ! -name "index.md"))
total_files=${#files[@]}
current=0

for file in "${files[@]}"; do
  # 메타데이터 추출
  title=$(grep '^title:' "$file" | head -1 | sed 's/^title:[ ]*//')
  description=$(grep '^description:' "$file" | head -1 | sed 's/^description:[ ]*//')
  date=$(grep '^date:' "$file" | head -1 | sed 's/^date:[ ]*//')
  author=$(grep '^author:' "$file" | head -1 | sed 's/^author:[ ]*//')
  
  # 태그 추출 (tags: [tag1, tag2] 형식) 및 따옴표 추가
  tags=$(grep '^tags:' "$file" | sed 's/^tags:[ ]*//' | sed 's/[][]//g' | sed 's/, /,/g' | sed 's/\([^,]*\)/"\1"/g')
  
  # 상대 경로 생성
  relpath="content${file#$CONTENT_DIR}"
  relpath="${relpath%.md}"
  
  # JSON 객체 생성
  cat <<EOF >> "$TMP_JSON"
  {
    "title": "$title",
    "description": "$description",
    "date": "$date",
    "author": "$author",
    "tags": [$tags],
    "url": "$relpath"
  }$([ $((current + 1)) -lt $total_files ] && echo ",")
EOF
  ((current++))
done

echo "]" >> "$TMP_JSON"

# 최종 파일로 이동
mv "$TMP_JSON" "$POSTS_JSON"

echo "posts.json 생성 완료!" 