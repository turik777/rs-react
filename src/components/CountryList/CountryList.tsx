import { useState, type FC } from 'react';
import type { CO2Data, CountryData } from '../../interfaces/interfaces';
import CountryDetails from '../CountryDetails/CountryDetails';
import CountryListItem from '../CountryListItem/CountryListItem';
import { CO2Resource } from '../../utils/co2Resource';

const CountryList: FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(
    null
  );
  const CO2data: CO2Data = CO2Resource.read();
  const countries = Object.entries(CO2data);

  const handleCountryClick = (country: CountryData) => {
    setSelectedCountry(country);
  };

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <div className="flex flex-col md:w-1/3">
        <h2 className="countries-header">Countries</h2>

        <div className="countries-list">
          <ul>
            {countries.map(([name, country]) => (
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
        {selectedCountry && <CountryDetails countryData={selectedCountry} />}

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
