import React from 'react';
import Navbtn from './common/Navbtn';
import { styled } from 'styled-components';
import TableColumn from './TableColumn';
import TableRow from './TableRow';

function ListingPage(props: any) {
  return (
    <TableList>
      <TableForm>
        <TableColumn title={props.titles} columns={props.columns} />
        <TableRow title={props.titles} rows={props.rows} columns={props.columns} onDetail={props.onDetail} />
      </TableForm>
      <Navbtns>
        <Navbtn number={props.number} navPage={props.navPage} />
      </Navbtns>
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
export default ListingPage;
