import React from 'react';
import { styled } from 'styled-components';
import dashedLine from '../img/dashedLine.svg';

function TableRow(props: any) {
  console.log(props.content);
  return (
    <>
      <Tablerows>
        {props.content.map((item: string[], index: number) => {
          const length = item.length;
          return (
            <>
              <Row>
                <Item>{item[0]}</Item>
                <Item>{item[1]}</Item>
                <Item>{item[2]}</Item>
                <Item>{item[3]}</Item>
                <Item>{item[4]}</Item>
                <Item>{item[5]}</Item>
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

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-auto-rows: 1fr;
  margin: 10px 0 5px 0;
`;
// 몇개인지에 따라 다르게 보여야 함..

const Item = styled.div`
  font-size: 15px;
  font-family: 'Jalnan';
  letter-spacing: 2px;
`;

export default TableRow;
