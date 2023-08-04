import React, { useEffect, useState } from 'react';
import Header from './ThreeplHeader';
import Threepl_ProductList from './Threepl_ProductList';
import { BrowserRouter, Location, Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { styled } from 'styled-components';
import { sellerCompany } from '../../global/CompanyInterface';
import Threepl_OrderRegister from './Threepl_OrderRegister';
import Threepl_OrderList from './Threepl_OrderList';
import Threepl_ImportPreList from './Threepl_ImportPreList';
import Threepl_ImportRegister from './Threepl_ImportRegister';
import Threepl_ImportList from './Threepl_ImportList';
import Threepl_Export from './Threepl_Export';
import Threepl_ExportInvoice from './Threepl_ExportInvoice';

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
    { companyName: '성은이네 옷장', sellerNo: 9 },
    { companyName: '유진 아이스크림', sellerNo: 2 },
    { companyName: '성은 케이크', sellerNo: 3 },
    { companyName: '성은이네 옷장1', sellerNo: 4 },
    { companyName: '유진 아이스크림1', sellerNo: 5 },
    { companyName: '성은 케이크1', sellerNo: 6 },
    { companyName: '성은이네 옷장2', sellerNo: 7 },
    { companyName: '유진 아이스크림3', sellerNo: 8 },
  ];

  const location: Location = useLocation();

  const [seller, setSeller] = useState<number>();

  function findSeller(new_seller: any): void {
    setSeller(new_seller.item.sellerNo);
  }

  function submenu(location: Location) {
    if (location.pathname.includes('/3pl/product')) {
      return <Sidebar company={com} findSeller={findSeller} />;
    } else if (location.pathname.includes('/3pl/order')) {
      return <Sidebar company={com} findSeller={findSeller} />;
    } else if (location.pathname.includes('/3pl/import')) {
      return <Sidebar company={com} findSeller={findSeller} />;
    } else if (location.pathname.includes('/3pl/export')) {
      return <Sidebar company={com} findSeller={findSeller} />;
    }
  }

  useEffect(() => {}, [seller]);

  useEffect(() => {
    setSeller(com[0].sellerNo);
  }, [location]);

  return (
    <>
      <Header type={StyleType(props.type)} />
      {location.pathname === '/3pl/import/pre/register' && (
        <RegisterPage>
          <h1></h1>
          <Routes>
            <Route path="/import/pre/register" element={<Threepl_ImportRegister seller={seller} />}></Route>{' '}
          </Routes>
          <h1></h1>
        </RegisterPage>
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

const RegisterPage = styled.div`
  margin-top: -40px;
  display: grid;
  grid-template-columns: 0.5fr 5fr 2fr 0.5fr;
  grid-template-areas: '. Routes . .';
`;

const ExportPage = styled.div`
  margin-top: -40px;
  display: grid;
  grid-template-columns: 0.5fr 5fr 0.5fr;
  grid-template-areas: '. Routes .';
`;

export default ThreeplMain;
