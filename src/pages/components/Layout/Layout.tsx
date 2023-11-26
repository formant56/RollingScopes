import React from 'react';
import Search from '../Search/Search';
import Pagination from '../Pagination/Pagination';
import { PaginationProps } from '../../utils/types';
interface LayoutProps extends React.PropsWithChildren<{}> {
  paginationProps: PaginationProps;
}

const Layout: React.FC<LayoutProps> = ({ children, paginationProps }) => {
  return (
    <>
      <Search {...paginationProps} />
      <main>{children}</main>
      <Pagination {...paginationProps} />
    </>
  );
};

Layout.defaultProps = {
  paginationProps: {
    query: '',
    page: 10,
    limit: 10,

    responseData: {
      data: {
        data: [],
        pages: {
          numbers: [],
          last: 1,
        },
      },
    },
  },
};
export default Layout;
