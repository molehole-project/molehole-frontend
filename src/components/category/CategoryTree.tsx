import React, { useMemo, useState } from "react";
import type { CategoryNode } from "../../types/category";

export type CategoryTreeProps = {
  title?: string;
  categories: CategoryNode[];
  selectedCategoryId?: number | null;
  onSelect?: (category: CategoryNode) => void;
  defaultExpanded?: boolean;
};

const CategoryTree: React.FC<CategoryTreeProps> = ({
  title = "카테고리",
  categories,
  selectedCategoryId = null,
  onSelect,
  defaultExpanded = true,
}) => {
  const initialOpen = useMemo(() => {
    const open = new Set<number>();
    const walk = (nodes: CategoryNode[]) => {
      for (const n of nodes) {
        if (defaultExpanded) open.add(n.categoryId);
        if (n.children?.length) walk(n.children);
      }
    };
    walk(categories);
    return open;
  }, [categories, defaultExpanded]);

  const [openSet, setOpenSet] = useState<Set<number>>(initialOpen);

  const toggle = (id: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const renderNode = (node: CategoryNode) => {
    const isSelected = selectedCategoryId === node.categoryId;
    const isOpen = openSet.has(node.categoryId);
    const hasChildren = node.depth < 2 && node.children.length > 0;

    const indent = node.depth * 14;

    return (
      <div key={node.categoryId}>
        <div
          role="button"
          tabIndex={0}
          onClick={() => onSelect?.(node)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelect?.(node);
            }
          }}
          className={[
            "flex items-center justify-between gap-2 rounded-lg px-2 py-2 transition cursor-pointer",
            isSelected
              ? "bg-gray-900 text-white"
              : "hover:bg-gray-50 text-gray-800",
          ].join(" ")}
          style={{ paddingLeft: 8 + indent }}
        >
          <div className="flex min-w-0 flex-1 items-center gap-2">
            {hasChildren && (
              <span
                role="button"
                tabIndex={0}
                aria-label={isOpen ? "collapse" : "expand"}
                className={[
                  "shrink-0 text-[11px] leading-none rounded-md px-1.5 py-1",
                  isSelected
                    ? "bg-white/15 text-white"
                    : "bg-gray-100 text-gray-600",
                ].join(" ")}
                onClick={(e) => {
                  e.stopPropagation();
                  toggle(node.categoryId);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    toggle(node.categoryId);
                  }
                }}
              >
                {isOpen ? "▾" : "▸"}
              </span>
            )}

            <span className="truncate text-sm font-medium">{node.name}</span>
          </div>

          <span
            className={[
              "shrink-0 rounded-full px-2 py-0.5 text-[11px]",
              isSelected
                ? "bg-white/15 text-white"
                : "bg-gray-100 text-gray-600",
            ].join(" ")}
            title="postCount"
          >
            {node.postCount}
          </span>
        </div>

        {hasChildren && isOpen && (
          <div className="mt-1 space-y-1">
            {node.children.map((c) => renderNode(c))}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="font-semibold text-gray-900">{title}</div>
      </div>

      {categories.length === 0 ? (
        <div className="text-sm text-gray-400 text-center py-6">
          카테고리가 없습니다.
        </div>
      ) : (
        <div className="space-y-1">{categories.map(renderNode)}</div>
      )}
    </section>
  );
};

export default CategoryTree;