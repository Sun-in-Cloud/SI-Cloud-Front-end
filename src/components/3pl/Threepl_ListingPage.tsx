import React from 'react';
import Navbtn from '../common/Navbtn';
import { styled } from 'styled-components';
import TableColumn from './Threepl_TableColumn';
import TableRow from './Threepl_TableRow';

function Threepl_ListingPage(props: any) {
  return (
    <TableList>
      <TableForm>
        <TableColumn title={props.titles} columns={props.columns} />
        <TableRow
          sellerNo={props.sellerNo}
          title={props.titles}
          rows={props.rows}
          columns={props.columns}
          onDetail={props.onDetail}
          getItem={props.getItem}
          onContract={props.onContract}
        />
      </TableForm>
      {props.number != null && (
        <Navbtns>
          <Navbtn number={props.number} navPage={props.navPage} />
        </Navbtns>
      )}
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

export default Threepl_ListingPage;
