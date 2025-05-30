import React from 'react';
import type { Medal } from '../types/Medal';
import Table from 'react-bootstrap/Table';

type Props = {
  data: Medal[];
  sortBy: string;
  onSort: (sortKey: string) => void;
};

const countryOrder = [
  'USA','NOR','RUS','NED','FRA','SWE','ITA','CAN','SUI', 'BLR','GER',
  'AUT','CHN' 
];

const sortedCodes = [...countryOrder].sort();

export const MedalTable: React.FC<Props> = ({ data, sortBy, onSort }) => {
  return (
    <div className="container mt-4">
      <Table bordered hover responsive className="text-center align-middle">
        <thead className="table-dark">
          <tr>
            <th>Flag</th>
            <th onClick={() => onSort('gold')} style={{ cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD700">
                <circle cx="12" cy="12" r="10" />
              </svg>
            </th>
            <th onClick={() => onSort('silver')} style={{ cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#C0C0C0">
                <circle cx="12" cy="12" r="10" />
              </svg>
            </th>
            <th onClick={() => onSort('bronze')} style={{ cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#CD7F32">
                <circle cx="12" cy="12" r="10" />
              </svg>
            </th>
            <th onClick={() => onSort('total')} style={{ cursor: 'pointer' }}>
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((country) => {
            const index = sortedCodes.indexOf(country.code);
            const yOffset = index * 24; 
            return (
              <tr key={country.code}>
            <td>
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <div
                    style={{
                      width: 32,
                      height: 24, 
                      backgroundImage: 'url("/flags.png")',
                      backgroundPosition: `-5px -${yOffset}px`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '39px auto',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                    }}
                  />
                  <span className="fw-semibold">{country.code}</span>
                </div>
              </td>
                <td>{country.gold}</td>
                <td>{country.silver}</td>
                <td>{country.bronze}</td>
                <td>{country.gold + country.silver + country.bronze}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
