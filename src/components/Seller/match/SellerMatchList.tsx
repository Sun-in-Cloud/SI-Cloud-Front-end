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
  productGroupName: string;
  endDate: string;
  leftPos: number;
}

interface DetailThreepl {
  threePLNo: number;
  companyName: string;
  productGroupName: string;
  ceoName: string;
  address: string;
  managerEmail: string;
  managerPhone: string;
  cnt: number;
  cntTotal: number;
  fee: number;
}

interface filter {
  productGroup: string;
  location: string;
  exportAmount?: number;
  price?: number;
  period: number;
}
function SellerMatchList(props: any) {
  const [matchingOpt, setMatchingOpt] = useState<MatchingOpt>();
  const [totalPage, setTotalPage] = useState<number[]>([1, 2, 3]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setOpenModal] = useState<boolean>(false);

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

  const [ThreeplList, setThreeplList] = useState<Array<MatchingOpt>>([
    { threePLNo: 123, companyName: '성은이네 창고', productGroupName: '옷', endDate: '2023-01-02', leftPos: 3 },
    { threePLNo: 234, companyName: '유진네 창고', productGroupName: '전자제품', endDate: '2023-02-02', leftPos: 2 },
    { threePLNo: 456, companyName: '진경이네 창고', productGroupName: '화장품', endDate: '2023-03-02', leftPos: 1 },
  ]);

  const [detailThreepl, setDetalThreepl] = useState<DetailThreepl>({
    threePLNo: 123,
    companyName: '성은이네 창고',
    productGroupName: '옷',
    ceoName: '양돌',
    address: '서울시 마포구 000',
    managerEmail: '123123@123.com',
    managerPhone: '010-456-456',
    cnt: 123,
    cntTotal: 11,
    fee: 3000,
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

  //   async function getThreeplList() {
  //     const listurl = '/seller/match/list';
  //     await axios
  //       .get(listurl, {
  //         params: {
  //           matchingOpt: matchingOpt,
  //           pageNum: currentPage,
  //           countPerPage: '3',
  //         },
  //         headers: {
  //           'Content-type': 'application/json',
  //         },
  //       })
  //       .then(function (response) {
  //         console.log(response);

  //         let list = [];
  //         for (let i = 1; i <= response.data.totalPage; i++) {
  //           list.push(i);
  //         }
  //         setTotalPage(list);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   }

  //   useEffect(() => {
  //     getThreeplList();
  //   }, [currentPage]);

  const [filter, setFilter] = useState<filter>();
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
