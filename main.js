import { getPlayCount } from "./api-playcount.js";

// 게임 데이터 구성 (카테고리 2개씩 지정)
const gamesData = [
    {
        id: "soju",
        title: "막내의 눈물나는 소주따르기",
        desc: "대망의 입사 후 첫 회식날. 상사의 지시에 맞춰 소주를 완벽하게 따르세요!",
        href: "/games/soju/",
        thumbClass: "thumb-soju",
        thumbUrl: "/assets/images/thumb-soju.png",
        tags: ["타이밍", "사회생활"],
        color: "#a5d6a7"
    },
    {
        id: "brisket-master",
        title: "부장님의 차돌박이",
        desc: "화면을 터치해 종잇장처럼 얇은 차돌박이를 썰어보세요!",
        href: "/games/brisket-master/",
        thumbClass: "thumb-brisket-master",
        thumbUrl: "/assets/images/thumb-brisket-master.png",
        tags: ["순발력", "스트레스해소"],
        color: "#ffb347"
    },
    {
        id: "gyeoljae",
        title: "결재해 주세요!",
        desc: "결재판을 아래로 당겨 부장님께 날려버리세요! 3D 슬링샷 액션.",
        href: "/games/gyeoljae/",
        thumbClass: "thumb-gyeoljae",
        thumbUrl: "/assets/images/thumb-gyeoljae.png",
        tags: ["액션", "스트레스해소"],
        color: "#ff9a9e"
    },
    {
        id: "tissue-pull",
        title: "티슈 마구마구 뽑기",
        desc: "위로 스와이프해서 티슈를 뽑아보세요! 연속 뽑기와 선풍기 모드까지.",
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

