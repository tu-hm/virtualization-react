import { useCallback, useState } from "react";

import {
  DEFAULT_OVER_SCAN,
  DEFAULT_ROW_HEIGHT,
  DEFAULT_TABLE_HEIGHT
} from '../../constant';
import useVirtualization from "../../hooks/useVirtualization";
import type { Column } from "../../types";
import TableBody from "../TableBody";
import TableHeader from "../TableHeader";
import styles from './index.module.css';

export type TableProps<ItemType extends { id: number}> = {
  data: ItemType[];
  columns: Column<ItemType>[];
  tableHeight?: number;
  rowHeight?: number;
  overScan?: number;
}

const Table = <ItemType extends {id: number}>({
  data,
  columns,
  tableHeight = DEFAULT_TABLE_HEIGHT,
  rowHeight = DEFAULT_ROW_HEIGHT,
  overScan = DEFAULT_OVER_SCAN,
} : TableProps<ItemType>) => {
  const [scrollTop, setScrollTop] = useState(0);

  const { startIndex, endIndex, totalHeight, offsetY } = useVirtualization({
    totalItems: data.length,
    tableHeight,
    rowHeight,
    scrollTop,
    overScan
  })

  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    setScrollTop(target.scrollTop);
  }, [])

  return (
    <div
      style={{
        height: tableHeight,
      }}
      className={styles.tableWrapper}
      onScroll={handleScroll}
    >
      <table className={styles.tableGeneral}>
        <TableHeader columns={columns} />
        <TableBody 
          data={data}
          columns={columns} 
          startIndex={startIndex} 
          endIndex={endIndex} rowHeight={rowHeight} 
          offsetY={offsetY} 
          totalHeight={totalHeight}          
        />
      </table>
    </div>
  )
};

export default Table;