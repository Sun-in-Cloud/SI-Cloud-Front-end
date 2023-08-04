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
            {props.titles[0][0]} :{detailInfo?.productNo}
          </Item>
          <Item>
            {props.titles[1][0]} : {detailInfo?.productName}
          </Item>
          <Item>
            {props.titles[2][0]} : {detailInfo?.productGroup}
          </Item>
        </Row>
        <img src={dashedLine} />

        <Row columns="3">
          <Item>
            {props.titles[3][0]} : {detailInfo?.enoughStock}
          </Item>
          <Item>
            {props.titles[4][0]} : {detailInfo?.safetyStock}
          </Item>
          <Item>
            {props.titles[5][0]} : {detailInfo?.currentStock}
          </Item>
        </Row>

        <img src={dashedLine} />

        <Row columns="3">
          <Item>
            {props.titles[6][0]} : {detailInfo?.importPrice}
          </Item>
          <Item>
            {props.titles[7][0]} : {detailInfo?.consumerPrice}
          </Item>
          <Item></Item>
        </Row>
      </TableDetail>
    </>
  );
}
const TableDetail = styled.div`
  grid-area: ListingDetailPage;
  height: 80%;
  width: 100%;
  overflow: hidden;
  margin-top: 5px;
  border: 1.5px solid #1e1008;
  border-radius: 10px;
  padding: 10px;
  background-color: #f4f0df;
  display: grid;
  align-items: center;
  margin-top: 20px;
`;

const Row: any = styled.div<StyledGridProps>`
  display: grid;
  grid-template-columns: ${(props) => gridLayout[props.columns]};
  grid-auto-rows: 1fr;
  margin: 10px 10px 10px 10px;
  justify-items: start;
  width: 1000px;
`;
//width 일단 막아둠

const Item = styled.div`
  display: flex;
  font-size: 18px;
  font-family: 'Jalnan';
  letter-spacing: 2px;
`;
export default TableDetailPage;
