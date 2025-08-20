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
import { toAbsoluteUrl } from '@/lib/helpers';
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

interface IColumnFilterProps<TData, TValue> {
  column: Column<TData, TValue>;
}

export interface IData {
  id: string; 
  productInfo: {
    title: string;
    label: string;
  };
  dateOrder: string;
  qty: number; 
  stock: string;
  status: {
    label: string;
    variant: string;
  };
  arrivalDate: string;
  carrier: string;
  supplier: {
    logo: string;
    name: string;
  } 
}

interface AllStockProps {
  mockData?: IData[];
}

const mockData: IData[] = [
  {
    id: '1',
    productInfo: {
      title: 'Air Max 270 React Eng…',
      label: 'WM-8421',
    },
    dateOrder: '18 Aug, 2025',
    qty: 10,
    stock: '$1100.00',
    status: {
      label: 'Allocated',
      variant: 'success',
    },
    arrivalDate: '18 Aug, 2025',
    supplier: {
      name: 'SwiftStock',
      logo: 'clusterhq.svg',
    },
    carrier: 'FedEx',
  },
  {
    id: '2',
    productInfo: {
      title: 'Trail Runner Z2',
      label: 'UC-3990',
    },
    dateOrder: '17 Aug, 2025',
    qty: 45,
    stock: '$9230.00',
    status: {
      label: 'Allocated',
      variant: 'success',
    },
    arrivalDate: '17 Aug, 2025',
    supplier: {
      name: 'NexaSource',
      logo: 'coinhodler.svg',
    },
    carrier: 'UPS',
  },
  {
    id: '3',
    productInfo: {
      title: 'Urban Flex Knit Low…',
      label: 'KB-8820',
    },
    dateOrder: '15 Aug, 2025',
    qty: 70,
    stock: '$12,970.50 ',
    status: {
      label: 'Allocated',
      variant: 'success',
    },
    arrivalDate: '15 Aug, 2025',
    supplier: {
      name: 'CoreMart',
      logo: 'infography.svg',
    },
    carrier: 'DHL',
  },
  {
    id: '4',
    productInfo: {
      title: 'Blaze Street Classic',
      label: 'LS-1033',
    },
    dateOrder: '14 Aug, 2025',
    qty: 120,
    stock: '$9270.00',
    status: {
      label: 'Picking',
      variant: 'info',
    },
    arrivalDate: '14 Aug, 2025',
    supplier: {
      name: 'StockLab',
      logo: 'clusterhq.svg',
    },
    carrier: 'FedEx',
  },
  {
    id: '5',
    productInfo: {
      title: 'Terra Trekking Max Pro…',
      label: 'WC-5510',
    },
    dateOrder: '13 Aug, 2025',
    qty: 200,
    stock: '$24,940.00',
    status: {
      label: 'Packed',
      variant: 'primary',
    },
    arrivalDate: '13 Aug, 2025',
    supplier: {
      name: 'PrimeStock',
      logo: 'telcoin.svg',
    },
    carrier: 'USPS',
  },
  {
    id: '6',
    productInfo: {
      title: 'Lite Runner Evo',
      label: 'GH-7312',
    },
    dateOrder: '12 Aug, 2025',
    qty: 30,
    stock: '$1,220.00 ',
    status: {
      label: 'In Transit',
      variant: 'warning',
    },
    arrivalDate: '12 Aug, 2025',
    supplier: {
      name: 'NexaSource',
      logo: 'coinhodler.svg',
    },
    carrier: 'UPS',
  },
  {
    id: '7',
    productInfo: {
      title: 'Classic Street Wear 2.0…',
      label: 'UH-2300',
    },
    dateOrder: '11 Aug, 2025',
    qty: 100,
    stock: '$15,900.00 ',
    status: {
      label: 'Packed',
      variant: 'primary',
    },
    arrivalDate: '11 Aug, 2025',
    supplier: {
      name: 'NexaSource',
      logo: 'coinhodler.svg',
    },
    carrier: 'FedEx',
  },
  {
    id: '8',
    productInfo: {
      title: 'Enduro AllTerrain High…',
      label: 'MS-8702',
    },
    dateOrder: '10 Aug, 2025',
    qty: 100,
    stock: '$21000.00',
    status: {
      label: 'Allocated',
      variant: 'success',
    },
    arrivalDate: '10 Aug, 2025',
    supplier: {
      name: 'VeloSource',
      logo: 'equacoin.svg',
    },
    carrier: 'DHL',
  },
  {
    id: '9',
    productInfo: {
      title: 'FlexRun Urban Core',
      label: 'BS-6112',
    },
    dateOrder: '09 Aug, 2025',
    qty: 250,
    stock: '$34,900.00',
    status: {
      label: 'In Transit',
      variant: 'warning',
    },
    arrivalDate: '09 Aug, 2025',
    supplier: {
      name: 'StockLab',
      logo: 'clusterhq.svg',
    },
    carrier: 'UPS',
  },
  {
    id: '10',
    productInfo: {
      title: 'Aero Walk Lite',
      label: 'HC-9031',
    },
    dateOrder: '8 Aug, 2025',
    qty: 30,
    stock: '$2,400.00',
    status: {
      label: 'Picking',
      variant: 'info',
    },
    arrivalDate: '8 Aug, 2025',
    supplier: {
      name: 'SwiftStock',
      logo: 'quickbooks.svg',
    },
    carrier: 'USPS',
  },
];

const InboundStockTable = ({ mockData: propsMockData }: AllStockProps) => {
  const data = propsMockData || mockData;
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'date', desc: true },
  ]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedDateOrder, setSelectedDateOrder] = useState<string[]>([]);
  const [selectedSuppliers, setSelectedSuppliers] = useState<{ name: string; logo: string }[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<IData[]>(data);

  useEffect(() => {
    const filtered = data.filter(row => {
      // Apply supplier filter
      const matchesSupplier = selectedSuppliers.length === 0 || 
        selectedSuppliers.some(s => s.name === row.supplier?.name);
      
      // Apply status filter
      const matchesStatus = selectedStatuses.length === 0 || 
        selectedStatuses.includes(row.status?.label);
      
      // Apply date order filter
      const matchesDateOrder = selectedDateOrder.length === 0 || 
        selectedDateOrder.includes(row.dateOrder);
      
      // Apply search query
      const matchesSearch = !searchQuery || [
        row.productInfo?.title,
        row.productInfo?.label,
        row.id,
        row.carrier,
        row.supplier?.name,
        row.status?.label,
        row.stock,
        row.arrivalDate,
        row.dateOrder
      ].some(field => 
        field?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      return matchesSupplier && matchesStatus && matchesDateOrder && matchesSearch;
    });
    
    setFilteredData(filtered);
  }, [data, selectedSuppliers, selectedStatuses, selectedDateOrder, searchQuery]);

  const handleStatusChange = (isChecked: boolean, status: string) => {
    if (isChecked) {
      setSelectedStatuses(prev => [...prev, status]);
    } else {
      setSelectedStatuses(prev => prev.filter(s => s !== status));
    }
  };

  const handleDateOrderChange = (isChecked: boolean, dateOrder: string) => {
    if (isChecked) {
      setSelectedDateOrder(prev => [...prev, dateOrder]);
    } else {
      setSelectedDateOrder(prev => prev.filter(d => d !== dateOrder));
    }
  };

  const handleSupplierChange = (isChecked: boolean, supplier: { name: string; logo: string }) => {
    if (isChecked) {
      setSelectedSuppliers(prev => [...prev, supplier]);
    } else {
      setSelectedSuppliers(prev => prev.filter(s => s.name !== supplier.name));
    }
  };

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
        size: 50,
        meta: {
          cellClassName: '',
        },
      },
      {
        id: 'productInfo',
        accessorFn: (row) => row.productInfo,
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Product"
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
        id: 'qty',
        accessorFn: (row) => row.qty,
        header: ({ column }) => (
          <DataGridColumnHeader title="QTY" column={column} />
        ),
        cell: (info) => {
          return info.row.original.qty;
        },
        enableSorting: true,
        size: 70,
        meta: {
          cellClassName: 'text-center',
        },
      },
      {
        id: 'stock',
        accessorFn: (row) => row.stock,
        header: ({ column }) => (
          <DataGridColumnHeader title="Stock" column={column} />
        ),
        cell: (info) => {
          return info.row.original.stock;
        },
        enableSorting: true,
        size: 90,
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
            <Badge variant={variant} appearance="light">
              {status.label}
            </Badge>
          )
        },
        enableSorting: true,
        size: 110,
        meta: {
          cellClassName: 'text-center',
        },
      },
      {
        id: 'arrivalDate',
        accessorFn: (row) => row.arrivalDate,
        header: ({ column }) => (
          <DataGridColumnHeader title="Arrival Date" column={column} />
        ),
        cell: (info) => {
          return info.row.original.arrivalDate;
        },
        enableSorting: true,
        size: 120,
        meta: {
          cellClassName: '',
        },
      }, 
      {
        id: 'supplier',
        accessorFn: (row) => row.supplier,
        header: ({ column }) => (
          <DataGridColumnHeader title="Supplier" column={column} />
        ),
        cell: (info) => {
          return (
            <div className="flex items-center gap-1.5">
              <img
                src={toAbsoluteUrl(`/media/brand-logos/${info.row.original.supplier.logo}`)}
                className="h-6 rounded-full"
                alt="image"
              />
              <span className="leading-none text-secondary-foreground">
                {info.row.original.supplier.name}
              </span>
            </div> 
          );
        },
        enableSorting: true,
        size: 140,
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
        cell: () => (
          <>
            <div className="text-center">
              <Button 
                size="sm" 
                variant="outline"  
              >
                Show
              </Button>
            </div>
          </>
        ),
        size: 90, 
      }, 
      {
        id: 'actions',
        header: () => '',
        enableSorting: false,
        cell: () => (
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
        ),
        size: 60,
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

  useEffect(() => {
    const filtered = data.filter(row => {
      // Apply supplier filter
      const matchesSupplier = selectedSuppliers.length === 0 || 
        selectedSuppliers.some(s => s.name === row.supplier?.name);
      
      // Apply status filter
      const matchesStatus = selectedStatuses.length === 0 || 
        selectedStatuses.includes(row.status?.label);
      
      // Apply date order filter
      const matchesDateOrder = selectedDateOrder.length === 0 || 
        selectedDateOrder.includes(row.dateOrder);
      
      // Apply search query
      const matchesSearch = !searchQuery || [
        row.productInfo?.title,
        row.productInfo?.label,
        row.id,
        row.carrier,
        row.supplier?.name,
        row.status?.label,
        row.stock,
        row.arrivalDate,
        row.dateOrder
      ].some(field => 
        field?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      return matchesSupplier && matchesStatus && matchesDateOrder && matchesSearch;
    });
    
    setFilteredData(filtered);
  }, [data, selectedSuppliers, selectedStatuses, selectedDateOrder, searchQuery]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      pagination,
      sorting,
      rowSelection
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  const Title = () => {
    const searchInputRef = useRef<HTMLInputElement>(null);

    return (
      <CardTitle className='flex items-center flex-wrap gap-2.5'>
        {/* Search */}
        <div className="relative w-full max-w-[200px]">
          <Search className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            ref={searchInputRef}
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.key === 'Escape') {
                setSearchQuery('');
              }
            }}
            className="pl-9 pr-8 w-full focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
            autoFocus
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
              onClick={() => {
                setSearchQuery('');
                searchInputRef.current?.focus();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        {/* Updated Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button className='text-gray-800' variant="outline">
              2 June - 9 June
              <ChevronDown className="size-5 pt-0.5 -m-0.5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-0" align="start">
            <Command>
              <CommandInput placeholder="Search updated..." />
              <CommandList>
                <CommandEmpty>No updated dates found.</CommandEmpty>
                <CommandGroup>
                  {Array.from(new Set(data.map(row => row.dateOrder))).map((dateOrder) => {
                    const matchesSearch = dateOrder.toLowerCase().includes(searchQuery.toLowerCase());
                    if (!matchesSearch) return null;
                    
                    return (
                      <CommandItem
                        key={dateOrder}
                        value={dateOrder}
                        className="flex items-center gap-2.5 bg-transparent!"
                      >
                        <div className="flex items-center justify-between w-full gap-2">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id={`updated-${dateOrder}`}
                              checked={selectedDateOrder.some(d => d === dateOrder)}
                              onCheckedChange={(checked) => handleDateOrderChange(checked === true, dateOrder)}
                              size="sm"
                            />
                        
                            <span>{dateOrder}</span>
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
            <Button className='text-gray-600'variant="outline">
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

        {/* Supplier Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button className='text-gray-600' variant="outline">
              Supplier
              <ChevronDown className="size-5 pt-0.5 -m-0.5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-0" align="start">
            <Command>
              <CommandInput placeholder="Search supplier..." />
              <CommandList>
                <CommandEmpty>No supplier found.</CommandEmpty>
                <CommandGroup>
                  {Array.from(new Set(data.map(row => row.supplier))).map(supplier => (
                    <CommandItem
                      key={supplier.name}
                      value={supplier.name}
                      className="flex items-center gap-2.5 bg-transparent!"
                    >
                      <Checkbox
                        id={supplier.name}
                        checked={selectedSuppliers.some(s => s.name === supplier.name)}
                        onCheckedChange={(checked) => handleSupplierChange(checked === true, supplier)}
                        size="sm"
                      />
                      <div className="flex items-center gap-1.5">
                        <img 
                          src={toAbsoluteUrl(`/media/brand-logos/${supplier.logo}`)}
                          alt={supplier.name}
                          className="h-4 rounded-full"
                        />
                        <span>{supplier.name}</span>
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
      recordCount={data.length}
      tableLayout={{
        columnsPinnable: true,
        columnsMovable: true,
        columnsVisibility: true,
        cellBorder: true,
      }}
    >
      <Card>
        <CardHeader className='py-3.5'>
          <Title />
          <Button variant="mono">Stock Planner</Button>
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

export { InboundStockTable };
