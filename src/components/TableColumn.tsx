import React from 'react';
import TableTitleBk from './common/TableTitleBk';
import TableTitleWH from './common/TableTitleWH';
import { styled } from 'styled-components';

function TableColumn(props: any) {
  return (
    <TableColums>
      {props.title.map((item: string, index: number) => {
        if (index % 2 === 0) {
          return (
            <TableTitleBk key={index} disabled>
              {item}
            </TableTitleBk>
          );
        } else {
          return (
            <TableTitleWH key={index} disabled>
              {item}
            </TableTitleWH>
          );
        }
      })}
    </TableColums>
  );
}

const TableColums = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
  border: 1.5px solid #1e1008;
  border-radius: 10px;
  width: 100%;
  height: 60px;

  background-color: #f4f0df;
`;

export default TableColumn;
