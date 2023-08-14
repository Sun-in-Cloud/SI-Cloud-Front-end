import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import dashedLine from '../../../img/dashedLine.svg';
import { Route, useLocation, useNavigate } from 'react-router-dom';
import TableTitleWH from '../../common/TableTitleWH';

interface StyledGridProps {
  readonly columns: '2' | '3' | '4' | '5' | '6' | '7';
  readonly bkgd: 'active' | 'none';
}

const gridLayout = {
  2: '1fr 1fr',
  3: '1fr 1fr 1fr',
  4: '1fr 1fr 1fr 1fr',
  5: '1fr 1fr 1fr 1fr 1fr',
  6: '1fr 1fr 1fr 1fr 1fr 1fr',
  7: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
};

const backgroundColor = {
  active: '#fff',
  none: 'transparent',
};

const border = {
  active: 'transparent',
  none: 'transparent',
};

interface OrderList {
  orderNo: number;
  orderDate: string;
  importNo: number;
}

function TableRowOrder(props: any) {
  console.log(props.rows);
  const [num, setNum] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;

  function onDetail(detail: boolean, item: any) {
    if (detail) {
      switch (pathName) {
        case '/seller/order/list': {
          props.getOrderNo(item);
          setNum(item.orderNo);
          break;
        }
        case '/seller/import/pre': {
          props.getOrderNo(item);
          setNum(item.orderNo);
          props.onClickToggleModal();
          props.getPreImportProduct();
          break;
        }
      }
    }
    return;
  }

  return (
    <>
      <Tablerows>
        {props.rows.map((item: OrderList, index: number) => {
          return (
            <>
              <Row
                key={item.orderNo}
                columns={props.columns}
                onClick={() => onDetail(props.onDetail, item)}
                bkgd={`${num === item.orderNo ? 'active' : 'none'}`}
              >
                {props.title.map((it: string, idx: number) => {
                  return (
                    <>
                      {Object.keys(item).map((title: string, id: number) => {
                        if (it[1] === title) {
                          return <Item>{item[title as keyof OrderList]}</Item>;
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

const Row = styled.div<StyledGridProps>`
  display: grid;
  height: 33px;
  align-items: center;
  grid-template-columns: ${(props) => gridLayout[props.columns]};
  grid-auto-rows: 1fr;
  padding: 5px;
  margin: 10px 0 5px 0px;
  background-color: ${(props) => backgroundColor[props.bkgd]};
  border: ${(props) => border[props.bkgd]};
`;

const Item = styled.div`
  font-size: 15px;
  font-family: 'Jalnan';
  letter-spacing: 2px;
  padding: 5px;
`;
const Line = styled.div``;
export default TableRowOrder;

{
  /* {props.onDetail && <input type="checkbox" />} */
}
