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
  const [totalPage, setTotalPage] = useState<number[]>([1, 2, 3]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setOpenModal] = useState<boolean>(false);

  const [filter, setFilter] = useState<filter>();

  const columns: string[][] = [
    ['3PL명', 'companyName'],
    ['상품군', 'productGroupName'],
    ['계약종료일', 'endDate'],
    ['남은자리', 'cntTotal'],
  ];

  const detailColumns: string[][] = [
    ['3PL명', 'companyName'],
    ['상품군', 'productGroupName'],
    ['대표자명', 'ceoName'],
    ['주소', 'address'],
    ['이메일', 'managerEmail'],
    ['연락처', 'managerPhone'],
    ['전체자리', 'cnt'],
    ['남은자리', 'cntTotal'],
    ['사용료', 'fee'],
  ];

  const [ThreeplList, setThreeplList] = useState<Array<MatchingOpt>>([]);

  const [detailThreepl, setDetalThreepl] = useState<DetailThreepl>({
    threePLNo: 123,
    companyName: '성은이네 창고',
    productGroupName: '옷',
    ceoName: '양돌',
    managerName: '양양',
    address: '서울시 마포구 000',
    managerEmail: '123123@123.com',
    managerPhone: '010-456-456',
    leftContract: 12,
    cntTotal: 15,
    fee: 3000,
    endDate: '2022.12.01',
  });

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
    const listurl = '/seller/match/list';
    await axios
      .get(listurl, {
        params: {
          matchingOpt: filter,
          pageNum: currentPage,
          countPerPage: '3',
        },
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(function (response) {
        console.log(response);

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
    console.log(filter);
  }, [filter]);

  function getFilter(props: filter) {
    setFilter(props);
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
  margin-top: -40px;
  display: grid;
  grid-template-columns: 0.7fr 2fr 4.5fr 0.7fr;
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
