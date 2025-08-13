import { Download, MessageCircleMore, Search } from 'lucide-react';
import { useBodyClass } from '@/hooks/use-body-class';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Footer } from './footer';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { Toolbar, ToolbarActions, ToolbarHeading } from './toolbar';
import { StoreClientTopbar } from '../../layout-1/shared/topbar/topbar';
import { SearchDialog } from '../../layout-1/shared/dialogs/search/search-dialog';
import { ChatSheet } from '../../layout-1/shared/topbar/chat-sheet';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function Main({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const pathname = usePathname();

  // Using the custom hook to set classes on the body
  useBodyClass(`
    [--header-height:60px]
    [--sidebar-width:90px]
    bg-muted!
  `);

  return (
    <div className="flex grow">
      {isMobile && <Header />}

      <div className="flex flex-col lg:flex-row grow pt-(--header-height) lg:pt-0">
        {!isMobile && <Sidebar />}

        <div className="flex flex-col grow rounded-xl bg-background border border-input lg:ms-(--sidebar-width) mt-0 m-4 lg:m-5">
          <div className="flex flex-col grow kt-scrollable-y-auto lg:[scrollbar-width:auto] pt-5">
            <main className="grow" role="content">
            {!pathname.includes('/layout-8') && (
              <Toolbar>
                <ToolbarHeading />

                <ToolbarActions>
                  <>
                    {pathname.startsWith('#') ? (
                      <StoreClientTopbar />
                    ) : (
                      <>
                        <SearchDialog
                          trigger={
                            <Button
                              variant="ghost"
                              mode="icon"
                              className="hover:[&_svg]:text-primary"
                            >
                              <Search className="size-4.5!" />
                            </Button>
                          }
                        />
                        <ChatSheet
                          trigger={
                            <Button
                              variant="ghost"
                              mode="icon"
                              className="hover:[&_svg]:text-primary"
                            >
                              <MessageCircleMore className="size-4.5!" />
                            </Button>
                          }
                        />
                        <Button
                          variant="outline"
                          asChild
                          className="ms-2.5 hover:text-primary hover:[&_svg]:text-primary"
                        >
                          <Link href={'#'}>
                            <Download />
                            Export
                          </Link>
                        </Button>
                      </>
                    )}
                  </>
                  </ToolbarActions>
                </Toolbar>
              )}

              {children}
            </main>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}
