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
import { ChevronDown, EllipsisVertical, Layers,LogIn, LogOut, Search, Trash, X } from 'lucide-react';
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
import { Separator } from '@/components/ui/separator';
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
  stockFlow: {
    number1: number;
    number2: number;
    number3: number;
  }
  date: {
    label: string;
    variant: string;
  };
  price: string; 
  category: string;
  supplier: {
    logo: string;
    name: string;
  }
  updated: string;
}

interface AllStockProps {
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
    stockFlow: {
      number1: 92,
      number2: 30,
      number3: 7,
    },
    date: {
      label: '+29',
      variant: 'success'
    },
    price: '$83.00',
    category: 'Sneakers',
    supplier: {
      name: 'SwiftStock',
      logo: 'clusterhq.svg',
    },
    updated: '18 Aug, 2025',
  },
  {
    id: '2',
    productInfo: {
      image: '1.png',
      title: 'Trail Runner Z2',
      label: 'UC-3990',
    },
    stockFlow: {
      number1: 12,
      number2: 5,
      number3: 2,
    },
    date: {
      label: '-235',
      variant: 'destructive'
    },
    price: '$110.00',
    category: 'Sneakers',
    supplier: {
      name: 'NexaSource',
      logo: 'coinhodler.svg',
    },
    updated: '17 Aug, 2025',
  },
  {
    id: '3',
    productInfo: {
      image: '2.png',
      title: 'Urban Flex Knit Low…',
      label: 'KB-8820',
    },
    stockFlow: {
      number1: 47,
      number2: 15,
      number3: 0,
    },
    date: {
      label: '+8',
      variant: 'success'
    },
    price: '$76.50',
    category: 'Runners',
    supplier: {
      name: 'CoreMart',
      logo: 'infography.svg',
    },
    updated: '15 Aug, 2025',
  },
  {
    id: '4',
    productInfo: {
      image: '15.png',
      title: 'Blaze Street Classic',
      label: 'LS-1033',
    },
    stockFlow: {
      number1: 0,
      number2: 12,
      number3: 5,
    },
    date: {
      label: '-11',
      variant: 'destructive'
    },
    price: '$69.99',
    category: 'Sneakers',
    supplier: {
      name: 'StockLab',
      logo: 'clusterhq.svg',
    },
    updated: '14 Aug, 2025',
  },
  {
    id: '5',
    productInfo: {
      image: '13.png',
      title: 'Terra Trekking Max Pro…',
      label: 'WC-5510',
    },
    stockFlow: {
      number1: 120,
      number2: 20,
      number3: 10,
    },
    date: {
      label: '+45',
      variant: 'success'
    },
    price: '$129.00',
    category: 'Outdoor',
    supplier: {
      name: 'PrimeStock',
      logo: 'telcoin.svg',
    },
    updated: '13 Aug, 2025',
  },
  {
    id: '6',
    productInfo: {
      image: '7.png',
      title: 'Lite Runner Evo',
      label: 'GH-7312',
    },
    stockFlow: {
      number1: 33,
      number2: 8,
      number3: 1,
    },
    date: {
      label: '+3',
      variant: 'wa'
    },
    price: '$59.00',
    category: 'Sneakers',
    supplier: {
      name: 'NexaSource',
      logo: 'coinhodler.svg',
    },
    updated: '12 Aug, 2025',
  },
  {
    id: '7',
    productInfo: {
      image: '10.png',
      title: 'Classic Street Wear 2.0…',
      label: 'UH-2300',
    },
    stockFlow: {
      number1: 5,
      number2: 2,
      number3: 3,
    },
    date: {
      label: '-5',
      variant: 'war'
    },
    price: '$72.00',
    category: 'Runners',
    supplier: {
      name: 'NexaSource',
      logo: 'coinhodler.svg',
    },
    updated: '11 Aug, 2025',
  },
  {
    id: '8',
    productInfo: {
      image: '3.png',
      title: 'Enduro AllTerrain High…',
      label: 'MS-8702',
    },
    stockFlow: {
      number1: 64,
      number2: 10,
      number3: 0,
    },
    date: {
      label: '+12',
      variant: 'success'
    },
    price: '$119.50',
    category: 'Sneakers',
    supplier: {
      name: 'VeloSource',
      logo: 'equacoin.svg',
    },
    updated: '10 Aug, 2025',
  },
  {
    id: '9',
    productInfo: {
      image: '8.png',
      title: 'FlexRun Urban Core',
      label: 'BS-6112',
    },
    stockFlow: {
      number1: 89,
      number2: 25,
      number3: 6,
    },
    date: {
      label: '+19',
      variant: 'success'
    },
    price: '$98.75',
    category: 'Outdoor',
    supplier: {
      name: 'StockLab',
      logo: 'clusterhq.svg',
    },
    updated: '9 Aug, 2025',
  },
  {
    id: '10',
    productInfo: {
      image: '5.png',
      title: 'Aero Walk Lite',
      label: 'HC-9031',
    },
    stockFlow: {
      number1: 0,
      number2: 0,
      number3: 0,
    },
    date: {
      label: '-60',
      variant: 'destructive'
    },
    price: '$45.00',
    category: 'Runners',
    supplier: {
      name: 'SwiftStock',
      logo: 'quickbooks.svg',
    },
    updated: '8 Aug, 2025',
  },
];

const AllStockTable = ({ mockData: propsMockData }: AllStockProps) => {
  const data = propsMockData || mockData;
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'date', desc: true },
  ]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSuppliers, setSelectedSuppliers] = useState<{ name: string; logo: string }[]>([]);
  const [selectedUpdated, setSelectedUpdated] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Auto-focus the search input when component mounts
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);
  const [filteredData, setFilteredData] = useState<IData[]>(data);

  useEffect(() => {
    const filtered = data.filter(row => {
      const matchesUpdated = selectedUpdated.length === 0 || selectedUpdated.includes(row.updated);
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(row.category);
      const matchesSupplier = selectedSuppliers.length === 0 || selectedSuppliers.some(s => s.name === row.supplier.name);
      const matchesSearch = searchQuery === '' || 
        row.productInfo.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesUpdated && matchesCategory && matchesSupplier && matchesSearch;
    });
    setFilteredData(filtered);
  }, [data, selectedUpdated, selectedCategories, selectedSuppliers, searchQuery]);

  const handleCategoryChange = (isChecked: boolean, category: string) => {
    if (isChecked) {
      setSelectedCategories(prev => [...prev, category]);
    } else {
      setSelectedCategories(prev => prev.filter(c => c !== category));
    }
  };

  const handleSupplierChange = (isChecked: boolean, supplier: { name: string; logo: string }) => {
    if (isChecked) {
      setSelectedSuppliers(prev => [...prev, supplier]);
    } else {
      setSelectedSuppliers(prev => prev.filter(s => s.name !== supplier.name));
    }
  };

  const handleUpdatedChange = (checked: boolean, updated: string) => {
    if (checked) {
      setSelectedUpdated(selectedUpdated.includes(updated) ? [] : [updated]);
    } else {
      setSelectedUpdated(prev => prev.filter(u => u !== updated));
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
        size: 270,
        meta: {
          cellClassName: '',
        },
      },
      {
        id: 'stockFlow',
        accessorFn: (row) => row.stockFlow,
        header: ({ column }) => (
          <DataGridColumnHeader title="Stock Flow" column={column} />
        ),
        cell: (info) => {
          const stockFlow = info.row.getValue('stockFlow') as { number1: number; number2: number; number3: number };
          return (
            <div className="flex items-center gap-1.5">
              <Layers className='size-3.5 text-gray-400 shrink-0' /><span className="text-sm font-medium text-gray-900">{stockFlow.number1}</span> 
              <Separator className='h-4 mx-0.5' orientation="vertical" /> 
              <LogIn className='size-3.5 text-gray-400 shrink-0' /><span className="text-sm font-medium text-gray-900">{stockFlow.number2}</span>
              <Separator className='h-4 mx-0.5' orientation="vertical" /> 
              <LogOut className='size-3.5 text-gray-400 shrink-0' /><span className="text-sm font-medium text-gray-900">{stockFlow.number3}</span>
            </div>
          );
        },
        enableSorting: true,
        size: 190,
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
        size: 90,
        meta: {
          cellClassName: 'text-center',
        },
      },
      {
        id: 'price',
        accessorFn: (row) => row.price,
        header: ({ column }) => (
          <DataGridColumnHeader title="Price" column={column} />
        ),
        cell: (info) => {
          return info.row.original.price;
        },
        enableSorting: true,
        size: 90,
        meta: {
          cellClassName: 'text-center',
        },
      },
      {
        id: 'category',
        accessorFn: (row) => row.category,
        header: ({ column }) => (
          <DataGridColumnHeader title="Category" column={column} />
        ),
        cell: (info) => {
          return info.row.original.category;
        },
        enableSorting: true,
        size: 100,
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
        size: 160,
        meta: {
          cellClassName: '',
        },
      },
      {
        id: 'updated',
        accessorFn: (row) => row.updated,
        header: ({ column }) => (
          <DataGridColumnHeader title="Updated" column={column} />
        ),
        cell: (info) => {
          return info.row.original.updated;
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
                  {Array.from(new Set(data.map(row => row.updated))).map((updated) => {
                    const matchesSearch = updated.toLowerCase().includes(searchQuery.toLowerCase());
                    if (!matchesSearch) return null;
                    
                    return (
                      <CommandItem
                        key={updated}
                        value={updated}
                        className="flex items-center gap-2.5 bg-transparent!"
                      >
                        <div className="flex items-center justify-between w-full gap-2">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id={`updated-${updated}`}
                              checked={selectedUpdated.some(d => d === updated)}
                              onCheckedChange={(checked) => handleUpdatedChange(checked === true, updated)}
                              size="sm"
                            />
                        
                            <span>{updated}</span>
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

        {/* Category Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button className='text-gray-600'variant="outline">
              Category
              <ChevronDown className="size-5 pt-0.5 -m-0.5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-0" align="start">
            <Command>
              <CommandInput placeholder="Search category..." />
              <CommandList>
                <CommandEmpty>No category found.</CommandEmpty>
                <CommandGroup>
                  {Array.from(new Set(data.map(row => row.category))).map(category => (
                    <CommandItem
                      key={category}
                      value={category}
                      className="flex items-center gap-2.5 bg-transparent!"
                    >
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => handleCategoryChange(checked === true, category)}
                        size="sm"
                      />
                      <span>{category}</span>
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

export { AllStockTable };
