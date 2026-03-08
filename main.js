import { getPlayCount } from "./api-playcount.js";

// 게임 최신 순서 (ID 기준)
const GAME_ORDER = [
    "card-soju",           // 가장 최신
    "card-brisket-master",
    "card-gyeoljae",
    "card-tissue"          // 가장 오래됨
];

async function updatePlayCounts() {
    const counts = {
        "soju": "count-soju",
        "tissue-pull": "count-tissue",
        "gyeoljae": "count-gyeoljae",
        "brisket-master": "count-brisket-master"
    };

    for (const [gameId, elId] of Object.entries(counts)) {
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
}

function sortGamesByRecency() {
    const grid = document.querySelector(".games-grid");
    if (!grid) return;

    // 현재 상점에 배치된 모든 카드 가져오기
    const cards = Array.from(grid.children);

    // 순서에 맞춰 정렬 (목록에 없는 카드는 뒤로 보냄)
    cards.sort((a, b) => {
        const indexA = GAME_ORDER.indexOf(a.id);
        const indexB = GAME_ORDER.indexOf(b.id);

        // 둘 다 목록에 있는 경우
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        // 하나만 목록에 있는 경우 (있는 쪽이 앞으로)
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        // 둘 다 목록에 없는 경우 순서 유지 (Coming Soon 등)
        return 0;
    });

    // 정렬된 순서대로 다시 부착
    cards.forEach(card => grid.appendChild(card));
}

// 페이지 로드 시 실행
document.addEventListener("DOMContentLoaded", async () => {
    sortGamesByRecency();
    await updatePlayCounts();
});
