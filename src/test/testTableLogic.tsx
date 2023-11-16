import React from 'react';
import { render, screen } from '@testing-library/react';
import { TableLogic } from '../components/TableLogic/TableLogic';


/**
 * Test the TableLogic component, which is used to render tables
 * Create columns, data and render then the table
 */
export const testTableLogic = () => {

describe('TableLogic', () => {
  const columns = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Age',
      accessorKey: 'age',
    },
  ];

  const data = [
    {
      name: 'Brian',
      age: 30,
    },
    {
      name: 'Henning',
      age: 40,
    },
  ];

  // Test that the table renders the columns header and accessorKey
  it('renders table headers', () => {
    render(<TableLogic columns={columns} data={data} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
  });

  // Test that the rendered data is equal to what is in the data array
  it('renders table data', () => {
    render(<TableLogic columns={columns} data={data} />);
    expect(screen.getByText('Brian')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('Henning')).toBeInTheDocument();
    expect(screen.getByText('40')).toBeInTheDocument();
  });

  // Test that the table renders "No data available" when there is no data
  it('renders "No data available" when there is no data', () => {
    render(<TableLogic columns={columns} data={[]} />);
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });
});
}