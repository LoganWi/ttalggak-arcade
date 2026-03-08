---
description: 딸깍아케이드 안전한 배포 워크플로우 (Local -> Dev -> Main)
---

이 워크플로우는 코드를 안전하게 테스트하고 실서버에 반영하기 위한 3단계 프로세스를 정의합니다.

# 1. 로컬 작업 및 테스트 (미리보기)
- 사용자의 요청에 따라 코드를 수정합니다.
- 사용자가 `Accept All`을 누르고 로컬 서버(`http://localhost:3001`)에서 변경 사항을 먼저 확인합니다.
- 아직 Git에 커밋하지 않습니다.

# 2. Dev 브랜치에 저장 (중간 저장)
- 사용자가 "dev에 반영해줘" 또는 "맘에 들어"라고 승인하면 이 단계를 실행합니다.
- 터미널을 통해 다음 명령어를 실행하여 `dev` 브랜치에 작업 내역을 안전하게 커밋하고 푸시합니다.
  ```bash
  # 현재 브랜치가 dev인지 확인 (아니라면 git checkout dev)
  git add .
  git commit -m "feat/fix/style: [사용자가 승인한 작업 내용 요약]"
  git push origin dev
  ```

# 3. 실서버 배포 (Main 백업 및 릴리즈)
- 사용자가 "이거 배포해" 또는 "실서버에 올려"라고 명시적으로 요청할 때만 이 단계를 실행합니다.
- `dev` 브랜치의 검증된 코드를 `main` 브랜치로 병합하고 푸시하여 Vercel 실서버 배포를 트리거합니다.
// turbo-all
  ```bash
  git checkout main
  git merge dev
  git push origin main
  git checkout dev
  ```
- 배포가 완료되면 사용자에게 라이브 서버에서 확인이 가능함을 안내합니다.
