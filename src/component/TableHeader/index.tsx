import type { Column } from "../../types";
import styles from './index.module.css'

type TableHeaderProps<ItemType extends { id: number}> = {
  columns: Column<ItemType>[];
}

const TableHeader = <ItemType extends { id: number }>({
  columns
} : TableHeaderProps<ItemType>) => (
  <thead className={styles.tableHeader}>
    <tr className={styles.tableHeaderRow}>
      {
        columns.map((value) => (
          <th
            key={String(value.key)}
            className={styles.tableHeaderCell}
            style={{
              width: value.width ? `${value.width}px` : `${100 / columns.length}%`,
              minWidth: value.width ? `${value.width}px` : '120px',
              maxWidth: value.width ? `${value.width}px` : 'none',
            }}
          >
            {value.header}
          </th>
        ))
      }
    </tr>
  </thead>
)


export default TableHeader;