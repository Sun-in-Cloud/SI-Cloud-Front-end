import React from 'react';
import { styled } from 'styled-components';
import TableTitleBk from '../TableTitleBk';
import TableTitleWH from '../TableTitleWH';
import LoginBtn from '../Loginbtn';
import { useNavigate } from 'react-router-dom';

function MyInfo(props: any) {
  const navigate = useNavigate();
  return (
    <InfoContainer>
      <DetailThreepl>
        {props.title.map((item: any, index: number) => {
          return (
            <Row>
              <DetailName>{item[0]} </DetailName>
              {Object.keys(props.rows).map((title: string, id: number) => {
                let matchingItem = { companyName: '', location: '', endDate: '' };
                if (props.getItem !== undefined && title === 'companyName') props.getItem(props.rows[title]);
                if (props.rows['matching'] !== null) {
                  matchingItem = props.rows['matching'];
                }
                if (item[1] === title) {
                  return (
                    <DetailValue>
                      |{' '}
                      {title === 'marketing' ? (
                        props.rows[title] == true ? (
                          '구독'
                        ) : (
                          '미구독'
                        )
                      ) : title === 'matching' ? (
                        item[title as keyof any] === null ? (
                          ''
                        ) : (
                          <MatchingBox>
                            <p>{matchingItem.companyName !== '' ? matchingItem.companyName : ''}</p>
                            <p>{matchingItem.location !== '' ? '보관 위치: ' + matchingItem.location : ''}</p>
                            <p>{matchingItem.endDate !== '' ? '종료일: ' + matchingItem.endDate : ''}</p>
                            <LoginBtn
                              onClick={() => {
                                props.setOpen(true);
                              }}
                              variant="dark"
                              type="landscape"
                              style={{ height: '10px' }}
                            >
                              상세보기
                            </LoginBtn>
                          </MatchingBox>
                        )
                      ) : (
                        // Object.keys(matchingItem).map((match: any, id: number) => {
                        //   <p>matchingItem[match]</p>;
                        // })
                        props.rows[title]
                      )}
                    </DetailValue>
                  );
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
  align-items: flex-start;
  font-family: 'Dotum_Medium';
`;
const DetailValue = styled.div`
  display: flex;
  width: 100%;
  font-family: 'Dotum_Medium';
  align-items: flex-start;
  text-align: left;
`;

const Cloud = styled.img`
  width: 50px;
  z-index: 1;
`;

const MatchingBox = styled.div`
  display: grid;
  grid-template-rows: 25px 25px 25px 25px;
  align-items: center;
  margin-left: 3px;
`;
export default MyInfo;
