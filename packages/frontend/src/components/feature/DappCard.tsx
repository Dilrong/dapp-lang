import { Dapp } from "@/types/dapp";

interface DappCardProps {
  dapp: Dapp;
}

export default function DappCard({ dapp }: DappCardProps) {
  return (
    <div className="container mx-auto p-4 bg-card text-foreground rounded-lg shadow-md">
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
  );
}
