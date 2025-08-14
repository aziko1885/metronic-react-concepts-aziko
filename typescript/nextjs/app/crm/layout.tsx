'use client';

import { LayoutProvider } from '@/components/layouts/crm/components/layout-context';
import { MAIN_NAV } from '@/app/crm/config/app.config';
import { DefaultLayout } from '@/components/layouts/crm';

export default function CrmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutProvider sidebarNavItems={MAIN_NAV}>
      <DefaultLayout>{children}</DefaultLayout>
    </LayoutProvider>
  );
}
