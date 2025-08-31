import { type FC } from 'react';

interface IProps {
  years: number[];
  selectedYear: number | null;
  onYearSelect: (year: number) => void;
}

const YearSelector: FC<IProps> = ({ years, selectedYear, onYearSelect }) => {
  return (
    <div className="mb-2">
      <label
        htmlFor="year-select"
        className="text-sm font-medium text-gray-700"
      >
        Select Year:
      </label>
      <select
        id="year-select"
        value={selectedYear || ''}
        onChange={(e) => onYearSelect(Number(e.target.value))}
        className="year-select"
      >
        <option value="">All Years</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default YearSelector;
