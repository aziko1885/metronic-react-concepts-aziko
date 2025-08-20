import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle, CardToolbar } from '@/components/ui/card';
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { BadgeDot } from '@/components/ui/badge';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ClipboardPenLine, TrendingUp } from 'lucide-react'; 
import ApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { toAbsoluteUrl } from '@/lib/helpers';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Table,
  TableBody, 
  TableCell,  
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState } from 'react';


export function ProductDetailsAnalyticsSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) { 

const chartOptions: ApexOptions = {
  chart: {
    id: 'my_order_chart',
    toolbar: { show: false },
    zoom: { enabled: false },
    fontFamily: 'Inter, sans-serif',
    foreColor: '#6B7280',
    sparkline: { enabled: false },
  },
  colors: ['#4921EA'],
  dataLabels: { enabled: false },
  stroke: { 
    curve: 'smooth', 
    width: 1,
    lineCap: 'round' 
  },
  xaxis: {
    labels: { show: false },
    axisBorder: { show: false },
    axisTicks: { show: false }
  },
  yaxis: {
    labels: { show: false }
  },
  grid: {
    show: false,
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  },
  tooltip: {
    enabled: false
  },
  fill: {
    type: 'gradient',
    gradient: {
      type: 'vertical',
      inverseColors: true,
      shadeIntensity: 1,
      opacityFrom: 0.4,
      opacityTo: 0,
      stops: [0, 90]
    }
  }
};

// ChartSeries 1
const chartSeries1 = [{
  name: 'Orders',
  data: [30, 38, 35, 42, 40, 45, 55]
}];

// ChartSeries 2
const chartSeries2 = [{
  name: 'Orders',
  data: [28, 50, 36, 42, 38, 45, 50]
}];

// Variants table
const subscriptions = [
  {
    size: '40',
    color: 'White',
    price: '$96.00',
    available: 'Yes',
    onHand: '24' 
  },
  {
    size: '39',
    color: 'White',
    price: '$96.00',
    available: 'Yes',
    onHand: '18' 
  },
  {
    size: '42',
    color: 'Black',
    price: '$96.00',
    available: 'Yes',
    onHand: '12' 
  },
  {
    size: '41',
    color: 'White',
    price: '$96.00',
    available: 'No',
    onHand: '30' 
  },
  {
    size: '44',
    color: 'Red',
    price: '$96.00',
    available: 'Yes',
    onHand: '27' 
  },
  {
    size: '43',
    color: 'Black',
    price: '$96.00',
    available: 'No',
    onHand: '15' 
  },
];

const [selectedImage, setSelectedImage] = useState('3');

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="lg:w-[1080px] sm:max-w-none inset-5 start-auto h-auto rounded-lg p-0 [&_[data-slot=sheet-close]]:top-4.5 [&_[data-slot=sheet-close]]:end-5">
        <SheetHeader className="border-b py-3.5 px-5 border-border">
          <SheetTitle>Product Details & Analytics</SheetTitle>
        </SheetHeader>

        <SheetBody className="p-0 -my-4">
          <div className="flex justify-between gap-2 border-b border-border px-5 py-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2.5">
                <span className="lg:text-[22px] font-semibold text-dark leading-none">Cloud Shift Lightweight Runner</span>
                <Badge size="sm" variant="success" appearance="light">
                  Live
                </Badge>
              </div>
              <div className="flex items-center flex-wrap gap-2 text-2sm">
                <span className="font-normal text-gray-500">SKU</span>
                <span className="font-medium text-dark">WM-8421</span>
                <BadgeDot className='bg-gray-400 size-1' />
                <span className="font-normal text-gray-500">Created</span>
                <span className="font-medium text-dark">16 Jan, 2025</span>
                <BadgeDot className='bg-gray-400 size-1' />
                <span className="font-normal text-gray-500">Last Updated</span>
                <span className="font-medium text-dark">2 days ago</span>
              </div> 
            </div>
            <div className="flex items-center gap-2.5">
              <Button mode="link" className='text-dark me-4'>Customer View</Button>
              <Button variant="outline" className='text-dark'>Remove</Button>
              <Button variant="mono">Edit Product</Button>
            </div> 
          </div>
          <ScrollArea className="h-[calc(100dvh-15.8rem)] px-5 me-1 pb-0">
            <div className='flex flex-wrap lg:flex-nowrap'> 
              <div className='grow space-y-5 mt-5'>
                {/* Inventory */}
                <Card className='rounded-md'>
                  <CardHeader className='min-h-[34px] bg-accent/50'>
                    <CardTitle className='text-2sm'>Inventory</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start lg:gap-10 gap-5">
                      {[
                        { label: 'Status', value: 'In Stock' },
                        { label: 'In Stock', value: '1263' },
                        { label: 'Delta', value: '+289' },
                        { label: 'Velocity', value: '0.24 items/day' },
                        { label: 'Updated By', value: 'Jason Taytum' }
                      ].map((item) => (
                        <div key={item.label} className="flex flex-col gap-1.5">
                          <span className="text-2sm font-normal text-gray-700">
                            {item.label}
                          </span>
                          <span className="text-2sm font-medium text-dark">
                            {item.label === 'Status' ? (
                              <Badge variant="success" appearance="light">
                                {item.value}
                              </Badge>
                            ) : item.label === 'Delta' ? (
                              <Badge variant="success" appearance="light">
                                {item.value}
                              </Badge>
                            ) : item.value}
                          </span>
                        </div>
                      ))} 
                    </div>
                  </CardContent>
                </Card> 

                {/* Analytics */}
                <Card className='rounded-md'>
                  <CardHeader className='min-h-[34px] bg-accent/50'>
                    <CardTitle className='text-2sm'>Analytics</CardTitle>
                  </CardHeader>
                  <CardContent className='grid grid-cols-2 gap-5 lg:gap-7.5 pt-4 pb-0'>
                    <div className="space-y-1">
                      <div className="text-2sm font-normal text-gray-700">Salesprice</div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-lg font-semibold text-mono">$96.23</span>
                        <Badge size="xs" variant="success" appearance="light">
                          <TrendingUp />
                          3.5%
                        </Badge>
                      </div>

                      {/* ApexChart */}
                      <div className="-ms-2 pe-4 -mt-7 -mb-4">
                        <ApexChart 
                          id="my_order_chart_1"
                          options={chartOptions}
                          series={chartSeries1}  // Using chartSeries1 here
                          type="area"
                          height={120}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-2sm font-normal text-gray-700">Sales</div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-lg font-semibold text-mono">6346</span>
                        <Badge size="xs" variant="success" appearance="light">
                          <TrendingUp />
                          18%
                        </Badge>
                        <span className="text-2sm font-normal text-gray-700 ps-2.5">$43,784,02</span>
                      </div>

                      {/* ApexChart */}
                      <div className="-ms-2 pe-4 -mt-7 -mb-4">
                        <ApexChart 
                          id="my_order_chart_2"
                          options={chartOptions}
                          series={chartSeries2}  // Using chartSeries2 here
                          type="area"
                          height={120}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card> 

                {/* Variants table */}
                <Card className='rounded-md'>
                  <CardHeader className='min-h-[34px] bg-accent/50'>
                    <CardTitle className='text-2sm'>Analytics</CardTitle>
                    <CardToolbar>
                      <Button mode="link" className='text-primary'>Manage Variants</Button>
                    </CardToolbar>
                  </CardHeader>

                  <CardContent className='p-0'>
                    <Table className='overflow-x-auto'>
                      <TableHeader>
                        <TableRow className="text-gray-700 font-normal text-2sm">
                          <TableHead className="w-[100px] h-8.5 border-e border-border">Size</TableHead>
                          <TableHead className="w-[100px] h-8.5 border-e border-border">Color</TableHead>
                          <TableHead className="w-[100px] h-8.5 border-e border-border">Price</TableHead>
                          <TableHead className="w-[100px] h-8.5 border-e border-border">Available</TableHead>
                          <TableHead className="w-[100px] h-8.5 border-e border-border">On Hand</TableHead>
                          <TableHead className="w-[50px] h-8.5"></TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {subscriptions.map((sub, index) => (
                          <TableRow 
                            key={sub.size} 
                            className={`text-gray-800 font-normal text-2sm ${index % 2 === 0 ? 'bg-accent/50' : ''}`}
                          >
                            <TableCell className="py-0 border-e border-border">EU {sub.size}</TableCell>
                            <TableCell className='py-0 border-e border-border'>{sub.color}</TableCell>
                            <TableCell className='py-0 border-e border-border'>{sub.price}</TableCell>
                            <TableCell className='py-0 border-e border-border'>{sub.available}</TableCell>
                            <TableCell className='py-0 border-e border-border'>{sub.onHand}</TableCell>
                            <TableCell className="text-center py-0">
                              <Button variant="ghost">
                                <ClipboardPenLine />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody> 
                    </Table>
                    </CardContent>
                </Card> 
              </div>  

              <Separator className='h-full min-h-[calc(100dvh-11.75rem)] hidden lg:block mx-5' orientation="vertical"></Separator>
              <Separator className='w-full block lg:hidden my-5'></Separator>

              <div className='w-full lg:w-[420px] lg:mt-5 mb-5'>
                <div className='mb-3'>
                  <Card className="flex items-center justify-center rounded-md bg-accent/50 shadow-none shrink-0 mb-5">
                    <img
                      src={toAbsoluteUrl(`/media/store/client/600x600/${selectedImage}.png`)}
                      className="h-[250px] shrink-0"
                      alt="Main product image"
                    />
                  </Card>

                  <ToggleGroup
                    className="grid grid-cols-5 gap-4"
                    type="single"
                    value={selectedImage}
                    onValueChange={(newValue) => {
                      if (newValue) setSelectedImage(newValue);
                    }}
                  >
                    {[
                      { id: '1', value: '3', image: '3.png', alt: 'Thumbnail 1' },
                      { id: '2', value: '1', image: '2.png', alt: 'Thumbnail 2' },
                      { id: '3', value: '4', image: '4.png', alt: 'Thumbnail 3' },
                      { id: '4', value: '5', image: '5.png', alt: 'Thumbnail 4' },
                      { id: '5', value: '7', image: '7.png', alt: 'Thumbnail 5' },
                    ].map((item) => (
                      <ToggleGroupItem 
                        key={item.id}
                        value={item.value}
                        className="rounded-md border border-border shrink-0 h-[50px] p-0 bg-accent/50 hover:bg-accent/50 data-[state=on]:border-mono"
                      >
                        <img
                          src={toAbsoluteUrl(`/media/store/client/600x600/${item.image}`)}
                          className="h-[50px] w-[50px] object-cover rounded-md"
                          alt={item.alt}
                        />
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
                <p className='text-2sm font-normal text-gray-800 leading-5'>
                  Lightweight and stylish, these sneakers offer all-day comfort with breathable mesh..
                </p>

                <div>
                  <div className='flex items-center lg:gap-13 gap-5 text-2sm text-gray-800'>
                    <div className='font-normal min-w-[60px]'>Category</div>
                    <div className='font-medium'>Sneakers</div>
                  </div>
                  <div className='flex items-center lg:gap-13 gap-5 text-2sm text-gray-800'>
                    <div className='font-normal min-w-[60px]'>Fit</div>
                    <div className='font-medium'>True to size</div>
                  </div>
                </div>
              </div> 
            </div> 
          </ScrollArea>
        </SheetBody>

        <SheetFooter className="flex-row border-t pb-4 p-5 border-border gap-2 lg:gap-0">
          <Button mode="link" className='text-dark me-4'>Customer View</Button>
          <Button variant="outline" className='text-dark'>Remove</Button>
          <Button variant="mono">Edit Product</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}


