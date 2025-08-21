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
import { Separator } from '@/components/ui/separator';
import { ClipboardPenLine, CloudUpload, DollarSign, Plus, Settings, Image, CircleX } from 'lucide-react'; 
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody, 
  TableCell,  
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'; 
import { Link } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input, InputWrapper } from '@/components/ui/input'; 
import { Textarea } from '@/components/ui/textarea';
import { toAbsoluteUrl } from '@/lib/helpers';
import React from 'react';

export function CreateProductSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) { 

const subscriptions1 = [
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

const subscriptions2 = [
  {
    size: '22',
    color: 'White',
    price: '$97.00',
    available: 'Yes',
    onHand: '23' 
  },
  {
    size: '45',
    color: 'White',
    price: '$88.00',
    available: 'Yes',
    onHand: '14' 
  },
  {
    size: '33',
    color: 'Black',
    price: '$54.00',
    available: 'Yes',
    onHand: '18' 
  },
  {
    size: '42',
    color: 'White',
    price: '$23.00',
    available: 'No',
    onHand: '31' 
  },
  {
    size: '25',
    color: 'Red',
    price: '$54.00',
    available: 'Yes',
    onHand: '21' 
  },
  {
    size: '62',
    color: 'Black',
    price: '$23.00',
    available: 'No',
    onHand: '12' 
  },
];

const [progress, setProgress] = React.useState(13);
React.useEffect(() => {
  const timer = setTimeout(() => setProgress(40), 500);
  return () => clearTimeout(timer);
}, []);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="lg:w-[1080px] sm:max-w-none inset-5 start-auto h-auto rounded-lg p-0 [&_[data-slot=sheet-close]]:top-4.5 [&_[data-slot=sheet-close]]:end-5">
        <SheetHeader className="border-b py-3.5 px-5 border-border">
          <SheetTitle>Product Details & Analytics</SheetTitle>
        </SheetHeader>

        <SheetBody className="p-0 -my-4">
          <div className="flex justify-between gap-2 flex-wrap border-b border-border p-5">
            <Select>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Published" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2.5 text-xs text-gray-800 font-medium">
              Read about 
              <Link to="#" className='text-primary'>How to Create Product</Link> 
              <Button variant="outline" className='text-dark'>Cancel</Button>
              <Button variant="mono">Save</Button>
            </div> 
          </div>

          {/* Scroll */}
          <ScrollArea className="h-[calc(100dvh-15.3rem)] px-5 me-1 pb-0">
            <div className='flex flex-wrap lg:flex-nowrap'> 
              <div className='grow space-y-5 mt-5.5'>
                {/* Basic Info */}
                <Card className='rounded-md'>
                  <CardHeader className='min-h-[38px] bg-accent/50'>
                    <CardTitle className='text-2sm'>Basic Info</CardTitle>
                    <CardToolbar>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="auto-update">Featured</Label>
                        <Switch size="sm" id="auto-update" defaultChecked />
                      </div>
                    </CardToolbar>
                  </CardHeader>
                  <CardContent className='pt-4'>
                    <div className="flex flex-col gap-2 mb-3">
                      <Label className="text-xs">Product Name</Label>
                      <Input placeholder="Product Name" /> 
                    </div>
                    <div className='grid grid-cols-2 gap-5 mb-2.5'>
                      <div className="flex flex-col gap-2">
                        <Label className="text-xs">SKU</Label>
                        <Input placeholder="SKU" /> 
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label className="text-xs">Barcode</Label>
                        <Input placeholder="Barcode" /> 
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label className="text-xs">Product Description</Label>
                      <Textarea className='min-h-[100px]' placeholder="Product Description" />
                    </div> 
                  </CardContent>
                </Card> 

                {/* Category & Brand */}
                <Card className='rounded-md'>
                  <CardHeader className='min-h-[38px] bg-accent/50'>
                    <CardTitle className='text-2sm'>Category & Brand</CardTitle>
                  </CardHeader>

                  <CardContent className='pt-4 space-y-3'>
                    <div className='flex flex-col gap-2'>
                      <Label className="text-xs">Product Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Medium Box" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="electronics">Electronics</SelectItem>
                          <SelectItem value="clothing">Clothing</SelectItem>
                          <SelectItem value="furniture">Furniture</SelectItem>
                          <SelectItem value="product-category">Product Category</SelectItem>
                          <SelectItem value="brand">Brand</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className='flex flex-col gap-2'>
                      <Label className="text-xs">Product Brand</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Medium Box" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="apple">Apple</SelectItem>
                          <SelectItem value="samsung">Samsung</SelectItem>
                          <SelectItem value="nike">Nike</SelectItem>
                          <SelectItem value="adidas">Adidas</SelectItem>
                          <SelectItem value="sony">Sony</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card> 

                 {/* Variants */}
                 <Card className="rounded-md lg:mb-5">
                  <Tabs defaultValue="1" className="w-full">
                    <CardHeader className="min-h-[40px] bg-accent/50">
                      <CardTitle className="text-sm">Variants</CardTitle>
                      <TabsList size="xs" className="flex gap-3.5 border-none" variant="line">
                        <TabsTrigger 
                          value="1" 
                          className="flex-1 pb-3 -mb-1.5 data-[state=active]:text-gray-900 text-gray-600 data-[state=active]:border-gray-900 border-b-[1px] hover:text-inherit">
                          Variants
                        </TabsTrigger>
                        <TabsTrigger 
                          value="2" 
                          className="flex-1 pb-3 -mb-1.5 gap-3 data-[state=active]:text-gray-900 text-gray-600 data-[state=active]:border-gray-900 border-b-[1px] hover:text-inherit">
                          Add New
                        </TabsTrigger>
                        <Settings className="size-4 -me-px text-gray-600" />
                      </TabsList>
                    </CardHeader>

                    <CardContent className='lg:p-10 lg:pt-6'>
                      <TabsContent value="1" className='flex flex-col'>
                        <h3 className="text-mono font-medium leading-7">No variants to display</h3>
                        <span className="text-xs font-normal text-gray-700">Set up different options for this product</span>

                        <div className='mt-3.5'>
                          <Button size="sm" variant="primary">
                            <Plus />Add Variant
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="2" className='flex flex-col'>
                        <h3 className="text-mono font-medium leading-7">Add New Variant</h3>
                        <span className="text-xs font-normal text-gray-700">Set up different options for this product</span>

                        <div className='mt-3.5'>
                          <Button size="sm" variant="primary">
                            <Plus />Add Variant
                          </Button>
                        </div>
                      </TabsContent>
                    </CardContent>
                  </Tabs>
                </Card>

                {/* Variants */}
                <Card className="rounded-md lg:mb-5">
                  <Tabs defaultValue="4" className="w-full">
                    <CardHeader className="min-h-[40px] bg-accent/50">
                      <CardTitle className="text-sm">Variants</CardTitle>
                      <TabsList size="xs" className="flex gap-3.5 border-none" variant="line">
                        <TabsTrigger 
                          value="3" 
                          className="flex-1 pb-3 -mb-1.5 data-[state=active]:text-gray-900 text-gray-600 data-[state=active]:border-gray-900 border-b-[1px] hover:text-inherit">
                          Variants
                        </TabsTrigger>
                        <TabsTrigger 
                          value="4" 
                          className="flex-1 pb-3 -mb-1.5 gap-3 data-[state=active]:text-gray-900 text-gray-600 data-[state=active]:border-gray-900 border-b-[1px] hover:text-inherit">
                          Add New
                        </TabsTrigger>
                        <Settings className="size-4 -me-px text-gray-600" />
                      </TabsList>
                       
                    </CardHeader>

                    <CardContent className='pt-1.5 space-y-5'> 
                      <TabsContent value="3" className='space-y-5'>
                        <div className='flex flex-row items-center gap-5'>
                          <div className='flex basis-sm flex-col gap-2'>
                            <Label className="text-xs">Size</Label>
                            <Select>
                              <SelectTrigger className="">
                                <SelectValue placeholder="Size" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="sm">sm</SelectItem>
                                <SelectItem value="md">md</SelectItem>
                                <SelectItem value="lg">lg</SelectItem> 
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className='flex basis-sm flex-col gap-2'>
                            <Label className="text-xs">Color</Label>
                            <Select>
                              <SelectTrigger className="">
                                <SelectValue placeholder="Color" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="red">Red</SelectItem>
                                <SelectItem value="blue">Blue</SelectItem>
                                <SelectItem value="green">Green</SelectItem> 
                              </SelectContent>
                            </Select>
                          </div>

                          <div className='flex basis-3xs flex-col gap-2'>
                            <Label className="text-xs">On Hand</Label>
                            <Input placeholder="Qty" /> 
                          </div>

                          <div className='flex basis-3xs flex-col gap-2'>
                            <Label className="text-xs">Price</Label>
                            <InputWrapper>
                              <Input type="price" value="158" />
                              <DollarSign className='size-5'/>
                            </InputWrapper> 
                          </div>

                          <div className='flex basis-sm flex-col gap-2'>
                            <Label className="text-xs text-transparent">Available</Label>
                            <Select>
                              <SelectTrigger className="">
                                <SelectValue placeholder="Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="allocated">Allocated</SelectItem>
                                <SelectItem value="picking">Picking</SelectItem>
                                <SelectItem value="packed">Packed</SelectItem>
                                <SelectItem value="in-transit">In Transit</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="4" className='space-y-4'>
                        <div className='flex flex-row items-center gap-5'>
                          <div className='flex basis-sm flex-col gap-2'>
                            <Label className="text-xs">Size</Label>
                            <Select>
                              <SelectTrigger className="">
                                <SelectValue placeholder="Size" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="sm">sm</SelectItem>
                                <SelectItem value="md">md</SelectItem>
                                <SelectItem value="lg">lg</SelectItem> 
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className='flex basis-sm flex-col gap-2'>
                            <Label className="text-xs">Color</Label>
                            <Select>
                              <SelectTrigger className="">
                                <SelectValue placeholder="Color" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="red">Red</SelectItem>
                                <SelectItem value="blue">Blue</SelectItem>
                                <SelectItem value="green">Green</SelectItem> 
                              </SelectContent>
                            </Select>
                          </div>

                          <div className='flex basis-3xs flex-col gap-2'>
                            <Label className="text-xs">On Hand</Label>
                            <Input placeholder="Qty" /> 
                          </div>

                          <div className='flex basis-3xs flex-col gap-2'>
                            <Label className="text-xs">Price</Label>
                            <InputWrapper>
                              <Input type="price" value="250" />
                              <DollarSign className='size-5'/>
                            </InputWrapper> 
                          </div>

                          <div className='flex basis-sm flex-col gap-2'>
                            <Label className="text-xs text-transparent">Available</Label>
                            <Select>
                              <SelectTrigger className="">
                                <SelectValue placeholder="Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="allocated">Allocated</SelectItem>
                                <SelectItem value="picking">Picking</SelectItem>
                                <SelectItem value="packed">Packed</SelectItem>
                                <SelectItem value="in-transit">In Transit</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </TabsContent>

                      <div className='flex items-center justify-end gap-2'>
                        <Button variant="outline" className='text-dark'>Cancel</Button>
                        <Button variant="mono">Add Variant</Button>
                      </div>
                    </CardContent>
                  </Tabs>
                </Card>
               
                {/* Variants table */}
                <Card className="rounded-md">
                  <Tabs defaultValue="5" className="w-full">
                    <CardHeader className="min-h-[40px] bg-accent/50">
                      <CardTitle className="text-sm">Variants</CardTitle>
                      <TabsList size="xs" className="flex gap-3.5 border-none" variant="line">
                        <TabsTrigger 
                          value="5" 
                          className="flex-1 pb-3 -mb-1.5 data-[state=active]:text-gray-900 text-gray-600 data-[state=active]:border-gray-900 border-b-[1px] hover:text-inherit">
                          Variants
                        </TabsTrigger>
                        <TabsTrigger 
                          value="6" 
                          className="flex-1 pb-3 -mb-1.5 gap-3 data-[state=active]:text-gray-900 text-gray-600 data-[state=active]:border-gray-900 border-b-[1px] hover:text-inherit">
                          Add New
                        </TabsTrigger>
                        <Settings className="size-4 -me-px text-gray-600" />
                      </TabsList>
                    </CardHeader>

                    <CardContent className='p-0 -mt-2.5'> 
                      <TabsContent value="5">
                        <Table className='scroll-x-auto'>
                          <TableHeader>
                            <TableRow className="text-gray-700 font-normal text-2sm">
                              <TableHead className="min-w-[80px] w-[100px] h-8.5 border-e border-border">Size</TableHead>
                              <TableHead className="min-w-[80px] w-[100px] h-8.5 border-e border-border">Color</TableHead>
                              <TableHead className="min-w-[80px] w-[100px] h-8.5 border-e border-border">Price</TableHead>
                              <TableHead className="min-w-[80px] w-[100px] h-8.5 border-e border-border">Available</TableHead>
                              <TableHead className="min-w-[90px] w-[100px] h-8.5 border-e border-border">On Hand</TableHead>
                              <TableHead className="w-[50px] h-8.5"></TableHead>
                            </TableRow>
                          </TableHeader>

                          <TableBody>
                            {subscriptions1.map((sub, index) => (
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
                      </TabsContent>

                      <TabsContent value="6">
                        <Table className='overflow-x-auto'>
                          <TableHeader>
                            <TableRow className="text-gray-700 font-normal text-2sm">
                              <TableHead className="min-w-[80px] w-[100px] h-8.5 border-e border-border">Size</TableHead>
                              <TableHead className="min-w-[80px] w-[100px] h-8.5 border-e border-border">Color</TableHead>
                              <TableHead className="min-w-[80px] w-[100px] h-8.5 border-e border-border">Price</TableHead>
                              <TableHead className="min-w-[80px] w-[100px] h-8.5 border-e border-border">Available</TableHead>
                              <TableHead className="min-w-[90px] w-[100px] h-8.5 border-e border-border">On Hand</TableHead>
                              <TableHead className="w-[50px] h-8.5"></TableHead>
                            </TableRow>
                          </TableHeader>

                          <TableBody>
                            {subscriptions2.map((sub, index) => (
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
                      </TabsContent> 
                    </CardContent>
                  </Tabs>
                </Card> 
              </div>  

              <Separator className='h-full min-h-[calc(155dvh)] hidden lg:block mx-5' orientation="vertical"></Separator>
              <Separator className='w-full block lg:hidden my-5'></Separator>

              <div className='w-full lg:w-[420px] lg:mt-5 mb-5 space-y-5'>
                <div className='grid grid-flow-col grid-rows-2 gap-2.5'>
                  {[4, 2, 4, 2].map((imgNum, index) => (
                    <Card key={index} className="flex items-center justify-center rounded-md bg-accent/50 shadow-none shrink-0">
                      <img
                        src={toAbsoluteUrl(`/media/store/client/600x600/${imgNum}.png`)}
                        className="h-[120px] shrink-0"
                        alt={`Product view ${index + 1}`}
                      />
                    </Card>
                  ))}
                </div>

                <Card className='border-dashed shadow-none rounded-md'>
                  <CardContent className='text-center'>
                    <div className='flex items-center justify-center size-[32px] rounded-full border border-border mx-auto mb-3'>
                      <CloudUpload  className='size-4'/>
                    </div>
                    <h3 className='text-2sm text-gray-900 font-semibold mb-0.5'>Choose a file or drag & drop here.</h3>
                    <span className='text-xs text-gray-700 font-normal block mb-3'>JPEG, PNG, up to 2 MB.</span>
                    <Button size="sm" variant="mono">Browse File</Button>
                  </CardContent>
                </Card>

                <Card className='shadow-none rounded-md'>
                  <CardContent className='flex items-center gap-2 p-3'>
                    <div className='flex items-center justify-center size-[32px] rounded-md border border-border shrink-0'>
                      <Image className='size-4 text-gray-500'/>
                    </div>
                    <div className='flex flex-col gap-1.5 w-full'>
                      <div className='flex items-center justify-between gap-2.5 w-full'>
                        <div className='flex items-center gap-2.5 -mt-2'>
                          <span className='text-xs text-gray-900 font-medium leading-0'>nike_jordans_2344.PNG</span>
                          <span className='text-2sm text-gray-700 font-normal leading-0'>49 kb</span>
                        </div>
                        <CircleX className='size-3.5 text-gray-400'/>
                      </div>
                      
                      <div className="relative h-1 w-full bg-gray-300 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gray-900 rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Separator className='w-full'></Separator>

                <div className="flex flex-col gap-2.5 mb-2.5">
                  <Label className="text-xs leading-3">Tag</Label>
                  <Input placeholder="Add tags" /> 
                </div>
                <div className="flex items-center gap-2.5">
                  <Badge variant="secondary" appearance="light">
                    Jordans <CircleX className='size-3.5 text-gray-600'/>
                  </Badge>   
                  <Badge variant="secondary" appearance="light">
                    Limited Edition <CircleX className='size-3.5 text-gray-600'/>
                  </Badge>   
                </div>
              </div>  
            </div> 
          </ScrollArea>
        </SheetBody>

        <SheetFooter className="flex-row border-t not-only-of-type:justify-between items-center p-5 border-border gap-2">
          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Published" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>

          <div className='flex items-center gap-2'>
            <Button variant="outline" className='text-dark'>Cancel</Button>
            <Button variant="mono">Save</Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
} 