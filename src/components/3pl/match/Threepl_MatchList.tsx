import React, { useCallback, useEffect, useState } from 'react';
import SelectTable from '../../common/matching/SelectTable';
import { styled } from 'styled-components';
import Threepl_ListingPage from '../Threepl_ListingPage';
import axios from 'axios';
import Modal from '../../common/Modal';
import ThreeplContractModal from './ThreeplContractModal';
import Threepl_DetailSellerModal from './Threepl_DetailSellerModal';
function Threepl_MatchList(props: any) {
  // const rows = [
  //   { companyName: 12312542, productGroup: '의류', endDate: '2023-09-09' },
  //   { companyName: 12156104, productGroup: '냉장', endDate: '2023-09-09' },
  //   { companyName: 125156306, productGroup: '냉장', endDate: '2023-09-09' },
  // ];

  const titles: string[][] = [
    ['화주사명', 'companyName'],
    ['상품군', 'productGroup'],
    ['계약 종료일', 'endDate'],
  ];
  const detailTitles: string[][] = [
    ['화주사명', 'companyName'],
    ['상품군', 'productGroupName'],
    ['화주사 번호', 'businessNo'],
    ['주소', 'address'],
    ['매출', 'sales'],
    ['출고건수', 'exportCnt'],
    ['대표자명', 'ceoName'],
    ['담당자명', 'managerName'],
    ['담당자 메일', 'managerEmail'],
    ['담당자 번호', 'managerPhone'],
    ['계약 종료일', 'endDate'],
  ];

  const [rows, setRows] = useState<any[]>([]);

  const [detailSellers, setDetailSellers] = useState<any>();

  const [pageList, setPageList] = useState<number[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [item, setItem] = useState<any>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);

  const [contractSeller, setContractSeller] = useState<any>();

  const [remain, setRemain] = useState<string[]>([]);

  //화주사 목록 조회
  async function getSellerList(item: any) {
    setItem(item);
    if (item !== null) {
      const listurl = '/3pl/match/list';
      await axios
        .get(listurl, {
          params: {
            productGroup: item.productGroup,
            address: item.address,
            numValue: item.numValue,
            contractPeriod: item.contractPeriod,
            pageNum: currentPage,
            countPerPage: 3,
          },
          headers: {
            'Content-type': 'application/json',
          },
        })
        .then(function (response) {
          console.log('res', response);
          setRows(response.data.matchingCompanies);
          const list: number[] = [];
          for (let i = 0; i < response.data.totalPage; i++) {
            list[i] = i + 1;
          }
          setPageList(list);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  //화주사 상세 조회
  async function getSellerDetail() {
    setItem(item);
    if (item !== null) {
      const listurl = '/3pl/match/' + detailSellers.sellerNo;
      await axios
        .get(listurl, {
          params: {},
          headers: {
            'Content-type': 'application/json',
          },
        })
        .then(function (response) {
          console.log('res', response);
          setDetailSellers(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  //남은 창고 자리 조회
  async function getRemain() {
    setItem(item);
    const listurl = '/3pl/match/left/' + '201';
    await axios
      .get(listurl, {
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(function (response) {
        console.log('res', response);
        setRemain(response.data);
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

  function onContract(id: string, name: string) {
    console.log(id, name);
    setContractSeller({ sellerNo: id, companyName: name });
    getRemain();
    console.log('contractSeller', contractSeller);
    console.log('reamin', remain);
    setIsModalOpen(true);
  }

  function findItem(item: any) {
    setDetailSellers(item);
    setIsDetailOpen(true);
  }
  const onClickToggleModal = useCallback(() => {
    setIsModalOpen(!isModalOpen);
  }, [isModalOpen]);

  const onClickToggleDetailModal = useCallback(() => {
    setIsDetailOpen(!isDetailOpen);
  }, [isDetailOpen]);

  useEffect(() => {
    console.log('---');
    getSellerList(item);
  }, [currentPage, isModalOpen]);

  useEffect(() => {
    if (isDetailOpen === true) {
      console.log(contractSeller);
      getSellerDetail();
    }
  }, [isDetailOpen]);

  return (
    <>
      <MainPage>
        <SelectTable getFilter={getSellerList}></SelectTable>
        <Threepl_ListingPage
          sellerNo={props.seller}
          titles={titles}
          number={pageList}
          rows={rows}
          columns={titles.length + 1}
          onDetail={true}
          navPage={navPage}
          onContract={onContract}
          getItem={findItem}
        />
      </MainPage>
      {isModalOpen && (
        <Modal onClickToggleModal={onClickToggleModal}>
          <ThreeplContractModal
            sellerNo={contractSeller.sellerNo}
            companyName={contractSeller.companyName}
            remain={remain}
            setIsModalOpen={setIsModalOpen}
          />
        </Modal>
      )}
      {isDetailOpen && (
        <Modal onClickToggleModal={onClickToggleDetailModal}>
          <Threepl_DetailSellerModal
            onClickToggleModal={onClickToggleDetailModal}
            title={detailTitles}
            rows={detailSellers}
            columns={detailTitles.length}
            setClose={setIsDetailOpen}
          ></Threepl_DetailSellerModal>
        </Modal>
      )}
    </>
  );
}

const MainPage = styled.div`
  border-radius: 15px 15px 0 0;
  height: 92%;
  display: grid;
  padding-bottom: 20px;
  grid-template-columns: 2fr 4.5fr;
  column-gap: 10px;
`;

export default Threepl_MatchList;
