import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { BadgeDot, Badge } from '@/components/ui/badge'; 
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input, InputWrapper} from '@/components/ui/input';
import { Label } from '@/components/ui/label'; 
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';  
import { IData } from '../tables/stock-planner';
import { Switch } from '@/components/ui/switch';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Rating } from '@/components/ui/rating';
 
interface Item {
  label: string;
  info: string;
}

interface PerProductStockProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: IData;
}

export function PerProductStock({
  open,
  onOpenChange,
}: PerProductStockProps) {
  const [items] = useState<Item[]>([
    { label: 'SKU', info: 'SH-001-BLK-42' },
    { label: 'Category', info: 'Sneakers' },
    { label: 'Rating', info: '4' },
    { label: 'Price', info: '$99.00' }, 
  ]);   
  

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:w-[940px] sm:max-w-none inset-5 start-auto h-auto rounded-lg p-0 [&_[data-slot=sheet-close]]:top-4.5 [&_[data-slot=sheet-close]]:end-5">
        <SheetHeader className="border-b py-3.5 px-5 border-border">
          <SheetTitle className="flex items-center gap-2.5">
            Per Product Stock
          </SheetTitle>
        </SheetHeader>

        <SheetBody className="p-0 -my-4">
          <ScrollArea className="h-[calc(100dvh-10.5rem)] px-5 me-1">
            <div className='flex flex-wrap lg:flex-nowrap gap-5'> 
              <div className='grow mt-5'> 
                {/*Cloud Shift*/}
                <div className="flex flex-col gap-2.5 mb-5">
                  <div className="flex flex-col gap-1.5">
                    <span className="lg:text-[22px] font-semibold text-dark">Cloud Shift Lightweight Runner</span>

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

                  <div className="flex items-end flex-wrap justify-between gap-2.5">
                    <div className="flex flex-col gap-2.5">
                      <Label className="text-xs">Current Stock</Label>
                      <Input value="750" /> 
                    </div>
                    <Button variant="outline">Reorder Now</Button> 
                  </div>
                </div>   

                {/* Inventory Rules */}
                <Card className='rounded-md mb-5'>
                  <CardHeader className='min-h-[34px] bg-accent/50'>
                    <CardTitle className='text-2sm'>Inventory Rules</CardTitle>
                    <div className="flex items-center gap-2.5">
                      <Label htmlFor="auto-update" className="text-xs">
                        Auto Reorder
                      </Label>
                      <Switch id="auto-update" defaultChecked size="sm" />
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className='grid grid-cols-2 lg:gap-5 gap-2 lg:mb-7 mb-5'>
                      <div className='flex flex-col gap-2.5'>
                        <Label className="text-xs">Threshold Qty</Label>
                        <Input type="email" placeholder="200" /> 
                      </div>
                      <div className='flex flex-col gap-2.5'>
                        <Label className="text-xs">Safe Stock Qty</Label>
                        <Input type="email" placeholder="320" /> 
                      </div>
                      <div className='flex flex-col gap-2.5'>
                        <Label className="text-xs">Reorder Qty</Label>
                        <Input type="email" placeholder="400" /> 
                      </div>

                      <div className='flex flex-col gap-2.5'>
                        <Label className="text-xs">Lead Time</Label>
                        <InputWrapper>
                          <Input type="email" placeholder="3" />
                          <span className='text-2sm font-normal text-gray-600'>days</span>
                        </InputWrapper>
                      </div>
                    </div>

                    <div className="flex items-center lg:gap-10 gap-5">
                      {[
                        { label: 'Status', value: 'In Stock' },
                        { label: 'Delta', value: '+289' },
                        { label: 'Velocity', value: '0.24 items/day' },
                        { label: 'Next Reorder', value: '14 Sep, 2025' },
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

                {/* Shipping */}
                <Card className="rounded-md lg:mb-5">
                  <Tabs defaultValue="custom" className="w-full">
                    <CardHeader className="min-h-[40px] bg-accent/50">
                      <CardTitle className="text-sm">Shipping</CardTitle>
                      <TabsList size="xs" className="flex gap-3.5 border-none" variant="line">
                        <TabsTrigger 
                          value="custom" 
                          className="flex-1 pb-3 -mb-1.5 data-[state=active]:text-gray-900 text-gray-600 data-[state=active]:border-gray-900 border-b-[1px] hover:text-inherit">
                          Custom Package
                        </TabsTrigger>
                        <TabsTrigger 
                          value="carrier" 
                          className="flex-1 pb-3 -mb-1.5 gap-3 data-[state=active]:text-gray-900 text-gray-600 data-[state=active]:border-gray-900 border-b-[1px] hover:text-inherit">
                          Carrier Package
                        </TabsTrigger>
                      </TabsList>
                    </CardHeader>

                    <CardContent className='pt-1.5'>
                      <TabsContent value="custom" className='space-y-4'>
                        <div className="flex flex-col gap-2.5">
                          <Label className="text-xs">Package Name</Label>
                          <Input value="Mike Anderson – Medium Box|" /> 
                        </div>

                        <div className='grid sm:grid-cols-2 lg:gap-5 gap-2'>
                          <div className='flex flex-col gap-2.5'>
                            <Label className="text-xs">Package Type</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Medium Box" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="small-box">Small Box</SelectItem>
                                <SelectItem value="medium-box">Medium Box</SelectItem>
                                <SelectItem value="large-box">Large Box</SelectItem>
                                <SelectItem value="xlarge-box">Extra Large Box</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className='flex flex-col gap-2.5'>
                            <Label className="text-xs">Total Weight</Label>
                            <InputWrapper>
                              <Input type="email" placeholder="2.1" />
                              <span className='text-2sm font-normal text-gray-600'>kg</span>
                            </InputWrapper>
                          </div>
                        </div>

                        <div className='flex flex-row items-center lg:gap-5 gap-2'>
                          <div className='flex basis-2/4 flex-col gap-2.5'>
                            <Label className="text-xs">Length</Label>
                            <Input type="email" placeholder="48" /> 
                          </div>
                          <div className='flex basis-2/4 flex-col gap-2.5'>
                            <Label className="text-xs">Width</Label>
                            <Input type="email" placeholder="36" /> 
                          </div>
                          <div className='flex basis-2/4 flex-col gap-2.5'>
                            <Label className="text-xs">Height</Label>
                            <Input type="email" placeholder="20" /> 
                          </div>

                          <div className='flex lg:basis-1/4 flex-col gap-2.5'>
                            <Label className="text-xs text-transparent">Height</Label>
                            <Select>
                              <SelectTrigger className="">
                                <SelectValue placeholder="cm" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="sm">sm</SelectItem>
                                <SelectItem value="mm">mm</SelectItem>
                                <SelectItem value="m">m</SelectItem> 
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox checked size="sm"/>
                          <Label>This product ship internationally</Label>
                        </div>
                      </TabsContent>

                      <TabsContent value="carrier" className='space-y-4'>
                        <div className="flex flex-col gap-2.5">
                          <Label className="text-xs">Package Name</Label>
                          <Input value="Mike Anderson – Medium Box|" /> 
                        </div>

                        <div className='grid sm:grid-cols-2 lg:gap-5 gap-2'>
                          <div className='flex flex-col gap-2.5'>
                            <Label className="text-xs">Package Type</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Large Box" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="small-box">Small Box</SelectItem>
                                <SelectItem value="medium-box">Medium Box</SelectItem>
                                <SelectItem value="large-box">Large Box</SelectItem>
                                <SelectItem value="xlarge-box">Extra Large Box</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className='flex flex-col gap-2.5'>
                            <Label className="text-xs">Total Weight</Label>
                            <InputWrapper>
                              <Input type="email" placeholder="1.4" />
                              <span className='text-2sm font-normal text-gray-600'>kg</span>
                            </InputWrapper>
                          </div>
                        </div>

                        <div className='flex flex-row items-center gap-5'>
                          <div className='flex basis-2/4 flex-col gap-2.5'>
                            <Label className="text-xs">Length</Label>
                            <Input type="email" placeholder="34" /> 
                          </div>
                          <div className='flex basis-2/4 flex-col gap-2.5'>
                            <Label className="text-xs">Width</Label>
                            <Input type="email" placeholder="26" /> 
                          </div>
                          <div className='flex basis-2/4 flex-col gap-2.5'>
                            <Label className="text-xs">Height</Label>
                            <Input type="email" placeholder="23" /> 
                          </div>

                          <div className='flex basis-1/4 flex-col gap-2.5'>
                            <Label className="text-xs text-transparent">Height</Label>
                            <Select>
                              <SelectTrigger className="">
                                <SelectValue placeholder="mm" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="sm">sm</SelectItem>
                                <SelectItem value="mm">mm</SelectItem>
                                <SelectItem value="m">m</SelectItem> 
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox size="sm"/>
                          <Label>Save package for future orders</Label>
                        </div>
                      </TabsContent>
                    </CardContent>
                  </Tabs>
                </Card>
              </div>

              <Separator className='h-full min-h-[calc(100dvh-2rem)] hidden lg:block' orientation="vertical"></Separator>
              <Separator className='w-full block lg:hidden'></Separator>

              <div className='w-full lg:w-[320px] lg:mt-5 mb-5'>
                <div className='mb-3'>
                  <Card className="flex items-center justify-center rounded-md bg-accent/50 h-[200px] shadow-none shrink-0">
                    <img
                      src={toAbsoluteUrl(`/media/store/client/600x600/3.png`)}
                      className="cursor-pointer h-[200px]"
                      alt="image"
                    />
                  </Card>
                </div>

                <h3 className='text-dark text-md font-semibold mb-1'>
                  Cloud Shift Lightweight Runner
                </h3>  

                <span className='text-gray-800 text-2sm font-normal leading-4'>
                  Lightweight and stylish, these sneakers offer all-day comfort with breathable mesh.
                </span>  

                <div className='flex flex-col gap-3.5 mt-4.5'>
                  {items.map((item: Item) => (
                    <div key={item.label} className='flex items-center lg:gap-6'>
                      <span className='basis-1/4 text-gray-800 text-2sm font-normal'>{item.label}</span>
                      
                      {item.label === 'Rating' ? (
                        <div className='basis-2/4 flex items-center gap-2'>
                          <Rating rating={parseFloat(item.info)} className="text-2sm" /> 
                        </div>
                      ) : (
                        <span className='basis-2/4 text-gray-800 text-2sm font-medium'>{item.info}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div> 
          </ScrollArea> 
        </SheetBody>

        <SheetFooter className="flex items-center not-only-of-type:justify-between border-t py-5 px-5 border-border gap-2">
          <Button variant="outline">Print Label</Button> 
          <div className='flex items-center gap-2.5'>
            <Button variant="outline">Cancel</Button> 
            <Button variant="mono">Save</Button>
           </div> 
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}  
