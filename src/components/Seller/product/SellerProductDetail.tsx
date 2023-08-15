import React, { useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import LoginBtn from '../../common/Loginbtn';
import ListingPage from '../../ListingPage';
import ListDetailPage from '../../ListDetailPage';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '../../common/Modal';
import SellerProductEdit from './SellerProductEdit';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAppSelect } from '../../../redux/configStore.hooks';

interface ProductDetail {
  [index: string]: string | undefined;
  productNo: string | undefined;
  productName: string;
  productGroup: string;
  safetyStock: string;
  currentStock: string;
  enoughStock: string;
  importPrice: string;
  consumerPrice: string;
}

function SellerProductDetail(props: any) {
  const seller = useAppSelect((state) => state.seller);
  const [deleteProduct, setDeleteProduct] = useState<string>();
  const [editProduct, setEditProduct] = useState<ProductDetail[]>([]);
  const [isModalOpen, setOpenModal] = useState<boolean>(false);

  const [productDetail, setProductDetail] = useState<ProductDetail>();
  const location = useLocation();

  useEffect(() => {
    console.log(location.state.productNo);
    getProductDetail(location.state.productNo);
  }, [location]);

  async function getProductDetail(productNo: string) {
    const listurl = `${process.env.REACT_APP_API_URL}/seller/product/${productNo}`;

    await axios
      .get(listurl)
      .then(function (response) {
        setProductDetail(response.data);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function putProductDetail(editProduct: ProductDetail) {
    const listurl = `${process.env.REACT_APP_API_URL}/seller/product/edit`;

    console.log(productDetail);
    await axios
      .put(listurl, editProduct)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function deleteProductDetail() {
    const listurl = `${process.env.REACT_APP_API_URL}/seller/product/delete`;
    await axios
      .delete(listurl, {
        data: {
          productNo: deleteProduct,
        },
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(function (response) {
        console.log(response);
        alert('삭제되었습니다!');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const titles: string[][] = [
    ['바코드번호', 'productNo'],
    ['상품명', 'productName'],
    ['상품군', 'productGroup'],
    ['안전재고', 'safetyStock'],
    ['현재재고', 'currentStock'],
    ['충분재고', 'enoughStock'],
    ['원가', 'importPrice'],
    ['소비자가', 'consumerPrice'],
  ];

  function StyleType(style: any) {
    if (style == 'portrait') {
      return 'portrait';
    } else {
      return 'landscape';
    }
  }

  const navigate = useNavigate();

  function getEditProduct(editProduct: ProductDetail) {
    setProductDetail(editProduct);
    putProductDetail(editProduct);
    console.log(editProduct);
  }

  function getDeleteProduct(product_id: string) {
    if (product_id != undefined) {
      setDeleteProduct(product_id);
    }
  }

  const showDeleteProduct = () => {
    deleteProductDetail();
  };

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isModalOpen);
  }, [isModalOpen]);

  return (
    <>
      <ProductMain>
        <TopButtons>
          <div>
            <LoginBtn variant="dark" type="landscape">
              <Link to="/seller/product" style={{ textDecoration: 'none', color: 'black' }}>
                뒤로가기
              </Link>
            </LoginBtn>
          </div>
          <div style={{ display: 'flex', justifyContent: 'end' }}>
            <LoginBtn variant="secondary" type={StyleType(props.style)} onClick={showDeleteProduct}>
              상품 삭제
            </LoginBtn>
          </div>
        </TopButtons>
        <ListDetailPage
          titles={titles}
          rows={productDetail}
          sellerNo={seller.userNo}
          getDeleteProduct={getDeleteProduct}
        />
        <BotButtons>
          <LoginBtn variant="dark" type={StyleType(props.style)} onClick={onClickToggleModal}>
            상품 수정
          </LoginBtn>
        </BotButtons>
        {isModalOpen && (
          <Modal onClickToggleModal={onClickToggleModal}>
            <SellerProductEdit
              titles={titles}
              rows={productDetail}
              sellerNo={seller.userNo}
              getEditProduct={getEditProduct}
              type={StyleType(props.style)}
              onClickToggleModal={onClickToggleModal}
            />
          </Modal>
        )}
      </ProductMain>
    </>
  );
}
const ProductMain = styled.div`
  padding-top: 25px;
  display: grid;
  background-color: #f4f0ed;
  border-radius: 15px 15px 0 0;
  height: 98%;
  width: 100%;
  grid-template-columns: 0.7fr 7fr 0.7fr;
  grid-template-rows: 0.8fr 2fr 0.8fr;
  grid-template-areas: '. TopButtons .' '. ListingDetailPage .' '. BotButtons .';
`;

const TopButtons = styled.div`
  grid-area: TopButtons;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: end;
  align-items: end;
  margin-left: 13px;
  margin-right: 13px;
  margin-bottom: 17px;
`;

const BotButtons = styled.div`
  grid-area: BotButtons;
  display: grid;
  justify-content: end;
  align-items: start;
  margin-left: 13px;
  margin-right: 13px;
`;

export default SellerProductDetail;
