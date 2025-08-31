import React from 'react';
import type { CountryData, YearlyData } from '../../interfaces/interfaces';

interface IProps {
  countryData: CountryData;
}

const CountryDetails: React.FC<IProps> = ({ countryData }) => {
  const initialColumns: (keyof YearlyData)[] = [
    'year',
    'population',
    'co2',
    'co2_per_capita',
  ];

  return (
    <div>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-300 text-sm leading-normal text-gray-800 uppercase">
            <tr>
              {initialColumns.map((col) => (
                <th key={col} className="px-4 py-2 text-left">
                  {col.toString().replace(/_/g, ' ')}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-sm font-light text-gray-600">
            {countryData.data.map((yearlyData) => (
              <tr
                key={yearlyData.year}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                {initialColumns.map((col) => (
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CountryDetails;
