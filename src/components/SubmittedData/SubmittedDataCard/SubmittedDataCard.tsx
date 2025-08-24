import React from 'react';
import type { TFormData } from '../../../validation/schema';

interface Props {
  data: TFormData | null;
  isNew?: boolean;
}

const SubmittedDataCard: React.FC<Props> = ({ data, isNew }) => {
  const cardClasses = `
    shadow-lg rounded-lg p-4 md:w-200
    ${isNew ? 'bg-green-100 border-green-400' : 'bg-white'}
  `;

  return (
    <div className={cardClasses}>
      {data ? (
        <div className="space-y-3">
          {data.picture && <img src={data.picture} className="image" />}
          <p>
            <strong>Name:</strong> {data.name}
          </p>
          <p>
            <strong>Age:</strong> {data.age}
          </p>
          <p>
            <strong>Email:</strong> {data.email}
          </p>
          <p>
            <strong>Gender:</strong> {data.gender}
          </p>
          <p>
            <strong>Country:</strong> {data.country}
          </p>
        </div>
      ) : (
        <p className="text-gray-500">No data submitted yet.</p>
      )}
    </div>
  );
};

export default SubmittedDataCard;
