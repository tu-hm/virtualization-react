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
  offsetY,
  totalHeight,
}: TableBodyProps<ItemType>) => {
  const visibleData = useMemo(
    () => data.slice(startIndex, endIndex + 1),
    [data, startIndex, endIndex]
  );

  const bottomSpacerHeight = useMemo(
    () => totalHeight - offsetY - visibleData.length * rowHeight,
    [totalHeight, offsetY, visibleData.length, rowHeight]
  );

  const renderSpacerRow = (height: number) => (
    <tr style={{ height }}>
      <td
        colSpan={columns.length}
        style={{ height }}
        className={styles.tableBodySpace}
      />
    </tr>
  );

  const renderCellValue = (column: Column<ItemType>, row: ItemType) => {
    const cellValue = row[column.key];
    
    if (!column.render) {
      return String(cellValue ?? "");
    }
    
    return column.render.length === 1
      ? column.render(cellValue)
      : column.render(cellValue, row);
  };

  const getCellWidth = (column: Column<ItemType>) => {
    return column.width ? `${column.width}px` : `${100 / columns.length}%`;
  };

  const getCellMinWidth = (column: Column<ItemType>) => {
    return column.width ? `${column.width}px` : "120px";
  };

  const getCellMaxWidth = (column: Column<ItemType>) => {
    return column.width ? `${column.width}px` : "none";
  };

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

  return (
    <tbody>
      {offsetY > 0 && renderSpacerRow(offsetY)}

      {visibleData.map((row) => (
        <tr
          key={row.id}
          className={styles.tableBodyRow}
          style={{ height: rowHeight }}
        >
          {columns.map((column) => (
            <td
              key={String(column.key)}
              className={styles.tableBodyCell}
              style={{
                width: getCellWidth(column),
                minWidth: getCellMinWidth(column),
                maxWidth: getCellMaxWidth(column),
              }}
            >
              {renderCellValue(column, row)}
            </td>
          ))}
        </tr>
      ))}

      {bottomSpacerHeight > 0 && renderSpacerRow(bottomSpacerHeight)}
    </tbody>
  );
};

export default TableBody;