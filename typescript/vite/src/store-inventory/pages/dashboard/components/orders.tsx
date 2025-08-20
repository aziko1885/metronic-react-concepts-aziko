import { useState } from 'react'; 
import { ApexOptions } from 'apexcharts'; 
import ApexChart from 'react-apexcharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface IOrdersProps {
  className: string;
}

const Orders = ({ className }: IOrdersProps) => {
  const [activePeriod, setActivePeriod] = useState('14D');

  const getDataForPeriod = (period: string) => {
    switch (period) {
      case '1H':
        return {
          data: [45, 35, 45, 35, 55, 85, 20, 25, 55],
          categories: [
            '00:00',
            '01:00',
            '02:00',
            '03:00',
            '04:00',
            '05:00',
            '06:00',
            '07:00',
            '08:00',
          ],
        };
      case '1D':
        return {
          data: [25, 55, 65, 45, 25, 65, 50, 40, 60],
          categories: [
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat',
            'Sun',
            'Mon',
            'Tue',
          ],
        };
      case '14D':
        return {
          data: [95, 70, 85, 60, 80, 50, 90, 60, 85, 55, 75, 45, 80, 70, 65, 75],
          categories: [
            'Sep 8', 'Sep 9', 'Sep 10', 'Sep 11', 'Sep 12',
            'Sep 13', 'Sep 14', 'Sep 15', 'Sep 16', 'Sep 17',
            'Sep 18', 'Sep 19', 'Sep 20', 'Sep 21', 'Sep 22', 'Sep 23',
          ],
        };
      case '1M':
        return {
          data: [20, 65, 20, 50, 70, 25, 40, 60, 80],
          categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
          ],
        };
      case '3M':
        return {
          data: [45, 35, 45, 35, 55, 85, 20, 25, 55],
          categories: [
            'Q1',
            'Q2',
            'Q3',
            'Q4',
            'Q1',
            'Q2',
            'Q3',
            'Q4',
            'Q1',
          ],
        };
      case '1Y':
        return {
          data: [25, 55, 65, 45, 25, 65, 50, 40, 60],
          categories: [
            '2022',
            '2023',
            '2024',
            '2025',
            '2026',
            '2027',
            '2028',
            '2029',
            '2030',
          ],
        };
      case 'All':
        return {
          data: [80, 40, 50, 20, 50, 80, 60, 20, 30],
          categories: [
            '2020',
            '2021',
            '2022',
            '2023',
            '2024',
            '2025',
            '2026',
            '2027',
            '2028',
          ],
        };
      default:
        return { data: [], categories: [] };
    }
  };

  const { data, categories } = getDataForPeriod(activePeriod);

  const options: ApexOptions = {
    series: [
      {
        name: 'series1',
        data: data,
      },
    ],
    chart: {
      height: 250,
      type: 'area',
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 3,
      colors: ['var(--color-primary)'],
    },
    xaxis: {
      categories: categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        rotate: 0,
        style: {
          colors: 'var(--color-secondary-foreground)',
          fontSize: '12px',
        },
        formatter: activePeriod === '14D' ? function (value: string) {
          const visibleDates = ['Sep 8', 'Sep 13', 'Sep 18', 'Sep 23'];
          return visibleDates.includes(value) ? value : ''
        } : undefined,
      },
      crosshairs: {
        position: 'front',
        stroke: {
          color: 'var(--color-primary)',
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: false,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      min: 0,
      max: 100,
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      custom({ series, seriesIndex, dataPointIndex, w }) {
        const number = parseInt(series[seriesIndex][dataPointIndex]);
        const month = w.globals.seriesX[seriesIndex][dataPointIndex];
        const monthName = categories[month];

        return `
          <div class="flex flex-col gap-2 p-3.5">
            <div class="font-medium text-sm text-secondary-foreground">${monthName}, 2025 Sales</div>
            <div class="flex items-center gap-1.5">
              <div class="font-semibold text-base text-mono">${number}</div>
              <span class="badge badge-outline badge-success badge-xs">+24%</span>
            </div>
          </div>
          `;
      },
    },
    markers: {
      size: 0,
      colors: 'var(--color-primary)',
      strokeColors: 'var(--color-primary)',
      strokeWidth: 4,
      strokeOpacity: 1,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      shape: 'circle',
      offsetX: 0,
      offsetY: 0,
      onClick: undefined,
      onDblClick: undefined,
      showNullDataPoints: true,
      hover: {
        size: 8,
        sizeOffset: 0,
      },
    },
    fill: {
      gradient: {
        opacityFrom: 0.25,
        opacityTo: 0,
      },
    },
    grid: {
      borderColor: 'var(--color-border)',
      strokeDashArray: 5,
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Orders</CardTitle>
        <Button mode="link" underline="solid" asChild>
          <Link to="#">See All</Link>
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 px-5 lg:px-7.5 pt-5">
        <ToggleGroup
          type="single"
          variant="outline"
          value={activePeriod}
          onValueChange={(value) => {
            if (value) setActivePeriod(value);
          }}
          className="grid grid-cols-7"
        >
          {['1H', '1D', '14D', '1M', '3M', '1Y', 'All'].map((period) => (
            <ToggleGroupItem key={period} value={period}>
              {period}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <div className="flex items-center gap-2.5">
          <span className="text-3xl font-semibold text-mono">$9,395.72</span>
          <Badge size="sm" variant="success" appearance="light">
            +4.7%
          </Badge>
        </div>
      </CardContent>
      <ApexChart
        id="my_order_chart"
        options={options}
        series={options.series}
        type="area"
        max-width="361"
        height="220"
        className="px-3"
      />
    </Card>
  );
};

export { Orders, type IOrdersProps };
