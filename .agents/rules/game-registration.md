---
description: "신규 게임 등록 및 자동화 규칙"
---

# 신규 게임 등록 규칙 (New Game Registration Rules)

1. **자동화 최우선**: 새로운 게임 코드가 제공되면, 수동으로 `index.html`을 수정하지 않고 Next.js 아케이드 시스템(`src/app/games/[id]/page.js`)에 맞춰 자동으로 마이그레이션합니다.
2. **필수 연동**: 모든 새 게임은 다음 기능을 기본적으로 탑재해야 합니다.
    - **Google Analytics**: 루트 레이아웃(`layout.js`)을 통해 자동 추적.
    - **API 연동**: `api-playcount.js`를 통한 시작 횟수 기록.
    - **3D UI**: 메인 로비(`page.js`)에 입체적인 3D 카드 애니메이션 적용.
3. **리소스 관리**: 게임 관련 정적 자산(HTML, JS, CSS, 이미지)은 `public/games/[id]/` 경로에 체계적으로 관리합니다.
4. **등록 가이드 준수**: 신규 게임 추가 시 `.agents/workflows/add-game.md`의 양식을 참조하여 사용자에게 정보를 요청하거나 확인합니다.
