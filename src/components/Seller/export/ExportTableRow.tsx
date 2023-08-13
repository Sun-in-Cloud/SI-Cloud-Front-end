import React, { useEffect, useState } from 'react';
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

interface ExportList {
  exportNo: number;
  ordererName: string;
  address: string;
  salesChannel: string;
  orderStatus: string;
}

interface DetailExportList {
  productNo: number;
  productName: string;
  amount: number;
  exportDate: string;
  invoiceNo: number;
  orderStatus: string;
  sellingPrice: number;
}

function ExportTableRow(props: any) {
  const navigate = useNavigate();
  function onDetail(detail: boolean, item: any) {
    const exportNo = item.exportNo;
    console.log(exportNo);

    if (detail) {
      navigate('/seller/export/' + exportNo, { state: { exportNo: exportNo } });
    }
    return;
  }

  return (
    <>
      <Tablerows>
        {props.rows.map((item: any, index: number) => {
          return (
            <>
              <Row columns={props.columns} onClick={() => onDetail(props.onDetail, item)}>
                {props.title.map((it: string, idx: number) => {
                  return (
                    <>
                      {Object.keys(item).map((title: string, id: number) => {
                        if (it[1] === title) {
                          return <Item>{item[title as keyof ExportList]}</Item>;
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
  margin-top: 5px;
`;

const Row = styled.div<StyledGridProps>`
  display: grid;
  grid-template-columns: ${(props) => gridLayout[props.columns]};
  grid-auto-rows: 33px;
  margin: 10px 0 5px 0;
  align-items: center;
`;

const Item = styled.div`
  font-size: 15px;
  font-family: 'Jalnan';
  letter-spacing: 2px;
`;

const Line = styled.div``;

export default ExportTableRow;

{
  /* {props.onDetail && <input type="checkbox" />} */
}
