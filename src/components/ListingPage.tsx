import React from 'react';
import Navbtn from './common/Navbtn';
import { styled } from 'styled-components';
import TableColumn from './TableColumn';
import TableRow from './TableRow';

function ListingPage(props: any) {
  console.log(props.titles); // columns name
  console.log(props.number); // page number
  console.log(props.rows); // row data
  console.log(props.columns); //colums number
  console.log(props.sellerNo); //seller number
  console.log(props.onDetail); // 바코드 번호로 상세보기 봐야하나?

  // function getColums(column: any) {
  //   let new_columns = Number(column);
  //   if (props.onDetail) {
  //     new_columns += 1;
  //   }
  //   console.log(new_columns);
  //   return new_columns;
  // }

  return (
    <TableList>
      <h1>{props.sellerNo}</h1>
      <TableForm>
        <TableColumn title={props.titles} columns={props.columns} />
        <TableRow rows={props.rows} columns={props.columns} onDetail={props.onDetail} />
      </TableForm>
      <Navbtns>
        <Navbtn number={props.number} />
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
