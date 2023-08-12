import React, { useEffect, useState } from 'react';
import Header from './ThreeplHeader';
import Threepl_ProductList from './product/Threepl_ProductList';
import { BrowserRouter, Location, Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { styled } from 'styled-components';
import { sellerCompany } from '../../global/CompanyInterface';
import Threepl_OrderRegister from './order/Threepl_OrderRegister';
import Threepl_OrderList from './order/Threepl_OrderList';
import Threepl_ImportPreList from './import/Threepl_ImportPreList';
import Threepl_ImportRegister from './import/Threepl_ImportRegister';
import Threepl_ImportList from './import/Threepl_ImportList';
import Threepl_Export from './export/Threepl_Export';
import Threepl_ExportInvoice from './export/Threepl_ExportInvoice';
import Threepl_Match from './match/Threepl_MatchList';
import Threepl_MyPage from './my/Threepl_MyPage';
import Threepl_MySeller from './my/Threepl_MySeller';
import BarcodeScan from '../common/BarcodeScan';

function ThreeplMain(props: any) {
  function StyleType(style: any) {
    if (style == 'portrait') {
      return 'portrait';
    } else {
      return 'landscape';
    }
  }

  // const [com, setCom] = useState<sellerCompany[]>([]);

  // async function getList(pageNum: number, seller: number) {

  //   const listurl = '/3pl/product/list';
  //   await axios
  //     .get(listurl, {
  //       params: {
  //         sellerNo: seller,
  //         pageNum: pageNum,
  //         countPerPage: 10,
  //       },
  //       headers: {
  //         'Content-type': 'application/json',
  //       },
  //     })
  //     .then(function (response) {
  //       console.log(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  const com: sellerCompany[] = [
    { companyName: 'OutSfree', sellerNo: 9 },
    { companyName: '유진 아이스크림', sellerNo: 2 },
    { companyName: '성은 케이크', sellerNo: 3 },
    { companyName: '성은이네 옷장1', sellerNo: 4 },
    { companyName: '유진 아이스크림1', sellerNo: 5 },
    { companyName: '성은 케이크1', sellerNo: 6 },
    { companyName: 'Adidas', sellerNo: 7 },
    { companyName: '에뛰드홈', sellerNo: 8 },
  ];

  const location: Location = useLocation();

  const [seller, setSeller] = useState<number>();

  const [move, setMove] = useState<boolean>(false);

  function findSeller(new_seller: any): void {
    setSeller(new_seller.item.sellerNo);
  }

  function submenu(location: Location) {
    if (location.pathname.includes('/3pl/product')) {
      return (
        <Sidebar company={com} findSeller={findSeller} seller={com[0].companyName} move={move} setMove={setMove} />
      );
    } else if (location.pathname.includes('/3pl/order')) {
      return (
        <Sidebar company={com} findSeller={findSeller} seller={com[0].companyName} move={move} setMove={setMove} />
      );
    } else if (location.pathname.includes('/3pl/import')) {
      return (
        <Sidebar company={com} findSeller={findSeller} seller={com[0].companyName} move={move} setMove={setMove} />
      );
    } else if (location.pathname.includes('/3pl/export')) {
      return (
        <Sidebar company={com} findSeller={findSeller} seller={com[0].companyName} move={move} setMove={setMove} />
      );
    } else if (location.pathname.includes('/3pl/mypage/seller/list')) {
      return (
        <Sidebar company={com} findSeller={findSeller} seller={com[0].companyName} move={move} setMove={setMove} />
      );
    }
  }

  useEffect(() => {
    setMove(true);
  }, [location]);

  return (
    <>
      <Header type={StyleType(props.type)} />
      {location.pathname === '/3pl/import/pre/register' && (
        <ExportPage>
          <h1></h1>
          <Routes>
            <Route path="/import/pre/register" element={<Threepl_ImportRegister seller={seller} />}></Route>{' '}
          </Routes>
          <h1></h1>
        </ExportPage>
      )}

      {location.pathname === '/3pl/export/invoice' && (
        <ExportPage>
          <h1></h1>
          <Routes>
            <Route path="/export/invoice" element={<Threepl_ExportInvoice seller={seller} />}></Route>{' '}
          </Routes>
          <h1></h1>
        </ExportPage>
      )}

      {location.pathname === '/3pl/match/list' && (
        <ExportPage>
          <h1></h1>
          <Routes>
            <Route path="/match/list" element={<Threepl_Match />}></Route>{' '}
          </Routes>
          <h1></h1>
        </ExportPage>
      )}
      {location.pathname === '/3pl/mypage' && (
        <ExportPage>
          <h1></h1>
          <Routes>
            <Route path="/mypage" element={<Threepl_MyPage />}></Route>{' '}
          </Routes>
          <h1></h1>
        </ExportPage>
      )}

      {location.pathname !== '/3pl/import/pre/register' && location.pathname !== '/3pl/export/invoice' && (
        <MainPage>
          <h1></h1>
          {submenu(location)}
          <Routes>
            <Route path="/product/list" element={<Threepl_ProductList seller={seller} />}></Route>{' '}
            <Route path="/order/register" element={<Threepl_OrderRegister seller={seller} />}></Route>{' '}
            <Route path="/order/list" element={<Threepl_OrderList seller={seller} />}></Route>{' '}
            <Route path="/import/list" element={<Threepl_ImportList seller={seller} />}></Route>{' '}
            <Route path="/import/pre/list" element={<Threepl_ImportPreList seller={seller} />}></Route>{' '}
            <Route path="/export/list" element={<Threepl_Export seller={seller} />}></Route>{' '}
            <Route path="/mypage/seller/list" element={<Threepl_MySeller seller={seller} />}></Route>{' '}
            <Route path="/barcode" element={<BarcodeScan />}></Route>
          </Routes>
          <h1></h1>
        </MainPage>
      )}
    </>
  );
}

const MainPage = styled.div`
  margin-top: -40px;
  display: grid;
  grid-template-columns: 0.5fr 1.6fr 5fr 0.5fr;
  grid-template-areas: '. . Routes .';
`;

const ExportPage = styled.div`
  margin-top: -40px;
  display: grid;
  grid-template-columns: 0.5fr 5fr 0.5fr;
  grid-template-areas: '. Routes .';
`;

export default ThreeplMain;
