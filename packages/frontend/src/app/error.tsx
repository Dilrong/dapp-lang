"use client";

import { useEffect } from "react";
import Link from "next/link";
import Head from "next/head";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Head>
        <title>500 - Server Error | Dapplang</title>
        <meta
          name="description"
          content="Something went wrong on our end. Please try again or return to the homepage."
        />
        <meta name="robots" content="noindex" />
        <meta name="keywords" content="500, server error, Dapplang" />
        <meta property="og:title" content="500 - Server Error | Dapplang" />
        <meta
          property="og:description"
          content="Something went wrong on our end. Please try again or return to the homepage."
        />
        <meta property="og:type" content="website" />
      </Head>
      <div className="min-h-screen flex items-center justify-center text-foreground">
        <div className="text-center max-w-md mx-auto p-8">
          <h1 className="text-6xl font-bold mb-4">500</h1>
          <h2 className="text-2xl font-semibold mb-6">Server Error</h2>
          <p className="text-lg mb-8">
            Something went wrong on our end. We&apos;re working to fix it.
            Please try again later.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-secondary text-secondary-foreground px-6 py-3 rounded-md hover:bg-secondary/80 transition-colors"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
