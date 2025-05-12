import { DAPP_JSON_URL, DOMAIN } from "@/lib/const";
import { Dapp } from "@/types/dapp";

export default async function sitemap() {
  const res = await fetch(DAPP_JSON_URL);
  const dapps: Dapp[] = res.ok ? await res.json() : [];

  const dappEntries = dapps.map((dapp) => ({
    url: `${DOMAIN}/dapp/${dapp.name.toLowerCase().replace(/\s/g, "-")}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: DOMAIN,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...dappEntries,
  ];
}
