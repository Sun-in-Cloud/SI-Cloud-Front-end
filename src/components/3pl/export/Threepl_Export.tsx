import React, { useEffect, useState } from 'react';
import LoginBtn from '../../common/Loginbtn';
import { styled } from 'styled-components';
import axios from 'axios';
import ListingPage from '../../ListingPage';

function Threepl_Export(props: any) {
  const title: string[][] = [
    ['주문 번호', 'exportNo'],
    ['주문자 이름', 'ordererName'],
    ['주소', 'address'],
    ['판매채널', 'salesChannel'],
    ['주문상태', 'orderStatus'],
  ];

  const [rows, setRows] = useState<any[]>([]);

  const [pageList, setPageList] = useState<number[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  //출고 내역 조회
  async function getExportList() {
    //const listurl = `${process.env.REACT_APP_API_URL}/3pl/export/list`;
    const listurl = `/3pl/export/list`;
    await axios
      .get(listurl, {
        params: {
          sellerNo: props.seller,
          pageNum: currentPage,
          countPerPage: 7,
        },
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(function (response) {
        console.log('-', response.data.exports);
        setRows(response.data.exports);
        const list: number[] = [];
        for (let i = 0; i < response.data.totalPage; i++) {
          list[i] = i + 1;
        }
        setPageList(list);

        console.log(response);
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

  //출고 하나 선택
  function collectOrder(): void {
    //const listurl = `${process.env.REACT_APP_API_URL}/3pl/export/collect`;
    const listurl = `/3pl/export/collect`;
    axios
      .get(listurl, {
        params: {
          sellerNo: props.seller,
          pageNum: currentPage,
          countPerPage: 3,
        },
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(function (response) {
        console.log('-', response.data.exports);
        setRows(response.data.exports);
        const list: number[] = [];
        for (let i = 0; i < response.data.totalPage; i++) {
          list[i] = i + 1;
        }
        setPageList(list);

        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    console.log('---');
    getExportList();
  }, [props.seller, currentPage]);

  return (
    <MainPage>
      <Btn>
        <LoginBtn variant="primary" type="landscape" onClick={collectOrder}>
          주문 수집
        </LoginBtn>
      </Btn>
      <ListingPage
        sellerNo={props.seller}
        titles={title}
        number={pageList}
        rows={rows}
        columns={title.length}
        onDetail={true}
        navPage={navPage}
      />
    </MainPage>
  );
}

const MainPage = styled.div`
  display: grid;
  grid-template-rows: 0.1fr 0.9fr;
`;
const Btn = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
`;
export default Threepl_Export;
