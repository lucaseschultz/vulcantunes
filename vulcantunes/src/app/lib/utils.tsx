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
              width={32}
              height={32}
            />
          ) : (
            <NavItem.icon
              size={24}
              aria-hidden="true"
              weight='regular'
            />
          )}
        </Link>
      </li>
    ))}
  </ul>
)