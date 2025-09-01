import { memo, type FC } from 'react';

interface IProps {
  searchTerm: string;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CountrySearch: FC<IProps> = ({ searchTerm, onSearch }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search countries..."
        value={searchTerm}
        onChange={onSearch}
        className="search-input"
      />
    </div>
  );
};

export default memo(CountrySearch);
