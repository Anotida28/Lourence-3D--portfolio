import { useEffect, useMemo, useRef, useState } from "react";

const facts = [
  "Lourence built and delivered six internal systems end-to-end.",
  "He supported more than 30 merchant, partner, and bank integrations.",
  "He is studying Computer Science at NUST in Zimbabwe.",
  "His work combines backend systems, fintech, cybersecurity, and applied AI.",
];

const HITS_PER_FACT = 3;
const GOAL = facts.length * HITS_PER_FACT;
// Stars linger less as you score, so the round gets a little harder.
const lifetimeFor = (score) => Math.max(1000, 1900 - score * 70);

const randomSpot = () => ({
  x: 10 + Math.random() * 80,
  y: 14 + Math.random() * 70,
});

const goTo = (path) => {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
};

const SecretGame = () => {
  const [star, setStar] = useState(() => ({ id: 0, ...randomSpot() }));
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [bursts, setBursts] = useState([]);
  const burstId = useRef(0);

  const unlockedCount = Math.min(
    Math.floor(score / HITS_PER_FACT),
    facts.length,
  );
  const unlocked = facts.slice(0, unlockedCount);
  const done = score >= GOAL;
  const lifetime = lifetimeFor(score);

  const sky = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() < 0.15 ? 2 : 1,
        delay: Math.random() * 4,
      })),
    [],
  );

  useEffect(() => {
    const previous = document.title;
    document.title = "Shoot the stars · Lourence Ruhwaya";
    return () => {
      document.title = previous;
    };
  }, []);

  // The star drifts away if you don't hit it in time. Keyed on star.id so
  // the countdown restarts every time a new star appears.
  useEffect(() => {
    if (done) return;
    const timer = window.setTimeout(
      () => setStar((s) => ({ id: s.id + 1, ...randomSpot() })),
      lifetime,
    );
    return () => window.clearTimeout(timer);
  }, [star.id, lifetime, done]);

  const spawnBurst = (x, y, label) => {
    const id = ++burstId.current;
    setBursts((b) => [...b, { id, x, y, label }]);
    window.setTimeout(
      () => setBursts((b) => b.filter((p) => p.id !== id)),
      700,
    );
  };

  const shootStar = (event) => {
    event.stopPropagation();
    const next = score + 1;
    setScore(next);
    spawnBurst(
      star.x,
      star.y,
      next % HITS_PER_FACT === 0 ? "Fact unlocked!" : "+1",
    );
    setStar((s) => ({ id: s.id + 1, ...randomSpot() }));
  };

  const missShot = (event) => {
    if (done) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setMisses((m) => m + 1);
    spawnBurst(x, y, null);
  };

  const restart = () => {
    setScore(0);
    setMisses(0);
    setBursts([]);
    setStar((s) => ({ id: s.id + 1, ...randomSpot() }));
  };

  const accuracy =
    score + misses === 0 ? 100 : Math.round((score / (score + misses)) * 100);
  const toNextFact = HITS_PER_FACT - (score % HITS_PER_FACT);

  return (
    <main className="min-h-screen bg-[#080f1e] px-5 py-10 text-white md:px-20">
      <div className="mx-auto max-w-5xl">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            goTo("/");
          }}
          className="inline-flex items-center gap-2 text-sm text-blue-50 transition hover:text-white"
        >
          <span aria-hidden>←</span> Back to the portfolio
        </a>

        <div className="mt-12 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-pink-300">
            Secret screen unlocked
          </p>
          <h1 className="mt-4 text-4xl font-semibold md:text-6xl">
            Shoot the stars.
          </h1>
          <p className="mt-5 text-lg text-white/70">
            Click the glowing star before it drifts away. Every {HITS_PER_FACT}{" "}
            hits unlock a fact — find all {facts.length}.
          </p>
        </div>

        <div
          onClick={missShot}
          className={`relative mt-10 h-[52vh] min-h-[360px] select-none overflow-hidden rounded-3xl border border-blue-200/20 shadow-2xl shadow-indigo-950/40 ${
            done ? "" : "cursor-crosshair"
          }`}
          role="region"
          aria-label="Shoot the stars game"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, rgba(83,105,255,.25), transparent 55%), #0d1929",
          }}
        >
          {/* background sky */}
          {sky.map((s) => (
            <span
              key={s.id}
              aria-hidden
              className="pointer-events-none absolute rounded-full bg-white/60 motion-safe:animate-[twinkle_4s_ease-in-out_infinite]"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: s.size,
                height: s.size,
                animationDelay: `${s.delay}s`,
              }}
            />
          ))}

          {/* HUD */}
          <div className="absolute inset-x-6 top-6 z-10 flex flex-wrap items-center justify-between gap-3 text-sm text-white/70">
            <div className="flex gap-5">
              <span>
                Hits{" "}
                <strong className="text-white tabular-nums">{score}</strong>
              </span>
              <span>
                Accuracy{" "}
                <strong className="text-white tabular-nums">{accuracy}%</strong>
              </span>
            </div>
            <div
              className="flex items-center gap-1.5"
              aria-label={`${unlockedCount} of ${facts.length} facts unlocked`}
            >
              {facts.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-8 rounded-full transition-colors duration-500 ${
                    i < unlockedCount
                      ? "bg-pink-300 shadow-[0_0_10px_#ff4d9d]"
                      : "bg-white/15"
                  }`}
                />
              ))}
            </div>
          </div>

          {!done && (
            <button
              key={star.id}
              type="button"
              aria-label="Shoot glowing star"
              onClick={shootStar}
              className="group absolute z-10 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-pink-300 motion-safe:animate-[star-in_.25s_ease-out]"
              style={{ left: `${star.x}%`, top: `${star.y}%` }}
            >
              {/* countdown ring */}
              <svg
                className="absolute inset-0 -rotate-90"
                viewBox="0 0 64 64"
                aria-hidden
              >
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="rgba(255,179,220,.45)"
                  strokeWidth="2"
                  strokeDasharray="176"
                  className="motion-safe:animate-[fuse_linear_forwards]"
                  style={{ animationDuration: `${lifetime}ms` }}
                />
              </svg>
              <span className="text-5xl leading-none text-pink-200 drop-shadow-[0_0_18px_#ff4d9d] transition-transform group-hover:scale-125">
                ✦
              </span>
            </button>
          )}

          {bursts.map((b) => (
            <span
              key={b.id}
              aria-hidden
              className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${b.x}%`, top: `${b.y}%` }}
            >
              {b.label ? (
                <>
                  <span className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-pink-200 animate-[burst_.6s_ease-out_forwards]" />
                  <span className="block whitespace-nowrap text-sm font-semibold text-pink-100 animate-[float-up_.7s_ease-out_forwards]">
                    {b.label}
                  </span>
                </>
              ) : (
                <span className="block size-6 rounded-full border border-white/30 animate-[burst_.4s_ease-out_forwards]" />
              )}
            </span>
          ))}

          {done ? (
            <div className="absolute inset-0 z-30 grid place-items-center bg-[#080f1e]/70 p-6 text-center backdrop-blur-sm motion-safe:animate-[star-in_.4s_ease-out]">
              <div>
                <p className="text-5xl text-pink-200 drop-shadow-[0_0_18px_#ff4d9d]">
                  ✦
                </p>
                <h2 className="mt-4 text-2xl font-semibold md:text-3xl">
                  Every fact unlocked
                </h2>
                <p className="mt-2 text-white/60">
                  {GOAL} stars at {accuracy}% accuracy. Nice aim.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={restart}
                    className="rounded-lg bg-white-50 px-5 py-2.5 font-medium text-black transition hover:bg-white"
                  >
                    Play again
                  </button>
                  <a
                    href="/#contact"
                    className="rounded-lg border border-white/20 px-5 py-2.5 font-medium transition hover:border-white/50"
                  >
                    Let&apos;s talk
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <p className="pointer-events-none absolute bottom-6 left-1/2 w-full -translate-x-1/2 px-6 text-center text-sm text-white/50">
              {score === 0
                ? "Aim, click, and unlock the story behind the work."
                : `${toNextFact} more ${toNextFact === 1 ? "hit" : "hits"} to the next fact.`}
            </p>
          )}
        </div>

        <div
          className="mt-10 rounded-3xl border border-pink-200/20 bg-white/[0.04] p-6"
          aria-live="polite"
        >
          <h2 className="text-xl font-semibold">
            Unlocked facts{" "}
            <span className="text-base font-normal text-white/50">
              {unlockedCount}/{facts.length}
            </span>
          </h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {facts.map((fact, index) =>
              index < unlocked.length ? (
                <li
                  key={fact}
                  className="rounded-xl border border-pink-200/10 bg-white/[0.05] p-4 text-white/80 motion-safe:animate-[star-in_.35s_ease-out]"
                >
                  {fact}
                </li>
              ) : (
                <li
                  key={fact}
                  className="rounded-xl border border-dashed border-white/10 p-4 text-white/30"
                >
                  ✦ Locked
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default SecretGame;
