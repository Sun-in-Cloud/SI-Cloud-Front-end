import React from 'react';
import TableTitleBk from './common/TableTitleBk';
import TableTitleWH from './common/TableTitleWH';
import { styled } from 'styled-components';

interface StyledGridProps {
  readonly colums: '2' | '3' | '4' | '5' | '6';
}

const gridLayout = {
  2: '1fr 1fr',
  3: '1fr 1fr 1fr',
  4: '1fr 1fr 1fr 1fr',
  5: '1fr 1fr 1fr 1fr 1fr',
  6: '1fr 1fr 1fr 1fr 1fr 1fr',
};

function TableColumn(props: any) {
  console.log(props.columns);
  return (
    <TableColums colums={props.columns}>
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

const TableColums = styled.div<StyledGridProps>`
  display: grid;
  grid-template-columns: ${(props) => gridLayout[props.colums]};
  align-items: center;
  justify-items: center;
  border: 1.5px solid #1e1008;
  border-radius: 10px;
  width: 100%;
  height: 60px;

  background-color: #f4f0df;
`;

export default TableColumn;
