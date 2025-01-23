'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { usePathname } from 'next/navigation';
import type { IconNavItem, ImageNavItem } from './definitions';
import Link from "next/link";
import Image from "next/image";

export async function DisplayNavItems({ NavName, NavItems }: { NavName: string, NavItems: (IconNavItem|ImageNavItem)[] }) {
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

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}