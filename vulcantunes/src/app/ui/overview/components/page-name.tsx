'use client'

import { usePathname } from 'next/navigation';

export default function PageName() {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop() || 'Products';
  const formattedSegment = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);

  return (
    <h1 className="page-title">{formattedSegment}</h1>
  );
}