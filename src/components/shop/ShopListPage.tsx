import React from 'react';
import { styled } from 'styled-components';
import TableColumn from '../TableColumn';
import TableRow from '../TableRow';

function ShopListPage(props: any) {
  return (
    <TableList>
      <TableForm>
        <TableColumn title={props.titles} columns={props.columns} />
        <TableRow title={props.titles} rows={props.rows} columns={props.columns} onDetail={props.onDetail} />
      </TableForm>
    </TableList>
  );
}

const TableList = styled.div`
  grid-area: ListingPage, ListingPage;
`;
const TableForm = styled.div`
  display: grid;
  margin-bottom: 10px;
`;
const Navbtns = styled.div`
  display: flex;
  justify-content: center;
`;
export default ShopListPage;
