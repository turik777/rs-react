import { memo, type FC } from 'react';

interface IProps {
  onSort: (isAscending: boolean) => void;
  isAscending: boolean;
}

const CountrySort: FC<IProps> = ({ onSort, isAscending }) => {
  return (
    <div className="flex items-center gap-2 p-2">
      <span className="text-gray-600">Sort by Name:</span>
      <button
        onClick={() => onSort(true)}
        className={`button text-sm font-medium ${
          isAscending
            ? 'bg-blue-600 text-white'
            : 'bg-gray-300 text-gray-800 hover:bg-gray-500'
        }`}
      >
        A-Z
      </button>
      <button
        onClick={() => onSort(false)}
        className={`button text-sm font-medium ${
          !isAscending
            ? 'bg-blue-600 text-white'
            : 'bg-gray-300 text-gray-800 hover:bg-gray-500'
        }`}
      >
        Z-A
      </button>
    </div>
  );
};

export default memo(CountrySort);
