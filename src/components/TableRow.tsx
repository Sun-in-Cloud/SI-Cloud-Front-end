import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import dashedLine from '../img/dashedLine.svg';
import { Route, useLocation, useNavigate } from 'react-router-dom';
import CheckBox from './common/CheckBox';

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
  8: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
  9: '150px 100px 60px 80px 160px 70px 80px 100px 150px',
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
  const location = useLocation();
  const pathName = location.pathname;

  function onDetail(detail: boolean, item: any) {
    if (detail) {
      switch (pathName) {
        case '/seller/marketing/product': {
          props.getProductNo(item.productNo);
          props.onClickToggleModal(false);
          let arr = [];
          arr.push(item.productNo);
          arr.push(item.productName);
          props.getNum(arr);
          props.initRow();
          break;
        }
        case '/seller/product': {
          navigate('/seller/product/' + item.productNo, { state: { productNo: `${item.productNo}` } });
          break;
        }
        case '/3pl/export/list': {
          navigate('/3pl/export/invoice', { state: { exportNo: `${item.exportNo}` } });
          break;
        }
      }
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
                      {it[1] === 'checkBox' ? (
                        <Box>
                          <CheckBox
                            type="checkbox"
                            name={item.productNo}
                            onChange={(e) => {
                              props.onCheckedItem(e.target.checked, item);
                            }}
                          />
                        </Box>
                      ) : (
                        ''
                      )}
                      {Object.keys(item).map((title: string, id: number) => {
                        if (it[1] === title) {
                          return <Item>{item[title as keyof Product]}</Item>;
                        }
                      })}
                    </>
                  );
                })}
              </Row>
              <Line>
                <hr style={{ border: '0.1px solid black' }} />
              </Line>
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

const Box = styled.div``;

const Row = styled.div<StyledGridProps>`
  display: grid;
  grid-template-columns: ${(props) => gridLayout[props.columns]};
  height: 33px;
  align-items: center;
  margin: 10px 0 5px 15px;
`;

const Item = styled.div`
  font-size: 15px;
  font-family: 'Jalnan';
  letter-spacing: 2px;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
const Line = styled.div``;

export default TableRow;

{
  /* {props.onDetail && <input type="checkbox" />} */
}
