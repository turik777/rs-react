import { useState, type FC } from 'react';
import type { CO2Data, CountryData } from '../../interfaces/interfaces';
import CountryDetails from '../CountryDetails/CountryDetails';
import CountryListItem from '../CountryListItem/CountryListItem';
import { CO2Resource } from '../../utils/CO2Resource';
import CountrySort from '../CountrySort/CountrySort';
import CountrySearch from '../CountrySearch/CountrySearch';
import YearSelector from '../YearSelector/YearSelector';

const CountryList: FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(
    null
  );
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const CO2data: CO2Data = CO2Resource.read();
  const countries = Object.entries(CO2data);

  const years = Object.values(CO2data).flatMap((country) =>
    country.data.map((data) => data.year)
  );
  const allYears = [...new Set(years)].sort((a, b) => b - a);

  const handleCountryClick = (country: CountryData) => {
    setSelectedCountry(country);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  const filteredCountries = countries.filter(([name]) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAndSortedCountries = filteredCountries.sort(([a], [b]) => {
    if (isAscending) {
      return a.localeCompare(b);
    } else {
      return b.localeCompare(a);
    }
  });

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <div className="flex flex-col md:w-1/3">
        <h2 className="countries-header">Countries</h2>
        <YearSelector
          years={allYears}
          selectedYear={selectedYear}
          onYearSelect={handleYearChange}
        />
        <CountrySearch searchTerm={searchTerm} onSearch={handleSearch} />
        <CountrySort onSort={setIsAscending} isAscending={isAscending} />

        <div className="countries-list">
          <ul>
            {filteredAndSortedCountries.map(([name, country]) => (
              <CountryListItem
                key={name}
                name={name}
                country={country}
                onCountryClick={handleCountryClick}
              />
            ))}
          </ul>
        </div>
      </div>

      <div className="w-full rounded-xl bg-white p-6 shadow-lg md:w-2/3">
        {selectedCountry && (
          <CountryDetails
            countryData={selectedCountry}
            selectedYear={selectedYear}
          />
        )}

        {!selectedCountry && (
          <div className="flex h-full items-center justify-center text-lg text-gray-800">
            Select a country to view details.
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryList;
