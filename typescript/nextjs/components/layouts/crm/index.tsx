
import { LayoutProvider } from './components/layout-context';
import { MAIN_NAV } from '@/app/crm/config/app.config';
import { Layout } from './components/layout';

export function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutProvider sidebarNavItems={MAIN_NAV}>
      <Layout>
        {children}
      </Layout>
    </LayoutProvider>
  );
}
