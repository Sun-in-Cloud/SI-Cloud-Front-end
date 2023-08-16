import React, { useEffect, useRef, useState } from 'react';
import TableRow from '../../TableRow';
import RegisterNew from '../../common/RegisterNew';
import { styled } from 'styled-components';
import LoginBtn from '../../common/Loginbtn';
import TableColumn from '../../TableColumn';
import axios from 'axios';
import { useAppSelect } from '../../../redux/configStore.hooks';

function SellerMarketingSerch(props: any) {
  const seller = useAppSelect((state) => state.seller);
  const titles = [
    ['상품명', 'productName'],
    ['상품번호', 'productNo'],
  ];
  const searchProduct = useRef<HTMLInputElement>(null);

  const [row, setRow] = useState<any>();
  const [pro, setPro] = useState<string>();

  function getNum(e: string[]) {
    props.getProductNo(e);
  }

  function initRow() {
    setRow([]);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const pro = searchProduct.current!.value;
    setPro(pro);
  }

  async function getProduct() {
    const listurl = `${process.env.REACT_APP_API_URL}/seller/import/search`;
    // const listurl = `/seller/import/search`;

    const sellerNo = seller.userNo;
    await axios
      .get(listurl, {
        params: {
          sellerNo: sellerNo,
          productName: pro,
        },
      })
      .then(function (response) {
        setRow(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getProduct();
  }, [pro]);

  return (
    <>
      <ImportModal>
        <ModalDiv>
          <SearchDiv onSubmit={onSubmit}>
            <RegisterNew type="text" ref={searchProduct} />
            <LoginBtn variant="dark" type="landscape">
              검색
            </LoginBtn>
          </SearchDiv>

          <TableColumn title={titles} columns={titles.length} />
          {row && (
            <RowDiv>
              <TableRow
                title={titles}
                rows={row}
                columns={titles.length}
                onDetail={true}
                getProductNo={props.getProductNo}
                onClickToggleModal={props.onClickToggleModal}
                initRow={initRow}
                getNum={getNum}
              />
            </RowDiv>
          )}
        </ModalDiv>
      </ImportModal>
    </>
  );
}
const ImportModal = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  align-items: start;
  justify-items: center;
`;

const ModalDiv = styled.div`
  display: grid;
  width: 85%;
`;

const RowDiv = styled.div`
  display: grid;
  margin-left: 10px;
  overflow-x: hidden;
  overflow-y: hidden;
  height: 300px;
`;

const SearchDiv = styled.form`
  display: grid;
  width: 450px;
  grid-template-columns: 4fr 0.8fr;
  padding: 10px;
  margin: 5px;
`;

const Btns = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
`;

export default SellerMarketingSerch;
