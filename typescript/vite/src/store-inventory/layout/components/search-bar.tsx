import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function SearchBar() {
  return (
    <div className="relative lg:w-[280px]">
			<Search className="size-4 text-muted-foreground absolute top-1/2 -translate-y-1/2 start-2" />
			<Input type="text" className="px-7" placeholder="Search shop" />
			<Badge
				className="absolute top-1/2 -translate-y-1/2 end-2 gap-1"
				variant="outline"
				size="sm"
			>
				⌘ K
			</Badge>
		</div>
  );
}