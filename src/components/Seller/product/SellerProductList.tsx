import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import ListingPage from '../../ListingPage';
import LoginBtn from '../../common/Loginbtn';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAppSelect } from '../../../redux/configStore.hooks';

interface Product {
  [index: string]: string;
  productNo: string;
  productGroup: string;
  productName: string;
  safetyStock: string;
  currentStock: string;
  enoughStock: string;
}

function SellerProductList(props: any) {
  const style = props.style;
  const seller = useAppSelect((state) => state.seller);
  const [product, setProduct] = useState<Product[] | null>([]);
  const [totalPage, setTotalPage] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  function registerProduct() {
    console.log('새로 등록하기');
    navigate('/seller/product/register');
  }

  const titles: string[][] = [
    ['바코드 번호', 'productNo'],
    ['상품군', 'productGroup'],
    ['상품명', 'productName'],
    ['안전재고', 'safetyStock'],
    ['현재재고', 'currentStock'],
    ['충분재고', 'enoughStock'],
  ];

  const columns: number = titles.length;
  const sellerNo: number = 30123123;

  function StyleType(style: any) {
    if (style == 'portrait') {
      return 'portrait';
    } else {
      return 'landscape';
    }
  }

  async function getProductList() {
    const listurl = `${process.env.REACT_APP_API_URL}/seller/product/list`;
    // const listurl = `/seller/product/list`;

    await axios
      .get(listurl, {
        params: {
          sellerNo: seller.userNo,
          pageNum: currentPage,
          countPerPage: 10,
        },
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(function (response) {
        console.log(response.data);
        setProduct(response.data.products);
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

  useEffect(() => {
    getProductList();
  }, [currentPage]);

  return (
    <>
      <ProductMain>
        <p></p>
        <p></p>
        <Buttons>
          <LoginBtn variant="dark" type={StyleType(style)} onClick={() => registerProduct()}>
            +
          </LoginBtn>
        </Buttons>
        <p></p>
        <ListingPage
          titles={titles}
          number={totalPage}
          rows={product}
          columns={columns}
          sellerNo={sellerNo}
          onDetail={true}
          navPage={navPage}
        />
        <p></p>
      </ProductMain>
    </>
  );
}

const ProductMain = styled.div`
  padding-top: 10px;
  background-color: #f4f0ed;
  border-radius: 15px 15px 0 0;
  height: 100%;
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
  margin-bottom: 5px;
`;

export default SellerProductList;
