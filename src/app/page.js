"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getPlayCount } from "../api-playcount.js";

const gamesData = [
  {
    id: "budget-run",
    title: "BUDGET RUN!",
    desc: "팀장님, 이번 회식은 제발 치킨 말고 한우, 회, 오마카세... 이런 거 먹고 싶어요! 팀원들의 품격 있는 회식을 위해, 예산 따내러 달려라!",
    href: "/games/budget-run/",
    thumbClass: "thumb-budget-run",
    thumbUrl: "/assets/thumb-budget-run.png",
    tags: ["캐주얼", "액션"],
    color: "#ffd700",
  },
  {
    id: "soju",
    title: "막내의 눈물나는 소주따르기",
    desc: "면접 때 '소주 하난 기가 막히게 따릅니다'라고 질렀는데... 대망의 첫 회식, 입사 취소 안 되려면 손목 스냅 잘 활용해라.",
    href: "/games/soju/",
    thumbClass: "thumb-soju",
    thumbUrl: "/assets/thumb-soju.png",
    tags: ["타이밍", "사회생활"],
    color: "#a5d6a7",
  },
  {
    id: "brisket-master",
    title: "부장님의 차돌박이",
    desc: "회식비 아끼려다 내 손목 나갈 뻔? 차돌박이인지 습자지인지 모르게 얇게 써는 게 핵심.",
    href: "/games/brisket-master/",
    thumbClass: "thumb-brisket-master",
    thumbUrl: "/assets/thumb-brisket-master.png",
    tags: ["순발력", "스트레스해소"],
    color: "#ffb347",
  },
  {
    id: "gyeoljae",
    title: "결재해 주세요!",
    desc: "수정... 또 수정... '진짜최종_최종_18차'본입니다. 부장님 안면에 시원하게 날려주세요!",
    href: "/games/gyeoljae/",
    thumbClass: "thumb-gyeoljae",
    thumbUrl: "/assets/thumb-gyeoljae.png",
    tags: ["액션", "스트레스해소"],
    color: "#ff9a9e",
  },
  {
    id: "tissue-pull",
    title: "티슈 마구마구 뽑기",
    desc: "남은 연차도 없는데 티슈라도 신나게 뽑아야지. 누가 보든 말든 빈 곽이 될 때까지!",
    href: "/games/tissue-pull/",
    thumbClass: "thumb-tissue",
    thumbUrl: "/assets/thumb-tissue.png",
    tags: ["캐주얼", "킬링타임"],
    color: "#a8edea",
  },
];

export default function Home() {
  const [playCounts, setPlayCounts] = useState({});
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  // Ensure images are marked as loaded if they are already in cache
  useEffect(() => {
    const images = document.querySelectorAll('.card-thumbnail-img');
    images.forEach((img) => {
      if (img.complete) {
        const id = img.getAttribute('data-game-id');
        if (id) handleImageLoad(id);
      }
    });
  }, []);

  useEffect(() => {
    async function fetchCounts() {
      const counts = {};
      for (const game of gamesData) {
        try {
          const count = await getPlayCount(game.id);
          counts[game.id] = count;
        } catch (error) {
          console.error(`Failed to fetch count for ${game.id}`, error);
        }
      }
      setPlayCounts(counts);
    }
    fetchCounts();
  }, []);

  return (
    <div className="arcade-container">
      <div className="lobby-overlay-stars" />
      <div className="lobby-overlay-grid" />
      <header>
        <div className="logo-wrap">
          <span className="logo-subtitle">※주의※ 회사에서 당당하게 하지 마시오.</span>
          <h1 className="logo-title" data-text="TTALGGAK ARCADE">
            TTALGGAK ARCADE
          </h1>
        </div>
      </header>

      <div className="divider">
        <span>★ GAME SELECT ★</span>
      </div>

      <main>
        <div className="games-grid">
          {gamesData.map((game) => (
            <Link key={game.id} href={game.href} className="game-card active">
              <div className={`card-thumbnail-wrap ${!loadedImages[game.id] ? "skeleton-bg" : ""}`}>
                <img
                  src={game.thumbUrl}
                  alt={game.title}
                  data-game-id={game.id}
                  className={`card-thumbnail-img ${loadedImages[game.id] ? "loaded" : ""}`}
                  onLoad={() => handleImageLoad(game.id)}
                />
              </div>
              <div className="card-body">
                <div className="tags-wrap">
                  <span className="card-tag"># {game.tags.join(" · ")}</span>
                </div>
                <h2 className="card-title">{game.title}</h2>
                <p className="card-desc">{game.desc}</p>
                <span className="card-tag" style={{ color: game.color, marginTop: "10px" }}>
                  {playCounts[game.id]?.toLocaleString() || "..."} PLAY
                </span>
              </div>
            </Link>
          ))}

          <div className="game-card coming-soon">
            <div className="coming-badge">COMING SOON</div>
            <div className="card-thumbnail-wrap">
              <div
                className="card-thumbnail"
                style={{ background: "linear-gradient(135deg, #1a2a1a, #1a3a2a)" }}
              >
                ❓
              </div>
            </div>
            <div className="card-body">
              <span className="card-tag"># 미정 · 개봉박두</span>
              <h2 className="card-title">다음 게임</h2>
              <p className="card-desc">현재 개발 중입니다. 곧 만나볼 수 있어요!</p>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className="coin-bar">
          <span>🪙 CREDIT : 99</span>
        </div>
        <p>© 2026 TTALGGAK ARCADE · ALL RIGHTS RESERVED</p>
      </footer>

    </div>
  );
}
