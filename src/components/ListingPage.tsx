import React from 'react';
import Navbtn from './common/Navbtn';
import { styled } from 'styled-components';
import TableColumn from './TableColumn';
import TableRow from './TableRow';

function ListingPage(props: any) {
  console.log(props.titles);
  console.log(props.number);
  console.log(props.rows);
  console.log(props.columns);

  return (
    <div>
      <TableForm>
        <TableColumn title={props.titles} columns={props.columns} />
        <TableRow rows={props.rows} columns={props.columns} />
      </TableForm>
      <Navbtns>
        <Navbtn number={props.number} />
      </Navbtns>
    </div>
  );
}
const TableForm = styled.div`
  display: grid;
  margin-bottom: 10px;
`;
const Navbtns = styled.div`
  display: flex;
  justify-content: center;
`;
export default ListingPage;
