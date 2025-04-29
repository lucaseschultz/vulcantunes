'use client';

import Link from 'next/link';
import HeaderLogo from "@/src/app/ui/layout/components/header-logo";

export default function NotFoundPage() {
  return (
    <div className="not-found-page">
      <HeaderLogo/>

      <h1>Page Not Found</h1>

      <p>
        Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </p>

      <div className="not-found-page-links">
        <Link href="/public" className="not-found-page-link not-found-page-link_primary">
          Return Home
        </Link>

        <Link href="/products" className="not-found-page-link not-found-page-link_secondary">
          Browse Products
        </Link>
      </div>
    </div>
  );
}
