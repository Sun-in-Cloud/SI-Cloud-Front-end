import React from 'react';
import TableColumn from './WMSTableColumn';
import TableRow from './WMSTableRow';
import Navbtn from '../common/Navbtn';
import { styled } from 'styled-components';

function WMSListingPage(props: any) {
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
  margin-top: 40px;
`;
const TableForm = styled.div`
  display: grid;
  margin-bottom: 10px;
`;
const Navbtns = styled.div`
  display: flex;
  justify-content: center;
`;
export default WMSListingPage;
