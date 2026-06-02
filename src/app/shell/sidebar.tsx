import { CATEGORIES, getToolsByCategory } from "@/shared/kernel/registry";
import { CategorySection } from "./category-section";

/** Tool catalog grouped by category, shown in the left panel. */
export function Sidebar() {
  return (
    <div className="flex h-full flex-col overflow-y-auto py-3">
      <div className="px-4 pb-3 text-xs font-semibold uppercase tracking-wider text-(--sidebar-fg)">
        Tools
      </div>
      {CATEGORIES.map((category) => {
        const tools = getToolsByCategory(category.id);
        if (tools.length === 0) return null;
        return <CategorySection key={category.id} category={category} tools={tools} />;
      })}
    </div>
  );
}
