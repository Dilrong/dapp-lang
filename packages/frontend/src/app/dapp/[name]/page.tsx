import { notFound } from "next/navigation";
import Head from "next/head";
import { Dapp } from "@/types/dapp";
import { DAPP_JSON_URL, DOMAIN } from "@/lib/const";
import DappCard from "@/components/feature/DappCard";

interface DappPageProps {
  params: Promise<{ name: string }>;
}

async function fetchDapps(): Promise<Dapp[]> {
  const res = await fetch(DAPP_JSON_URL, {
    next: { revalidate: 86400 },
  });
  return res.ok ? await res.json() : [];
}

export async function generateStaticParams() {
  const dapps = await fetchDapps();
  return dapps.map((dapp) => ({
    name: dapp.name.toLowerCase().replace(/\s/g, "-"),
  }));
}

export default async function DappPage({ params }: DappPageProps) {
  const dapps = await fetchDapps();
  const { name } = await params;
  const dapp = dapps.find(
    (d) => d.name.toLowerCase().replace(/\s/g, "-") === name
  );

  if (!dapp) {
    notFound();
  }

  return (
    <div>
      <Head>
        <title>{dapp.name} - Dapplang</title>
        <meta
          name="description"
          content={`Explore ${dapp.name}, a ${dapp.function} Dapp on ${dapp.chain}.`}
        />
        <meta
          name="keywords"
          content={`${dapp.name}, ${dapp.function}, ${dapp.chain}, Dapp, blockchain`}
        />
        <meta property="og:title" content={`${dapp.name} - Dapplang`} />
        <meta
          property="og:description"
          content={`Explore ${dapp.name}, a ${dapp.function} Dapp on ${dapp.chain}.`}
        />
        <meta property="og:url" content={`${DOMAIN}/dapp/${name}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: dapp.name,
            url: dapp.link,
            applicationCategory: "Blockchain",
            operatingSystem: dapp.chain,
            description: `${dapp.name} is a ${dapp.function} Dapp on ${dapp.chain}.`,
          })}
        </script>
      </Head>
      <DappCard dapp={dapp} />
    </div>
  );
}
