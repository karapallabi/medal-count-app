import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MedalTable } from './MedalTable';
import { Medal } from '../types/Medal';


const mockData = [
  { code: 'USA', gold: 10, silver: 5, bronze: 3 },
  { code: 'NOR', gold: 8, silver: 7, bronze: 6 },
];

describe('MedalTable Component', () => {
  const onSortMock = jest.fn();

  beforeEach(() => {
    onSortMock.mockClear();
  });

  it('renders the table with medal data', () => {
    render(<MedalTable data={mockData} sortBy="gold" onSort={onSortMock} />);

    // Check if country codes are present
    expect(screen.getByText('USA')).toBeInTheDocument();
    expect(screen.getByText('NOR')).toBeInTheDocument();

    // Check if medal counts are present
    expect(screen.getByText('10')).toBeInTheDocument(); // USA gold
    expect(screen.getByText('7')).toBeInTheDocument(); // NOR silver
    expect(screen.getByText('18')).toBeInTheDocument(); // NOR total
  });

  it('calls onSort with correct argument when gold column header is clicked', () => {
    render(<MedalTable data={mockData} sortBy="gold" onSort={onSortMock} />);
    const goldHeader = screen.getAllByRole('columnheader')[1]; // First is Flag, second is Gold

    fireEvent.click(goldHeader);
    expect(onSortMock).toHaveBeenCalledWith('gold');
  });

  it('calls onSort with correct argument when silver column header is clicked', () => {
    render(<MedalTable data={mockData} sortBy="silver" onSort={onSortMock} />);
    const silverHeader = screen.getAllByRole('columnheader')[2];

    fireEvent.click(silverHeader);
    expect(onSortMock).toHaveBeenCalledWith('silver');
  });

  it('calls onSort with correct argument when bronze column header is clicked', () => {
    render(<MedalTable data={mockData} sortBy="bronze" onSort={onSortMock} />);
    const bronzeHeader = screen.getAllByRole('columnheader')[3];

    fireEvent.click(bronzeHeader);
    expect(onSortMock).toHaveBeenCalledWith('bronze');
  });

  it('calls onSort with correct argument when total column header is clicked', () => {
    render(<MedalTable data={mockData} sortBy="total" onSort={onSortMock} />);
    const totalHeader = screen.getByText('Total');

    fireEvent.click(totalHeader);
    expect(onSortMock).toHaveBeenCalledWith('total');
  });

  it('renders flag with correct style background position', () => {
    render(<MedalTable data={mockData} sortBy="gold" onSort={onSortMock} />);

    const flagElements = screen.getAllByRole('row')[1].querySelectorAll('div');

    const flagStyle = flagElements[0].getAttribute('style') || '';
    expect(flagStyle.includes('backgroundImage')).toBe(true);
    expect(flagStyle.includes('backgroundPosition')).toBe(true);
  });
});
