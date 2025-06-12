import { useMemo } from "react";
import { DEFAULT_OVER_SCAN } from "../constant";

interface UseVirtualizationProps {
  totalItems: number;
  tableHeight: number;
  rowHeight: number;
  scrollTop: number;
  overScan?: number;
}

interface VirtualizationResult {
  startIndex: number;
  endIndex: number;
  totalHeight: number;
  offsetY: number;
}

const useVirtualization = ({
  totalItems,
  tableHeight,
  rowHeight,
  scrollTop,
  overScan = DEFAULT_OVER_SCAN
}: UseVirtualizationProps): VirtualizationResult => {
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

    const baseStartIndex = Math.floor(scrollTop / rowHeight);
    const startIndex = Math.max(0, baseStartIndex - overScan);
    
    const baseEndIndex = baseStartIndex + visibleItemsCount;
    const endIndex = Math.min(
      totalItems - 1,
      baseEndIndex + overScan
    );
    
    const offsetY = startIndex * rowHeight;

    return {
      startIndex,
      endIndex,
      totalHeight,
      offsetY,
    };
  }, [totalItems, rowHeight, tableHeight, scrollTop, overScan]);
};

export default useVirtualization;