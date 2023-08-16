import React, { useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import dashedLine from '../../img/dashedLine.svg';
import LoginBtn from '../common/Loginbtn';
import { Location, useLocation, useNavigate } from 'react-router-dom';
import { Order } from '../../global/OrderInterface';

interface StyledGridProps {
  readonly columns: '2' | '3' | '4' | '5' | '6' | '7';
  readonly bkgd: 'active' | 'none';
}

const gridLayout = {
  2: '1fr 1.5fr',
  3: '1.5fr 1.5fr 1fr',
  4: '1fr 1fr 1fr 1fr',
  5: '1fr 1fr 1fr 1fr 1fr',
  6: '1fr 1fr 1fr 1fr 1fr 1fr',
  7: '200px 230px 80px 150px 150px 120px 50px',
  // 7: '1.5fr 1.5fr 0.5fr 1fr 1.5fr 1fr 0.5fr',
};

const backgroundColor = {
  active: '#fff',
  none: 'transparent',
};

const border = {
  active: 'transparent',
  none: 'transparent',
};

function Threepl_TableRow(props: any) {
  const location: Location = useLocation();

  const navigate = useNavigate();

  const [num, setNum] = useState(0);
  const [checkedList, setCheckedList] = useState<Array<any>>([]);

  interface invoice {
    productNo: string;
    productName: string;
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
      itemList[index] = { productNo: value.productNo, productName: value.productName, amount: value.amount };
    });
    if (location.pathname.includes('export/invoice')) {
      props.getItem(itemList);
    }
  }, [checkedList]);

  useEffect(() => {
    setCheckedList([]);
  }, [props.rows]);

  return (
    <>
      <Tablerows>
        {props.rows.map((item: any, index: number) => {
          //console.log('=', props.title);
          return (
            <>
              <Row
                key={index}
                columns={props.columns}
                bkgd={`${num === item.orderNo || num === item.importNo ? 'active' : 'none'}`}
              >
                {props.title.map((it: string, idx: number) => {
                  //console.log(it);
                  return (
                    <>
                      {Object.keys(item).map((title: string, id: number) => {
                        if (it[1] === title) {
                          return (
                            <Item
                              onClick={() => {
                                if (props.getItem !== undefined) {
                                  props.getItem(item);
                                  if (item.orderNo !== undefined) setNum(item.orderNo);
                                  else if (item.importNo !== undefined) setNum(item.importNo);
                                }
                                location.pathname === '/3pl/export/list'
                                  ? navigate('/3pl/export/invoice', { state: item })
                                  : '';
                              }}
                            >
                              {item[title as keyof any]}
                            </Item>
                          );
                        }
                      })}
                    </>
                  );
                })}
                {location.pathname === '/3pl/import/pre/list' && item?.isImported === false ? (
                  <BtnBox>
                    <LoginBtn
                      variant="primary"
                      type="landscape"
                      onClick={() => {
                        console.log('입고');
                        navigate('/3pl/import/pre/register', { state: { item: item, sellerNo: props.sellerNo } });
                      }}
                    >
                      입고
                    </LoginBtn>
                  </BtnBox>
                ) : (
                  location.pathname === '/3pl/import/pre/list' && item?.importNo !== null && ''
                )}
                {props.onDetail && location.pathname === '/3pl/export/invoice' && item?.invoiceNo === null && (
                  <ChkBox type="checkbox" onChange={(e) => onCheckedItem(e, item)} />
                )}

                {props.onDetail && location.pathname === '/3pl/match/list' && item?.endDate === null && (
                  <BtnBox>
                    <LoginBtn
                      variant="primary"
                      type="landscape"
                      onClick={() => {
                        props.onContract(item.sellerNo, item.companyName);
                      }}
                    >
                      계약하기
                    </LoginBtn>
                  </BtnBox>
                )}
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
  vertical-align: middle;
`;

const Row = styled.div<StyledGridProps>`
  display: grid;
  grid-template-columns: ${(props) => gridLayout[props.columns]};
  width: 100%;
  height: 33px;
  align-items: center;
  padding: 5px;
  margin: 10px 0 5px 0px;
  background-color: ${(props) => backgroundColor[props.bkgd]};
  border: ${(props) => border[props.bkgd]};
`;

const Item = styled.div`
  font-size: 15px;
  font-family: 'GmarketSansMedium';
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

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  height: 30px;
`;

const Line = styled.div``;

export default Threepl_TableRow;
