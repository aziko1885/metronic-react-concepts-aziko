import { Inventory } from './components/inventory';
import { BestSeller } from './components/best-sellers';
import { Orders } from './components/orders';
import { SalesActivity } from './components/sales-activity';
import { InventorySummary } from './components/inventory-summary';
import { DashboardTable } from '../tables/dashboard';

export function Dashboard() {
  return (
      <div className="grid gap-5 lg:gap-7.5 p-5 lg:p-7.5">
        <div className="grid xl:grid-cols-3 gap-5 lg:gap-7.5 items-stretch">
          <Orders className={''} />
          <Inventory /> 
          <BestSeller />
        </div> 

        <div className="grid lg:grid-cols-3 gap-5 lg:gap-7.5 items-stretch">
          <div className="lg:col-span-2">
            <SalesActivity />
          </div>
          <div className="lg:col-span-1">
            <InventorySummary />
          </div>
        </div> 
        <DashboardTable />
      </div>
    );
}
