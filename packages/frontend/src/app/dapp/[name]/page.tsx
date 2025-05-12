import { notFound } from "next/navigation";
import Head from "next/head";
import { Dapp } from "@/types/dapp";
import { DAPP_JSON_URL, DOMAIN } from "@/lib/const";

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
    <>
      <Head>
        <title>{dapp.name} - Dapp-lang</title>
        <meta
          name="description"
          content={`Explore ${dapp.name}, a ${dapp.function} Dapp on ${dapp.chain}.`}
        />
        <meta
          name="keywords"
          content={`${dapp.name}, ${dapp.function}, ${dapp.chain}, Dapp, blockchain`}
        />
        <meta property="og:title" content={`${dapp.name} - Dapp-lang`} />
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
      <div className="container mx-auto p-4 bg-card text-foreground">
        <h1 className="text-3xl font-bold mb-4">{dapp.name}</h1>
        <p>
          <strong>Link:</strong>{" "}
          <a
            href={dapp.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {dapp.link}
          </a>
        </p>
        <p>
          <strong>Chain:</strong> {dapp.chain}
        </p>
        <p>
          <strong>Function:</strong> {dapp.function}
        </p>
      </div>
    </>
  );
}
