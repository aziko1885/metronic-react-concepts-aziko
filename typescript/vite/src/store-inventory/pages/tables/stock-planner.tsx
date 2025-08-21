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
import { PerProductStockSheet } from '../components/per-product-stock-sheet';
import { toAbsoluteUrl } from '@/lib/helpers';
import { DataGrid } from '@/components/ui/data-grid';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { DataGridPagination } from '@/components/ui/data-grid-pagination';
import {
  DataGridTable,
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
} from '@/components/ui/data-grid-table';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import {
  Card,
  CardFooter,
  CardHeader,
  CardTable,
  CardTitle,
} from '@/components/ui/card';
import { Badge, BadgeProps } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';

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
  flow: number;
  reorderIn: {
    days: number;
    date: string;
  };
  reorder: number;
  leadTime: {
    days: number;
    date: string;
  };
  ar: boolean;
}

interface StockPlannerProps {
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
      label: '+29',
      variant: 'success'
    },
    flow: 8.24,
    reorderIn: {
      days: 3,
      date: '16 Aug, 2025',
    },
    reorder: 120,
    leadTime: {
      days: 14,
      date: '27 Aug, 2025',
    },
    ar: true,
  },
  {
    id: '2',
    productInfo: {
      image: '14.png',
      title: 'Trail Runner Z2',
      label: 'UC-3990',
    },
    stock: 12, 
    rsvd: 3,
    tlvl: 250,
    date: {
      label: '-238',
      variant: 'destructive'
    },
    flow: 0.41,
    reorderIn: {
      days: 5,
      date: '18 Aug, 2025',
    },
    reorder: 500,
    leadTime: {
      days: 14,
      date: '27 Aug, 2025',
    },
    ar: false,
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
    flow: 0.31,
    reorderIn: {
      days: 4,
      date: '17 Aug, 2025',
    },
    reorder: 40,
    leadTime: {
      days: 15,
      date: '28 Aug, 2025',
    },
    ar: false,
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
    flow: 0.43,
    reorderIn: {
      days: 3,
      date: '16 Aug, 2025',
    },
    reorder: 100,
    leadTime: {
      days: 19,
      date: '01 Sep, 2025',
    },
    ar: true,
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
    flow: 3.29,
    reorderIn: {
      days: 5,
      date: '18 Aug, 2025',
    },
    reorder: 240,
    leadTime: {
      days: 17,
      date: '30 Aug, 2025',
    },
    ar: false,
  },
  {
    id: '6',
    productInfo: {
      image: '7.png',
      title: 'Lite Runner Evo',
      label: 'GH-7312',
    },
    stock: 33, 
    rsvd: 2,
    tlvl: 30,
    date: {
      label: '+3',
      variant: 'warning'
    },
    flow: 0.36,
    reorderIn: {
      days: 3,
      date: '16 Aug, 2025',
    },
    reorder: 50,
    leadTime: {
      days: 10,
      date: '23 Aug, 2025',
    },
    ar: true,
  },
  {
    id: '7',
    productInfo: {
      image: '9.png',
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
    flow: 0.3,
    reorderIn: {
      days: 4,
      date: '17 Aug, 2025',
    },
    reorder: 30,
    leadTime: {
      days: 17,
      date: '30 Aug, 2025',
    },
    ar: true,
  },
  {
    id: '8',
    productInfo: {
      image: '3.png',
      title: 'Enduro AllTerrain High…',
      label: 'MS-8702',
    },
    stock: 64, 
    rsvd: 9,
    tlvl: 50,
    date: {
      label: '+14',
      variant: 'success'
    },
    flow: 0.15,
    reorderIn: {
      days: 4,
      date: '17 Aug, 2025',
    },
    reorder: 100,
    leadTime: {
      days: 11,
      date: '24 Aug, 2025',
    },
    ar: false,
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
    flow: 16.44,
    reorderIn: {
      days: 3,
      date: '17 Aug, 2025',
    },
    reorder: 100,
    leadTime: {
      days: 15,
      date: '28 Aug, 2025',
    },
    ar: true,
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
    flow: 0.21,
    reorderIn: {
      days: 7,
      date: '20 Aug, 2025',
    },
    reorder: 160,
    leadTime: {
      days: 20,
      date: '02 Sep, 2025',
    },
    ar: true,
  }
];

const StockPlannerTable = ({ mockData: propsMockData }: StockPlannerProps) => {
  const data = propsMockData || mockData;
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [isStockSheetOpen, setIsStockSheetOpen] = useState(false);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'date', desc: true },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Auto-focus the search input when component mounts
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]);
  const [selectedUpdated, setSelectedUpdated] = useState<string[]>([]);

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

  // Apply search, stock levels, and reorder filters
  const filteredData = useMemo(() => {
    let result = [...data];

    // Apply search filter - only search in product title
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((item) =>
        item.productInfo.title.toLowerCase().includes(query),
      );
    }

    // Apply stock level filter
    if (selectedStocks.length > 0) {
      result = result.filter((row) =>
        selectedStocks.includes(row.stock.toString())
      );
    }

    // Apply reorder filter
    if (selectedUpdated.length > 0) {
      result = result.filter((row) =>
        selectedUpdated.includes(row.reorder.toString())
      );
    }

    return result;
  }, [data, searchQuery, selectedStocks, selectedUpdated]);

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
        accessorFn: (row) => row.productInfo.title,
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Product Info"
            filter={<ColumnInputFilter column={column} />}
            column={column}
          />
        ),
        cell: (info) => {
          const row = info.row.original;
          return (
            <div className="flex items-center gap-2.5">
              <Card className="flex items-center justify-center rounded-md bg-accent/50 h-[40px] w-[50px] shadow-none shrink-0">
                <img
                  src={toAbsoluteUrl(`/media/store/client/600x600/${row.productInfo.image}`)}
                  className="cursor-pointer h-[40px]"
                  alt="image"
                />
              </Card>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-dark leading-3.5">
                  {row.productInfo.title}
                </span>
                <span className="text-xs font-normal text-secondary-foreground uppercase">
                  sku: <span className="text-xs font-medium text-foreground">{row.productInfo.label}</span>
                </span>
              </div>
            </div>
          );
        },
        filterFn: (row, filterValue) => {
          const title = row.original.productInfo.title.toLowerCase();
          const query = (filterValue as string || '').toLowerCase();
          if (!query) return true;
          return title.includes(query);
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
        cell: (info) => (
          <div className="text-center">{info.row.original.stock}</div>
        ),
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
        cell: (info) => (
          <div className="text-center">{info.row.original.rsvd}</div>
        ),
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
        cell: (info) => (
          <div className="text-center">{info.row.original.tlvl}</div>
        ),
        enableSorting: true,
        size: 80,
        meta: {
          cellClassName: '',
        },
      },
      {
        id: 'date',
        accessorFn: (row) => row.date.label,
        header: ({ column }) => (
          <DataGridColumnHeader title="Date" column={column} />
        ),
        cell: (info) => {
          const date = info.row.original.date;
          const variant = date.variant as keyof BadgeProps['variant'];
          return (
            <div className="text-center">
              <Badge variant={variant} appearance="light">
                {date.label}
              </Badge>
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
        id: 'flow',
        accessorFn: (row) => row.flow,
        header: ({ column }) => (
          <DataGridColumnHeader title="Flow" column={column} />
        ),
        cell: (info) => (
          <div className="flex flex-col">
            <span className="text-sm font-normal text-gray-900">{info.row.original.flow}</span>
            <span className="text-xs font-normal text-gray-600">items/day</span>
          </div>
        ),
        enableSorting: true,
        size: 85,
        meta: {
          cellClassName: '',
        },
      },
      {
        id: 'reorderIn',
        accessorFn: (row) => row.reorderIn.days,
        header: ({ column }) => (
          <DataGridColumnHeader title="Reorder In" column={column} />
        ),
        cell: (info) => (
          <div className="flex flex-col">
            <span className="text-sm font-normal text-gray-900">{info.row.original.reorderIn.days} days</span>
            <span className="text-xs font-normal text-gray-600">{info.row.original.reorderIn.date}</span>
          </div>
        ),
        enableSorting: true,
        size: 120,
        meta: {
          cellClassName: '',
        },
      },
      {
        id: 'reorder',
        accessorFn: (row) => row.reorder,
        header: ({ column }) => (
          <DataGridColumnHeader title="Reorder" column={column} />
        ),
        cell: (info) => (
          <div className="text-center">{info.row.original.reorder}</div>
        ),
        enableSorting: true,
        size: 90,
        meta: {
          cellClassName: '',
        },
      },
      {
        id: 'leadTime',
        accessorFn: (row) => row.leadTime.days,
        header: ({ column }) => (
          <DataGridColumnHeader title="Lead Time" column={column} />
        ),
        cell: (info) => (
          <div className="flex flex-col">
            <span className="text-sm font-normal text-gray-900">{info.row.original.leadTime.days} days</span>
            <span className="text-xs font-normal text-gray-600">{info.row.original.leadTime.date}</span>
          </div>
        ),
        enableSorting: true,
        size: 120,
        meta: {
          cellClassName: '',
        },
      },
      {
        id: 'ar',
        accessorFn: (row) => row.ar,
        header: ({ column }) => (
          <DataGridColumnHeader title="Ar" column={column} />
        ),
        cell: (info) => (
          <div className="text-center">
            <Switch id="size-sm" size="sm" checked={info.row.original.ar} />
          </div>
        ),
        enableSorting: true,
        size: 70,
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
    []
  );

  useEffect(() => {
    const selectedRowIds = Object.keys(rowSelection);
    if (selectedRowIds.length > 0) {
      toast(`Total ${selectedRowIds.length} are selected.`, {
        description: `Selected row IDs: ${selectedRowIds.join(', ')}`,
        action: {
          label: 'Undo',
          onClick: () => setRowSelection({}),
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

  // Reset pagination when filters change
  useEffect(() => {
    table.setPageIndex(0);
  }, [searchQuery, selectedStocks, selectedUpdated, table]);

  const Title = () => {
    const handleStockChange = (isChecked: boolean, stock: string) => {
      setSelectedStocks((prev) =>
        isChecked ? [...prev, stock] : prev.filter((s) => s !== stock)
      );
    };

    const handleUpdatedChange = (isChecked: boolean, updated: string) => {
      setSelectedUpdated((prev) =>
        isChecked ? [...prev, updated] : prev.filter((u) => u !== updated)
      );
    };

    return (
      <CardTitle className="flex items-center flex-wrap gap-2.5">
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

        {/* Reorder In Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button className="text-gray-800 font-normal" variant="outline">
            Reorder In: 7 days
              <ChevronDown className="size-5 pt-0.5 -m-0.5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-0" align="start">
            <Command>
              <CommandInput placeholder="Search Reorder In..." />
              <CommandList>
                <CommandEmpty>No Reorder In found.</CommandEmpty>
                <CommandGroup>
                  {Array.from(new Set(data.map((row) => row.reorder))).map(
                    (reorder) => {
                      const reorderObj = data.find(
                        (row) => row.reorder === reorder
                      );
                      const reorderIn = reorderObj?.reorderIn;
                      return (
                        <CommandItem
                          key={reorder}
                          value={reorder.toString()}
                          className="flex items-center gap-2.5 bg-transparent!"
                        >
                          <Checkbox
                            id={reorder.toString()}
                            checked={selectedUpdated.includes(reorder.toString())}
                            onCheckedChange={(checked) =>
                              handleUpdatedChange(checked === true, reorder.toString())
                            }
                            size="sm"
                          />
                          <div className="flex flex-col">
                            <span className="text-sm font-normal text-gray-900">
                              {reorderIn?.days} days
                            </span>
                            <span className="text-xs font-normal text-gray-600">
                              {reorderIn?.date}
                            </span>
                          </div>
                        </CommandItem>
                      );
                    }
                  )}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Stock Level Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button className="text-gray-600 font-normal" variant="outline">
              Stock Level
              <ChevronDown className="size-5 pt-0.5 -m-0.5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-0" align="start">
            <Command>
              <CommandInput placeholder="Search stock levels..." />
              <CommandList>
                <CommandEmpty>No stock levels found.</CommandEmpty>
                <CommandGroup>
                  {Array.from(new Set(data.map((row) => row.stock.toString()))).map(
                    (stock) => (
                      <CommandItem
                        key={stock}
                        value={stock}
                        className="flex items-center gap-2.5 bg-transparent!"
                      >
                        <Checkbox
                          id={stock}
                          checked={selectedStocks.includes(stock)}
                          onCheckedChange={(checked) =>
                            handleStockChange(checked === true, stock)
                          }
                          size="sm"
                        />
                        <span className="text-xs font-medium">{stock}</span>
                      </CommandItem>
                    )
                  )}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </CardTitle>
    );
  };

  return (
    <>
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
          <CardHeader className="py-3.5">
            <Title />
            <Button variant="outline" onClick={() => setIsStockSheetOpen(true)}>
              Reports
            </Button>
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
      <PerProductStockSheet
        open={isStockSheetOpen}
        onOpenChange={setIsStockSheetOpen}
      />
    </>
  );
};

export { StockPlannerTable };
