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
    ['전체 창고 자리', 'cntTotal'],
    ['남은 창고 자리', 'leftContract'],
    ['100박스 당 가격', 'fee'],
  ];

  const [row, setRow] = useState<any>();

  const threepl = useAppSelect((state) => state.threepl);

  async function getInfo() {
    const listurl = `${process.env.REACT_APP_API_URL}/3pl/mypage/${threepl.userNo}`;
    // const listurl = `/3pl/mypage/${threepl.userNo}`;
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
      <MainTitle>
        <SubTitle>회원 정보 관리하기</SubTitle>
      </MainTitle>
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
  display: grid;
  overflow-x: hidden;
`;

const MainTitle = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  background-color: white;
  width: 100%;
  height: 120px;
  border-radius: 0 0 10px 10px;
`;

const SubTitle = styled.div`
  display: grid;
  margin-top: 75px;
  font-size: 20px;
  font-family: 'GmarketSansMedium';
`;

const PageTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.h1`
  font-family: KBO;
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

const Container = styled.div`
  padding-top: 40px;
`;

export default Threepl_MyPage;
