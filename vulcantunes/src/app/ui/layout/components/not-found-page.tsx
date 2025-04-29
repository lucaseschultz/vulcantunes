'use client';

import Link from 'next/link';
import HeaderLogo from "@/src/app/ui/layout/components/header-logo";
import '../styles/not-found.css';

export default function NotFoundPage() {
  return (
    <div className="not-found-page">
      <HeaderLogo/>
      <div className="not-found-container">
        <h1>Page Not Found</h1>

        <p>Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.</p>
        <p>If you think there's a mistake or issue on our behalf, please let us know
          <Link href="/info#contact-us"> here</Link>.</p>

        <div className="not-found-page-links">
          <Link href="/public" className="not-found-page-link not-found-page-link_primary">
            Return Home
          </Link>

          <Link href="/products" className="not-found-page-link not-found-page-link_secondary">
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
