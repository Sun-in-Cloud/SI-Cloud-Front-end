import React from 'react';
import { styled } from 'styled-components';
import TableTitleBk from '../TableTitleBk';
import TableTitleWH from '../TableTitleWH';

function MyInfo(props: any) {
  return (
    <InfoContainer>
      <DetailThreepl>
        {props.title.map((item: any, index: number) => {
          return (
            <Row>
              <DetailName>{item[0]} </DetailName>
              {Object.keys(props.rows).map((title: string, id: number) => {
                if (props.getItem !== undefined && title === 'companyName') props.getItem(props.rows[title]);
                if (item[1] === title) {
                  return <DetailValue>| {props.rows[title]}</DetailValue>;
                }
              })}
            </Row>
          );
        })}
      </DetailThreepl>
    </InfoContainer>
  );
}

const InfoContainer = styled.div`
  overflow-x: hidden;
`;
const DetailThreepl = styled.div`
  height: 90%;
  width: 70%;
  padding: 20px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
`;
const DetailName = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: 'Dotum_Medium';
`;
const DetailValue = styled.div`
  display: flex;
  width: 100%;
  font-family: 'Dotum_Medium';
  align-items: center;
  text-align: left;
`;

const Cloud = styled.img`
  width: 50px;
  z-index: 1;
`;
export default MyInfo;
