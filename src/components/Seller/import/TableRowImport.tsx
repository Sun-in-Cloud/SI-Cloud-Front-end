import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import dashedLine from '../../../img/dashedLine.svg';
import { Route, useNavigate } from 'react-router-dom';
import LandscapeMain from '../../LandscapeMain';
import TableTitleWH from '../../common/TableTitleWH';
import CheckBox from '../../common/CheckBox';
import RegisterNew from '../../common/RegisterNew';
import InputAmount from '../../common/InputAmount';

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

interface PreDetailList {
  productNo: string;
  importNo: number;
  amount: number;
}

function TableRowImport(props: any) {
  // console.log(props.rows);
  const [num, setNum] = useState(0);

  const navigate = useNavigate();

  function onDetail(detail: boolean, item: PreDetailList) {
    if (detail) {
      props.getOrderNo(item.importNo);
      setNum(item.importNo);
    }
    return;
  }

  return (
    <>
      <Tablerows>
        {props.rows.map((item: PreDetailList, index: number) => {
          return (
            <>
              <Row key={item.productNo} columns={props.columns} onClick={() => onDetail(props.onDetail, item)}>
                {props.title.map((it: string, idx: number) => {
                  return (
                    <>
                      {it[1] === 'requestAmount' ? (
                        <Box>
                          <InputAmount
                            type="number"
                            name={item.productNo}
                            onChange={(e) => {
                              props.onImportProduct(item, e.target.value);
                            }}
                          />
                        </Box>
                      ) : (
                        ''
                      )}
                      {Object.keys(item).map((title: string, id: number) => {
                        if (!item['amount']) {
                          item['amount'] = 0;
                        }
                        if (it[1] === title) {
                          if (title === 'isImported') {
                            if (item[title as keyof PreDetailList]) {
                              return <Item>완료</Item>;
                            } else {
                              return <Item>준비중</Item>;
                            }
                          }
                          return <Item>{item[title as keyof PreDetailList]}</Item>;
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
const Box = styled.div``;
const Row = styled.div<StyledGridProps>`
  display: grid;
  grid-template-columns: ${(props) => gridLayout[props.columns]};
  grid-auto-rows: 1fr;
  align-items: center;
  margin: 15px 0 5px 15px;
`;

const Item = styled.div`
  font-size: 15px;
  font-family: 'Jalnan';
  letter-spacing: 2px;
`;

export default TableRowImport;
