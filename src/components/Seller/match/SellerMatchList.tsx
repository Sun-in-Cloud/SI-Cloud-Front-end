import React, { useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';

import Threepl_ListingPage from '../../3pl/Threepl_ListingPage';
import SelectTable from '../../common/matching/SelectTable';
import SellerThreePLList from './SellerThreeplModal';
import axios from 'axios';
import Navbtn from '../../common/Navbtn';
import MatchingTableRow from './MatchingTableRow';
import TableColumn from '../../TableColumn';
import Modal from '../../common/Modal';
import SellerThreeplModal from './SellerThreeplModal';

interface MatchingOpt {
  threePLNo: number;
  companyName: string;
  productGroup: string;
  endDate: string;
  leftLocation: number;
}

interface DetailThreepl {
  threePLNo: number;
  companyName: string;
  productGroupName: string;
  ceoName: string;
  address: string;
  managerEmail: string;
  managerName: string;
  managerPhone: string;
  leftContract: number;
  cntTotal: number;
  fee: number;
  endDate: string;
}

interface filter {
  productGroup: string;
  address: string;
  exportAmount?: number;
  numValue?: number;
  contractPeriod: number;
}
function SellerMatchList(props: any) {
  const [matchingOpt, setMatchingOpt] = useState<MatchingOpt>();
  const [totalPage, setTotalPage] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setOpenModal] = useState<boolean>(false);

  const [filter, setFilter] = useState<filter>();

  const columns: string[][] = [
    ['3PL명', 'companyName'],
    ['상품군', 'productGroup'],
    ['종료일', 'endDate'],
    ['남은자리', 'leftLocation'],
  ];

  const detailColumns: string[][] = [
    ['3PL명', 'companyName'],
    ['상품군', 'productGroupName'],
    ['대표자명', 'ceoName'],
    ['주소', 'address'],
    ['이메일', 'managerEmail'],
    ['연락처', 'managerPhone'],
    ['전체자리', 'cntTotal'],
    ['남은자리', 'leftContract'],
    ['사용료', 'fee'],
  ];

  const [ThreeplList, setThreeplList] = useState<Array<MatchingOpt>>([]);
  const [company, setCompany] = useState<number>();
  const [detailThreepl, setDetailThreepl] = useState<DetailThreepl>();

  function navPage(e: React.MouseEvent<HTMLButtonElement> | undefined) {
    if (e != undefined) {
      const pageNum = Number(e.currentTarget.value);
      setCurrentPage(pageNum);
    }
  }
  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isModalOpen);
  }, [isModalOpen]);

  async function getThreeplList() {
    //const listurl = `${process.env.REACT_APP_API_URL}/seller/match/list`;
    const listurl = `/seller/match/list`;

    await axios
      .get(listurl, {
        params: {
          productGroup: filter?.productGroup,
          address: filter?.address,
          numValue: filter?.numValue,
          conrtactPeriod: filter?.contractPeriod,
          pageNum: currentPage,
          countPerPage: 7,
        },
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(function (response) {
        console.log(response);
        setThreeplList(response.data.matchingCompanies);
        console.log(response.data.matchingCompanies);

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

  useEffect(() => {
    getThreeplList();
  }, [filter]);

  useEffect(() => {
    getThreeplList();
  }, [currentPage]);

  function getFilter(props: filter) {
    setFilter(props);
  }

  function getCompany(props: number) {
    setCompany(props);
  }

  function setDetail(props: DetailThreepl) {
    setDetailThreepl(props);
    onClickToggleModal();
  }

  return (
    <MatchPage>
      <p></p>
      <SelectTable getFilter={getFilter}></SelectTable>
      <Listing>
        <TableColumn title={columns} columns={columns.length} />
        <MatchingTableRow
          title={columns}
          rows={ThreeplList}
          columns={columns.length}
          onDetail={true}
          onClickToggleModal={onClickToggleModal}
          setDetail={setDetail}
        />
        <Navbtns>
          <Navbtn number={totalPage} navPage={navPage}></Navbtn>
        </Navbtns>
      </Listing>
      <p></p>
      {isModalOpen && (
        <Modal onClickToggleModal={onClickToggleModal}>
          <SellerThreeplModal
            onClickToggleModal={onClickToggleModal}
            title={detailColumns}
            rows={detailThreepl}
            columns={detailColumns.length}
          ></SellerThreeplModal>
        </Modal>
      )}
    </MatchPage>
  );
}

const MatchPage = styled.div`
  padding-top: 35px;
  background-color: #f4f0ed;
  border-radius: 15px 15px 0 0;
  height: 92%;
  display: grid;
  padding-bottom: 20px;
  grid-template-columns: 0.7fr 2fr 4.5fr 0.7fr;
  column-gap: 10px;
`;

const Navbtns = styled.div`
  display: flex;
  justify-content: center;
`;

const Listing = styled.div`
  padding: 0px 11px 11px 11px;
  overflow-x: hidden;
`;
export default SellerMatchList;
