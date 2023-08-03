import React, { useCallback, useState } from 'react';
import { styled } from 'styled-components';
import LoginBtn from '../../common/Loginbtn';
import ListingPage from '../../ListingPage';
import ListDetailPage from '../../ListDetailPage';
import { useNavigate } from 'react-router-dom';
import Modal from '../../common/Modal';
import SellerProductEdit from './SellerProductEdit';

interface ProductDetail {
  [index: string]: string;
  productNo: string;
  productName: string;
  productGroup: string;
  safetyStock: string;
  currentStock: string;
  enoughStock: string;
  importPrice: string;
  consumerPrice: string;
}

function SellerProductDetail(props: any) {
  const [deleteProduct, setDeleteProduct] = useState<string>();
  const [editProduct, setEditProduct] = useState<ProductDetail[]>([]);
  const [isModalOpen, setOpenModal] = useState<boolean>(false);

  const [productDetail, setProductDetail] = useState<ProductDetail | null>({
    productNo: '0101010',
    productGroup: '바지',
    productName: '귀여운 핑크바지',
    safetyStock: '10',
    currentStock: '15',
    enoughStock: '12',
    importPrice: '1100',
    consumerPrice: '15000',
  });

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

  const sellerNo: number = 30123123;

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
    console.log(editProduct);
  }

  function getDeleteProduct(product_id: string) {
    if (product_id != undefined) {
      setDeleteProduct(product_id);
    }
  }

  const showDeleteProduct = () => {
    console.log(deleteProduct);
  };

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isModalOpen);
  }, [isModalOpen]);

  return (
    <>
      <ProductMain>
        <TopButtons>
          <LoginBtn variant="secondary" type={StyleType(props.style)} onClick={showDeleteProduct}>
            상품 삭제
          </LoginBtn>
        </TopButtons>
        <ListDetailPage titles={titles} rows={productDetail} sellerNo={sellerNo} getDeleteProduct={getDeleteProduct} />
        <BotButtons>
          <LoginBtn variant="primary" type={StyleType(props.style)} onClick={onClickToggleModal}>
            상품 수정
          </LoginBtn>
        </BotButtons>
        {isModalOpen && (
          <Modal onClickToggleModal={onClickToggleModal}>
            <SellerProductEdit
              titles={titles}
              rows={productDetail}
              sellerNo={sellerNo}
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
  margin-top: -55px;
  display: grid;
  height: 100%;
  grid-template-columns: 0.7fr 6.6fr 0.7fr;
  grid-template-rows: 0.7fr 10fr 0.7fr;
  grid-template-areas: '. TopButtons .' '. ListingDetailPage .' '. BotButtons .';
`;

const TopButtons = styled.div`
  grid-area: TopButtons;
  display: grid;
  justify-content: end;
  align-items: center;
  margin-left: 13px;
  margin-right: 13px;
`;

const BotButtons = styled.div`
  grid-area: BotButtons;
  display: grid;
  justify-content: end;
  align-items: center;
  margin-left: 13px;
  margin-right: 13px;
`;

export default SellerProductDetail;
