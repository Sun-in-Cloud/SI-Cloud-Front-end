import React from 'react';
import { useNavigate } from 'react-router';
import { styled } from 'styled-components';
import dashedLine from '../../img/dashedLine.svg';
import { Seller } from '../../global/SellerInterface';

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

// interface Seller {
//   sellerNo: number;
//   productGroup: string;
//   companyName: string;
//   businessNo: number;
//   ceoName?: string;
//   address?: string;
//   sales?: number;
//   exportCnt?: number;
//   managerName?: string;
//   managerEmail?: string;
//   managerPhone?: string;
//   marketing?: boolean;
//   mLocation?: string;
//   mEndDate?: string;
//   mCompany?: string;
//   mProductGroup?: string;
// }

interface Threepl {
  threePLNo: number;
  productGroup: string;
  companyName: string;
  businessNo: number;
  ceoName?: string;
  address?: string;
  sales?: number;
  exportCnt?: number;
  managerName?: string;
  managerEmail?: string;
  managerPhone?: string;
  marketing?: boolean;
  mLocation?: string;
  mEndDate?: string;
  mCompany?: string;
  mProductGroup?: string;
}

function WMSTableRow(props: any) {
  const navigate = useNavigate();

  function onDetail(detail: boolean, item: any) {
    if (detail) {
      if (item.sellerNo !== 0) {
        navigate('/wms/seller/' + item.sellerNo, { state: { sellerNo: `${item.sellerNo}` } });
      } else if (item.threePLNo !== 0) {
        navigate('/wms/3pl/' + item.threePLNo, { state: { threePLNo: `${item.threePLNo}` } });
      }
    }
    return;
  }

  return (
    <>
      <Tablerows>
        {props.rows.map((item: any, index: number) => {
          return (
            <>
              <Row
                key={item.sellerNo || item.threePLNo}
                columns={props.columns}
                onClick={() => onDetail(props.onDetail, item)}
              >
                {props.title.map((it: string, idx: number) => {
                  return (
                    <>
                      {Object.keys(item).map((title: string, id: number) => {
                        if (it[1] === title) {
                          return (
                            <Item>
                              {title === 'marketing'
                                ? item[title as keyof any] == true
                                  ? '구독'
                                  : '미구독'
                                : item[title as keyof any]}
                            </Item>
                          );
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
export default WMSTableRow;
