import React from 'react';
import { styled } from 'styled-components';
import TableColumn from '../../TableColumn';
import TableTitleBk from '../../common/TableTitleBk';
import TableTitleWH from '../../common/TableTitleWH';

function SellerThreeplModal(props: any) {
  console.log(props.rows);
  return (
    <>
      <DetailThreepl>
        {props.title.map((item: any, index: number) => {
          return (
            <Row>
              <DetailName>
                <Title>{item[0]}</Title>
              </DetailName>
              {Object.keys(props.rows).map((title: string, id: number) => {
                if (item[1] === title) {
                  return <DetailValue>{props.rows[title]}</DetailValue>;
                }
              })}
            </Row>
          );
        })}
      </DetailThreepl>
    </>
  );
}
const DetailThreepl = styled.div`
  height: 90%;
  width: 90%;
  padding: 20px;
  display: grid;
`;
const Title = styled.p`
  font-family: KBO;
  display: flex;
  font-size: 16px;
  letter-spacing: 3px;
`;
const Row = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  height: 30px;
`;
const DetailName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const DetailValue = styled.div`
  display: flex;
  align-items: center;
  font-family: GmarketSansMedium;
  font-size: 15px;
  padding-left: 13px;
`;

export default SellerThreeplModal;
