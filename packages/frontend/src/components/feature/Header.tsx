import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-card shadow-sm">
      <div className="container mx-auto p-4">
        <Link href="/">
          <h1 className="text-2xl font-bold text-primary">Dapplang</h1>
        </Link>
      </div>
    </header>
  );
}
