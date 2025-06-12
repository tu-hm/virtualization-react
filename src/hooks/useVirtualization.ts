import { useMemo } from "react";
import { DEFAULT_OVER_SCAN } from "../constant";

type useVirtualizationProps = {
  totalItems: number;
  tableHeight: number;
  rowHeight: number;
  scrollTop: number;
  overScan: number;
}

const useVirtualization = ({
  totalItems,
  tableHeight,
  rowHeight,
  scrollTop,
  overScan = DEFAULT_OVER_SCAN
} : useVirtualizationProps) => {
  return useMemo(() => {
      const totalHeight = totalItems * rowHeight;
      
      if (totalItems === 0) {
        return {
          startIndex: 0,
          endIndex: 0,
          totalHeight: 0,
          offsetY: 0,
        };
      }
  
      const visibleItemsCount = Math.ceil(tableHeight / rowHeight);
      const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - overScan);
      const endIndex = Math.min(
        totalItems - 1,
        startIndex + visibleItemsCount + overScan * 2
      );
      
      const offsetY = startIndex * rowHeight;
  
      return {
        startIndex,
        endIndex,
        totalHeight,
        offsetY,
      };
    }, [totalItems, rowHeight, tableHeight, scrollTop, overScan]);
}

export default useVirtualization;