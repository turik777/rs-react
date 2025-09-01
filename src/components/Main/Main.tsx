import { Suspense, type FC } from 'react';
import CountryList from '../CountryList/CountryList';
import LoadingFallback from '../LoadingFallback/LoadingFallback';

const Main: FC = () => {
  return (
    <div className="main-container">
      <h1 className="main-header">CO2 Emissions Data</h1>
      <Suspense fallback={<LoadingFallback />}>
        <CountryList />
      </Suspense>
    </div>
  );
};

export default Main;
