import React from 'react';
import Navbtn from './common/Navbtn';
import { styled } from 'styled-components';
import TableColumn from './TableColumn';
import TableRow from './TableRow';

function ListingPage(props: any) {
  // console.log(props.titles); // columns name
  console.log('total + ' + props.number); // page number
  // console.log(props.rows); // row data
  // console.log(props.columns); //colums number
  // console.log(props.sellerNo); //seller number
  // console.log(props.onDetail); // 바코드 번호로 상세보기 봐야하나?

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
  grid-area: ListingPage;
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
