import { StockPlannerTable } from '../tables/stock-planner';

export function StockPlanner() {
  return (
    <div className="grid gap-5 lg:gap-7.5 p-5 lg:p-7.5">
      <StockPlannerTable /> 
    </div>
  );
}
