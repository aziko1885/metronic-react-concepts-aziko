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
    image: string;
    title: string;
    label: string;
  };
  stock: number; 
  rsvd: number;
  tlvl: number;
  date: {
    label: string;
    variant: string;
  };
  sum: string;
  lastMoved: string;
  handler: string;  
  trend: {
    label: string;
    variant: string;
  } 
}

interface CurrentStockProps {
  mockData?: IData[];
}

const mockData: IData[] = [
  {
    id: '1',
    productInfo: {
      image: '11.png',
      title: 'Air Max 270 React Eng…',
      label: 'WM-8421',
    },
    stock: 92, 
    rsvd: 2,
    tlvl: 1,
    date: {
      label: '+28',
      variant: 'success'
    },
    sum: '$4,283.00',
    lastMoved: '18 Aug, 2025',
    handler: 'Jordan M.',
    trend: {
      label: 'Fast Moving',
      variant: 'success'
    },
  },
  {
    id: '2',
    productInfo: {
      image: '1.png',
      title: 'Trail Runner Z2',
      label: 'UC-3990',
    },
    stock: 12, 
    rsvd: 3,
    tlvl: 25,
    date: {
      label: '-238',
      variant: 'destructive'
    },
    sum: '$923.00',
    lastMoved: '17 Aug, 2025',
    handler: 'Alexa R.',
    trend: {
      label: 'Fast Moving',
      variant: 'success'
    },
  },
  {
    id: '3',
    productInfo: {
      image: '2.png',
      title: 'Urban Flex Knit Low…',
      label: 'KB-8820',
    },
    stock: 47, 
    rsvd: 9,
    tlvl: 40,
    date: {
      label: '+7',
      variant: 'success'
    },
    sum: '$1,097.50 ',
    lastMoved: '15 Aug, 2025',
    handler: 'Chris T.',
    trend: {
      label: 'Clearance',
      variant: 'warning'
    },
  },
  {
    id: '4',
    productInfo: {
      image: '15.png',
      title: 'Blaze Street Classic',
      label: 'LS-1033',
    },
    stock: 0, 
    rsvd: 0,
    tlvl: 100,
    date: {
      label: '-100',
      variant: 'destructive'
    },
    sum: '$0.00',
    lastMoved: '14 Aug, 2025',
    handler: 'Dana L.',
    trend: {
      label: 'Slow Moving',
      variant: 'destructive'
    },
  },
  {
    id: '5',
    productInfo: {
      image: '13.png',
      title: 'Terra Trekking Max Pro…',
      label: 'WC-5510',
    },
    stock: 120, 
    rsvd: 24,
    tlvl: 80,
    date: {
      label: '+40',
      variant: 'success'
    },
    sum: '$6,412.75',
    lastMoved: '13 Aug, 2025',
    handler: 'Kevin J.',
    trend: {
      label: 'Seasonal',
      variant: 'info'
    },
  },
  {
    id: '6',
    productInfo: {
      image: '7.png',
      title: 'Lite Runner Evo',
      label: 'GH-7312',
    },
    stock: 33, 
    rsvd: 20,
    tlvl: 30,
    date: {
      label: '+3',
      variant: 'warning'
    },
    sum: '$3,145.20 ',
    lastMoved: '12 Aug, 2025',
    handler: 'Priya S.',
    trend: {
      label: 'Fast Moving',
      variant: 'success'
    },
  },
  {
    id: '7',
    productInfo: {
      image: '10.png',
      title: 'Classic Street Wear 2.0…',
      label: 'UH-2300',
    },
    stock: 5, 
    rsvd: 0,
    tlvl: 10,
    date: {
      label: '-5',
      variant: 'warning'
    },
    sum: '$560.00 ',
    lastMoved: '11 Aug, 2025',
    handler: 'Marcus B.',
    trend: {
      label: 'Promo',
      variant: 'info'
    },
  },
  {
    id: '8',
    productInfo: {
      image: '3.png',
      title: 'Enduro AllTerrain High…',
      label: 'MS-8702',
    },
    stock: 64, 
    rsvd: 90,
    tlvl: 50,
    date: {
      label: '+14',
      variant: 'success'
    },
    sum: '$2,199.00 ',
    lastMoved: '10 Aug, 2025',
    handler: 'Zoe K.',
    trend: {
      label: 'Clearance',
      variant: 'warning'
    },
  },
  {
    id: '9',
    productInfo: {
      image: '8.png',
      title: 'FlexRun Urban Core',
      label: 'BS-6112',
    },
    stock: 89, 
    rsvd: 0,
    tlvl: 70,
    date: {
      label: '+19',
      variant: 'success'
    },
    sum: '$7,009.99',
    lastMoved: '9 Aug, 2025',
    handler: 'Lee A.',
    trend: {
      label: 'Seasonal',
      variant: 'info'
    },
  },
  {
    id: '10',
    productInfo: {
      image: '5.png',
      title: 'Aero Walk Lite',
      label: 'HC-9031',
    },
    stock: 0, 
    rsvd: 0,
    tlvl: 60,
    date: {
      label: '-60',
      variant: 'destructive'
    },
    sum: '$0.00',
    lastMoved: '8 Aug, 2025',
    handler: 'Nina V.',
    trend: {
      label: 'Fast Moving',
      variant: 'success'
    },
  },
];

const CurrentStockTable = ({ mockData: propsMockData }: CurrentStockProps) => {
  const data = propsMockData || mockData;
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'date', desc: true },
  ]);
  const [selectedLastMoved, setSelectedLastMoved] = useState<string[]>([]);
  const [selectedTrends, setSelectedTrends] = useState<string[]>([]);
  const [selectedHandlers, setSelectedHandlers] = useState<string[]>([]);
  const [searchLastMoved, setSearchLastMoved] = useState<string>(''); 
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleTrendChange = (isChecked: boolean, trend: string) => {
    if (isChecked) {
      setSelectedTrends(prev => [...prev, trend]);
    } else {
      setSelectedTrends(prev => prev.filter(t => t !== trend));
    }
  };

  const handleHandlerChange = (isChecked: boolean, handler: string) => {
    if (isChecked) {
      setSelectedHandlers(prev => [...prev, handler]);
    } else {
      setSelectedHandlers(prev => prev.filter(h => h !== handler));
    }
  };

  // Auto-focus the search input when component mounts
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  const handleLastMovedChange = (checked: boolean, lastMoved: string) => {
    if (checked) {
      setSelectedLastMoved(prev => [...prev, lastMoved]);
    } else {
      setSelectedLastMoved(prev => prev.filter(u => u !== lastMoved));
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
        size: 40,
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
            <div className="flex items-center gap-2.5">
              <Card className="flex items-center justify-center rounded-md bg-accent/50 h-[40px] w-[50px] shadow-none shrink-0">
                <img
                  src={toAbsoluteUrl(`/media/store/client/600x600/${productInfo.image}`)}
                  className="cursor-pointer h-[40px]"
                  alt="image"
                />
              </Card>

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
            </div>
          );
        },
        enableSorting: true,
        size: 260,
        meta: {
          cellClassName: '',
        },
      },
      {
        id: 'stock',
        accessorFn: (row) => row.stock,
        header: ({ column }) => (
          <DataGridColumnHeader title="Stock" column={column} />
        ),
        cell: (info) => { 
          return (
            <div className="text-center">
               {info.row.original.stock}
            </div> 
          ); 
        },
        enableSorting: true,
        size: 80,
        meta: {
          cellClassName: '',
        },
      },
      {
        id: 'rsvd',
        accessorFn: (row) => row.rsvd,
        header: ({ column }) => (
          <DataGridColumnHeader title="Rsvd" column={column} />
        ),
        cell: (info) => { 
          return (
            <div className="text-center">
               {info.row.original.rsvd}
            </div> 
          ); 
        },
        enableSorting: true,
        size: 80,
        meta: {
          cellClassName: '',
        },
      },
      {
        id: 'tlvl',
        accessorFn: (row) => row.tlvl,
        header: ({ column }) => (
          <DataGridColumnHeader title="T-Lvl" column={column} />
        ),
        cell: (info) => { 
          return (
            <div className="text-center">
               {info.row.original.tlvl}
            </div> 
          ); 
        },
        enableSorting: true,
        size: 80,
        meta: {
          cellClassName: '',
        },
      },
      {
        id: 'date',
        accessorFn: (row) => row.date,
        header: ({ column }) => (
          <DataGridColumnHeader title="Date" column={column} />
        ),
        cell: (info) => {
          const date = info.row.original.date; 
          const variant = date.variant as keyof BadgeProps['variant'];
          return (
            <Badge variant={variant} appearance="light">
              {date.label}
            </Badge>
          )
        },
        enableSorting: true,
        size: 80,
        meta: {
          cellClassName: 'text-center',
        },
      },
      {
        id: 'sum',
        accessorFn: (row) => row.sum,
        header: ({ column }) => (
          <DataGridColumnHeader title="Sum" column={column} />
        ),
        cell: (info) => { 
          return info.row.original.sum;
        },
        enableSorting: true,
        size: 100,
        meta: {
          cellClassName: '',
        },
      },
      {
        id: 'lastMoved',
        accessorFn: (row) => row.lastMoved,
        header: ({ column }) => (
          <DataGridColumnHeader title="Last Moved" column={column} />
        ),
        cell: (info) => { 
          return info.row.original.lastMoved;
        },
        enableSorting: true,
        size: 120,
        meta: {
          cellClassName: '',
        },
      },
      {
        id: 'handler',
        accessorFn: (row) => row.handler,
        header: ({ column }) => (
          <DataGridColumnHeader title="Handler" column={column} />
        ),
        cell: (info) => {
          return info.row.original.handler;
        },
        enableSorting: true,
        size: 100,
        meta: {
          cellClassName: '',
        },
      },
      {
        id: 'trend',
        accessorFn: (row) => row.trend,
        header: ({ column }) => (
          <DataGridColumnHeader title="Trend" column={column} />
        ),
        cell: (info) => {
          const trend = info.row.original.trend; 
          const variant = trend.variant as keyof BadgeProps['variant'];
          return (
            <Badge variant={variant} appearance="light">
              {trend.label}
            </Badge>
          )
        },
        enableSorting: true,
        size: 130,
        meta: {
          cellClassName: '',
        },
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

  const filteredData = useMemo(() => {
    let result = [...data];
    
    // Apply search filter across multiple fields
    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      if (query) {
        result = result.filter((item) => {
          // Search in multiple fields
          return (
            item.productInfo.title.toLowerCase().includes(query) ||
            item.productInfo.label?.toLowerCase().includes(query) ||
            item.handler?.toLowerCase().includes(query) ||
            item.lastMoved?.toLowerCase().includes(query) ||
            item.trend?.label.toLowerCase().includes(query) ||
            item.sum?.toLowerCase().includes(query) ||
            item.id?.toLowerCase().includes(query)
          );
        });
      }
    }
    
    // Apply other filters
    result = result.filter(row => {
      const matchesLastMoved = selectedLastMoved.length === 0 || selectedLastMoved.includes(row.lastMoved);
      const matchesTrends = selectedTrends.length === 0 || selectedTrends.includes(row.trend.label);
      const matchesHandlers = selectedHandlers.length === 0 || selectedHandlers.includes(row.handler);
      
      return matchesLastMoved && matchesTrends && matchesHandlers;
    });
    
    return result;
  }, [data, searchQuery, selectedLastMoved, selectedTrends, selectedHandlers]);

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
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Auto-focus the search input when component mounts
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
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
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

        {/* Last Moved Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button className='text-gray-800' variant="outline">
              2 June - 9 June
              <ChevronDown className="size-5 pt-0.5 -m-0.5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-0" align="start">
            <Command>
              <CommandInput
                placeholder="Search last moved..."
                value={searchLastMoved}
                onValueChange={(value) => {
                  setSearchLastMoved(value.toLowerCase());
                }}
              />
              <CommandList>
                <CommandEmpty>No Last Moved found.</CommandEmpty>
                <CommandGroup>
                  {Array.from(new Set(data.map(row => row.lastMoved))).filter(lastMoved => 
                    searchLastMoved === '' || lastMoved.toLowerCase().includes(searchLastMoved.toLowerCase())
                  ).map(lastMoved => (
                    <CommandItem
                      key={lastMoved}
                      value={lastMoved}
                      className="flex items-center gap-2.5 bg-transparent!"
                    >
                      <Checkbox
                        id={`lastMoved-${lastMoved}`}
                        checked={selectedLastMoved.some(u => u === lastMoved)}
                        onCheckedChange={(checked: boolean) => handleLastMovedChange(checked, lastMoved)}
                        size="sm"
                      />
                      <span>{lastMoved}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Trends Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button className='text-gray-600' variant="outline">
              Trends
              <ChevronDown className="size-5 pt-0.5 -m-0.5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-0" align="start">
            <Command>
              <CommandInput placeholder="Search trends..." />
              <CommandList>
                <CommandEmpty>No trends found.</CommandEmpty>
                <CommandGroup>
                  {Array.from(new Set(data.map(row => row.trend.label))).map(trendLabel => {
                    const trendObj = data.find(row => row.trend.label === trendLabel);
                    const trend = trendObj?.trend;
                    return (
                      <CommandItem
                        key={trendLabel}
                        value={trendLabel}
                        className="flex items-center gap-2.5 bg-transparent!"
                      >
                        <div className="flex items-center justify-between w-full gap-2">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id={trendLabel}
                              checked={selectedTrends.includes(trendLabel)}
                              onCheckedChange={(checked) => handleTrendChange(checked === true, trendLabel)}
                              size="sm"
                            />
                            <Badge variant={trend?.variant as 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'outline' | 'destructive'} appearance="light">
                              {trend?.label}
                            </Badge>
                          </div>
                          <span className="text-xs font-medium">
                            {data.filter(row => row.trend.label === trendLabel).length}
                          </span>
                        </div>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover> 

        {/* Handler Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button className='text-gray-600' variant="outline">
              Handler
              <ChevronDown className="size-5 pt-0.5 -m-0.5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-0" align="start">
            <Command>
              <CommandInput placeholder="Search handler..." />
              <CommandList>
                <CommandEmpty>No handler found.</CommandEmpty>
                <CommandGroup>
                  {Array.from(new Set(data.map(row => row.handler))).map(handler => (
                    <CommandItem
                      key={handler}
                      value={handler}
                      className="flex items-center gap-2.5 bg-transparent!"
                    >
                      <Checkbox
                        id={handler}
                        checked={selectedHandlers.includes(handler)}
                        onCheckedChange={(checked) => handleHandlerChange(checked === true, handler)}
                        size="sm"
                      />
                      <span>{handler}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </CardTitle>);
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

export { CurrentStockTable };
