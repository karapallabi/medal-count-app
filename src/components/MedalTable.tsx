import React from 'react';
import type { Medal } from '../types/Medal';

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
    <table>
      <thead>
        <tr>
          <th>Flag</th>
          <th onClick={() => onSort('gold')}>Gold</th>
          <th onClick={() => onSort('silver')}>Silver</th>
          <th onClick={() => onSort('bronze')}>Bronze</th>
          <th onClick={() => onSort('total')}>Total</th>
        </tr>
      </thead>
      <tbody>
        {data.map((country) => {
          const index = countryOrder.indexOf(country.code);
          const yOffset = index * 32;

          return (
            <tr key={country.code}>
              <td>
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
    </table>
  );
};
