import { useEffect, useMemo, useState } from 'react';
import {
  Column,
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  RowSelectionState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { Search, X } from 'lucide-react';
import { toast } from 'sonner';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toAbsoluteUrl } from '@/lib/helpers';
import {
  Card,
  CardFooter,
  CardHeader,
  CardTable,
  CardTitle,
  CardToolbar,
} from '@/components/ui/card';
import { DataGrid, useDataGrid } from '@/components/ui/data-grid';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { DataGridPagination } from '@/components/ui/data-grid-pagination';
import {
  DataGridTable,
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
} from '@/components/ui/data-grid-table';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface IColumnFilterProps<TData, TValue> {
  column: Column<TData, TValue>;
}

interface IData {
  id: string; // Use string for ID
  date: string;
  customer: string;
  orderId: string;
  paymentMethod: string;
  country: ICountry;
  label: string;
  variant: string; 
  amount: string;
}

interface ICountry {
  name: string;
  flag: string;
}

const data: IData[] = [
  {
    id: '1', 
    orderId: '#583920-XT',
    date: '18 Aug, 2025',
    customer: 'Mia Martinez',
    amount: '$83.00',
    paymentMethod: 'Visa',
    country: {
      name: 'Estonia',
      flag: 'estonia.svg',
    }, 
    label: 'Delivered',
    variant: 'success'
  }, 
  {
    id: '2', 
    orderId: '#104761-BQ',
    date: '20 Jan, 2025',
    customer: 'Alice Morgan',
    amount: '$99.00',
    paymentMethod: 'Mastercard',
    country: {
      name: 'India',
      flag: 'india.svg',
    }, 
    label: 'Pending',
    variant: 'warning', 
  }, 
  {
    id: '3', 
    orderId: '#847305-ZR',
    date: '19 Feb, 2025',
    customer: 'Noah Garcia',
    amount: '$120.00',
    paymentMethod: 'iDeal',
    country: {
      name: 'Malaysia',
      flag: 'malaysia.svg',
    }, 
    label: 'Delivered',
    variant: 'success', 
  }, 
  {
    id: '4', 
    orderId: '#229176-LK',
    date: '16 Mar, 2025',
    customer: 'Liam Brown',
    amount: '$72.00',
    paymentMethod: 'Paypal',
    country: {
      name: 'Ukraine',
      flag: 'ukraine.svg',
    }, 
    label: 'Cancelled',
    variant: 'destructive', 
  }, 
  {
    id: '5', 
    orderId: '#671452-VN',
    date: '29 Mar, 2025',
    customer: 'Emma Chen',
    amount: '$169.00',
    paymentMethod: 'Mastercard',
    country: {
      name: 'Canada',
      flag: 'canada.svg',
    }, 
    label: 'Delivered',
    variant: 'success', 
  }, 
  {
    id: '6', 
    orderId: '#398274-JY',
    date: '9 Aug, 2025',
    customer: 'Olivia Davis',
    amount: '$110.00',
    paymentMethod: 'iDeal',
    country: {
      name: 'Malaysia',
      flag: 'malaysia.svg',
    }, 
    label: 'Delivered',
    variant: 'success', 
  }, 
  {
    id: '7', 
    orderId: '#750163-DP',
    date: '22 Jul, 2025',
    customer: 'Lucas Anderson',
    amount: '$49.00',
    paymentMethod: 'Mastercard',
    country: {
      name: 'Malaysia',
      flag: 'malaysia.svg',
    }, 
    label: 'Pending',
    variant: 'warning', 
  }, 
  {
    id: '8', 
    orderId: '#912048-MF',
    date: '28 Apr, 2025',
    customer: 'Sophia Patel',
    amount: '$230.00',
    paymentMethod: 'Visa',
    country: {
      name: 'Ukraine',
      flag: 'ukraine.svg',
    }, 
    label: 'Delivered',
    variant: 'success', 
  }, 
  {
    id: '9', 
    orderId: '#336791-TA',
    date: '10 Jan, 2025',
    customer: 'Ethan Wilson',
    amount: '$140.00',
    paymentMethod: 'Visa',
    country: {
      name: 'Canada',
      flag: 'canada.svg',
    }, 
    label: 'Cancelled',
    variant: 'destructive', 
  }, 
  {
    id: '10', 
    orderId: '#508234-WS',
    date: '22 Jul, 2025',
    customer: 'James Liu',
    amount: '$84.00',
    paymentMethod: 'iDeal',
    country: {
      name: 'India',
      flag: 'india.svg',
    }, 
    label: 'Delivered',
    variant: 'success', 
  },  
];

const DashboardTable = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [rowSelection] = useState<RowSelectionState>({});
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'date', desc: true },
  ]);

  const ColumnInputFilter = <TData, TValue>({
    column,
  }: IColumnFilterProps<TData, TValue>) => {
    return (
      <Input
        placeholder="Filter..."
        value={(column.getFilterValue() as string) ?? ''}
        onChange={(event) => column.setFilterValue(event.target.value)}
        variant="sm"
        className="max-w-40"
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
        size: 48,
        meta: {
          cellClassName: '',
        },
      },
      {
        id: 'orderId',
        accessorFn: (row) => row.orderId,
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Order ID"
            filter={<ColumnInputFilter column={column} />}
            column={column}
          />
        ),
        cell: (info) => {
          return info.row.original.orderId;
        },
        enableSorting: true,
        size: 210,
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
          return info.row.original.date;
        },
        enableSorting: true,
        size: 170,
        meta: {
          cellClassName: '',
        },
      },
      {
        id: 'customer',
        accessorFn: (row) => row.customer,
        header: ({ column }) => (
          <DataGridColumnHeader title="Customer" column={column} />
        ),
        cell: (info) => {
          return info.row.original.customer;
        },
        enableSorting: true,
        size: 160,
        meta: {
          cellClassName: '',
        },
      },
      {
        id: 'amount',
        accessorFn: (row) => row.amount,
        header: ({ column }) => (
          <DataGridColumnHeader title="Amount" column={column} />
        ),
        cell: (info) => {
          return info.row.original.amount;
        },
        enableSorting: true,
        size: 160,
        meta: {
          cellClassName: '',
        },
      },
      {
        id: 'paymentMethod',
        accessorFn: (row) => row.paymentMethod,
        header: ({ column }) => (
          <DataGridColumnHeader title="Payment Method" column={column} />
        ),
        cell: (info) => {
          return info.row.original.paymentMethod;
        },
        enableSorting: true,
        size: 160,
        meta: {
          cellClassName: '',
        },
      },
      {
        id: 'country',
        accessorFn: (row) => row.country,
        header: ({ column }) => (
          <DataGridColumnHeader title="Country" column={column} />
        ),
        cell: (info) => {
          return (
            <div className="flex items-center gap-1.5">
              <img
                src={toAbsoluteUrl(`/media/flags/${info.row.original.country.flag}`)}
                className="h-4 rounded-full"
                alt="image"
              />
              <span className="leading-none text-secondary-foreground">
                {info.row.original.country.name}
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
        id: 'label',
        accessorFn: (row) => row.label,
        header: ({ column }) => (
          <DataGridColumnHeader title="Order Status" column={column} />
        ),
        cell: (info) => {
          const variant = info.row.original
            .variant as keyof BadgeProps['variant'];

          return (
            <Badge variant={variant} appearance="light">
              {info.row.original.label}
            </Badge>
          );
        },
        enableSorting: true,
        size: 150,
        meta: {
          cellClassName: '',
        },
      },
      {
        id: 'actions',
        header: () => '',
        enableSorting: false,
        cell: () => {
          return (
            <Button mode="link" underlined="dashed">
              Details
            </Button>
          );
        },
        size: 90,
      },
    ],
    [],
  );

  const filteredData: IData[] = useMemo(() => data, []);

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
    columns,
    data: filteredData,
    pageCount: Math.ceil((filteredData?.length || 0) / pagination.pageSize),
    getRowId: (row: IData) => row.id,
    state: {
      pagination,
      sorting,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const Toolbar = () => {
    const { table } = useDataGrid();
    const [searchQuery, setSearchQuery] = useState('');

    return (
      <CardToolbar>
        {/* Search */}
        <div className="relative">
          <Search className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
          <Input  
            placeholder="Search by ID"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              table.getColumn('id')?.setFilterValue(e.target.value);
            }}
            className="ps-9 w-48"
          />
          {searchQuery !== '' && (
            <Button
              mode="icon"
              variant="ghost"
              className="absolute end-1.5 top-1/2 -translate-y-1/2 h-6 w-6"
              onClick={() => {
                setSearchQuery('');
                table.getColumn('id')?.setFilterValue('');
              }}
            >
              <X />
            </Button>
          )}
        </div>
        <Button variant="outline">
          Export CSV
        </Button> 
      </CardToolbar>
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
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <Toolbar />
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

export { DashboardTable };
