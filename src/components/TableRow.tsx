import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import dashedLine from '../img/dashedLine.svg';
import { Route, useNavigate } from 'react-router-dom';
import LandscapeMain from './LandscapeMain';
import TableTitleWH from './common/TableTitleWH';

interface StyledGridProps {
  readonly columns: '2' | '3' | '4' | '5' | '6' | '7';
}

const gridLayout = {
  2: '1fr 1fr',
  3: '1fr 1fr 1fr',
  4: '1fr 1fr 1fr 1fr',
  5: '1fr 1fr 1fr 1fr 1fr',
  6: '1fr 1fr 1fr 1fr 1fr 1fr',
  7: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
};

interface Product {
  productNo: string;
  productGroup: string;
  productName: string;
  safetyStock: number;
  currentStock: number;
  enoughStock: number;
}

function TableRow(props: any) {
  const navigate = useNavigate();

  // function getColumns(columns: number): string {
  //   let new_columns = columns;
  //   if (props.onDetail) {
  //     new_columns = columns + 1;
  //   }
  //   return String(new_columns);
  // } // checkbox 만드는 용

  function onDetail(detail: boolean, item: Product) {
    const productNo = item.productNo;
    console.log('productNo : ' + productNo);
    if (detail) {
      navigate('/seller/product/' + productNo, { state: { productNo: productNo } });
    }
    return;
  }

  return (
    <>
      <Tablerows>
        {props.rows.map((item: Product, index: number) => {
          return (
            <>
              <Row key={item.productNo} columns={props.columns} onClick={() => onDetail(props.onDetail, item)}>
                {props.title.map((it: string, idx: number) => {
                  return (
                    <>
                      {Object.keys(item).map((title: string, id: number) => {
                        if (it[1] === title) {
                          return <Item>{item[title as keyof Product]}</Item>;
                        }
                      })}
                    </>
                  );
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
  height: 400px;
  width: 100%;
  overflow-x: hidden;
  margin-top: 5px;
`;

const Row = styled.div<StyledGridProps>`
  display: grid;
  grid-template-columns: ${(props) => gridLayout[props.columns]};
  grid-auto-rows: 1fr;
  lign-items: center;
  margin: 15px 0 5px 15px;
`;

const Item = styled.div`
  font-size: 15px;
  font-family: 'Jalnan';
  letter-spacing: 2px;
`;

export default TableRow;

{
  /* {props.onDetail && <input type="checkbox" />} */
}
