import { useEffect, useMemo, useState } from 'react';
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
import { EllipsisVertical, Filter, Search, SquarePen, Star, Trash, X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
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
import {
  Card,
  CardFooter,
  CardHeader,
  CardTable,
  CardToolbar,
} from '@/components/ui/card';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DataGridColumnVisibility } from '@/components/ui/data-grid-column-visibility';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  category: string;
  price: string;
  status: {
    label: string;
    variant: string;
  };
  created: string;
  updated: string; 
}

interface ProductListProps {
  mockData?: IData[];
  onRowClick?: (productId: string) => void;
}

const mockData: IData[] = [
  {
    id: '1',
    productInfo: {
      image: '11.png',
      title: 'Air Max 270 React Eng…',
      label: 'WM-8421',
    },
    category: 'Sneakers', 
    price: '$83.00',
    status: {
      label: 'Live',
      variant: 'success'
    },
    created: '18 Aug, 2025',
    updated: '18 Aug, 2025',
  },
  {
    id: '2',
    productInfo: {
      image: '1.png',
      title: 'Trail Runner Z2',
      label: 'UC-3990',
    },
    category: 'Outdoor', 
    price: '$110.00',
    status: {
      label: 'Live',
      variant: 'success'
    },
    created: '17 Aug, 2025',
    updated: '17 Aug, 2025',
  },
  {
    id: '3',
    productInfo: {
      image: '2.png',
      title: 'Urban Flex Knit Low…',
      label: 'KB-8820',
    },
    category: 'Runners', 
    price: '$76.50',
    status: {
      label: 'Draft',
      variant: 'warning'
    },
    created: '15 Aug, 2025',
    updated: '15 Aug, 2025',
  },
  {
    id: '4',
    productInfo: {
      image: '15.png',
      title: 'Blaze Street Classic',
      label: 'LS-1033',
    },
    category: 'Sneakers', 
    price: '$69.99',
    status: {
      label: 'Must Act',
      variant: 'destructive'
    },
    created: '14 Aug, 2025',
    updated: '14 Aug, 2025',
  },
  {
    id: '5',
    productInfo: {
      image: '13.png',
      title: 'Terra Trekking Max Pro…',
      label: 'WC-5510',
    },
    category: 'Outdoor', 
    price: '$129.00',
    status: {
      label: 'Live',
      variant: 'success'
    },
    created: '13 Aug, 2025',
    updated: '13 Aug, 2025',
  },
  {
    id: '6',
    productInfo: {
      image: '7.png',
      title: 'Lite Runner Evo',
      label: 'GH-7312',
    },
    category: 'Sneakers', 
    price: '$59.00',
    status: {
      label: 'Archived',
      variant: 'info'
    },
    created: '12 Aug, 2025',
    updated: '12 Aug, 2025',
  },
  {
    id: '7',
    productInfo: {
      image: '10.png',
      title: 'Classic Street Wear 2.0…',
      label: 'UH-2300',
    },
    category: 'Runners', 
    price: '$72.00',
    status: {
      label: 'Live',
      variant: 'success'
    },
    created: '11 Aug, 2025',
    updated: '11 Aug, 2025',
  },
  {
    id: '8',
    productInfo: {
      image: '3.png',
      title: 'Enduro AllTerrain High…',
      label: 'MS-8702',
    },
    category: 'Sneakers', 
    price: '$119.50',
    status: {
      label: 'Archived',
      variant: 'info'
    },
    created: '10 Aug, 2025',
    updated: '10 Aug, 2025',
  },
  {
    id: '9',
    productInfo: {
      image: '8.png',
      title: 'FlexRun Urban Core',
      label: 'BS-6112',
    },
    category: 'Outdoor', 
    price: '$98.75',
    status: {
      label: 'Draft',
      variant: 'warning'
    },
    created: '9 Aug, 2025',
    updated: '9 Aug, 2025',
  },
  {
    id: '10',
    productInfo: {
      image: '5.png',
      title: 'Aero Walk Lite',
      label: 'HC-9031',
    },
    category: 'Runners', 
    price: '$45.00',
    status: {
      label: 'Live',
      variant: 'success'
    },
    created: '8 Aug, 2025',
    updated: '8 Aug, 2025',
  },
];

export function ProductListTable({ mockData: propsMockData, onRowClick }: ProductListProps) {
  const data = propsMockData || mockData;
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'date', desc: true },
  ]);
  const [selectedLastMoved] = useState<string[]>([]); 

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
          const productInfo = info.row.getValue('productInfo') as {
            image: string;
            title: string;
            label: string;
          };
          return (
            <div className="flex items-center gap-2.5">
              <Card
                className="flex items-center justify-center rounded-md bg-accent/50 h-[40px] w-[50px] shadow-none shrink-0"
              >
                <img
                  src={toAbsoluteUrl(
                    `/media/store/client/600x600/${productInfo.image}`,
                  )}
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
        id: 'category',
        accessorFn: (row) => row.category,
        header: ({ column }) => (
          <DataGridColumnHeader title="Category" column={column} />
        ),
        cell: (info) => {
          return <div className="text-center">{info.row.original.category}</div>;
        },
        enableSorting: true,
        size: 110,
        meta: {
          cellClassName: '',
        },
      },
      {
        id: 'price',
        accessorFn: (row) => row.price,
        header: ({ column }) => (
          <DataGridColumnHeader title="Price" column={column} />
        ),
        cell: (info) => {
          return <div className="text-center">{info.row.original.price}</div>;
        },
        enableSorting: true,
        size: 80,
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
          );
        },
        enableSorting: true,
        size: 80,
        meta: {
          cellClassName: '',
        },
      },
      {
        id: 'rating',
        accessorFn: () => {},
        header: ({ column }) => (
          <DataGridColumnHeader title="Rating" column={column} />
        ),
        cell: () => {
          return (
            <Badge size="sm" variant="warning" appearance="outline">
             <Star className='text-[#FEC524]' fill='#FEC524' />
              5.0
            </Badge>
          );
        },
        enableSorting: true,
        size: 85,
        meta: {
          cellClassName: 'text-center',
        },
      },
      {
        id: 'created',
        accessorFn: (row) => row.created,
        header: ({ column }) => (
          <DataGridColumnHeader title="Created" column={column} />
        ),
        cell: (info) => {
          return info.row.original.created;
        },
        enableSorting: true,
        size: 120,
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
        size: 120,
        meta: {
          cellClassName: '',
        },
      },
      {
        id: 'actions',
        header: () => '',
        enableSorting: false,
        cell: () => (
          <div className="flex items-center gap-2">
            <SquarePen className="text-gray-600 size-4"/>
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
        size: 60,
      },
    ],
    [], // Same columns for all tabs
  );

  // Apply search, tab, and last moved filters
  const filteredData = useMemo(() => {
    let result = [...data];

    // Apply tab filter based on tabs array ids
    if (activeTab === 'all') {
      result = result; // No filter, show all data
    } else if (activeTab === 'live') {
      result = result.filter((item) => item.status.label === 'Live');
    } else if (activeTab === 'draft') {
      result = result.filter((item) => item.status.label === 'Draft');
    } else if (activeTab === 'archived') {
      result = result.filter((item) => item.status.label === 'Archived');
    } else if (activeTab === 'actionNeeded') {
      result = result.filter((item) => item.created > '2023-01-01');
    }

    // Apply search filter - only search in product title
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((item) =>
        item.productInfo.title.toLowerCase().includes(query),
      );
    } 

    return result;
  }, [data, activeTab, searchQuery]);

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

  // Reset pagination when filters change
  useEffect(() => {
    table.setPageIndex(0);
  }, [searchQuery, selectedLastMoved, activeTab]);

  // Reset to first page when filters change
  useEffect(() => {
    setPagination(prev => ({
      ...prev,
      pageIndex: 0
    }));
  }, [activeTab, searchQuery, selectedLastMoved]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      pagination: {
        pageIndex: pagination.pageIndex,
        pageSize: 5  // Fixed 5 items per page
      },
      sorting,
      rowSelection,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: 5
      }
    },
    debugTable: true,
    debugHeaders: true,
    debugColumns: true
  });

  const tabs = [
    { id: 'all', label: 'All', badge: 1424 },
    { id: 'live', label: 'Live', badge: 1267 },
    { id: 'draft', label: 'Draft', badge: 63 },
    { id: 'archived', label: 'Archived', badge: 185 },
    { id: 'actionNeeded', label: 'Action Needed', badge: 49 },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    // Reset to first page when changing tabs
    setPagination(prev => ({
      ...prev,
      pageIndex: 0
    }));
  };

  const Title = () => {
    return (
      <Tabs value={activeTab} onValueChange={handleTabChange} className="m-0 p-0 w-full">
        <TabsList className="h-auto p-0 bg-transparent border-b-0 border-gray-200 rounded-none -ms-[3px] w-full">
          <div className="flex items-center gap-1 min-w-max">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="relative px-2 hover:text-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
              >
                <div className="flex items-center gap-2">
                  {tab.label}
                  <Badge
                    size="sm"
                    appearance="outline"
                    variant={activeTab === tab.id ? 'primary' : 'outline'}
                    className="rounded-full"
                  >
                    {tab.badge}
                  </Badge>
                </div>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-primary -mb-[14px]" />
                )}
              </TabsTrigger>
            ))}
          </div>
        </TabsList>
      </Tabs>
    );
  };

  return (
    <div>
      <Card>
        <CardHeader className="py-3 flex-nowrap">
          <Title />
          <CardToolbar className="flex items-center gap-2">
            {/* Search */}
            <div className="relative w-full max-w-[200px]">
              <Search className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-8 w-full min-w-[120px]"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                  onClick={() => setSearchQuery('')}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Filter */}
            <DataGridColumnVisibility
              table={table}
              trigger={
                <Button variant="outline">
                  <Filter className="size-3.5" />
                  Filters
                </Button>
              }
            />
          </CardToolbar>
        </CardHeader>

        {/* Tab Contents */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {tabs.map((tab) => (
            <TabsContent key={`content-${tab.id}`} value={tab.id} className="mt-0">
              <DataGrid
                table={table}
                recordCount={filteredData?.length || 0}
                onRowClick={onRowClick ? (row: IData) => onRowClick(row.id) : undefined}
                tableLayout={{
                  columnsPinnable: true,
                  columnsMovable: true,
                  columnsVisibility: true,
                  cellBorder: true,
                }}
              >
                <CardTable>
                  <ScrollArea>
                    <DataGridTable />
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </CardTable>
                <CardFooter>
                  <DataGridPagination />
                </CardFooter>
              </DataGrid>
            </TabsContent>
          ))}
        </Tabs>
      </Card>
    </div>
  );
};
