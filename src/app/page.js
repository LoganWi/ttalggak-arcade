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
              <div className="play-badge">PLAY</div>
              <div className="card-thumbnail-wrap">
                <div
                  className={`card-thumbnail ${game.thumbClass}`}
                  style={{ backgroundImage: `url(${game.thumbUrl})` }}
                ></div>
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

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&family=Press+Start+2P&family=Noto+Sans+KR:wght@400;700;900&display=swap');
        @import url('https://cdn.jsdelivr.net/gh/neodgm/neodgm-webfont@latest/neodgm/style.css');

        :root {
          --neon-pink: #ff2d78;
          --neon-cyan: #00f5ff;
          --neon-yellow: #ffe600;
          --neon-purple: #b84fff;
          --bg-dark: #0a0a1a;
          --card-bg: #12122a;
          --card-border: #2a2a50;
        }

        body {
          min-height: 100vh;
          background: var(--bg-dark);
          background-image: radial-gradient(ellipse 80% 50% at 50% -20%, rgba(144, 202, 249, 0.15) 0%, transparent 70%),
            linear-gradient(180deg, #0a0a1a 0%, #0d0d2b 100%);
          font-family: 'Outfit', 'Noto Sans KR', sans-serif;
          color: #fff;
          overflow-x: hidden;
        }

        body::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: radial-gradient(1px 1px at 10% 20%, rgba(255, 255, 255, 0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 60% 15%, rgba(255, 255, 255, 0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 80% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 100%),
            radial-gradient(1px 1px at 20% 90%, rgba(255, 255, 255, 0.2) 0%, transparent 100%),
            repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 2px);
          pointer-events: none;
          z-index: 5;
        }

        body::after {
          content: '';
          position: fixed;
          bottom: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
          transform: perspective(600px) rotateX(65deg) translateY(0);
          animation: gridMove 15s linear infinite;
          pointer-events: none;
          z-index: 0;
          mask-image: linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 50%);
          -webkit-mask-image: linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 50%);
        }

        @keyframes gridMove {
          0% {
            transform: perspective(500px) rotateX(60deg) translateY(0);
          }
          100% {
            transform: perspective(500px) rotateX(60deg) translateY(50px);
          }
        }

        .arcade-container {
          position: relative;
          z-index: 10;
          max-width: 960px;
          margin: 0 auto;
          padding: 0 20px 80px;
        }

        header {
          text-align: center;
          padding: 60px 0 40px;
        }

        .logo-wrap {
          display: inline-block;
          position: relative;
        }

        .logo-subtitle {
          font-family: 'NeoDunggeunmo', monospace;
          font-size: 14px;
          color: #ff5252;
          letter-spacing: 1px;
          margin-bottom: 24px;
          display: inline-block;
          padding: 6px 14px;
          border-radius: 4px;
          border: 1px solid rgba(255, 82, 82, 0.4);
          background: rgba(255, 82, 82, 0.1);
          animation: blink 2s infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .logo-title {
          font-family: 'Press Start 2P', monospace;
          font-size: clamp(28px, 6vw, 48px);
          font-weight: 400;
          line-height: 1.4;
          letter-spacing: 2px;
          color: #fff;
          position: relative;
          z-index: 2;
          text-transform: uppercase;
        }

        .logo-title::before, .logo-title::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          opacity: 0.9;
        }

        .logo-title::before {
          left: 2px;
          text-shadow: -2px 0 #ff00c1;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim 8s infinite linear alternate-reverse;
        }

        .logo-title::after {
          left: -2px;
          text-shadow: 2px 0 #00fff9;
          animation: glitch-anim2 4s infinite linear alternate-reverse;
        }

        @keyframes glitch-anim {
          0%, 100% { clip: rect(40px, 9999px, 42px, 0); transform: translateX(0); }
          20% { clip: rect(20px, 9999px, 20px, 0); transform: translateX(1px); }
          40% { clip: rect(60px, 9999px, 80px, 0); transform: translateX(-1px); }
          60% { clip: rect(10px, 9999px, 15px, 0); transform: translateX(1px); }
          80% { clip: rect(80px, 9999px, 90px, 0); transform: translateX(-1px); }
        }

        @keyframes glitch-anim2 {
          0%, 100% { clip: rect(10px, 9999px, 100px, 0); transform: translateX(0); }
          25% { clip: rect(0px, 9999px, 5px, 0); transform: translateX(-1px); }
          50% { clip: rect(50px, 9999px, 55px, 0); transform: translateX(1px); }
          75% { clip: rect(80px, 9999px, 85px, 0); transform: translateX(-1px); }
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 40px 0 36px;
        }

        .divider::before, .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(144, 202, 249, 0.4), transparent);
        }

        .divider span {
          font-family: 'Press Start 2P', monospace;
          font-size: 10px;
          color: #90caf9;
          letter-spacing: 2px;
          white-space: nowrap;
        }

        .games-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }

        .game-card {
          position: relative;
          background: rgba(25, 28, 41, 0.6);
          backdrop-filter: blur(16px) saturate(120%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          transition: transform 0.5s ease-out, box-shadow 0.25s ease;
          display: block;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .game-card.active:hover {
          box-shadow: 0 15px 35px rgba(200, 255, 0, 0.15), 0 0 0 1px rgba(200, 255, 0, 0.5);
          border-color: rgba(200, 255, 0, 0.6);
          transform: translateY(-5px);
        }

        .card-thumbnail-wrap {
          height: 180px;
          overflow: hidden;
          position: relative;
          background: rgba(255, 255, 255, 0.05);
        }

        .card-thumbnail {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          transition: transform 0.4s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 80px;
        }

        .game-card.active:hover .card-thumbnail {
          transform: scale(1.06);
        }

        .coming-badge, .play-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          background: rgba(200, 255, 0, 0.15);
          border: 1px solid rgba(200, 255, 0, 0.8);
          color: #c8ff00;
          font-family: 'Press Start 2P', monospace;
          font-size: 8px;
          padding: 5px 10px;
          border-radius: 4px;
          z-index: 20;
        }

        .play-badge {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .play-badge::before {
          content: '▶';
          font-size: 7px;
        }

        .card-body {
          padding: 18px 20px 22px;
          border-top: 1px solid var(--card-border);
        }

        .tags-wrap {
          display: flex;
          gap: 8px;
          margin-bottom: 10px;
        }

        .card-tag {
          font-family: 'NeoDunggeunmo', 'Press Start 2P', monospace;
          font-size: 12px;
          color: #90caf9;
          display: inline-block;
          letter-spacing: 0.5px;
        }

        .card-title {
          font-size: 20px;
          font-weight: 900;
          margin-bottom: 6px;
        }

        .card-desc {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.45);
          line-height: 1.6;
        }

        footer {
          text-align: center;
          margin-top: 60px;
          padding: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        footer p {
          font-family: 'Press Start 2P', monospace;
          font-size: 9px;
          color: rgba(255, 255, 255, 0.2);
          line-height: 2;
        }

        .coin-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .coin-bar span {
          font-family: 'Press Start 2P', monospace;
          font-size: 10px;
          color: var(--neon-yellow);
        }
      `}</style>
    </div>
  );
}
