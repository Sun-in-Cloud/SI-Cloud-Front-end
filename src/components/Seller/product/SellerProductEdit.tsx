import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import LoginBtn from '../../common/Loginbtn';
import RegisterNew from '../../common/RegisterNew';

interface editProduct {
  productNo: string;
  productGroup: string;
  productName: string;
  safetyStock: string;
  currentStock: string;
  enoughStock: string;
  importPrice: string;
  consumerPrice: string;
}

function SellerProductEdit(props: any) {
  const [editProduct, setEditProduct] = useState<editProduct>(props.rows);

  function StyleType(style: any) {
    if (style == 'portrait') {
      return 'portrait';
    } else {
      return 'landscape';
    }
  }

  function sendEditProduct() {
    props.getEditProduct(editProduct);
    props.onClickToggleModal();
  }

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement> | undefined) => {
    if (e != undefined) {
      const { name, value } = e.currentTarget;
      setEditProduct({ ...editProduct, [name]: value });
    }
  };

  const handleFocusEvent = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return (
    <>
      <ProductEdit>
        {props.titles.map((item: string[], index: number) => {
          return (
            <>
              <Title>{item[0]}</Title>
              {Object.keys(props.rows).map((it: string, idx: number) => {
                if (item[1] === it) {
                  return (
                    <RegisterNew
                      type="text"
                      name={it}
                      key={item[1]}
                      value={editProduct[it as keyof editProduct]}
                      onChange={onChangeText}
                      onFocus={handleFocusEvent}
                    />
                  );
                }
              })}
            </>
          );
        })}

        <p></p>
        <Btns>
          <LoginBtn variant="primary" type={StyleType(props.style)} onClick={() => sendEditProduct()}>
            수정하기
          </LoginBtn>
        </Btns>
      </ProductEdit>
    </>
  );
}

const ProductEdit = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 2fr 3fr;
`;

const Title = styled.p`
  font-family: Jalnan;
  font-size: 16px;
  letter-spacing: 3px;
`;
const Btns = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-left: -70px;
  margin-top: 15px;
`;
export default SellerProductEdit;
