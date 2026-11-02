import { useEffect, useMemo, useRef, useState } from "react";

import TitleHeader from "../components/TitleHeader";
import Button from "../components/Button";

const USERNAME = "Anotida28";
const GITHUB_URL = `https://github.com/${USERNAME}`;
const CACHE_KEY = "github-stats-v1";
const CACHE_TTL = 60 * 60 * 1000; // unauthenticated API allows 60 req/hr per visitor

// Single-hue sequential ramp, contribution level 0 → 4, built from the site palette
const LEVEL_COLORS = ["#1a2840", "#284566", "#3f6d99", "#7aa5cf", "#d9ecff"];
const CELL = 14;
const GAP = 4;

const fetchJson = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
};

const loadStats = async () => {
  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY));
    if (cached && Date.now() - cached.at < CACHE_TTL) return cached.data;
  } catch {
    // ignore bad cache
  }

  const [user, repos, calendar] = await Promise.all([
    fetchJson(`https://api.github.com/users/${USERNAME}`),
    fetchJson(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=pushed`
    ),
    fetchJson(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`),
  ]);

  const data = { user, repos, calendar };
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
  } catch {
    // storage full or disabled
  }
  return data;
};

const summarize = ({ user, repos, calendar }) => {
  const days = [...calendar.contributions].sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  let longest = 0;
  let run = 0;
  for (const d of days) {
    run = d.count > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
  }

  const own = repos.filter((r) => !r.fork && r.name !== USERNAME);

  const langCounts = {};
  own.forEach((r) => {
    if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1;
  });
  const languages = Object.entries(langCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Columns of 7 days, Sunday first, padded so the first column lines up
  const pad = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const cells = [...Array(pad).fill(null), ...days];
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  return {
    stats: [
      { label: "Contributions this year", value: calendar.total.lastYear },
      { label: "Public repositories", value: user.public_repos },
      { label: "Longest streak (days)", value: longest },
      { label: "Active days", value: days.filter((d) => d.count > 0).length },
    ],
    weeks,
    total: calendar.total.lastYear,
    languages,
    langRepoCount: own.filter((r) => r.language).length,
    recent: own.slice(0, 4),
  };
};

const formatDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

const timeAgo = (iso) => {
  const days = Math.round((Date.now() - new Date(iso)) / 86400000);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  if (days < 30) return rtf.format(-days, "day");
  if (days < 365) return rtf.format(-Math.round(days / 30), "month");
  return rtf.format(-Math.round(days / 365), "year");
};

const ContributionGraph = ({ weeks, total }) => {
  const [hover, setHover] = useState(null);
  const scrollRef = useRef(null);

  // On narrow screens, start scrolled to the most recent weeks
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, []);

  const monthLabels = weeks.map((week, i) => {
    const first = week.find(Boolean);
    const prev = i > 0 && weeks[i - 1].find(Boolean);
    if (!first || (prev && prev.date.slice(5, 7) === first.date.slice(5, 7)))
      return null;
    return new Date(`${first.date}T00:00:00Z`).toLocaleDateString("en-US", {
      month: "short",
      timeZone: "UTC",
    });
  });

  const width = weeks.length * (CELL + GAP);

  return (
    <div className="card-border rounded-xl p-6 md:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
        <h3 className="text-xl md:text-2xl font-semibold">Contribution activity</h3>
        <p className="text-blue-50 text-sm">
          {total.toLocaleString()} contributions in the last year
        </p>
      </div>

      <div ref={scrollRef} className="overflow-x-auto pb-2">
        <div className="relative mx-auto" style={{ width }}>
          <div className="relative h-5 text-xs text-blue-50">
            {monthLabels.map(
              (m, i) =>
                m && (
                  <span
                    key={i}
                    className="absolute"
                    style={{ left: i * (CELL + GAP) }}
                  >
                    {m}
                  </span>
                )
            )}
          </div>

          <div
            role="img"
            aria-label={`${total} GitHub contributions in the last year`}
            className="flex"
            style={{ gap: GAP }}
            onMouseLeave={() => setHover(null)}
          >
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col" style={{ gap: GAP }}>
                {week.map((day, di) =>
                  day ? (
                    <div
                      key={day.date}
                      className="rounded-[3px] transition-transform hover:scale-125"
                      style={{
                        width: CELL,
                        height: CELL,
                        backgroundColor: LEVEL_COLORS[day.level],
                      }}
                      onMouseEnter={() =>
                        setHover({
                          day,
                          x: wi * (CELL + GAP) + CELL / 2,
                          y: di * (CELL + GAP),
                        })
                      }
                    />
                  ) : (
                    <div key={di} style={{ width: CELL, height: CELL }} />
                  )
                )}
              </div>
            ))}
          </div>

          {hover && (
            <div
              className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border border-black-50 bg-black-200 px-3 py-1.5 text-xs shadow-lg"
              style={{ left: hover.x, top: hover.y + 20 - 8 }}
            >
              <span className="font-semibold text-white">
                {hover.day.count} contribution{hover.day.count === 1 ? "" : "s"}
              </span>
              <span className="text-blue-50"> · {formatDate(hover.day.date)}</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-1.5 text-xs text-blue-50">
        <span className="mr-1">Less</span>
        {LEVEL_COLORS.map((c) => (
          <span
            key={c}
            className="rounded-[3px]"
            style={{ width: CELL, height: CELL, backgroundColor: c }}
          />
        ))}
        <span className="ml-1">More</span>
      </div>
    </div>
  );
};

const Languages = ({ languages, repoCount }) => {
  const max = languages[0]?.[1] || 1;
  return (
    <div className="card-border rounded-xl p-6 md:p-8">
      <h3 className="text-xl font-semibold">Top languages</h3>
      <p className="text-blue-50 text-sm mt-1 mb-6">
        Primary language across {repoCount} repositories
      </p>
      <ul className="flex flex-col gap-4">
        {languages.map(([name, count]) => (
          <li key={name}>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-white-50">{name}</span>
              <span className="text-blue-50">
                {count} repo{count === 1 ? "" : "s"}
              </span>
            </div>
            <div className="h-2 rounded-full bg-black-50">
              <div
                className="h-full rounded-full bg-blue-50"
                style={{ width: `${(count / max) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const RecentRepos = ({ repos }) => (
  <div className="card-border rounded-xl p-6 md:p-8">
    <h3 className="text-xl font-semibold mb-6">Recently active</h3>
    <ul className="flex flex-col gap-3">
      {repos.map((r) => (
        <li key={r.id}>
          <a
            href={r.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg border border-black-50 bg-black-200/40 px-4 py-3 transition-colors duration-300 hover:border-blue-50/40"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-medium text-white-50 truncate">{r.name}</span>
              <span className="text-xs text-blue-50 shrink-0">
                {timeAgo(r.pushed_at)}
              </span>
            </div>
            {r.description && (
              <p className="text-sm text-blue-50 mt-1 line-clamp-1">
                {r.description}
              </p>
            )}
            {r.language && (
              <p className="text-xs text-blue-50/80 mt-1">{r.language}</p>
            )}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const GitHubStats = () => {
  const [data, setData] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadStats()
      .then((raw) => !cancelled && setData(raw))
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, []);

  const summary = useMemo(() => {
    if (!data) return null;
    try {
      return summarize(data);
    } catch {
      return null;
    }
  }, [data]);

  return (
    <section id="github" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader title="My GitHub Activity" />

        <div className="mt-16 flex flex-col gap-6" data-reveal>
          {failed || (data && !summary) ? (
            <div className="card-border rounded-xl p-10 text-center text-blue-50">
              GitHub stats are unavailable right now. You can still browse my
              work on GitHub.
            </div>
          ) : !summary ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="card-border rounded-lg h-36 animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {summary.stats.map((s) => (
                  <div
                    key={s.label}
                    className="card-border rounded-lg p-6 md:p-10 flex flex-col justify-center transition-colors duration-300 hover:border-blue-50/40"
                  >
                    <div className="text-white-50 text-4xl md:text-5xl font-bold mb-2">
                      {s.value.toLocaleString()}
                    </div>
                    <div className="text-white-50 text-sm md:text-lg">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              <ContributionGraph weeks={summary.weeks} total={summary.total} />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Languages
                  languages={summary.languages}
                  repoCount={summary.langRepoCount}
                />
                <RecentRepos repos={summary.recent} />
              </div>
            </>
          )}

          <div className="flex justify-center mt-4">
            <Button
              text="View My GitHub"
              href={GITHUB_URL}
              className="md:w-80 md:h-16 w-60 h-12"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;
