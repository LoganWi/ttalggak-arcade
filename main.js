import { getPlayCount } from "./api-playcount.js";

// 게임 데이터 구성 (카테고리 2개씩 지정)
const gamesData = [
    {
        id: "budget-run",
        title: "BUDGET RUN!",
        desc: "팀장님, 이번 회식은 제발 치킨 말고 한우, 회, 오마카세... 이런 거 먹고 싶어요! 팀원들의 품격 있는 회식을 위해, 예산 따내러 달려라!",
        href: "/games/budget-run/",
        thumbClass: "thumb-budget-run",
        thumbUrl: "/assets/images/thumb-budget-run.png",
        tags: ["캐주얼", "액션"],
        color: "#ffd700"
    },
    {
        id: "soju",
        title: "막내의 눈물나는 소주따르기",
        desc: "면접 때 '소주 하난 기가 막히게 따릅니다'라고 질렀는데... 대망의 첫 회식, 입사 취소 안 되려면 손목 스냅 잘 활용해라.",
        href: "/games/soju/",
        thumbClass: "thumb-soju",
        thumbUrl: "/assets/images/thumb-soju.png",
        tags: ["타이밍", "사회생활"],
        color: "#a5d6a7"
    },
    {
        id: "brisket-master",
        title: "부장님의 차돌박이",
        desc: "회식비 아끼려다 내 손목 나갈 뻔? 차돌박이인지 습자지인지 모르게 얇게 써는 게 핵심.",
        href: "/games/brisket-master/",
        thumbClass: "thumb-brisket-master",
        thumbUrl: "/assets/images/thumb-brisket-master.png",
        tags: ["순발력", "스트레스해소"],
        color: "#ffb347"
    },
    {
        id: "gyeoljae",
        title: "결재해 주세요!",
        desc: "수정... 또 수정... '진짜최종_최종_18차'본입니다. 부장님 안면에 시원하게 날려주세요!",
        href: "/games/gyeoljae/",
        thumbClass: "thumb-gyeoljae",
        thumbUrl: "/assets/images/thumb-gyeoljae.png",
        tags: ["액션", "스트레스해소"],
        color: "#ff9a9e"
    },
    {
        id: "tissue-pull",
        title: "티슈 마구마구 뽑기",
        desc: "남은 연차도 없는데 티슈라도 신나게 뽑아야지. 누가 보든 말든 빈 곽이 될 때까지!",
        href: "/games/tissue-pull/",
        thumbClass: "thumb-tissue",
        thumbUrl: "/assets/images/thumb-tissue.png",
        tags: ["캐주얼", "킬링타임"],
        color: "#a8edea"
    }
];

function renderGames() {
    const grid = document.querySelector(".games-grid");
    if (!grid) return;

    grid.innerHTML = ""; // 초기화

    gamesData.forEach(game => {
        // 부모 a 태그 생성 (초기엔 스켈레톤 로딩 상태)
        const a = document.createElement("a");
        a.href = game.href;
        a.className = "game-card active is-loading";
        a.id = `card-${game.id}`;

        // 태그 HTML 생성
        const tagsHtml = `<span class="card-tag"># ${game.tags.join(' · ')}</span>`;

        a.innerHTML = `
            <div class="play-badge">PLAY</div>
            <div class="card-thumbnail-wrap">
                <div class="card-thumbnail ${game.thumbClass}"></div>
            </div>
            <div class="card-body">
                <div class="tags-wrap">${tagsHtml}</div>
                <h2 class="card-title">${game.title}</h2>
                <p class="card-desc">${game.desc}</p>
                <span class="card-tag" id="count-${game.id}" style="color: ${game.color}; margin-top:10px;">... PLAY</span>
            </div>
        `;

        grid.appendChild(a);

        // 이미지 로딩 체크
        const img = new Image();
        img.src = game.thumbUrl;
        img.onload = () => {
            // 이미지가 로드되면 is-loading 클래스 제거
            a.classList.remove("is-loading");
        };
        img.onerror = () => {
            // 이미지가 없어도 카드가 표시되도록 is-loading 제거
            a.classList.remove("is-loading");
            // 임시로 배경색상을 지정
            const thumb = a.querySelector('.card-thumbnail');
            if (thumb) thumb.style.background = '#333';
        };

        // 초기 플레이 카운트 페치
        updatePlayCount(game.id, `count-${game.id}`);
    });

    // Coming Soon 카드 삽입
    const comingSoon = document.createElement("div");
    comingSoon.className = "game-card coming-soon is-loading";
    comingSoon.id = "card-coming-1";
    comingSoon.innerHTML = `
        <div class="coming-badge">COMING SOON</div>
        <div class="card-thumbnail-wrap">
            <div class="card-thumbnail" style="background: linear-gradient(135deg, #1a2a1a, #1a3a2a);">❓</div>
        </div>
        <div class="card-body">
            <span class="card-tag"># 미정 · 개봉박두</span>
            <h2 class="card-title">다음 게임</h2>
            <p class="card-desc">현재 개발 중입니다. 곧 만나볼 수 있어요!</p>
        </div>
    `;
    grid.appendChild(comingSoon);

    // Coming Soon은 이미지가 없으므로 타이머 이후 임의로 로딩 해제
    setTimeout(() => {
        comingSoon.classList.remove("is-loading");
    }, 500);

    // 랜더링 직후 3D 효과 부여
    init3DTiltEffect();
}

async function updatePlayCount(gameId, elId) {
    try {
        const count = await getPlayCount(gameId);
        const el = document.getElementById(elId);
        if (el) {
            el.innerHTML = `${count.toLocaleString()} PLAY`;
        }
    } catch (error) {
        console.error(`Failed to update play count for ${gameId}:`, error);
    }
}

// 페이지 로드 시 실행
document.addEventListener("DOMContentLoaded", () => {
    renderGames();
});

function init3DTiltEffect() {
    const cards = document.querySelectorAll('.game-card.active');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Max 10도
            const rotateY = ((x - centerX) / centerX) * 10;

            // 짧은 트랜지션으로 즉각 반응하도록 설정
            card.style.transition = `transform 0.1s ease-out`;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            // 부드럽게 돌아가도록 트랜지션 원복
            card.style.transition = `transform 0.5s ease-out, box-shadow 0.25s ease, border-color 0.25s ease`;
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });
}

