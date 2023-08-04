import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import dashedLine from '../../../img/dashedLine.svg';
import { Route, useLocation, useNavigate } from 'react-router-dom';
import LandscapeMain from '../../LandscapeMain';
import TableTitleWH from '../../common/TableTitleWH';

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

interface OrderList {
  orderNo: number;
  orderDate: string;
  importNo: number;
}

function TableRowOrder(props: any) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  console.log(pathName);

  function onDetail(detail: boolean, item: any) {
    if (detail) {
      switch (pathName) {
        case '/seller/order/list': {
          props.getOrderNo(item);
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
              <Row key={item.orderNo} columns={props.columns} onClick={() => onDetail(props.onDetail, item)}>
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
  overflow: hidden;
  margin-top: 5px;
`;

const Row = styled.div<StyledGridProps>`
  display: grid;
  align-items: center;
  grid-template-columns: ${(props) => gridLayout[props.columns]};
  grid-auto-rows: 1fr;
  margin: 10px 0 5px 0px;
`;

const Item = styled.div`
  font-size: 15px;
  font-family: 'Jalnan';
  letter-spacing: 2px;
  padding: 10px;
`;

export default TableRowOrder;

{
  /* {props.onDetail && <input type="checkbox" />} */
}
