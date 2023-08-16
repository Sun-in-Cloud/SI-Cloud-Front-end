import React, { useEffect, useState } from 'react';
import LoginBtn from '../../common/Loginbtn';
import { styled } from 'styled-components';
import axios from 'axios';
import ListingPage from '../../ListingPage';

function Threepl_OrderRegister(props: any) {
  const titles: string[][] = [
    ['바코드 번호', 'productNo'],
    ['상품명', 'productName'],
    ['충분재고', 'enoughStock'],
    ['안전재고', 'safetyStock'],
    ['현재재고', 'currentStock'],
    ['발주량', 'amount'],
  ];
  const [rows, setRows] = useState<any[]>([]);

  const [pageList, setPageList] = useState<number[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  //발주 등록할 내역 조회
  async function getAutoOrderList() {
    //const listurl = `${process.env.REACT_APP_API_URL}/3pl/order/auto-list`;
    const listurl = `/3pl/order/auto-list`;
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
        setRows(response.data.products);
        const list: number[] = [];
        for (let i = 0; i < response.data.totalPage; i++) {
          list[i] = i + 1;
        }
        setPageList(list);
      })
      .catch(function (error) {
        //console.log(error);
      });
  }

  //발주 등록
  async function registerOrder() {
    //const listurl = `${process.env.REACT_APP_API_URL}/3pl/order/register/${props.seller}`;
    const listurl = `/3pl/order/register/${props.seller}`;
    await axios
      .post(listurl, {})
      .then(function (response) {
        if (response.data === true) {
          alert('발주 등록 성공');
        } else {
          alert('발주 등록 실패');
        }
        getAutoOrderList();
      })
      .catch(function (error) {
        //console.log(error);
      });
  }

  function navPage(e: React.MouseEvent<HTMLButtonElement> | undefined) {
    if (e != undefined) {
      const pageNum = Number(e.currentTarget.value);
      setCurrentPage(pageNum);
    }
  }

  useEffect(() => {
    getAutoOrderList();
  }, [props.seller, currentPage]);

  const onClickRegister = () => {
    registerOrder();
  };
  return (
    <MainPage>
      <Btn>
        <LoginBtn variant="primary" type="landscape" onClick={onClickRegister}>
          등록
        </LoginBtn>
      </Btn>
      <ListingPage
        sellerNo={props.seller}
        titles={titles}
        number={pageList}
        rows={rows}
        columns={titles.length}
        onDetail={false}
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
  justify-content: flex-end;
  margin-bottom: 10px;
`;
export default Threepl_OrderRegister;
