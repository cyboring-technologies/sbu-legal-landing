import { createNavigation } from 'next-intl/navigation';
import { locales } from './request';

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation({
  locales,
  localePrefix: 'always',
});
