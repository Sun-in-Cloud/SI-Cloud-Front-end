import React, { useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import dashedLine from '../../img/dashedLine.svg';
import LoginBtn from '../common/Loginbtn';
import { Location, useLocation, useNavigate } from 'react-router-dom';
import { Order } from '../../global/OrderInterface';

interface StyledGridProps {
  readonly columns: '2' | '3' | '4' | '5' | '6' | '7';
}

const gridLayout = {
  2: '1fr 1fr',
  3: '1.2fr 1fr 1fr',
  4: '1fr 1fr 1fr 1fr',
  5: '1fr 1fr 1fr 1fr 1fr',
  6: '1fr 1fr 1fr 1fr 1fr 1fr',
  7: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
};

function Threepl_TableRow(props: any) {
  function getColumns(columns: number): string {
    let new_columns = columns;
    if (props.onDetail) {
      new_columns = columns + 1;
    }
    return String(new_columns);
  }

  const location: Location = useLocation();

  const navigate = useNavigate();

  const [checkedList, setCheckedList] = useState<Array<any>>([]);

  interface invoice {
    productNo: string;
    amount: number;
  }

  const onCheckedItem = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, item: invoice) => {
      if (e.target.checked) {
        setCheckedList((prev) => [...prev, item]);
      } else if (!e.target.checked) {
        setCheckedList(checkedList.filter((el) => el !== item));
      }
    },
    [checkedList],
  );

  useEffect(() => {
    const itemList: invoice[] = [];
    checkedList.map((value: invoice, index) => {
      itemList[index] = { productNo: value.productNo, amount: value.amount };
    });

    props.getItem(itemList);
  }, [checkedList]);

  return (
    <>
      <Tablerows>
        {props.rows.map((item: any, index: number) => {
          //console.log('=', props.title);
          return (
            <>
              <Row key={index} columns={props.columns}>
                {props.title.map((it: string, idx: number) => {
                  //console.log(it);
                  return (
                    <>
                      {Object.keys(item).map((title: string, id: number) => {
                        if (it[1] === title) {
                          return (
                            <Item
                              onClick={() => {
                                props.getItem !== undefined ? props.getItem(item) : '';
                                location.pathname === '/3pl/export/list'
                                  ? navigate('/3pl/export/invoice', { state: item })
                                  : '';
                              }}
                            >
                              {location.pathname === '/3pl/import/pre/list' &&
                              item?.importDate === null &&
                              item[title as keyof any] === item?.importDate ? (
                                <LoginBtn
                                  variant="primary"
                                  type="landscape"
                                  onClick={() => {
                                    console.log('입고');
                                    navigate('/3pl/import/pre/register', { state: item });
                                  }}
                                >
                                  입고
                                </LoginBtn>
                              ) : location.pathname === '/3pl/import/pre/list' &&
                                item?.importDate !== null &&
                                item[title as keyof any] === item?.importDate ? (
                                ''
                              ) : (
                                item[title as keyof any]
                              )}
                            </Item>
                          );
                        }
                      })}
                    </>
                  );
                })}
                {props.onDetail && location.pathname === '/3pl/export/invoice' && item?.invoiceNo === null && (
                  <ChkBox type="checkbox" onChange={(e) => onCheckedItem(e, item)} />
                )}
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
  overflow-y: scroll;
  overflow-x: hidden;
  margin-top: 5px;
`;

const Row = styled.div<StyledGridProps>`
  display: grid;
  grid-template-columns: ${(props) => gridLayout[props.columns]};
  margin: 10px 0 5px 0;
  align-items: center;
  justify-items: center;
`;

const Item = styled.div`
  font-size: 15px;
  font-family: 'Jalnan';
  letter-spacing: 2px;
`;

const ChkBox = styled.input`
  appearance: none;
  border: 1.5px solid gainsboro;
  border-radius: 0.35rem;
  width: 1.5rem;
  height: 1.5rem;

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #0073ff;
  }
`;

export default Threepl_TableRow;
