"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function GamePage() {
  const { id } = useParams();
  const [gameUrl, setGameUrl] = useState("");

  useEffect(() => {
    if (id) {
      setGameUrl(`/games/${id}/index.html`);
      // Performance: Add a class to the body to disable heavy lobby effects
      document.body.classList.add("game-active");
      return () => {
        document.body.classList.remove("game-active");
      };
    }
  }, [id]);

  if (!gameUrl) return null;

  return (
    <div className="game-wrapper">
      <iframe
        src={gameUrl}
        title={`Game: ${id}`}
        className="game-iframe"
        allow="autoplay; fullscreen"
      />
      <style jsx>{`
        .game-wrapper {
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background: #000;
          /* Force hardware acceleration */
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }
        .game-iframe {
          width: 100%;
          height: 100%;
          border: none;
          /* Optimization: hint to the browser that this content is independent */
          contain: strict;
        }
      `}</style>
    </div>
  );
}
