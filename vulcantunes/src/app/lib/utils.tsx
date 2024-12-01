import Link from "next/link";
import Image from "next/image";
import type {IconNavItem, ImageNavItem} from '@/app/lib/definitions';

export const displayNavItems = (NavName: string, NavItems: (IconNavItem|ImageNavItem)[]) => (
  <ul className={NavName}>
    {NavItems.map((NavItem) => (
      <li key={NavItem.name}>
        <Link
          href={NavItem.href}
          aria-label={`${NavItem.name} button`}
          title={NavItem.name}
        >
          {typeof NavItem.icon === 'string' ? (
            <Image
              src={NavItem.icon}
              alt={(NavItem as ImageNavItem).alt}
              width={(NavItem as ImageNavItem).width}
              height={(NavItem as ImageNavItem).height}
            />
          ) : (
            <NavItem.icon
              size={(NavItem as IconNavItem).size}
              aria-hidden="true"
              weight={NavItem.href === window.location.pathname ? 'fill' : 'regular'}
            />
          )}
        </Link>
      </li>
    ))}
  </ul>
);
