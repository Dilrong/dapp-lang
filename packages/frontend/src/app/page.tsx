import DappTable from "@/components/feature/DappTable";
import { DAPP_JSON_URL } from "@/lib/const";
import { Dapp } from "@/types/dapp";

async function fetchDapps(): Promise<Dapp[]> {
  const res = await fetch(DAPP_JSON_URL, {
    next: { revalidate: 86400 },
  });
  return res.ok ? await res.json() : [];
}

export default async function Home() {
  const initialDapps = await fetchDapps();
  return (
    <main>
      <DappTable initialDapps={initialDapps} />
    </main>
  );
}
