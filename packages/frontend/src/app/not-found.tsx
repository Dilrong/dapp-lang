import Link from "next/link";
import Head from "next/head";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | Dapplang</title>
        <meta
          name="description"
          content="Sorry, the page you are looking for does not exist. Explore other Dapps or return to the homepage."
        />
        <meta name="robots" content="noindex" />
        <meta name="keywords" content="404, page not found, Dapplang" />
        <meta property="og:title" content="404 - Page Not Found | Dapplang" />
        <meta
          property="og:description"
          content="Sorry, the page you are looking for does not exist. Explore other Dapps or return to the homepage."
        />
        <meta property="og:type" content="website" />
      </Head>
      <div className="min-h-screen flex items-center justify-center text-foreground">
        <div className="text-center max-w-md mx-auto p-8">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
          <p className="text-lg mb-8">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has
            been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/80 transition-colors"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
