import { useState, useEffect } from 'react'
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import type { IconNavItem, ImageNavItem } from '@/app/lib/definitions';

export function DisplayNavItems({ NavName, NavItems }: { NavName: string, NavItems: (IconNavItem|ImageNavItem)[] }) {
  const pathname = usePathname();

  return (
    <ul className={NavName}>
      {NavItems.map((NavItem) => {
        const isImage = typeof NavItem.icon === 'string';
        return (
          <li key={NavItem.name}>
            <Link
              href={NavItem.href}
              aria-label={`${NavItem.name} button`}
              title={NavItem.name}
            >
              {isImage ? (
                <Image
                  src={NavItem.icon as string}
                  alt={isImage ? (NavItem as ImageNavItem).alt : NavItem.name}
                  width={(NavItem as ImageNavItem).width}
                  height={(NavItem as ImageNavItem).height}
                />
              ) : (
                <NavItem.icon
                  size={(NavItem as IconNavItem).size}
                  aria-hidden="true"
                  weight={NavItem.href === pathname ? 'fill' : 'regular'}
                />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

interface WindowSize {
  width: number
  height: number
}
export function fetchWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}
