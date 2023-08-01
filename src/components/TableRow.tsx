import React from 'react';
import { styled } from 'styled-components';
import dashedLine from '../img/dashedLine.svg';

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

function TableRow(props: any) {
  return (
    <>
      <Tablerows>
        {props.rows.map((item: any, index: number) => {
          console.log(item);
          return (
            <>
              <Row key={index} colums={props.columns}>
                {Object.values(item).map((value: any, idx: number) => {
                  return <Item key={idx}>{value}</Item>;
                })}
              </Row>
              <img src={dashedLine} />
            </>
          );
        })}
      </Tablerows>
    </>
  );
}

const Tablerows = styled.div`
  height: 500px;
  width: 100%;
  overflow: hidden;
  margin-top: 5px;
`;

const Row = styled.div<StyledGridProps>`
  display: grid;
  grid-template-columns: ${(props) => gridLayout[props.colums]};
  grid-auto-rows: 1fr;
  margin: 10px 0 5px 0;
`;

const Item = styled.div`
  font-size: 15px;
  font-family: 'Jalnan';
  letter-spacing: 2px;
`;

export default TableRow;
