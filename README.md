# Virtualized Table Demo

A high-performance React table component that efficiently renders large datasets using virtualization techniques. Only visible rows are rendered in the DOM, enabling smooth scrolling and interaction with datasets containing thousands of rows.

## Features

- **Virtualization**: Only renders visible rows for optimal performance
- **Configurable Dataset Size**: Test with 100 to 50,000 rows
- **Adjustable Table Height**: Customize viewport size (300px, 500px, 700px)
- **Sticky Headers**: Column headers remain visible while scrolling
- **Custom Cell Rendering**: Support for custom formatters and components
- **TypeScript Support**: Fully typed with generic column definitions
- **Responsive Design**: Clean, modern UI with proper spacing and borders

## Technology Stack

- **React** with TypeScript
- **Vite** for build tooling
- **CSS Modules** for styling
- Custom virtualization hook

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Demo/              # Main demo component with controls
│   ├── Table/             # Core table wrapper component
│   ├── TableHeader/       # Sticky header component
│   └── TableBody/         # Virtualized body with row rendering
├── hooks/
│   └── useVirtualization.ts # Custom hook for virtualization logic
├── types.ts               # TypeScript type definitions
├── utils.ts               # Data generation utilities
└── constant.ts            # Configuration constants
```

## Usage

### Basic Table Implementation

```tsx
import Table from './components/Table';

const columns = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
  { 
    key: 'amount', 
    header: 'Amount',
    render: (value) => `$${value.toFixed(2)}`
  }
];

const data = [
  { id: 1, name: 'John Doe', amount: 1000 },
  // ... more data
];

function App() {
  return (
    <Table
      data={data}
      columns={columns}
      tableHeight={500}
      rowHeight={40}
      overScan={5}
    />
  );
}
```

### Column Configuration

```tsx
type Column<ItemType> = {
  key: keyof ItemType;           // Data property key
  header: string;                // Display header text
  width?: number;                // Fixed column width in pixels
  render?: (value, row) => React.ReactNode; // Custom cell renderer
};
```

### Custom Cell Rendering

```tsx
const columns = [
  {
    key: 'amount',
    header: 'Amount',
    render: (value) => (
      <div style={{ color: 'red', fontWeight: 'bold' }}>
        ${value.toLocaleString()}
      </div>
    )
  },
  {
    key: 'status',
    header: 'Status',
    render: (value, row) => (
      <span className={`status-${value}`}>
        {value.toUpperCase()}
      </span>
    )
  }
];
```

## Configuration Options

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `Array<{id: number}>` | Required | Array of data objects |
| `columns` | `Column[]` | Required | Column definitions |
| `tableHeight` | `number` | 400 | Table viewport height in pixels |
| `rowHeight` | `number` | 40 | Height of each row in pixels |
| `overScan` | `number` | 5 | Extra rows to render outside viewport |

## Performance Characteristics

- **Memory Efficient**: Only visible rows exist in DOM
- **Smooth Scrolling**: Consistent performance regardless of dataset size
- **Tested Scale**: Handles 50,000+ rows without performance degradation
- **Responsive**: Maintains 60fps scrolling on modern devices

## Virtualization Algorithm

The virtualization logic calculates which rows should be rendered based on:

1. **Scroll Position**: Current scroll offset
2. **Viewport Size**: Visible area height
3. **Row Height**: Fixed height per row
4. **Overscan**: Buffer rows for smoother scrolling

```typescript
const visibleStart = Math.floor(scrollTop / rowHeight);
const visibleEnd = visibleStart + Math.ceil(tableHeight / rowHeight);
const startIndex = Math.max(0, visibleStart - overScan);
const endIndex = Math.min(totalItems - 1, visibleEnd + overScan);
```
## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Performance Tips

- Use consistent `rowHeight` for optimal virtualization
- Implement `React.memo` for complex cell renderers
- Avoid inline styles in render functions
- Consider using `useMemo` for expensive data transformations

## License

MIT License - see LICENSE file for details

## Acknowledgments

- Inspired by react-window and react-virtualized
- Sample data generated using Faker.js
- Built with modern React patterns and TypeScript