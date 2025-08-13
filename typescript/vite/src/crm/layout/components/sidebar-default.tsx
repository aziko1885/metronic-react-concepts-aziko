import { SidebarDefaultContent } from "./sidebar-default-content";
import { SidebarDefaultHeader } from "./sidebar-default-header";
import { SidebarDefaultFooter } from "./sidebar-default-footer";

interface SidebarDefaultProps {
  onSwitchToWorkspace: () => void;
}

export function SidebarDefault({ onSwitchToWorkspace }: SidebarDefaultProps) {
  return (
    <>
			<SidebarDefaultHeader onSwitchToWorkspace={onSwitchToWorkspace} />
			<SidebarDefaultContent/>
			<SidebarDefaultFooter/>
		</>
  );
}
