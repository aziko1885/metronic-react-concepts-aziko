import { OutboundStockTable } from '../tables/outbound-stock';

export function OutboundStock() {
  return (
    <div className="grid gap-5 lg:gap-7.5 p-5 lg:p-7.5">
      <OutboundStockTable /> 
    </div>
  );
}
