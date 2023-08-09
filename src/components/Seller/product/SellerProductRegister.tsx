import React, { useState } from 'react';
import { styled } from 'styled-components';
import ProductRegisterPage from './ProductRegisterPage';
import BarcodeReader from '../../common/BarcodeScan';
import LoginBtn from '../../common/Loginbtn';
import axios from 'axios';

interface Product {
  productNo: string;
  productName: string;
  productGroup: string;
  safetyStock: number;
  enoughStock: number;
  importPrice: number;
  consumerPrice: number;
}

function SellerProductRegister(props: any) {
  const [newProduct, setNewProduct] = useState<Product[]>([]);

  const style = String(props.type);

  function StyleType(style: any) {
    if (style == 'portrait') {
      return 'portrait';
    } else {
      return 'landscape';
    }
  }

  const productTitle = [
    ['상품번호', 'productNo'],
    ['상품군', 'productGroup'],
    ['상품명', 'productName'],
    ['안전재고', 'safetyStock'],
    ['충분재고', 'enoughStock'],
    ['원가', 'importPrice'],
    ['소비자가', 'consumerPrice'],
  ];

  // 새로운 product 가져오기
  function getNewProduct(e: React.ChangeEvent<HTMLInputElement> | undefined) {
    if (e != undefined) {
      const name = e.currentTarget.name;

      if (name === 'safetyStock' || name === 'enoughStock' || name === 'importPrice' || name === 'consumerPrice') {
        let editValue: number = Number(e.currentTarget.value);
        setNewProduct({ ...newProduct, [name]: editValue });
      } else {
        const value = e.currentTarget.value;
        setNewProduct({ ...newProduct, [name]: value });
      }
    }
  }
  // onclick 호출
  function getNewPro() {
    postProduct();
    console.log(newProduct);
  }

  async function postProduct() {
    const sellerNo = 8;
    const listurl = '/seller/product/register/' + sellerNo;
    await axios
      .post(listurl, {
        product: newProduct,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <RegisterProduct>
      <RegisterForm>
        <ProductRegisterPage productTitle={productTitle} getNewProduct={getNewProduct} />
      </RegisterForm>
      <RegisterBarcode>
        <BarcodeReader />
      </RegisterBarcode>
      <Btns>
        <LoginBtn variant="primary" type={StyleType(style)} onClick={getNewPro}>
          상품등록
        </LoginBtn>
      </Btns>
    </RegisterProduct>
  );
}

const RegisterProduct = styled.div`
  width: 100%;
  height: 500px;
  display: grid;
  grid-template-columns: 0.7fr 4fr 2.6fr 0.7fr;
  grid-template-rows: 4fr 1fr;
  grid-template-areas: '. RegisterForm RegisterBarcode .' '. RegisterForm Btns .';
`;

const RegisterForm = styled.div`
  grid-area: RegisterForm;
`;

const RegisterBarcode = styled.div`
  grid-area: RegisterBarcode;
  display: grid;
  width: 100%;
  height: 300px;
  background-color: #fff;
  margin: 10px;
`;

const Btns = styled.div`
  grid-area: Btns;
  display: grid;
  height: fit-content;
  justify-items: end;
`;

export default SellerProductRegister;
