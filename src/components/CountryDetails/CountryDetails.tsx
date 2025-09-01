import { useEffect, useState, useMemo, useCallback, type FC } from 'react';
import type { CountryData, YearlyData } from '../../interfaces/interfaces';
import ColumnSelectorModal from '../Modal/Modal';

interface IProps {
  countryData: CountryData;
  selectedYear: number | null;
}

const CountryDetails: FC<IProps> = ({ countryData, selectedYear }) => {
  const [showModal, setShowModal] = useState(false);
  const initialColumns = useMemo<(keyof YearlyData)[]>(
    () => ['year', 'population', 'co2', 'co2_per_capita'],
    []
  );
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [highlightedRow, setHighlightedRow] = useState<number | null>(null);

  const availableColumns = useMemo(() => {
    const [countryColumns] = countryData.data;
    return Object.keys(countryColumns || {}).filter(
      (col) => !initialColumns.includes(col)
    );
  }, [countryData.data, initialColumns]);

  const handleSelectColumns = useCallback((columns: string[]) => {
    setSelectedColumns(columns);
    setShowModal(false);
  }, []);

  const allColumns = useMemo(
    () => [...initialColumns, ...selectedColumns],
    [selectedColumns, initialColumns]
  );

  const filteredData = useMemo(() => {
    return selectedYear
      ? countryData.data.filter(
          (yearlyData) => yearlyData.year === selectedYear
        )
      : countryData.data;
  }, [countryData.data, selectedYear]);

  useEffect(() => {
    if (selectedYear) {
      setHighlightedRow(selectedYear);
      const timer = setTimeout(() => {
        setHighlightedRow(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [selectedYear]);

  return (
    <div>
      <div className="mb-2 flex justify-end">
        <button
          onClick={() => setShowModal(true)}
          className="button bg-blue-500 text-white hover:bg-blue-600"
        >
          Add Additional Columns
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-300 text-sm leading-normal text-gray-800 uppercase">
            <tr>
              {allColumns.map((col) => (
                <th key={col} className="px-4 py-2 text-left">
                  {col.toString().replace(/_/g, ' ')}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-sm font-light text-gray-600">
            {filteredData.length > 0 &&
              filteredData.map((yearlyData) => (
                <tr
                  key={yearlyData.year}
                  className={`row ${yearlyData.year === highlightedRow ? 'bg-green-200' : ''}`}
                >
                  {allColumns.map((col) => (
                    <td
                      key={`${yearlyData.year}-${col}`}
                      className="px-4 py-2 text-left whitespace-nowrap"
                    >
                      {yearlyData[col] !== undefined && yearlyData[col] !== null
                        ? yearlyData[col].toLocaleString()
                        : 'N/A'}
                    </td>
                  ))}
                </tr>
              ))}

            {filteredData.length === 0 && (
              <tr>
                <td
                  colSpan={allColumns.length}
                  className="px-4 py-2 text-center text-gray-500"
                >
                  No data available for the selected year.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <ColumnSelectorModal
          availableColumns={availableColumns}
          selectedColumns={selectedColumns}
          onSelectColumns={handleSelectColumns}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default CountryDetails;
