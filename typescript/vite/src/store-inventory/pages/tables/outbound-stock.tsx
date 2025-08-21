import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Column,
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  RowSelectionState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, EllipsisVertical, Search, Trash, X } from 'lucide-react';
import { toast } from 'sonner'; 
import { Button } from '@/components/ui/button';
import { DataGrid } from '@/components/ui/data-grid';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header'; 
import { DataGridPagination } from '@/components/ui/data-grid-pagination';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import {
  DataGridTable,
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
} from '@/components/ui/data-grid-table';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Card,
  CardFooter,
  CardHeader, 
  CardTable, 
  CardTitle,  
} from '@/components/ui/card';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox'; 
import { TrackShippingSheet } from '../components/track-shipping-sheet';
import { CreateShippingLabelSheet } from '../components/create-shipping-label-sheet';

interface IColumnFilterProps<TData, TValue> {
  column: Column<TData, TValue>;
}

export interface IData {
  notify?: boolean;
  id: string; 
  dateOrder: string;
  productInfo: {
    title: string;
    label: string;
  };
  qty: string; 
  status: {
    label: string;
    variant: string;
  }; 
  expDelivery: string; 
  warehouse: string;
  carrier: string;
}

interface OutboundStockProps {
  mockData?: IData[];
}

const mockData: IData[] = [
  {
    id: '1',
    dateOrder: 'SO-TX-4587',
    productInfo: {
      title: 'Air Max 270 React Eng…',
      label: 'WM-8421',
    },
    qty: '10',
    status: {
      label: 'Allocated',
      variant: 'success'
    },
    expDelivery: '18 Aug, 2025',
    warehouse: 'TX-Hub',
    carrier: 'FedEx',
    notify: true,
  },
  {
    id: '2',
    dateOrder: 'SO-CA-4590',
    productInfo: {
      title: 'Trail Runner Z2',
      label: 'UC-3990',
    },
    qty: '45',
    status: {
      label: 'Shipped',
      variant: 'success'
    },
    expDelivery: '17 Aug, 2025',
    warehouse: 'CA-Stock',
    carrier: 'UPS',
    notify: false,
  },
  {
    id: '3',
    dateOrder: 'SO-NY-4602 ',
    productInfo: {
      title: 'Urban Flex Knit Low…',
      label: 'KB-8820',
    },
    qty: '70',
    status: {
      label: 'Shipped',
      variant: 'success'
    },
    expDelivery: '15 Aug, 2025',
    warehouse: 'AMS-WH',
    carrier: 'DHL',
    notify: false,
  },
  {
    id: '4',
    dateOrder: 'SO-JPN-4611 ',
    productInfo: {
      title: 'Blaze Street Classic',
      label: 'LS-1033',
    },
    qty: '120',
    status: {
      label: 'Picking',
      variant: 'info'
    },
    expDelivery: '14 Aug, 2025',
    warehouse: 'JPN-DC',
    carrier: 'FedEx',
    notify: true,
  },
  {
    id: '5',
    dateOrder: 'SO-AMS-4620',
    productInfo: {
      title: 'Terra Trekking Max Pro…',
      label: 'WC-5510',
    },
    qty: '200',
    status: {
      label: 'Packed',
      variant: 'primary'
    },
    expDelivery: '13 Aug, 2025',
    warehouse: 'SYD-Fulfill',
    carrier: 'USPS',
    notify: true,
  },
  {
    id: '6',
    dateOrder: 'SO-LON-4633',
    productInfo: {
      title: 'Lite Runner Evo',
      label: 'GH-7312',
    },
    qty: '30',
    status: {
      label: 'Cancelled',
      variant: 'destructive'
    },
    expDelivery: '12 Aug, 2025',
    warehouse: 'TOR-INV',
    carrier: 'UPS',
    notify: true,
  },
  {
    id: '7',
    dateOrder: 'SO-SGP-4644',
    productInfo: {
      title: 'Classic Street Wear 2.0…',
      label: 'UH-2300',
    },
    qty: '100',
    status: {
      label: 'Packed',
      variant: 'primary'
    },
    expDelivery: '11 Aug, 2025',
    warehouse: 'NY-Hub',
    carrier: 'FedEx',
    notify: true,
  },
  {
    id: '8',
    dateOrder: 'SO-BER-4652 ',
    productInfo: {
      title: 'Enduro AllTerrain High…',
      label: 'MS-8702',
    },
    qty: '100',
    status: {
      label: 'Delivered',
      variant: 'success'
    },
    expDelivery: '10 Aug, 2025',
    warehouse: 'LON-WH',
    carrier: 'DHL',
    notify: true,
  },
  {
    id: '9',
    dateOrder: 'SO-SYD-4667 ',
    productInfo: {
      title: 'FlexRun Urban Core',
      label: 'BS-6112',
    },
    qty: '250',
    status: {
      label: 'Cancelled',
      variant: 'destructive'
    },
    expDelivery: '09 Aug, 2025',
    warehouse: 'BER-DC',
    carrier: 'UPS',
    notify: true,
  },
  {
    id: '10',
    dateOrder: 'SO-TOR-4675',
    productInfo: {
      title: 'Aero Walk Lite',
      label: 'HC-9031',
    },
    qty: '30',
    status: {
      label: 'Picking',
      variant: 'info'
    },
    expDelivery: '08 Aug, 2025',
    warehouse: 'SGP-Base',
    carrier: 'USPS',
    notify: true,
  },
];

export function OutboundStockTable({ mockData: propsMockData }: OutboundStockProps) {
  const data = propsMockData || mockData;
  const [notifyState, setNotifyState] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Initialize notify state from data
    const initialState: Record<string, boolean> = {};
    data.forEach((item: IData) => {
      initialState[item.id] = Boolean(item.notify); // Convert to boolean
    });
    setNotifyState(initialState);
  }, [data]);

  const handleNotifyChange = (id: string, value: boolean) => {
    setNotifyState(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'date', desc: true },
  ]);
  const [trackShippingSheetOpen, setTrackShippingSheetOpen] = useState(false);
  const [modalData, setModalData] = useState<IData | null>(null);
	const onTrackShippingSheetOpenChange = (open: boolean) => {
		setTrackShippingSheetOpen(open);
		if (!open) {
			setModalData(null);
		}
	};

  const [createShippingSheetOpen, setCreateShippingSheetOpen] = useState(false);
  const [createModalData, setCreateModalData] = useState<IData | null>(null);
	const onCreateShippingSheetOpenChange = (open: boolean) => {
		setCreateShippingSheetOpen(open);
		if (!open) {
			setCreateModalData(null);
		}
	};
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedExpDelivery, setSelectedExpDelivery] = useState<string[]>([]);
  const [searchExpDelivery] = useState('');
  const [selectedCarriers, setSelectedCarriers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<IData[]>(data);
  const searchInputRef = useRef<HTMLInputElement>(null);



  const handleExpDeliveryChange = (isChecked: boolean, expDelivery: string) => {
    if (isChecked) {
      setSelectedExpDelivery(prev => [...prev, expDelivery]);
    } else {
      setSelectedExpDelivery(prev => prev.filter(d => d !== expDelivery));
    }
  };

  const handleCarrierChange = (isChecked: boolean, carrier: string) => {
    if (isChecked) {
      setSelectedCarriers(prev => [...prev, carrier]);
    } else {
      setSelectedCarriers(prev => prev.filter(c => c !== carrier));
    }
  };

  const handleStatusChange = (isSelected: boolean, status: string) => {
    setSelectedStatuses(prev => {
      if (isSelected) {
        return [...prev, status];
      }
      return prev.filter(s => s !== status);
    });
  };
 
  useEffect(() => {
    const filtered = data.filter(row => {
      // Apply search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || 
        (row.productInfo?.title?.toLowerCase().includes(searchLower)) ||
        (row.id?.toLowerCase().includes(searchLower)) ||
        (row.carrier?.toLowerCase().includes(searchLower)) ||
        (row.status?.label?.toLowerCase().includes(searchLower)) ||
        (row.warehouse?.toLowerCase().includes(searchLower));

      // Apply other filters
      const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(row.status.label);
      const matchesExpDelivery = selectedExpDelivery.length === 0 || selectedExpDelivery.includes(row.expDelivery);
      const matchesCarrier = selectedCarriers.length === 0 || selectedCarriers.includes(row.carrier);
      
      return matchesSearch && matchesStatus && matchesExpDelivery && matchesCarrier;
    });
    setFilteredData(filtered);
  }, [data, searchQuery, selectedStatuses, selectedExpDelivery, selectedCarriers]);

  const ColumnInputFilter = <TData, TValue>({
    column,
  }: IColumnFilterProps<TData, TValue>) => {
    return (
      <Input
        placeholder="Filter..."
        value={(column.getFilterValue() as string) ?? ''}
        onChange={(event) => column.setFilterValue(event.target.value)}
        variant="sm"
        className="w-40"
      />
    );
  };

  const columns = useMemo<ColumnDef<IData>[]>(
    () => [
      {
        accessorKey: 'id',
        accessorFn: (row) => row.id,
        header: () => <DataGridTableRowSelectAll />,
        cell: ({ row }) => <DataGridTableRowSelect row={row} />,
        enableSorting: false,
        enableHiding: false,
        enableResizing: false,
        size: 35,
        meta: {
          cellClassName: '',
        },
      },
      {
        id: 'dateOrder',
        accessorFn: (row) => row.dateOrder,
        header: ({ column }) => (
          <DataGridColumnHeader title="Order Date" column={column} />
        ),
        cell: (info) => {
          return info.row.original.dateOrder;
        },
        enableSorting: true,
        size: 120,
        meta: {
          cellClassName: '',
        },
      }, 
      {
        id: 'productInfo',
        accessorFn: (row) => row.productInfo,
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Product Info"
            filter={<ColumnInputFilter column={column} />}
            column={column}
          />
        ),
        cell: (info) => {
          const productInfo = info.row.getValue('productInfo') as { image: string; title: string; label: string };
          return (
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-dark leading-3.5">
                {productInfo.title}
              </span>

              <span className="text-xs font-normal text-secondary-foreground uppercase">
                sku:{' '}
                <span className="text-xs font-medium text-foreground">
                  {productInfo.label}
                </span>
              </span> 
            </div>
          );
        },
        enableSorting: true,
        size: 200,
        meta: {
          cellClassName: '',
        },
      },
      {
        id: 'qty',
        accessorFn: (row) => row.qty,
        header: ({ column }) => (
          <DataGridColumnHeader title="QTY" column={column} />
        ),
        cell: (info) => {
          return <div className="text-center">{info.row.original.qty}</div>;
        },
        enableSorting: true,
        size: 75,
        meta: {
          cellClassName: '',
        },
      },
      {
        id: 'status',
        accessorFn: (row) => row.status,
        header: ({ column }) => (
          <DataGridColumnHeader title="Status" column={column} />
        ),
        cell: (info) => {
          const status = info.row.original.status; 
          const variant = status.variant as keyof BadgeProps['variant'];
          return (
            <div className="text-center">
              <Badge variant={variant} appearance="light">
                {status.label}
              </Badge>
            </div>
          )
        },
        enableSorting: true,
        size: 110,
        meta: {
          cellClassName: '',
        },
      },
      {
        id: 'expDelivery',
        accessorFn: (row) => row.expDelivery,
        header: ({ column }) => (
          <DataGridColumnHeader title="Exp. Delivery" column={column} />
        ),
        cell: (info) => {
          return info.row.original.expDelivery;
        },
        enableSorting: true,
        size: 125,
        meta: {
          cellClassName: '',
        },
      },
      {
        id: 'warehouse',
        accessorFn: (row) => row.warehouse,
        header: ({ column }) => (
          <DataGridColumnHeader title="Warehouse" column={column} />
        ),
        cell: (info) => {
          return info.row.original.warehouse;
        },
        enableSorting: true,
        size: 120,
        meta: {
          cellClassName: '',
        },
      }, 
      {
        id: 'carrier',
        accessorFn: (row) => row.carrier,
        header: ({ column }) => (
          <DataGridColumnHeader title="Carrier" column={column} />
        ),
        cell: (info) => {
          return info.row.original.carrier;
        },
        enableSorting: true,
        size: 90,
        meta: {
          cellClassName: '',
        },
      },
      {
        id: 'tracking', 
        header: ({ column }) => (
          <DataGridColumnHeader title="Tracking" column={column} />
        ),
        enableSorting: true,
        cell: ({ row }) => (
          <>
            <div className="text-center">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => {
                  setModalData(row.original);
                  setTrackShippingSheetOpen(true);
                }}
              >
                Show
              </Button>
            </div>
          </>
        ),
        size: 90, 
      }, 
      {
        id: 'notify', 
        header: ({ column }) => (
          <DataGridColumnHeader title="Notify" column={column} />
        ),
        enableSorting: true,
        cell: (info) => {
          const id = info.row.getValue('id') as string;
          return (
            <div className="flex justify-center">
              <Checkbox
                size="sm"
                id={`notify-${id}`}
                checked={!!notifyState[id]}
                onCheckedChange={(checked) => handleNotifyChange(id, Boolean(checked))}
              />
            </div>
          );
        },
        size: 60, 
      }, 
      {
        id: 'actions',
        header: () => '',
        enableSorting: false,
        cell: () => (
          <div className="text-center">
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="dim" mode="icon" size="sm" className="">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="bottom">
              <DropdownMenuItem variant="destructive">
                <Trash />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        ),
        size: 70,
      },
    ],
    [],
  );

  useEffect(() => {
    const selectedRowIds = Object.keys(rowSelection);

    if (selectedRowIds.length > 0) {
      toast(`Total ${selectedRowIds.length} are selected.`, {
        description: `Selected row IDs: ${selectedRowIds}`,
        action: {
          label: 'Undo',
          onClick: () => console.log('Undo'),
        },
      });
    }
  }, [rowSelection]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      pagination,
      sorting,
      rowSelection,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const Title = () => {
    // Focus the search input when the component mounts
    useEffect(() => {
      searchInputRef.current?.focus();
    }, []);

    return (
      <CardTitle className='flex items-center flex-wrap gap-2.5'>
        {/* Search */}
        <div className="relative w-full max-w-[200px]">
          <Search className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            ref={searchInputRef}
            placeholder="Search product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setSearchQuery('');
                searchInputRef.current?.focus();
              }
            }}
            className="pl-9 pr-8 w-full focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
            autoFocus
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0 hover:bg-transparent"
              onClick={(e) => {
                e.stopPropagation();
                setSearchQuery('');
                searchInputRef.current?.focus();
              }}
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        {/* Expected Delivery Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button className='text-gray-800' variant="outline">
              2 June - 9 June
              <ChevronDown className="size-5 pt-0.5 -m-0.5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-0" align="start">
            <Command>
              <CommandInput placeholder="Search delivery..." />
              <CommandList>
                <CommandEmpty>No expected delivery dates found.</CommandEmpty>
                <CommandGroup>
                  {Array.from(new Set(data.map(row => row.expDelivery))).map((expDelivery) => {
                    const matchesSearch = expDelivery.toLowerCase().includes(searchExpDelivery.toLowerCase());
                    if (!matchesSearch) return null;
                    
                    return (
                      <CommandItem
                        key={expDelivery}
                        value={expDelivery}
                        className="flex items-center gap-2.5 bg-transparent!"
                      >
                        <div className="flex items-center justify-between w-full gap-2">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id={`expDelivery-${expDelivery}`}
                              checked={selectedExpDelivery.some(d => d === expDelivery)}
                              onCheckedChange={(checked) => handleExpDeliveryChange(checked === true, expDelivery)}
                              size="sm"
                            />
                            <span>{expDelivery}</span>
                          </div>
                          
                        </div>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Status Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button className='text-gray-600' variant="outline">
              Status
              <ChevronDown className="size-5 pt-0.5 -m-0.5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-0" align="start">
            <Command>
              <CommandInput placeholder="Search status..." />
              <CommandList>
                <CommandEmpty>No status found.</CommandEmpty>
                <CommandGroup>
                  {Array.from(new Set(data.map(row => row.status?.label))).map(status => (
                    <CommandItem
                      key={status}
                      value={status}
                      className="flex items-center gap-2.5 bg-transparent!"
                      onSelect={() => handleStatusChange(!selectedStatuses.includes(status), status)}
                    >
                      <div className="flex items-center justify-between w-full gap-2">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id={`status-${status}`}
                            checked={selectedStatuses.includes(status)}
                            onCheckedChange={() => handleStatusChange(!selectedStatuses.includes(status), status)}
                            size="sm"
                          />
                          <Badge variant={data.find(row => row.status?.label === status)?.status?.variant as 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'outline' | 'destructive' || 'secondary'} appearance="light">
                            {status}
                          </Badge>
                        </div>
                        <span className="text-xs font-medium">
                          {data.filter(row => row.status?.label === status).length}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Carrier Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button className='text-gray-600' variant="outline">
              Carrier
              <ChevronDown className="size-5 pt-0.5 -m-0.5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-0" align="start">
            <Command>
              <CommandInput placeholder="Search carrier..." />
              <CommandList>
                <CommandEmpty>No carrier found.</CommandEmpty>
                <CommandGroup>
                  {Array.from(new Set(data.map(row => row.carrier))).map(carrier => (
                    <CommandItem
                      key={carrier}
                      value={carrier}
                      className="flex items-center gap-2.5 bg-transparent!"
                      onSelect={() => handleCarrierChange(!selectedCarriers.includes(carrier), carrier)}
                    >
                      <div className="flex items-center justify-between w-full gap-2">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id={`carrier-${carrier}`}
                            checked={selectedCarriers.includes(carrier)}
                            onCheckedChange={() => handleCarrierChange(!selectedCarriers.includes(carrier), carrier)}
                            size="sm"
                          />
                          <span>{carrier}</span>
                        </div> 
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </CardTitle> 
    );
  };

  return (
    <DataGrid
      table={table}
      recordCount={filteredData?.length || 0}
      tableLayout={{
        columnsPinnable: true,
        columnsMovable: true,
        columnsVisibility: true,
        cellBorder: true,
      }}
    > 
      <TrackShippingSheet 
        open={trackShippingSheetOpen}  
        onOpenChange={onTrackShippingSheetOpenChange} 
        data={modalData || mockData[0]}
      />
      <CreateShippingLabelSheet 
        open={createShippingSheetOpen}  
        onOpenChange={onCreateShippingSheetOpenChange} 
        data={createModalData || (mockData.length > 0 ? mockData[0] : undefined)}
      />
      <Card>
        <CardHeader className='py-3.5'>
          <Title />
          <div className='flex items-center gap-2'>
            <Button variant="outline" 
              onClick={() => {
                setCreateModalData(mockData[0]);
                setCreateShippingSheetOpen(true);
              }}>
              Create Shipping Label
              </Button>
            <Button variant="mono">Stock Planner</Button>
          </div>
        </CardHeader>

        <CardTable>
          <ScrollArea>
            <DataGridTable />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardTable>
        <CardFooter>
          <DataGridPagination />
        </CardFooter>
      </Card>
    </DataGrid>
  );
};

