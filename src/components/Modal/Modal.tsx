import { useState, type FC } from 'react';

interface IProps {
  availableColumns: string[];
  selectedColumns: string[];
  onSelectColumns: (columns: string[]) => void;
  onClose: () => void;
}

const ColumnSelectorModal: FC<IProps> = ({
  availableColumns,
  selectedColumns: initialSelectedColumns,
  onSelectColumns,
  onClose,
}) => {
  const [columns, setColumns] = useState<string[]>(initialSelectedColumns);

  const handleCheckboxChange = (column: string) => {
    setColumns((prevColumns) =>
      prevColumns.includes(column)
        ? prevColumns.filter((col) => col !== column)
        : [...prevColumns, column]
    );
  };

  const handleApply = () => {
    onSelectColumns(columns);
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <p className="mb-4 text-xl font-semibold">Select Columns to Display</p>

        <div className="max-h-100 overflow-y-auto">
          <div className="space-y-2">
            {availableColumns.map((col) => (
              <div key={col} className="flex items-center">
                <input
                  type="checkbox"
                  id={col}
                  checked={columns.includes(col)}
                  onChange={() => handleCheckboxChange(col)}
                  className="modal-checkbox"
                />
                <label htmlFor={col} className="modal-label">
                  {col.replace(/_/g, ' ')}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="button bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="button bg-blue-500 text-white hover:bg-blue-600"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColumnSelectorModal;
