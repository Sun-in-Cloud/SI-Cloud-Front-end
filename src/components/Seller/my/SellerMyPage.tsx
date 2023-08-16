import React, { useCallback, useEffect, useState } from 'react';
import MyInfo from '../../common/my/MyInfo';
import { styled } from 'styled-components';
import axios from 'axios';
import LoginBtn from '../../common/Loginbtn';
import { useAppSelect } from '../../../redux/configStore.hooks';
import SellerThreeplModal from '../match/SellerThreeplModal';
import Modal from '../../common/Modal';

function SellerMyPage(props: any) {
  const titles: string[][] = [
    ['화주사명', 'companyName'],
    ['상품군', 'productGroupName'],
    ['사업자 번호', 'businessNo'],
    ['주소', 'address'],
    ['매출', 'sales'],
    ['출고건수', 'exportCnt'],
    ['대표자명', 'ceoName'],
    ['담당자명', 'managerName'],
    ['담당자 메일', 'managerEmail'],
    ['담당자 번호', 'managerPhone'],
    ['마케팅 구독 여부', 'marketing'],
    ['매칭여부', 'matching'],
  ];

  const detailColumns: string[][] = [
    ['3PL명', 'companyName'],
    ['상품군', 'productGroupName'],
    ['대표자명', 'ceoName'],
    ['주소', 'address'],
    ['이메일', 'managerEmail'],
    ['연락처', 'managerPhone'],
    ['전체자리', 'cntTotal'],
    ['남은자리', 'leftContract'],
    ['사용료', 'fee'],
  ];

  const [row, setRow] = useState<any>();
  const [detail, setDetail] = useState<any>();
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);

  const seller = useAppSelect((state) => state.seller);

  const onClickToggleDetailModal = useCallback(() => {
    setIsDetailOpen(!isDetailOpen);
  }, [isDetailOpen]);

  //seller 본인의 정보 가져오기
  async function getInfo() {
    //const listurl = `${process.env.REACT_APP_API_URL}/seller/mypage/${seller.userNo}`;
    const listurl = `/seller/mypage/${seller.userNo}`;
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

  //매칭 3pl 정보 가져오기
  async function get3PLInfo() {
    console.log(seller);
    //const listurl = `${process.env.REACT_APP_API_URL}/seller/mypage/3pl/${seller.userNo}`;
    const listurl = `/seller/mypage/3pl/${seller.userNo}`;
    await axios
      .get(listurl, {
        params: {},
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(function (response) {
        setDetail(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        //console.log(error);
      });
  }

  useEffect(() => {
    getInfo();
    get3PLInfo();
  }, []);

  return (
    <>
      {isDetailOpen && (
        <Modal onClickToggleModal={onClickToggleDetailModal}>
          <SellerThreeplModal
            onClickToggleModal={onClickToggleDetailModal}
            title={detailColumns}
            rows={detail}
            columns={detailColumns.length}
            setClose={setIsDetailOpen}
          ></SellerThreeplModal>
        </Modal>
      )}
      <MyPage>
        <p></p>
        <Container>
          <PageTitle>
            <Title>My Profile</Title>
            <Line></Line>
          </PageTitle>
          {row && <MyInfo title={titles} rows={row} columns={titles.length} setOpen={setIsDetailOpen}></MyInfo>}
          <BtnDiv>
            <LoginBtn variant="primary" type="landscape" onClick={() => {}}>
              수정하기
            </LoginBtn>
          </BtnDiv>
        </Container>
        <p></p>
      </MyPage>
    </>
  );
}

const MyPage = styled.div`
  padding-top: 35px;
  background-color: #f4f0ed;
  border-radius: 15px 15px 0 0;
  height: 92%;
  display: grid;
  padding-bottom: 20px;
  grid-template-columns: 0.7fr 5fr 0.7fr;
  column-gap: 10px;
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

export default SellerMyPage;
