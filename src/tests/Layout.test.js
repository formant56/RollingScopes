import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Layout from '../pages/components/Layout/Layout';
import Search from '../pages/components/Search/Search';
import Pagination from '../pages/components/Pagination/Pagination';

jest.mock('../pages/components/Search/Search');
jest.mock('../pages/components/Pagination/Pagination');

describe('Layout Component', () => {
  const mockPaginationProps = {
    query: 'test',
    page: 2,
    limit: 5,
    responseData: {
      data: {
        data: [],
        pages: {
          numbers: [1, 2, 3],
          last: 3,
        },
      },
    },
  };

  test('renders child components and passes props', () => {
    render(
      <Layout paginationProps={mockPaginationProps}>
        <div>Test Children</div>
      </Layout>
    );

    expect(Search).toHaveBeenCalledWith(mockPaginationProps, expect.anything());
    expect(Pagination).toHaveBeenCalledWith(
      mockPaginationProps,
      expect.anything()
    );
    expect(screen.getByText('Test Children')).toBeInTheDocument();
  });

  test('renders with default props', () => {
    render(
      <Layout>
        <div>Test Children</div>
      </Layout>
    );

    expect(Search).toHaveBeenCalledWith(
      Layout.defaultProps.paginationProps,
      expect.anything()
    );
    expect(Pagination).toHaveBeenCalledWith(
      Layout.defaultProps.paginationProps,
      expect.anything()
    );
    expect(screen.getByText('Test Children')).toBeInTheDocument();
  });
});
