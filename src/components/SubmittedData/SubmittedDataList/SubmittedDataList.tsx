import React from 'react';
import type { TFormData } from '../../../validation/schema';
import SubmittedDataCard from '../SubmittedDataCard/SubmittedDataCard';

interface Props {
  title: string;
  data: TFormData[];
}

const SubmittedDataList: React.FC<Props> = ({ title, data }) => {
  return (
    <div className="list">
      <p className="text-xl font-semibold mb-2 text-center">{title}</p>
      {data.length > 0 ? (
        <div className="space-y-4">
          {data
            .slice()
            .reverse()
            .map((item, index) => (
              <div key={index} className="card">
                <SubmittedDataCard data={item} />
              </div>
            ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">No data submitted yet.</p>
      )}
    </div>
  );
};

export default SubmittedDataList;
