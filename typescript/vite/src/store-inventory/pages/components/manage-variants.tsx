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
import { Link } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label'; 
import { Input, InputWrapper } from '@/components/ui/input';
import { GripVertical, Minus, Trash2 } from 'lucide-react';

export function ManageVariantsSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) { 
 

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="lg:w-[640px] sm:max-w-none inset-5 start-auto h-auto rounded-lg p-0 [&_[data-slot=sheet-close]]:top-4.5 [&_[data-slot=sheet-close]]:end-5">
        <SheetHeader className="border-b py-3.5 px-5 border-border">
          <SheetTitle>Product Details & Analytics</SheetTitle>
        </SheetHeader>

        <SheetBody className="-mt-2">
          <div className="flex justify-between gap-2 flex-wrap border-b border-border p-5 pt-0">
            <Select>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Active" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2.5 text-xs text-gray-800 font-medium">
              Read about 
              <Link to="#" className='text-primary'>How to Manage Variants</Link> 
              <Button variant="outline" className='text-dark'>Cancel</Button>
              <Button variant="mono">Save</Button>
            </div> 
          </div>

          {/* Scroll */}
          <ScrollArea className="h-[calc(100dvh-19.3rem)] lg:h-[calc(100dvh-17.3rem)] px-5 me-1 pb-0">
            <div className='flex flex-wrap lg:flex-nowrap'> 
              <div className='grow space-y-5 mt-5.5'>
                {/* Option Name */}
                <Card className='rounded-md'>
                  <CardHeader className='min-h-[38px] bg-accent/50'>
                    <CardTitle className='text-2sm flex items-center'>
                      <Button className='-ms-3.5' variant="dim" mode="icon">
                        <GripVertical className='size-4' /> 
                      </Button>
                      <span>Colors</span>
                    </CardTitle>
                    <CardToolbar>
                      <div className="flex items-center -me-2.5">
                        <Button className='-me-1' variant="dim" mode="icon">
                          <Trash2 />
                        </Button>
                        <Button variant="dim" mode="icon">
                          <Minus />
                        </Button>
                      </div>
                    </CardToolbar>
                  </CardHeader>

                  <CardContent className='pt-4'>
                    <div className="flex flex-col gap-2 mb-3">
                      <Label className="text-xs">Option Name</Label>
                      <Input value="Color" /> 
                    </div> 

                    <div className="space-y-2.5 mb-4.5">
                      <Label className="text-xs">Option Value</Label>
                      <div className="flex items-center mt-1">
                        <Button className='-ms-[13px]' variant="dim" mode="icon">
                          <GripVertical className='size-4.5' /> 
                        </Button>
                        <Input value="White" /> 
                        <Button className='-me-2.5 ms-0.5' variant="dim" mode="icon">
                          <Trash2 className='size-4' />
                        </Button>
                      </div> 

                      <div className="flex items-center">
                        <Button className='-ms-[13px]' variant="dim" mode="icon">
                          <GripVertical className='size-4.5' /> 
                        </Button>
                        <Input value="Black" /> 
                        <Button className='-me-2.5 ms-0.5' variant="dim" mode="icon">
                          <Trash2 className='size-4' />
                        </Button>
                      </div> 

                      <div className="flex items-center">
                        <Button className='-ms-[13px]' variant="dim" mode="icon">
                          <GripVertical className='size-4.5' /> 
                        </Button>
                        <Input value="Grey" /> 
                        <Button className='-me-2.5 ms-0.5' variant="dim" mode="icon">
                          <Trash2 className='size-4' />
                        </Button>
                      </div> 

                      <div className="flex items-center">
                        <Button className='-ms-[13px]' variant="dim" mode="icon">
                          <GripVertical className='size-4.5' /> 
                        </Button>
                        <Input value="Green" /> 
                        <Button className='-me-2.5 ms-0.5' variant="dim" mode="icon">
                          <Trash2 className='size-4' />
                        </Button>
                      </div> 
                    </div> 

                    <div className="flex flex-col gap-2 mb-5">
                      <Label className="text-xs">Add New Value</Label>
                      <Input placeholder="Type Value Name and press Enter" /> 
                    </div> 

                    <div className='space-y-5 mb-5'> 
                      <InputWrapper className='bg-accent/50'>
                        <GripVertical className='size-4.5 ms-0.5' /> 
                        <Input type="text" placeholder="Size" />
                        <Trash2 className='size-4.5' />
                        <Minus className='size-4.5 ms-2 me-0.5' />
                      </InputWrapper>

                      <InputWrapper className='bg-accent/50'>
                        <GripVertical className='size-4.5 ms-0.5' /> 
                        <Input type="text" placeholder="Style" />
                        <Trash2 className='size-4.5' />
                        <Minus className='size-4.5 ms-2 me-0.5' />
                      </InputWrapper>

                      <InputWrapper className='bg-accent/50'>
                        <GripVertical className='size-4.5 ms-0.5' /> 
                        <Input type="text" placeholder="Material" />
                        <Trash2 className='size-4.5' />
                        <Minus className='size-4.5 ms-2 me-0.5' />
                      </InputWrapper>
                    </div>

                    <Button variant="outline" className='w-full'>Add New Option</Button>
                  </CardContent>
                </Card>  
              </div>  
            </div> 
          </ScrollArea>
        </SheetBody>

        <SheetFooter className="flex-row border-t not-only-of-type:justify-between items-center p-5 border-border gap-2">
          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Active" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
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