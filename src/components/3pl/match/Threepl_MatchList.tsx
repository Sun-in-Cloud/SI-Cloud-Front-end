import React, { useCallback, useEffect, useState } from 'react';
import SelectTable from '../../common/matching/SelectTable';
import { styled } from 'styled-components';
import Threepl_ListingPage from '../Threepl_ListingPage';
import axios from 'axios';
import Modal from '../../common/Modal';
import ThreeplContractModal from './ThreeplContractModal';
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

  const [rows, setRows] = useState<any[]>([]);

  const [pageList, setPageList] = useState<number[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [item, setItem] = useState<any>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  const onClickToggleModal = useCallback(() => {
    setIsModalOpen(!isModalOpen);
  }, [isModalOpen]);

  useEffect(() => {
    console.log('---');
    getSellerList(item);
  }, [currentPage, isModalOpen]);

  return (
    <>
      <MainPage>
        <SelectTable getFilter={getSellerList}></SelectTable>
        <h1></h1>
        <Threepl_ListingPage
          sellerNo={props.seller}
          titles={titles}
          number={pageList}
          rows={rows}
          columns={titles.length + 1}
          onDetail={true}
          navPage={navPage}
          onContract={onContract}
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
    </>
  );
}

const MainPage = styled.div`
  margin-top: -40px;
  display: grid;
  grid-template-columns: 3fr 0.2fr 5fr;
  grid-template-areas: 'SelectTable . Threepl_ListingPage';
`;

export default Threepl_MatchList;
