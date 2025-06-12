import { useMemo } from "react";

import type { Column } from "../../types";
import styles from './index.module.css';

type TableBodyProps<ItemType extends { id: number }> = {
  data: ItemType[];
  columns: Column<ItemType>[];
  startIndex: number;
  endIndex: number;
  rowHeight: number;
  offsetY: number;
  totalHeight: number;
};

const TableBody = <ItemType extends { id: number }>({
  data,
  columns,
  startIndex,
  endIndex,
  rowHeight,
  offsetY: offset,
  totalHeight,
}: TableBodyProps<ItemType>) => {
  const visibleData = useMemo(
    () => data.slice(startIndex, endIndex + 1),
    [data, startIndex, endIndex]
  );

  const unusedBottomHeight =
    totalHeight - offset - visibleData.length * rowHeight;

  if (data.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={columns.length} className={styles.tableEmpty}>
            No data available
          </td>
        </tr>
      </tbody>
    );
  }

  const renderSpacerRow = (height: number) => (
    <tr style={{ height, display: 'table-row' }}>
      <td
        colSpan={columns.length}
        style={{
          height,
          minHeight: height,
          maxHeight: height,
        }}
        className={styles.tableBodySpace}
      />
    </tr>
  );

  return (
    <tbody>
      {offset > 0 && renderSpacerRow(offset)}

      {visibleData.map((row) => (
        <tr
          key={row.id}
          className={styles.tableBodyRow}
          style={{ height: rowHeight }}
        >
          {columns.map((column) => {
            const cellValue = row[column.key];
             const displayValue = column.render
              ? column.render.length === 1
                ? column.render(cellValue)
                : column.render(cellValue, row)
              : String(cellValue ?? "");

            const width = column.width
              ? `${column.width}px`
              : `${100 / columns.length}%`;

            return (
              <td
                key={String(column.key)}
                className={styles.tableBodyCell}
                style={{
                  width,
                  minWidth: column.width ? `${column.width}px` : "120px",
                  maxWidth: column.width ? `${column.width}px` : "none",
                }}
              >
                {displayValue}
              </td>
            );
          })}
        </tr>
      ))}

      {unusedBottomHeight > 0 && renderSpacerRow(unusedBottomHeight)}
    </tbody>
  );
};

export default TableBody;
