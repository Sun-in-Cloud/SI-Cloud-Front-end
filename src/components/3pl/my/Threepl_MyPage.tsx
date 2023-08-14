import React, { useEffect, useState } from 'react';
import MyInfo from '../../common/my/MyInfo';
import { styled } from 'styled-components';
import axios from 'axios';
import LoginBtn from '../../common/Loginbtn';
import { useAppSelect } from '../../../redux/configStore.hooks';

function Threepl_MyPage(props: any) {
  const titles: string[][] = [
    ['3PL명', 'companyName'],
    ['상품군', 'productGroupName'],
    ['사업자 번호', 'businessNo'],
    ['주소', 'address'],
    ['출고건수', 'exportCnt'],
    ['대표자명', 'ceoName'],
    ['담당자명', 'managerName'],
    ['담당자 메일', 'managerEmail'],
    ['담당자 번호', 'managerPhone'],
    ['계약 종료일', 'endDate'],
    ['전체 창고 자리', 'cntTotal'],
    ['남은 창고 자리', 'leftContract'],
    ['100박스 당 가격', 'fee'],
  ];

  const [row, setRow] = useState<any>();

  const threepl = useAppSelect((state) => state.threepl);

  async function getInfo() {
    const listurl = '/3pl/mypage/' + threepl.userNo;
    await axios
      .get(listurl, {
        params: {},
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(function (response) {
        setRow(response.data);
      })
      .catch(function (error) {
        //console.log(error);
      });
  }

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <MyPage>
      <p></p>
      <Container>
        <PageTitle>
          <Title>My Profile</Title>
          <Line></Line>
          {/* <img src={dashedLine} /> */}
        </PageTitle>
        {row && <MyInfo title={titles} rows={row} columns={titles.length}></MyInfo>}
        <BtnDiv>
          <LoginBtn variant="primary" type="landscape" onClick={() => {}}>
            수정하기
          </LoginBtn>
        </BtnDiv>
      </Container>
      <p></p>
    </MyPage>
  );
}

const MyPage = styled.div`
  margin-top: -40px;
  display: grid;
  overflow-x: hidden;
`;

const PageTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family=jalnan;
`;

const Title = styled.h1`
  font-family: jalnan;
`;

const Line = styled.div`
  width: 100%;
  border: 1px solid black;
`;

const BtnDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const Container = styled.div``;

export default Threepl_MyPage;
