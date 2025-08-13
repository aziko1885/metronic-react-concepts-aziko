import { useState } from 'react';
import { addDays, format } from 'date-fns';
import { CalendarDays, Download } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { useBodyClass } from '@/hooks/use-body-class';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Footer } from './footer';
import { Header } from './header';
import { Toolbar, ToolbarActions, ToolbarHeading } from './toolbar';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function Main({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2025, 0, 20),
    to: addDays(new Date(2025, 0, 20), 20),
  });

  // Using the custom hook to set multiple CSS variables and class properties
  useBodyClass(`
    [--header-height:70px]  
    lg:[--header-height:100px]
    [--header-height-sticky:70px]  
  `);

  return (
    <div className="flex grow flex-col in-data-[header-sticky=on]:pt-(--header-height)">
      <Header />

      <div className="grow" role="content">
        {!pathname.includes('/layout-7') && (
          <Toolbar>
            <ToolbarHeading title="Dashboard" />

            <ToolbarActions>
              <Button variant="outline" asChild>
                <Link href="#">
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
            </ToolbarActions>
          </Toolbar>
        )}
        {children}
      </div>

      <Footer />
    </div>
  );
};
