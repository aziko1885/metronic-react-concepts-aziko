import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function InventorySummary() {
  return (
    <Card className='h-full'>
      <CardHeader className='bg-accent/50'>
        <CardTitle>Inventory Summary</CardTitle> 
      </CardHeader>
      
      <CardContent className="px-4 pt-6.5 pb-5"> 
        <div className='flex items-center justify-between gap-2'>
          <span className="text-gray-500 text-sm font-normal uppercase">quantity in hand</span>
          <span className="text-dark text-2xl font-medium">12746</span>
        </div>
        <Separator className="my-2.5" />
        <div className='flex items-center justify-between gap-2'>
          <span className="text-gray-500 text-sm font-normal uppercase">quantity to by received</span>
          <span className="text-dark text-2xl font-medium">62</span>
        </div>
      </CardContent>
    </Card>
  );
}