const GITHUB_REPO_URL = "https://github.com/jeiwinfrey/tailwindcss-smooth-corners";
const GITHUB_REPO_API = "https://api.github.com/repos/jeiwinfrey/tailwindcss-smooth-corners";
const NPM_PACKAGE_NAME = "tailwindcss-smooth-corners";
const NPM_PACKAGE_URL = `https://www.npmjs.com/package/${NPM_PACKAGE_NAME}`;
const NPM_REGISTRY_URL = `https://registry.npmjs.org/${NPM_PACKAGE_NAME}`;

type SocialStat = {
  href: string;
  label: string;
  value: string;
  live: boolean;
};

type RegistryResponse = {
  time?: {
    created?: string;
  };
};

function formatCompactNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: value >= 1000 ? 1 : 0,
  }).format(value);
}

function toDateString(date: Date) {
  return date.toISOString().slice(0, 10);
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

async function fetchGitHubStars(): Promise<SocialStat> {
  try {
    const response = await fetch(GITHUB_REPO_API, {
      headers: {
        Accept: "application/vnd.github+json",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`GitHub returned ${response.status}`);
    }

    const data = (await response.json()) as { stargazers_count?: number };

    if (typeof data.stargazers_count !== "number") {
      throw new Error("Missing stargazers_count");
    }

    return {
      href: GITHUB_REPO_URL,
      label: "GitHub",
      value: formatCompactNumber(data.stargazers_count),
      live: true,
    };
  } catch {
    return {
      href: GITHUB_REPO_URL,
      label: "GitHub",
      value: "0",
      live: false,
    };
  }
}

async function fetchNpmLifetimeInstalls(): Promise<SocialStat> {
  try {
    const registryResponse = await fetch(NPM_REGISTRY_URL, {
      next: { revalidate: 3600 },
    });

    if (!registryResponse.ok) {
      throw new Error(`Registry returned ${registryResponse.status}`);
    }

    const registryData = (await registryResponse.json()) as RegistryResponse;
    const created = registryData.time?.created;

    if (!created) {
      throw new Error("Missing publish date");
    }

    const start = new Date(created);
    const end = new Date();
    const ranges: Array<{ start: string; end: string }> = [];

    for (let cursor = new Date(start); cursor <= end; cursor = addDays(cursor, 365)) {
      const rangeEnd = addDays(cursor, 364);
      ranges.push({
        start: toDateString(cursor),
        end: toDateString(rangeEnd > end ? end : rangeEnd),
      });
    }

    const results = await Promise.all(
      ranges.map(async (range) => {
        const downloadsResponse = await fetch(
          `https://api.npmjs.org/downloads/point/${range.start}:${range.end}/${NPM_PACKAGE_NAME}`,
          {
            next: { revalidate: 3600 },
          }
        );

        if (!downloadsResponse.ok) {
          throw new Error(`Downloads returned ${downloadsResponse.status}`);
        }

        const data = (await downloadsResponse.json()) as { downloads?: number };
        return data.downloads ?? 0;
      })
    );

    const total = results.reduce((sum, value) => sum + value, 0);

    return {
      href: NPM_PACKAGE_URL,
      label: "npm",
      value: formatCompactNumber(total),
      live: total > 0,
    };
  } catch {
    return {
      href: NPM_PACKAGE_URL,
      label: "npm",
      value: "0",
      live: false,
    };
  }
}

export async function getSocialStats() {
  const [github, npm] = await Promise.all([fetchGitHubStars(), fetchNpmLifetimeInstalls()]);

  return { github, npm };
}

export type { SocialStat };
