import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type FileInfo = {
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

type Contributor = {
  name: string;
  files: FileInfo[];
};

const mdFiles = execSync('git ls-files "*.md"').toString().split('\n').filter(Boolean);

const contributorsMap: Record<string, Contributor> = {};

// 각 md 파일별로 최초/최종 커밋 정보 추출
for (const file of mdFiles) {
  // 최초 커밋 정보
  const firstLog = execSync(
    `git log --diff-filter=A --follow --format="%an|%aI" -- "${file}" | tail -1`
  )
    .toString()
    .trim();
  // 최종 커밋 정보
  const lastLog = execSync(`git log --follow --format="%an|%aI" -- "${file}" | head -1`)
    .toString()
    .trim();

  if (!firstLog || !lastLog) continue;

  const [firstAuthor, firstDate] = firstLog.split('|');
  const [lastAuthor, lastDate] = lastLog.split('|');

  // 최초 작성자 기준으로만 파일 등록
  if (firstAuthor) {
    if (!contributorsMap[firstAuthor]) {
      contributorsMap[firstAuthor] = { name: firstAuthor, files: [] };
    }
    contributorsMap[firstAuthor].files.push({
      name: file,
      createdAt: new Date(firstDate),
      updatedAt: new Date(lastDate),
    });
  }
}

// JSON으로 저장할 때는 ISO 문자열로 변환
const contributors = Object.values(contributorsMap).map((contributor) => ({
  name: contributor.name,
  files: contributor.files.map((file) => ({
    name: file.name,
    createdAt: file.createdAt.toISOString(),
    updatedAt: file.updatedAt.toISOString(),
  })),
}));

const outputPath = path.join(__dirname, '../docs/.vitepress/data/contributors.json');
writeFileSync(outputPath, JSON.stringify(contributors, null, 2));

console.log('기여자별 md 파일, 최초/최종 커밋 정보가 성공적으로 생성되었습니다!');
