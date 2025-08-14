import { Content } from "@/components/layouts/crm/components/content";
import { PageHeader } from "./page-header";
import { Stats } from "./stats";
import { TotalRevenue } from "./total-revenue";
import { TasksOverview } from "./tasks-overview";
import { DealsOverview } from "./deals-overview";
import { LeadAnalytics } from "./lead-analytics";
import { RecentDeals } from "./recent-deals";

export default function DashboardPage() {
  return (
    <>
      <PageHeader/>
      <div className="container-fluid">
        <Content className="block space-y-6 py-5">
          <Stats/>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TotalRevenue/>
            <TasksOverview/>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-2"> 
              <DealsOverview/>
            </div>
            <div className="col-span-1">
              <LeadAnalytics/>
            </div>
          </div>
          <RecentDeals/>
        </Content>
      </div>
    </>
  );
}
