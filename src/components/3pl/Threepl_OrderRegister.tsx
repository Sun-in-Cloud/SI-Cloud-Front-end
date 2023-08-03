import React from 'react';
import ListingPage from '../ListingPage';
import LoginBtn from '../common/Loginbtn';
import { styled } from 'styled-components';

function Threepl_OrderRegister(props: any) {
  const columns: string[] = ['바코드 번호', '상품명', '충분재고', '안전재고', '현재재고', '발주량'];
  const rows = [
    { productNo: 12312542, productName: '2023-02-03', safetyStock: 15, currentStock: 20, enoughStock: 14, amount: 10 },
  ];

  const onClickRegister = () => {
    console.log('등록');
  };
  return (
    <MainPage>
      <Btn>
        <LoginBtn variant="primary" type="landscape" onClick={onClickRegister}>
          등록
        </LoginBtn>
      </Btn>
      <ListingPage
        sellerNo={props.seller}
        titles={columns}
        number={[0, 1, 2, 3]}
        rows={rows}
        columns={columns.length}
        onDetail={false}
      />
    </MainPage>
  );
}

const MainPage = styled.div`
  display: grid;
  grid-template-rows: 0.1fr 0.9fr;
  //   grid-template-areas: 'LoginBtn ListingPage';
`;

const Btn = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export default Threepl_OrderRegister;
