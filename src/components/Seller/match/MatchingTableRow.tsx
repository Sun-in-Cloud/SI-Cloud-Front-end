import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from 'styled-components';
import dashedLine from '../../../img/dashedLine.svg';
import { Route, useLocation, useNavigate } from 'react-router-dom';
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

interface MatchingOpt {
  threePLNo: number;
  companyName: string;
  productGroup: string;
  endDate: string;
  leftPos: number;
}

function MatchingTableRow(props: any) {
  async function getThreeplDetail(company: number) {
    const listurl = '/seller/match/' + company;
    await axios
      .get(listurl)
      .then(function (response) {
        props.setDetail(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const navigate = useNavigate();

  function onDetail(detail: boolean, item: MatchingOpt) {
    if (detail) {
      getThreeplDetail(item.threePLNo);
    }
    return;
  }

  return (
    <>
      <Tablerows>
        {props.rows.map((item: MatchingOpt, index: number) => {
          return (
            <>
              <Row columns={props.columns} onClick={() => onDetail(props.onDetail, item)}>
                {props.title.map((it: string, idx: number) => {
                  return (
                    <>
                      {Object.keys(item).map((title: string, id: number) => {
                        if (it[1] === title) {
                          if (!item['endDate'] && title === 'endDate') {
                            return <Item>즉시가능</Item>;
                          }
                          return <Item>{item[title as keyof MatchingOpt]}</Item>;
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
  overflow: hidden;
`;

const Row = styled.div<StyledGridProps>`
  display: grid;
  align-items: center;
  height: 33px;
  grid-template-columns: ${(props) => gridLayout[props.columns]};
  grid-auto-rows: 1fr;
  margin: 10px 0 5px 0;
`;

const Item = styled.div`
  font-size: 15px;
  font-family: GmarketSansMedium;
  letter-spacing: 2px;
`;
const Line = styled.div``;
export default MatchingTableRow;
