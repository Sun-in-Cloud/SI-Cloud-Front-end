import React, { FocusEvent, useState } from 'react';
import { styled } from 'styled-components';
import TableTitleBk from '../../common/TableTitleBk';
import TableTitleWH from '../../common/TableTitleWH';
import RegisterNew from '../../common/RegisterNew';

interface Product {
  productNo: string;
  productName: string;
  productGroup: string;
  safetyStock: string;
  enoughStock: string;
  importPrice: string;
  consumerPrice: string;
}

function ProductRegisterPage(props: any) {
  const title = props.productTitle;

  const [newProduct, setNewProduct] = useState<Product[]>([]);

  const handleFocusEvent = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  function onChangeText(e: React.ChangeEvent<HTMLInputElement> | undefined) {
    props.getNewProduct(e);
  }

  return (
    <RegisterList>
      {title.map((item: string, index: number) => {
        return (
          <>
            {index % 2 === 0 ? <TableTitleBk>{item[0]}</TableTitleBk> : <TableTitleWH>{item[0]}</TableTitleWH>}
            <RegisterNew type="text" name={item[1]} key={item[1]} onChange={onChangeText} onFocus={handleFocusEvent} />
          </>
        );
      })}
    </RegisterList>
  );
}
const RegisterList = styled.div`
  height: fit-content;
  border-radius: 10px;
  background-color: #f4f0df;
  display: grid;
  align-items: center;
  justify-items: start;
  margin-top: 10px;
  padding: 20px;
  height: 80%;
  grid-template-columns: 1fr 2fr;
`;
export default ProductRegisterPage;
