import { useState } from 'react';
import { StoreClientTopbar } from '@/components/layouts/layout-1/shared/topbar/topbar';
import { addDays, format } from 'date-fns';
import { CalendarDays, Download } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { useBodyClass } from '@/hooks/use-body-class';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Footer } from './footer';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { Toolbar, ToolbarActions, ToolbarHeading } from './toolbar';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function Main({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2025, 0, 20),
    to: addDays(new Date(2025, 0, 20), 20),
  });

  useBodyClass(`
    [--header-height:60px]
    [--sidebar-width:270px]
    bg-zinc-950 dark:bg-background!
  `);

  return (
    <div className="flex grow">
      {isMobile && <Header />}

      <div className="flex flex-col lg:flex-row grow pt-(--header-height) lg:pt-0">
        {!isMobile && <Sidebar />}

        <div className="flex flex-col grow lg:rounded-s-xl bg-background border border-input lg:ms-(--sidebar-width)">
          <div className="flex flex-col grow kt-scrollable-y-auto lg:[scrollbar-width:auto] pt-5">
            <main className="grow" role="content">
            {!pathname.includes('/layout-10') && (
              <Toolbar>
                <ToolbarHeading />

                <ToolbarActions>
                  {pathname.startsWith('/store-client') ? (
                    <StoreClientTopbar />
                  ) : (
                    <>
                      <Button variant="outline" asChild>
                        <Link href={'#'}>
                          <Download />
                          Export
                        </Link>
                      </Button>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button id="date" variant="outline">
                            <CalendarDays />
                            {date?.from ? (
                              date.to ? (
                                <span>
                                  {format(date.from, 'LLL dd, y')} -{' '}
                                  {format(date.to, 'LLL dd, y')}
                                </span>
                              ) : (
                                format(date.from, 'LLL dd, y')
                              )
                            ) : (
                              <span>Pick a date range</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="end">
                          <Calendar
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                          />
                        </PopoverContent>
                      </Popover>
                    </>
                  )}
                  </ToolbarActions>
                </Toolbar>
              )}

              {children}
            </main>

            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};
