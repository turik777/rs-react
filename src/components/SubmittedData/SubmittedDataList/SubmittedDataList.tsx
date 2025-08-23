import React, { useEffect, useState } from 'react';
import type { TFormData } from '../../../validation/schema';
import SubmittedDataCard from '../SubmittedDataCard/SubmittedDataCard';

interface Props {
  title: string;
  data: TFormData[];
  lastSubmittedId: number | null;
}

const SubmittedDataList: React.FC<Props> = ({
  title,
  data,
  lastSubmittedId,
}) => {
  const [highlightedId, setHighlightedId] = useState<number | null>(null);

  useEffect(() => {
    if (lastSubmittedId) {
      setHighlightedId(lastSubmittedId);
      const timer = setTimeout(() => {
        setHighlightedId(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [lastSubmittedId]);

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
                <SubmittedDataCard
                  data={item}
                  isNew={item.id === highlightedId}
                />
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
