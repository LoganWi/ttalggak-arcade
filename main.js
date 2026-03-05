import { getPlayCount } from "./api-playcount.js";

async function updatePlayCounts() {
    // 티슈 뽑기 플레이 수
    const tissueCount = await getPlayCount("tissue-pull");
    const tissueEl = document.getElementById("count-tissue");
    if (tissueEl) {
        tissueEl.innerHTML = `<span style="display:inline-block; transform:translateY(-1px); font-size:7px;">▶</span> ${tissueCount.toLocaleString()} PLAY`;
    }

    // 결재 게임 플레이 수
    const gyeoljaeCount = await getPlayCount("gyeoljae");
    const gyeoljaeEl = document.getElementById("count-gyeoljae");
    if (gyeoljaeEl) {
        gyeoljaeEl.innerHTML = `<span style="display:inline-block; transform:translateY(-1px); font-size:7px;">▶</span> ${gyeoljaeCount.toLocaleString()} PLAY`;
    }
}

// 페이지 로드 시 실행
document.addEventListener("DOMContentLoaded", updatePlayCounts);
