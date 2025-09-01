import type { CO2Data } from '../interfaces/interfaces';

interface Resource<T> {
  read: () => T;
}

function fetchCO2Resource(): Resource<CO2Data> {
  let result: CO2Data;
  let status: 'pending' | 'fulfilled' | 'error' = 'pending';
  const promise: Promise<void> = fetch('/owid-co2-data.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      status = 'fulfilled';
      result = data;
    })
    .catch(() => {
      status = 'error';
    });

  return {
    read() {
      if (status === 'error') {
        throw new Error('Failed to fetch data.');
      }
      if (status === 'pending') {
        throw promise;
      }
      return result;
    },
  };
}

export const CO2Resource = fetchCO2Resource();
