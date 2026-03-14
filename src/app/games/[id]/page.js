"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function GamePage() {
    const { id } = useParams();
    const [gameUrl, setGameUrl] = useState("");

    useEffect(() => {
        if (id) {
            // Point to the static HTML file in the public directory
            setGameUrl(`/games/${id}/index.html`);
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
        }
        .game-iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
      `}</style>
        </div>
    );
}
