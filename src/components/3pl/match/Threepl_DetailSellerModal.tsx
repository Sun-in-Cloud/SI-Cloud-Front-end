import React from 'react';
import { styled } from 'styled-components';
import TableTitleBk from '../../common/TableTitleBk';
import TableTitleWH from '../../common/TableTitleWH';

function Threepl_DetailSellerModal(props: any) {
  console.log(props.rows);
  return (
    <>
      <DetailThreepl>
        {props.title.map((item: any, index: number) => {
          return (
            <Row>
              {index % 2 === 0 ? (
                (index + 1) % 4 === 1 ? (
                  <DetailName>
                    <TableTitleBk>{item[0]}</TableTitleBk>
                  </DetailName>
                ) : (
                  <DetailName>
                    <TableTitleWH>{item[0]}</TableTitleWH>
                  </DetailName>
                )
              ) : index % 4 === 1 ? (
                <DetailName>
                  <TableTitleWH>{item[0]}</TableTitleWH>
                </DetailName>
              ) : (
                <DetailName>
                  <TableTitleBk>{item[0]}</TableTitleBk>
                </DetailName>
              )}
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
  grid-template-columns: 2fr 2fr;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
`;
const DetailName = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const DetailValue = styled.div`
  display: flex;
  width: 100%;
  font-family: 'Jalnan';
  align-items: center;
  text-align: left;
`;

export default Threepl_DetailSellerModal;
