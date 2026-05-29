import { ScrollArea } from "@/components/ui/scroll-area";
import { CATEGORIES, getToolsByCategory } from "@/tools/registry";
import { CategorySection } from "./category-section";

export function Sidebar() {
  return (
    <ScrollArea className="h-full">
      <div className="py-3">
        <div className="px-4 pb-3 text-xs font-semibold uppercase tracking-wider text-(--sidebar-fg)">
          Tools
        </div>
        {CATEGORIES.map((category) => {
          const tools = getToolsByCategory(category.id);
          if (tools.length === 0) return null;
          return <CategorySection key={category.id} category={category} tools={tools} />;
        })}
      </div>
    </ScrollArea>
  );
}
