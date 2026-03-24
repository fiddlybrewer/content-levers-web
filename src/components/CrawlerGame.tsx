"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const CELL = 20;
const COLS = 20;
const ROWS = 20;
const W = COLS * CELL;
const H = ROWS * CELL;
const TICK_MS = 120;

type Point = { x: number; y: number };
type Dir = "UP" | "DOWN" | "LEFT" | "RIGHT";

function rand(max: number) {
  return Math.floor(Math.random() * max);
}

function spawnItem(snake: Point[], existing: Point[]): Point {
  const occupied = new Set([...snake, ...existing].map((p) => `${p.x},${p.y}`));
  let p: Point;
  do {
    p = { x: rand(COLS), y: rand(ROWS) };
  } while (occupied.has(`${p.x},${p.y}`));
  return p;
}

export default function CrawlerGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<"idle" | "playing" | "over">("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Game state refs for the loop
  const snakeRef = useRef<Point[]>([{ x: 10, y: 10 }]);
  const dirRef = useRef<Dir>("RIGHT");
  const nextDirRef = useRef<Dir>("RIGHT");
  const pagesRef = useRef<Point[]>([]);
  const errorsRef = useRef<Point[]>([]);
  const scoreRef = useRef(0);
  const loopRef = useRef<number>(0);

  useEffect(() => {
    const stored = localStorage.getItem("crawlerHighScore");
    if (stored) setHighScore(parseInt(stored, 10));
  }, []);

  const resetGame = useCallback(() => {
    snakeRef.current = [{ x: 10, y: 10 }];
    dirRef.current = "RIGHT";
    nextDirRef.current = "RIGHT";
    scoreRef.current = 0;
    setScore(0);

    // Spawn initial pages and errors
    const pages: Point[] = [];
    const errors: Point[] = [];
    for (let i = 0; i < 3; i++) {
      pages.push(spawnItem(snakeRef.current, [...pages, ...errors]));
    }
    for (let i = 0; i < 2; i++) {
      errors.push(spawnItem(snakeRef.current, [...pages, ...errors]));
    }
    pagesRef.current = pages;
    errorsRef.current = errors;
  }, []);

  const startGame = useCallback(() => {
    resetGame();
    setGameState("playing");
  }, [resetGame]);

  // Key handler
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (gameState === "idle" || gameState === "over") {
        if (e.code === "Space" || e.code === "Enter") {
          e.preventDefault();
          startGame();
        }
        return;
      }
      const dir = dirRef.current;
      switch (e.code) {
        case "ArrowUp":
        case "KeyW":
          if (dir !== "DOWN") nextDirRef.current = "UP";
          e.preventDefault();
          break;
        case "ArrowDown":
        case "KeyS":
          if (dir !== "UP") nextDirRef.current = "DOWN";
          e.preventDefault();
          break;
        case "ArrowLeft":
        case "KeyA":
          if (dir !== "RIGHT") nextDirRef.current = "LEFT";
          e.preventDefault();
          break;
        case "ArrowRight":
        case "KeyD":
          if (dir !== "LEFT") nextDirRef.current = "RIGHT";
          e.preventDefault();
          break;
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [gameState, startGame]);

  // Game loop
  useEffect(() => {
    if (gameState !== "playing") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);

      // Grid
      ctx.fillStyle = "#fafafa";
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "#f0f0f0";
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= COLS; x++) {
        ctx.beginPath();
        ctx.moveTo(x * CELL, 0);
        ctx.lineTo(x * CELL, H);
        ctx.stroke();
      }
      for (let y = 0; y <= ROWS; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * CELL);
        ctx.lineTo(W, y * CELL);
        ctx.stroke();
      }

      // Pages (green docs to eat)
      for (const p of pagesRef.current) {
        const px = p.x * CELL + 2;
        const py = p.y * CELL + 2;
        const s = CELL - 4;
        // Doc icon
        ctx.fillStyle = "#d1fae5";
        ctx.strokeStyle = "#059669";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(px, py, s, s, 3);
        ctx.fill();
        ctx.stroke();
        // Lines on doc
        ctx.strokeStyle = "#059669";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(px + 3, py + 5);
        ctx.lineTo(px + s - 3, py + 5);
        ctx.moveTo(px + 3, py + 9);
        ctx.lineTo(px + s - 5, py + 9);
        ctx.moveTo(px + 3, py + 13);
        ctx.lineTo(px + s - 3, py + 13);
        ctx.stroke();
      }

      // 404 errors (red X to avoid)
      for (const e of errorsRef.current) {
        const ex = e.x * CELL + 2;
        const ey = e.y * CELL + 2;
        const s = CELL - 4;
        ctx.fillStyle = "#fee2e2";
        ctx.strokeStyle = "#dc2626";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(ex, ey, s, s, 3);
        ctx.fill();
        ctx.stroke();
        // X
        ctx.strokeStyle = "#dc2626";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(ex + 4, ey + 4);
        ctx.lineTo(ex + s - 4, ey + s - 4);
        ctx.moveTo(ex + s - 4, ey + 4);
        ctx.lineTo(ex + 4, ey + s - 4);
        ctx.stroke();
      }

      // Snake (Googlebot)
      const snake = snakeRef.current;
      for (let i = snake.length - 1; i >= 0; i--) {
        const seg = snake[i];
        const sx = seg.x * CELL;
        const sy = seg.y * CELL;

        if (i === 0) {
          // Head
          ctx.fillStyle = "#1a1a1a";
          ctx.beginPath();
          ctx.roundRect(sx + 1, sy + 1, CELL - 2, CELL - 2, 4);
          ctx.fill();
          // Eyes
          ctx.fillStyle = "#4285F4";
          const eyeSize = 3;
          switch (dirRef.current) {
            case "RIGHT":
              ctx.fillRect(sx + CELL - 6, sy + 4, eyeSize, eyeSize);
              ctx.fillRect(sx + CELL - 6, sy + CELL - 7, eyeSize, eyeSize);
              break;
            case "LEFT":
              ctx.fillRect(sx + 3, sy + 4, eyeSize, eyeSize);
              ctx.fillRect(sx + 3, sy + CELL - 7, eyeSize, eyeSize);
              break;
            case "UP":
              ctx.fillRect(sx + 4, sy + 3, eyeSize, eyeSize);
              ctx.fillRect(sx + CELL - 7, sy + 3, eyeSize, eyeSize);
              break;
            case "DOWN":
              ctx.fillRect(sx + 4, sy + CELL - 6, eyeSize, eyeSize);
              ctx.fillRect(sx + CELL - 7, sy + CELL - 6, eyeSize, eyeSize);
              break;
          }
        } else {
          // Body
          const alpha = 0.6 - (i / snake.length) * 0.3;
          ctx.fillStyle = `rgba(26, 26, 26, ${alpha})`;
          ctx.beginPath();
          ctx.roundRect(sx + 2, sy + 2, CELL - 4, CELL - 4, 3);
          ctx.fill();
        }
      }

      // Score overlay
      ctx.fillStyle = "#1a1a1a";
      ctx.font = "bold 11px Inter, system-ui, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(`Pages Indexed: ${scoreRef.current}`, 6, 14);
    }

    function tick() {
      dirRef.current = nextDirRef.current;
      const snake = snakeRef.current;
      const head = snake[0];
      const dir = dirRef.current;

      const next: Point = {
        x: head.x + (dir === "RIGHT" ? 1 : dir === "LEFT" ? -1 : 0),
        y: head.y + (dir === "DOWN" ? 1 : dir === "UP" ? -1 : 0),
      };

      // Wall collision
      if (next.x < 0 || next.x >= COLS || next.y < 0 || next.y >= ROWS) {
        endGame();
        return;
      }

      // Self collision
      if (snake.some((s) => s.x === next.x && s.y === next.y)) {
        endGame();
        return;
      }

      // 404 collision
      if (errorsRef.current.some((e) => e.x === next.x && e.y === next.y)) {
        endGame();
        return;
      }

      // Eat page?
      const pageIdx = pagesRef.current.findIndex(
        (p) => p.x === next.x && p.y === next.y
      );

      snake.unshift(next);

      if (pageIdx !== -1) {
        // Ate a page — grow
        scoreRef.current++;
        setScore(scoreRef.current);
        pagesRef.current.splice(pageIdx, 1);
        // Spawn new page
        pagesRef.current.push(
          spawnItem(snake, [...pagesRef.current, ...errorsRef.current])
        );
        // Occasionally spawn more errors
        if (scoreRef.current % 3 === 0) {
          errorsRef.current.push(
            spawnItem(snake, [...pagesRef.current, ...errorsRef.current])
          );
        }
      } else {
        snake.pop();
      }

      snakeRef.current = snake;
      draw();
    }

    function endGame() {
      clearInterval(loopRef.current);
      setGameState("over");
      const s = scoreRef.current;
      setHighScore((prev) => {
        const best = Math.max(prev, s);
        localStorage.setItem("crawlerHighScore", String(best));
        return best;
      });
    }

    draw();
    loopRef.current = window.setInterval(tick, TICK_MS);
    return () => clearInterval(loopRef.current);
  }, [gameState]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          className="border border-[var(--color-border)] rounded-xl"
          style={{ imageRendering: "pixelated" }}
        />

        {/* Idle overlay */}
        {gameState === "idle" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 rounded-xl">
            <h3 className="text-5xl font-bold mb-3">404</h3>
            <p className="text-[14px] text-[var(--color-muted)] mb-1">
              This page doesn&apos;t exist. But since you&apos;re here — help Googlebot index some pages.
            </p>
            <p className="text-[12px] text-[var(--color-muted)]">
              Arrow keys to move. Eat pages. Avoid 404s.
            </p>
            <p className="text-[12px] text-[var(--color-muted)] mt-4 animate-pulse">
              Press space to start
            </p>
          </div>
        )}

        {/* Game over overlay */}
        {gameState === "over" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 rounded-xl">
            <h3 className="text-lg font-bold mb-1 text-[#dc2626]">
              Crawl Budget Exhausted
            </h3>
            <p className="text-[14px] font-semibold mb-0.5">
              Pages Indexed: {score}
            </p>
            <p className="text-[12px] text-[var(--color-muted)]">
              Best: {highScore}
            </p>
            <p className="text-[12px] text-[var(--color-muted)] mt-4 animate-pulse">
              Press space to recrawl
            </p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className={`flex items-center gap-6 mt-4 text-[12px] text-[var(--color-muted)] ${gameState !== "playing" ? "invisible" : ""}`}>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded bg-[#1a1a1a]" /> Googlebot
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded bg-[#d1fae5] border border-[#059669]" /> Page
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded bg-[#fee2e2] border border-[#dc2626]" /> 404 Error
        </div>
      </div>
    </div>
  );
}
