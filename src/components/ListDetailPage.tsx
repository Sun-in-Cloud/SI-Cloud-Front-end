import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import dashedLine from '../img/dashedLine.svg';
import LoginBtn from './common/Loginbtn';

interface StyledGridProps {
  readonly columns: '2' | '3' | '4' | '5' | '6' | '7';
}

const gridLayout = {
  2: '1fr 1fr',
  3: '1.3fr 1.5fr 1fr',
  4: '1fr 1fr 1fr 1fr',
  5: '1fr 1fr 1fr 1fr 1fr',
  6: '1fr 1fr 1fr 1fr 1fr 1fr',
  7: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
};

function TableDetailPage(props: any) {
  const detailInfo = props.rows;
  useEffect(() => {
    props.getDeleteProduct(detailInfo?.productNo);
  }, [detailInfo]);

  return (
    <>
      <TableDetail>
        <Row columns="3">
          <Item>
            <div style={{ fontFamily: 'KBO-Light', display: 'flex' }}>{props.titles[0][0]} : </div>
            <div style={{ display: 'flex', marginTop: '0px' }}>{detailInfo?.productNo}</div>
          </Item>
          <Item>
            <div style={{ fontFamily: 'KBO-Light', display: 'flex' }}>{props.titles[1][0]} : </div>
            <div style={{ display: 'flex', marginTop: '0px' }}>{detailInfo?.productName}</div>
          </Item>
          <Item>
            <div style={{ fontFamily: 'KBO-Light', display: 'flex' }}>{props.titles[1][0]} : </div>
            <div style={{ display: 'flex', marginTop: '1px' }}>{detailInfo?.productGroup}</div>
          </Item>
        </Row>
        <div>
          <hr style={{ border: '1.5px solid black' }} />
        </div>

        <Row columns="3">
          <Item>
            <div style={{ fontFamily: 'KBO-Light', display: 'flex' }}>{props.titles[3][0]} : </div>
            <div style={{ display: 'flex', marginTop: '-1px' }}> {detailInfo?.enoughStock}</div>
          </Item>
          <Item>
            <div style={{ fontFamily: 'KBO-Light', display: 'flex' }}>{props.titles[4][0]} : </div>
            <div style={{ display: 'flex', marginTop: '-1px' }}> {detailInfo?.safetyStock}</div>
          </Item>
          <Item>
            <div style={{ fontFamily: 'KBO-Light', display: 'flex' }}>{props.titles[5][0]} : </div>
            <div style={{ display: 'flex', marginTop: '-1px' }}> {detailInfo?.currentStock}</div>
          </Item>
        </Row>

        <div>
          <hr style={{ border: '1.5px solid #382F2D' }} />
        </div>
        <Row columns="3">
          <Item>
            <div style={{ fontFamily: 'KBO-Light', display: 'flex' }}>{props.titles[6][0]} : </div>
            <div style={{ display: 'flex', marginTop: '-1px' }}> {detailInfo?.importPrice}</div>
          </Item>
          <Item>
            <div style={{ fontFamily: 'KBO-Light', display: 'flex' }}>{props.titles[7][0]} : </div>
            <div style={{ display: 'flex', marginTop: '-1px' }}> {detailInfo?.consumerPrice}</div>
          </Item>
          <Item></Item>
        </Row>
      </TableDetail>
    </>
  );
}
const TableDetail = styled.div`
  grid-area: ListingDetailPage;
  height: 300px;
  border-radius: 10px;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 1px 2.5px -2px black;
  display: grid;
  align-items: center;
`;

const Row: any = styled.div<StyledGridProps>`
  display: grid;
  grid-template-columns: ${(props) => gridLayout[props.columns]};
  grid-auto-rows: 1fr;
  margin: 10px 10px 10px 10px;
  justify-items: start;
  align-items: center;
  width: 100%;
`;
//width 일단 막아둠

const Item = styled.div`
  display: flex;
  font-size: 18px;
  font-family: Kim;
  align-items: center;
  letter-spacing: 2px;
`;

const Title = styled.div`
  display: grid;
  align-items: center;
`;
export default TableDetailPage;
