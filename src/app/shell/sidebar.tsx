import { CATEGORIES, getToolsByCategory } from "@/shared/kernel";
import { Flex, Typography } from "@/shared/ui";
import { CategorySection } from "./category-section";

/** Tool catalog grouped by category, shown in the left panel. */
export function Sidebar() {
  return (
    <Flex direction="col" className="h-full overflow-y-auto py-3">
      <Typography
        variant="span"
        className="px-4 pb-3 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground"
      >
        Tools
      </Typography>
      {CATEGORIES.map((category) => {
        const tools = getToolsByCategory(category.id);
        if (tools.length === 0) return null;
        return <CategorySection key={category.id} category={category} tools={tools} />;
      })}
    </Flex>
  );
}
