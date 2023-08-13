import React, { useEffect, useState } from 'react';
import ShopHeader from './ShopHeader';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { styled } from 'styled-components';
import LoginBtn from '../common/Loginbtn';
import ListingPage from '../ListingPage';

interface Product {
  exportNo: string;
  address: string;
  ordererName: string;
  productName: string;
  productNo: string;
  sellingPrice: string;
  localOrderDate: string;
  orderStatus: string;
  invoceNo: string;
}
function ShopingList(props: any) {
  const [product, setProduct] = useState<Product[] | null>([]);
  const [totalPage, setTotalPage] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const titles: string[][] = [
    ['출고번호', 'exportNo'],
    ['주소', 'address'],
    ['주문자', 'ordererName'],
    ['상품명', 'productName'],
    ['상품번호', 'productNo'],
    ['소비자가', 'sellingPrice'],
    ['주문일', 'localOrderDate'],
    ['주문상태', 'orderStatus'],
    ['송장번호', 'invoceNo'],
  ];

  async function getProductList() {
    const listurl = '/shop/list';
    await axios
      .get(listurl, {
        params: {
          sellerNo: 44,
          pageNum: currentPage,
          countPerPage: 10,
        },
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(function (response) {
        console.log(response);
        //setProduct(response.data.products);
        let list = [];
        for (let i = 1; i <= response.data.totalPage; i++) {
          list.push(i);
        }
        setTotalPage(list);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function navPage(e: React.MouseEvent<HTMLButtonElement> | undefined) {
    if (e != undefined) {
      const pageNum = Number(e.currentTarget.value);
      setCurrentPage(pageNum);
    }
  }

  function registerProduct() {
    console.log('새로 등록하기');
    navigate('/seller/product/register');
  }

  useEffect(() => {
    getProductList();
  }, [currentPage]);
  return (
    <>
      <ShopHeader></ShopHeader>
      <ProductMain>
        <p></p>
        <p></p>
        <Buttons>
          <LoginBtn variant="dark" type="landscape" onClick={() => registerProduct()}>
            +
          </LoginBtn>
        </Buttons>
        <p></p>
        <ListingPage
          titles={titles}
          number={totalPage}
          rows={product}
          columns={titles.length}
          onDetail={true}
          navPage={navPage}
        />
        <p></p>
      </ProductMain>
    </>
  );
}

const ProductMain = styled.div`
  padding-top: 90px;
  background-color: #f4f0ed;
  border-radius: 15px 15px 0 0;
  height: 100%;
  display: grid;
  grid-template-columns: 0.2fr 6.6fr 0.2fr;
  grid-template-rows: 0.7fr 8fr;
  grid-template-areas: '. Buttons .' '. ListingPage .';
  z-index: 2;
`;

const Buttons = styled.div`
  grid-area: Buttons;
  display: grid;
  justify-content: end;
  align-items: center;
  margin-bottom: 5px;
`;

export default ShopingList;
