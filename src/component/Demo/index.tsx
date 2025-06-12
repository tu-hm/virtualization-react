import { useMemo, useState } from "react"

import { generateTransactionList } from "../../utils";
import type { Column, Transaction } from "../../types";
import styles from './index.module.css'
import Table from "../Table";

const columns: Column<Transaction>[] = [
  {
    key: 'id',
    header: 'ID',
  },
  {
    key: 'senderName',
    header: 'Sender',
  },
  {
    key: 'receiverName',
    header: 'Receiver',
  }, 
  {
    key: 'amount',
    header: 'Amount',
    render: (value) => (
      <div style={{
        color: 'red'
      }}>{value}</div>
    )
  },
  {
    key: 'city',
    header: 'City',
  },
  {
    key: 'department',
    header: 'Department',
  },
  {
    key: 'date',
    header: 'Date'
  },
]

const Demo = () => {
  const [dataSize, setDataSize] = useState(1000);
  const [tableHeight, setTableHeight] = useState(500);

  const data: Transaction[] = useMemo(() => generateTransactionList(dataSize), [dataSize]);

  return (
    <div className={styles.demo}>
      <div className={styles.demoHeader}>
        <h1 className={styles.demoHeaderTitle}>Virtualized Table Demo</h1>
        <p className={styles.demoHeaderContent}>
          This table efficiently renders large datasets using virtualization. Only visible rows are rendered in the DOM.
        </p>
        
        <div className={styles.demoHeaderSelectBox}>
          <div>
            <label className={styles.demoHeaderSelectLabel}>Dataset Size:</label>
            <select 
              value={dataSize} 
              onChange={(e) => setDataSize(Number(e.target.value))}
              className={styles.demoHeaderSelection}
            >
              <option value={100}>100 rows</option>
              <option value={1000}>1,000 rows</option>
              <option value={5000}>5,000 rows</option>
              <option value={10000}>10,000 rows</option>
              <option value={50000}>50,000 rows</option>
            </select>
          </div>
          
          <div>
            <label  className={styles.demoHeaderSelectLabel}>Table Height:</label>
            <select 
              value={tableHeight} 
              onChange={(e) => setTableHeight(Number(e.target.value))}
              className={styles.demoHeaderSelection}
            >
              <option value={300}>300px</option>
              <option value={500}>500px</option>
              <option value={700}>700px</option>
            </select>
          </div>
        </div>
        
        <div className={styles.demoInfo}>
          <strong>Performance Info:</strong> Displaying {data.length.toLocaleString()} rows, 
          but only rendering visible rows in DOM. Scroll to see virtualization in action!
        </div>
      </div>

      <Table
        data={data}
        columns={columns}
        tableHeight={tableHeight}
      />
    </div>
  )
} 

export default Demo;