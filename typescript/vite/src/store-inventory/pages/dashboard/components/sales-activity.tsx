import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CircleCheck, CircleStop, CircleEllipsis, CirclePercent } from 'lucide-react';

interface ISalesActivityItem {
  number: string;
  label: string;
  textColor: string;
  text: string;
  icon: React.FC<{ className?: string }>;
}
type ISalesActivityItems = Array<ISalesActivityItem>;

interface ISalesActivityProps {
  items: ISalesActivityItem[];
}

const SalesActivity = () => {
  const items: ISalesActivityItems = [
    { number: '51', label: 'Qty', textColor: 'text-primary', text: 'packed', icon: CircleCheck },
    { number: '40', label: 'Pkgs', textColor: 'text-red-600', text: 'shipped', icon: CircleStop },
    { number: '52', label: 'Pkgs', textColor: 'text-green-600', text: 'delivered', icon: CircleEllipsis },
    { number: '97', label: 'Qty', textColor: 'text-yellow-600', text: 'invoiced', icon: CirclePercent },
  ];
 

  return (
    <Card>
      <CardHeader className='bg-accent/50'>
        <CardTitle>Sales Activity</CardTitle> 
      </CardHeader>
      
      <CardContent className="flex py-5 gap-2"> 
        {items.map((item: ISalesActivityItem, index: number) => (
          <React.Fragment key={index}>
            <div className="grid grid-cols-1 place-content-center flex-1 gap-1 text-center min-w-[120px]">
              <span className={`${item.textColor} text-2xl lg:text-4xl leading-none font-normal`}>
                {item.number}
              </span>
              <span className="text-gray-400 text-sm font-medium mb-3">
                {item.label}
              </span>
              <div className="flex items-center justify-center gap-1 pb-2">
                <item.icon className='size-3.5 text-gray-400 shrink-0' />
                <span className="text-muted-foreground font-medium uppercase text-xs">to by {item.text}</span> 
              </div>
            </div>
            {index < items.length - 1 && <Separator className='bg-gray-300 h-full min-h-25' orientation="vertical" />} 
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
};

export {
  SalesActivity,
  type ISalesActivityItem,
  type ISalesActivityItems,
  type ISalesActivityProps,
};
