import React, { useState } from 'react';
import { styled } from 'styled-components';
import ListingPage from '../../ListingPage';
import LoginBtn from '../../common/Loginbtn';
import { useNavigate } from 'react-router-dom';

interface Product {
  productNo: string;
  productGroup: string;
  productName: string;
  safetyStock: number;
  currentStock: number;
  enoughStock: number;
}

function SellerProductList(props: any) {
  const style = props.style;
  console.log(style);
  const [product, setProduct] = useState<Product[] | null>([
    {
      productNo: '0101010',
      productGroup: '바지',
      productName: '귀여운 핑크바지',
      safetyStock: 10,
      currentStock: 15,
      enoughStock: 12,
    },
    {
      productNo: '111111',
      productGroup: '바지',
      productName: '귀여운 파란바지',
      safetyStock: 10,
      currentStock: 15,
      enoughStock: 12,
    },
    {
      productNo: '22222222',
      productGroup: '바지',
      productName: '귀여운 파란바지',
      safetyStock: 10,
      currentStock: 15,
      enoughStock: 12,
    },
    {
      productNo: '333333',
      productGroup: '바지',
      productName: '귀여운 파란바지',
      safetyStock: 10,
      currentStock: 15,
      enoughStock: 12,
    },
    {
      productNo: '444444',
      productGroup: '바지',
      productName: '귀여운 파란바지',
      safetyStock: 10,
      currentStock: 15,
      enoughStock: 12,
    },
    {
      productNo: '555555',
      productGroup: '바지',
      productName: '귀여운 파란바지',
      safetyStock: 10,
      currentStock: 15,
      enoughStock: 12,
    },
    {
      productNo: '6666666',
      productGroup: '바지',
      productName: '귀여운 파란바지',
      safetyStock: 10,
      currentStock: 15,
      enoughStock: 12,
    },
    {
      productNo: '777778',
      productGroup: '바지',
      productName: '귀여운 파란바지',
      safetyStock: 10,
      currentStock: 15,
      enoughStock: 12,
    },
    {
      productNo: '8888888',
      productGroup: '바지',
      productName: '귀여운 파란바지',
      safetyStock: 10,
      currentStock: 15,
      enoughStock: 12,
    },
    {
      productNo: '999999',
      productGroup: '바지',
      productName: '귀여운 파란바지',
      safetyStock: 10,
      currentStock: 15,
      enoughStock: 12,
    },
  ]);

  const titles: string[] = ['바코드 번호', '상품군', '상품명', '안전재고', '현재재고', '안전재고'];
  const paging: number[] = [0, 1, 2, 3, 4, 5];
  const columns: number = titles.length;
  const sellerNo: number = 30123123;

  function StyleType(style: any) {
    if (style == 'portrait') {
      return 'portrait';
    } else {
      return 'landscape';
    }
  }

  const navigate = useNavigate();

  function registerProduct() {
    console.log('새로 등록하기');
    navigate('/seller/product/register');
  }

  return (
    <>
      <ProductMain>
        <Buttons>
          <LoginBtn variant="primary" type={StyleType(style)} onClick={() => registerProduct()}>
            등록하기
          </LoginBtn>
        </Buttons>
        <ListingPage
          titles={titles}
          number={paging}
          rows={product}
          columns={columns}
          sellerNo={sellerNo}
          onDetail={true}
        />
      </ProductMain>
    </>
  );
}

const ProductMain = styled.div`
  margin-top: -65px;
  display: grid;
  grid-template-columns: 0.7fr 6.6fr 0.7fr;
  grid-template-rows: 0.7fr 8fr;
  grid-template-areas: '. Buttons .' '. ListingPage .';
  z-index: 2;
`;

const Buttons = styled.div`
  grid-area: Buttons;
  display: grid;
  justify-content: end;
  align-items: center;
  margin-left: 13px;
  margin-right: 13px;
`;

export default SellerProductList;
