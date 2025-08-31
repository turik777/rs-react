import { memo, type FC } from 'react';
import type { CountryData } from '../../interfaces/interfaces';

interface IProps {
  name: string;
  country: CountryData;
  onCountryClick: (country: CountryData) => void;
}

const CountryListItem: FC<IProps> = ({ name, country, onCountryClick }) => {
  const [latestData] = country.data.sort((a, b) => b.year - a.year);

  return (
    <li
      key={name}
      className="country-item"
      onClick={() => onCountryClick(country)}
    >
      <div className="font-medium">{name}</div>
      <div className="text-sm text-gray-500">
        Population: {latestData?.population?.toLocaleString() ?? 'N/A'}
      </div>
      <div className="text-sm text-gray-500">
        ISO Code: {country.iso_code || 'N/A'}
      </div>
    </li>
  );
};

export default memo(CountryListItem);
