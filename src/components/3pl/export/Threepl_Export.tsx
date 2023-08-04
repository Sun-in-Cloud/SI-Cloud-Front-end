import React from 'react';
import Threepl_ListingPage from '../Threepl_ListingPage';
import LoginBtn from '../../common/Loginbtn';
import { styled } from 'styled-components';

function Threepl_Export(props: any) {
  const columns: string[] = ['주문 번호', '주문자 이름', '주소', '판매채널', '주문상태'];

  const rows: any = [
    {
      exportNo: '0234101010',
      ordererName: '노성은',
      address: '고양시 일산동구 풍동',
      salesChannel: '인터파크',
      orderStatus: '대기중',
    },
  ];

  return (
    <MainPage>
      <Btn>
        <LoginBtn variant="primary" type="landscape">
          주문 수집
        </LoginBtn>
      </Btn>
      <Threepl_ListingPage
        sellerNo={props.seller}
        titles={columns}
        number={[0, 1, 2, 3]}
        rows={rows}
        columns={columns.length}
        onDetail={true}
      />
    </MainPage>
  );
}

const MainPage = styled.div`
  display: grid;
  grid-template-rows: 0.1fr 0.9fr;
`;
const Btn = styled.div`
  display: flex;
  justify-content: flex-start;
`;
export default Threepl_Export;
