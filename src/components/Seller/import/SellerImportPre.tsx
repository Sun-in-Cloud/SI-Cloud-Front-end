import React, { useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import axios from 'axios';
import TableColumn from '../../TableColumn';
import TableRowOrder from '../order/TableRowOrder';
import Navbtn from '../../common/Navbtn';
import Modal from '../../common/Modal';
import SellerImportModal from './SellerImportModal';
import TableRow from '../../TableRow';
import TableRowImport from './TableRowImport';
import LoginBtn from '../../common/Loginbtn';
import SellerSearchModal from './SellerSearchModal';

//전체 리스트
interface PreImportList {
  orderNo: number;
  orderDate: string;
}

//모달 리스트
interface PreProductList {
  productNo: string;
  productName: string;
  amount: number;
}

//모달 검색리스트
interface PreProductList {
  productNo: string;
  productName: string;
  safetyStock: number;
  currentStock: number;
}

//확정리스트
interface ConfirmImport {
  productNo: string;
  productName: string;
  requestAmount: number;
}

function SellerImportPre(props: any) {
  const [onDetail, setOnDetail] = useState(false);

  const preImportTitles: string[][] = [
    ['발주번호', 'orderNo'],
    ['발주일자', 'orderDate'],
  ];

  const preProductTitles: string[][] = [
    ['상품번호', 'productNo'],
    ['상품명', 'productName'],
    ['요청수량', 'amount'],
    ['발주여부', 'checkBox'],
  ];

  const preDetailTitles: string[][] = [
    ['상품번호', 'productNo'],
    ['상품명', 'productName'],
    ['요청수량', 'amount'],
    ['입고수량', 'requestAmount'],
  ];

  const addPreProduct: string[][] = [
    ['상품번호', 'productNo'],
    ['상품명', 'productName'],
    ['현재재고', 'currentStock'],
    ['안전재고', 'safetyStock'],
    ['발주여부', 'checkBox'],
  ];

  // 발주 테이블 * 자동 발주임
  const [preImportList, setPreImportList] = useState<PreImportList[]>([]);

  // 클릭된 발주 번호 저장
  const [preImportNo, setPreImportNo] = useState(0);

  const [preProductList, setPreProductList] = useState<PreProductList[]>([]);

  // 자동 발주 내역 모달 + 검색 내역 모달
  const [isModalOpen, setOpenModal] = useState<boolean>(false);
  const [isSearchModal, setSearchModal] = useState<boolean>(false);

  const [totalPage, setTotalPage] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  // 선택된 값을 저장해두는곳
  const [checkedList, setCheckedList] = useState<Array<PreProductList>>([]);

  // 오른쪽표에 값 저장해두는 곳
  const [preDetailList, setPreDetailList] = useState<Array<any>>([]);

  // 마지막에 최종 발주 확정시 사용 하는 리스트
  const [confirmList, setConfirmList] = useState<any>([]);

  function getImportNo(props: PreImportList) {
    setOnDetail(true);
    setPreImportNo(props.orderNo);
  }

  async function getPreImportList() {
    const listurl = '/seller/import/preorder';
    await axios
      .get(listurl, {
        params: {
          sellerNo: 8,
          pageNum: currentPage,
          countPerPage: '3',
        },
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(function (response) {
        setPreImportList(response.data);

        let list = [];
        for (let i = 1; i <= response.data.totalPage; i++) {
          list.push(i);
        }
        setTotalPage(list);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function getPreImportProduct() {
    const listurl = '/seller/import/pre/' + preImportNo;
    await axios
      .get(listurl)
      .then(function (response) {
        setPreProductList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function confirmImportList() {
    const sellerNo = 8;
    const post = { sellerNo: sellerNo, orderNo: preImportNo, importList: confirmList };
    console.log(post);
    const listurl = '/seller/import/register';
    await axios
      .post(listurl, post)
      .then(function (response) {
        if (response.data) {
          alert('등록되었습니다.');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function searchProduct(search: string) {
    const listurl = '/seller/import/search';
    const sellerNo = 8;
    await axios
      .get(listurl, {
        params: {
          sellerNo: sellerNo,
          productName: search,
        },
      })
      .then(function (response) {
        console.log(response.data);
        setPreProductList(response.data);
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
    getPreImportList();
  }, [currentPage]);

  useEffect(() => {
    getPreImportProduct();
    setPreDetailList([]);
  }, [preImportNo]);

  function getPreNo(props: PreImportList) {
    setOnDetail(true);
    setPreImportNo(props.orderNo);
  }

  function getProductList(props: PreProductList[]) {
    setCheckedList(props);
    props.map((item, index) => {
      setPreDetailList((preDetailList) => [...preDetailList, item]);
    });
    console.log(props);
  }

  useEffect(() => {}, [preDetailList]);

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isModalOpen);
    setPreProductList([]);
  }, [isModalOpen]);

  const onClickSearchModal = useCallback(() => {
    setSearchModal(!isSearchModal);
    setPreProductList([]);
  }, [isSearchModal]);

  const onImportProduct = (props: any, e: number) => {
    let arr: any = [];
    confirmList.map((item: any, index: number) => {
      if (item['productNo'] != props.productNo) {
        arr.push(item);
      }
    });

    setConfirmList([...arr, { productNo: props.productNo, requestAmount: Number(e) }]);
  };

  const conFirmImport = () => {
    confirmImportList();

    setCheckedList([]);
    setPreProductList([]);
    setConfirmList([]);
    setPreDetailList([]);
  };

  const searchProductList = (props: string) => {
    searchProduct(props);
  };

  function resetSearch() {
    setPreProductList([]);
  }

  return (
    <>
      <SellerImport>
        <p></p>
        <ImportList>
          <TableColumn title={preImportTitles} columns={preImportTitles.length} />
          <TableRowOrder
            title={preImportTitles}
            rows={preImportList}
            columns={preImportTitles.length}
            onDetail={true}
            getOrderNo={getPreNo}
            onClickToggleModal={onClickToggleModal}
            getPreImportProduct={getPreImportProduct}
          ></TableRowOrder>
          <Navbtns>
            <Navbtn number={totalPage} navPage={navPage}></Navbtn>
          </Navbtns>
        </ImportList>
        {checkedList.length >= 0 && (
          <ImportDetail>
            <DetailTable>
              <TableColumn title={preDetailTitles} columns={preDetailTitles.length} />
              <TableRowImport
                title={preDetailTitles}
                rows={preDetailList}
                columns={preDetailTitles.length}
                onDetail={false}
                onImportProduct={onImportProduct}
                preImportNo={preImportNo}
              ></TableRowImport>
            </DetailTable>
            <Btns>
              <LoginBtn variant="primary" type="landscape" onClick={onClickSearchModal}>
                상품추가
              </LoginBtn>
              <LoginBtn variant="secondary" type="landscape" onClick={conFirmImport}>
                입고예정등록
              </LoginBtn>
            </Btns>
          </ImportDetail>
        )}
        <p></p>
        {isModalOpen && (
          <Modal onClickToggleModal={onClickToggleModal}>
            <SellerImportModal
              titles={preProductTitles}
              rows={preProductList}
              onClickToggleModal={onClickToggleModal}
              getProductList={getProductList}
            />
          </Modal>
        )}
        {isSearchModal && (
          <Modal onClickToggleModal={onClickSearchModal}>
            <SellerSearchModal
              titles={addPreProduct}
              rows={preProductList}
              onClickSearchModal={onClickSearchModal}
              getProductList={getProductList}
              searchProductList={searchProductList}
              resetSearch={resetSearch}
            />
          </Modal>
        )}
      </SellerImport>
    </>
  );
}
const SellerImport = styled.div`
  margin-top: -35px;
  display: grid;
  height: 600px;
  grid-template-columns: 0.7fr 2fr 5fr 0.7fr;
  z-index: 2;
`;
const ImportList = styled.div`
  width: 300px;
`;
const ImportDetail = styled.div`
  width: 650px;
  margin-left: 30px;
`;
const DetailTable = styled.div``;

const Navbtns = styled.div`
  display: flex;
  justify-content: center;
`;

const Btns = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 10px;
`;
export default SellerImportPre;
