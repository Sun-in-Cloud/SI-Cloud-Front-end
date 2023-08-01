import React, { useState } from 'react';
import { styled } from 'styled-components';
import ListingPage from '../ListingPage';

interface Product {
  productNo: string;
  productGroup: string;
  productName: string;
  safetyStock: number;
  currentStock: number;
  enoughStock: number;
}

function SellerProductList(props: any) {
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

  return (
    <>
      <ProductMain>
        <h1></h1>
        <ListingPage titles={titles} number={paging} rows={product} columns={columns} />
        <h1></h1>
      </ProductMain>
    </>
  );
}

const ProductMain = styled.div`
  margin-top: -40px;
  display: grid;
  grid-template-columns: 0.7fr 6.6fr 0.7fr;
  grid-template-areas: '. . ListingPage .';
`;

export default SellerProductList;
