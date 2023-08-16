import React, { useEffect, useState } from 'react';
import ShopHeader from './ShopHeader';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { styled } from 'styled-components';
import LoginBtn from '../common/Loginbtn';
import ListingPage from '../ListingPage';
import { useAppSelect } from '../../redux/configStore.hooks';

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
  const [on, setOn] = useState(false);
  const navigate = useNavigate();
  const seller = useAppSelect((state) => state.seller);

  const titles: string[][] = [
    ['출고번호', 'exportNo'],
    ['주소', 'address'],
    ['주문자', 'ordererName'],
    ['품명', 'productName'],
    ['상품번호', 'productNo'],
    ['가격', 'sellingPrice'],
    ['일자', 'localOrderDate'],
    ['상태', 'orderStatus'],
    ['송장번호', 'invoiceNo'],
  ];

  async function getProductList() {
    //const listurl = `${process.env.REACT_APP_API_URL}/shop/list`;
    const listurl = `/shop/list`;

    await axios
      .get(listurl, {
        params: {
          sellerNo: seller.userNo,
        },
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(function (response) {
        console.log(response);
        setProduct(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function getNewProductList() {
    //const listurl = `${process.env.REACT_APP_API_URL}/shop/order/${seller.userNo}`;
    const listurl = `/shop/order/${seller.userNo}`;

    await axios
      .post(listurl)
      .then(function (response) {
        console.log(response);
        setProduct(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function registerProduct() {
    // console.log('새로 등록하기');
    // navigate('/seller/product/register');
    getNewProductList();
    setOn(!on);
  }

  useEffect(() => {
    getProductList();
  }, [on]);
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
        <ListingPage titles={titles} rows={product} columns={titles.length} onDetail={false} />
        <p></p>
      </ProductMain>
    </>
  );
}

const ProductMain = styled.div`
  padding-top: 90px;
  background-color: #f4f0ed;

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
