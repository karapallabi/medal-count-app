import React, { useEffect, useState } from 'react';
import type { Medal } from './types/Medal';
import { sortMedals } from './utils/sortUtils';
import { MedalTable } from './components/MedalTable';

const getSortParam = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('sort') || 'gold';
};

export default function App() {
  const [medals, setMedals] = useState<Medal[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState(getSortParam());

  useEffect(() => {
    fetch('/medals.json')
      .then((res) => res.json())
      .then((data) => setMedals(data))
      .catch(() => setError('Failed to load medal data.'));
  }, []);

  if (error) return <div>{error}</div>;

  const sortedData = sortMedals(medals, sortBy).slice(0, 10);

  return (
    <div>
      <h1>Medal Count</h1>
      <MedalTable data={sortedData} sortBy={sortBy} onSort={setSortBy} />
    </div>
  );
}
