import React from 'react';
import type { Medal } from '../types/Medal';
import Table from 'react-bootstrap/Table';

type Props = {
  data: Medal[];
  sortBy: string;
  onSort: (sortKey: string) => void;
};

const countryOrder = [
  'AUT', 'BLR', 'CAN', 'CHN', 'FRA', 'GER', 'ITA', 'NED', 'NOR',
  'RUS', 'SUI', 'SWE', 'USA'
];

export const MedalTable: React.FC<Props> = ({ data, sortBy, onSort }) => {
  return (
    <div class ="container">
    <Table  bordered hover responsive>
   <thead className="table-dark">
  <tr>
    <th>Flag</th>
    <th onClick={() => onSort('gold')} style={{ cursor: 'pointer' }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD700" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" />
      </svg>
    </th>
    <th onClick={() => onSort('silver')} style={{ cursor: 'pointer' }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#C0C0C0" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" />
      </svg>
    </th>
    <th onClick={() => onSort('bronze')} style={{ cursor: 'pointer' }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#CD7F32" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" />
      </svg>
    </th>
    <th onClick={() => onSort('total')} style={{ cursor: 'pointer' }}>Total</th>
  </tr>
</thead>

      <tbody>
        {data.map((country) => {
          const index = countryOrder.indexOf(country.code);
          const yOffset = index * 32;

          return (
            <tr key={country.code}>
                
              <td>  {country.country} {country.code}
                <div
                  style={{
                    width: 32,
                    height: 24,
                    backgroundImage: `url("/flags.png")`,
                    backgroundPosition: `0px -${yOffset}px`,
                    backgroundSize: 'auto',
                  }} 
                ></div>
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
