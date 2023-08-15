import React, { useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import ProductRegisterPage from './ProductRegisterPage';
import LoginBtn from '../../common/Loginbtn';
import axios from 'axios';
import { BarcodeScanner } from '../../common/BarcodeScanner';
import Modal from '../../common/Modal';
import { useAppSelect } from '../../../redux/configStore.hooks';

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
  const seller = useAppSelect((state) => state.seller);
  const [newProduct, setNewProduct] = useState<Product[]>([]);

  const [isOpen, setIsOpen] = useState(false);

  const [barcodeNo, setBarcodeNo] = useState('');

  const style = String(props.type);

  function StyleType(style: any) {
    if (style == 'portrait') {
      return 'portrait';
    } else {
      return 'landscape';
    }
  }
  const onClickToggleModal = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const _onDetected = (result: any) => {
    setBarcodeNo(result.codeResult.code);
    console.log(result.codeResult.code);
    setIsOpen(false);
  };

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

  function getProductGroup(props: string) {
    setNewProduct({ ...newProduct, ['productGroup' as keyof Product]: props });
  }

  async function postProduct() {
    const sellerNo = seller.userNo;
    const listurl = `${process.env.REACT_APP_API_URL}/seller/product/register/${sellerNo}`;
    await axios
      .post(listurl, newProduct)
      .then(function (response) {
        if (response.data) {
          alert('등록이 완료 되었습니다.!');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {}, [barcodeNo]);

  return (
    <>
      <RegisterProduct>
        <p></p>
        <RegisterForm>
          <ProductRegisterPage
            productTitle={productTitle}
            getNewProduct={getNewProduct}
            getProductGroup={getProductGroup}
            newItem={barcodeNo}
          />

          <Btns>
            <LoginBtn
              variant="primary"
              type="landscape"
              onClick={() => {
                setIsOpen(true);
              }}
              style={{ marginRight: '10px' }}
            >
              바코드 인식
            </LoginBtn>
            <LoginBtn variant="primary" type={StyleType(style)} onClick={getNewPro}>
              상품등록
            </LoginBtn>
          </Btns>
        </RegisterForm>
        <p></p>
        {isOpen && (
          <Modal onClickToggleModal={onClickToggleModal}>
            <BarcodeScanner handleScan={_onDetected} />
          </Modal>
        )}
      </RegisterProduct>
    </>
  );
}

const RegisterProduct = styled.div`
  padding-top: 55px;
  background-color: #f4f0ed;
  border-radius: 15px 15px 0 0;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  grid-template-areas: '. RegisterForm . ';
`;

const RegisterForm = styled.div`
  grid-area: RegisterForm;
  height: 90%;
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
  display: flex;
  height: fit-content;
  justify-content: flex-end;
  margin-top: 10px;
`;

export default SellerProductRegister;
