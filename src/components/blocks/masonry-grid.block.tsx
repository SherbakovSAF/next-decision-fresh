import { cn } from "@/lib/utils";

interface MasonryGridProps<T> {
  columnNumber: number;
  elements: T[];
  children: (element: T) => React.ReactNode;
  gap?: number;
  classesForAdaptiveCols?: string;
}

const MasonryGrid = <T,>({
  columnNumber,
  elements,
  children,
  gap = 4,
  classesForAdaptiveCols,
}: MasonryGridProps<T>) => {
  const columns: T[][] = Array.from({ length: columnNumber }, () => []);

  elements.forEach((element, index) => {
    columns[index % columnNumber].push(element);
  });
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 ",
        classesForAdaptiveCols,
        `gap-${gap}`
      )}
    >
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} className={cn(`gap-${gap}`, "grid h-fit")}>
          {column.map((element, elementIndex) => (
            <div className="h-fit" key={elementIndex}>
              {children(element)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MasonryGrid;
