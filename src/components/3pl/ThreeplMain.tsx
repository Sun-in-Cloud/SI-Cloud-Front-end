import React, { useEffect, useState } from 'react';
import Header from './ThreeplHeader';
import Threepl_ProductList from './product/Threepl_ProductList';
import { Location, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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
import SubBar from './SubBar';
import { useAppSelect } from '../../redux/configStore.hooks';
import Threepl_MainPage from './Threepl_MainPage';

function ThreeplMain(props: any) {
  function StyleType(style: any) {
    if (style == 'portrait') {
      return 'portrait';
    } else {
      return 'landscape';
    }
  }

  const threepl = useAppSelect((state) => state.threepl);
  console.log(threepl);

  const com: any[] = threepl.sellers;
  const location: Location = useLocation();

  const [seller, setSeller] = useState<number>();

  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  const navigate = useNavigate();

  function findSeller(new_seller: any): void {
    setSeller(new_seller.item.sellerNo);
  }

  function submenu(location: Location) {
    if (
      location.pathname.includes('/3pl/product') ||
      location.pathname.includes('/3pl/order') ||
      (location.pathname.includes('/3pl/import') && location.pathname !== '/3pl/import/pre/register') ||
      location.pathname.includes('/3pl/export') ||
      location.pathname.includes('/3pl/mypage/seller/list')
    ) {
      return <SubBar company={com} findSeller={findSeller} />;
    }
  }

  useEffect(() => {
    if (threepl.sellers.length === 0) {
      navigate('/3pl/mypage');
    } else {
      setIsEmpty(false);
    }
  }, []);

  return (
    <>
      <Header type={StyleType(props.type)} isEmpty={isEmpty} />
      {location.pathname === '/3pl' && (
        <div style={{ marginTop: '120px', height: '630px' }}>
          <Routes>
            <Route path="*" element={<Threepl_MainPage />}></Route>
          </Routes>
        </div>
      )}
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

      {location.pathname !== '/3pl' &&
        location.pathname !== '/3pl/import/pre/register' &&
        location.pathname !== '/3pl/export/invoice' &&
        location.pathname !== '/3pl/match/list' &&
        location.pathname !== '/3pl/mypage' && (
          <>
            <MainPage>
              <ComBar>{submenu(location)}</ComBar>
              <GridPage>
                <h1></h1>
                <Routes>
                  <Route path="/product/list" element={<Threepl_ProductList seller={seller} />}></Route>{' '}
                  <Route path="/order/register" element={<Threepl_OrderRegister seller={seller} />}></Route>{' '}
                  <Route path="/order/list" element={<Threepl_OrderList seller={seller} />}></Route>{' '}
                  <Route path="/import/list" element={<Threepl_ImportList seller={seller} />}></Route>{' '}
                  <Route path="/import/pre/list" element={<Threepl_ImportPreList seller={seller} />}></Route>{' '}
                  <Route path="/export/list" element={<Threepl_Export seller={seller} />}></Route>{' '}
                  <Route path="/mypage/seller/list" element={<Threepl_MySeller seller={seller} />}></Route>{' '}
                </Routes>
                <h1></h1>
              </GridPage>
            </MainPage>
          </>
        )}
    </>
  );
}

const MainPage = styled.div`
  height: 630px;
  margin-top: 100px;
  padding-top: 30px;
  padding-bottom: 20px;
  background-color: #f4f0ed;
`;

const ComBar = styled.div`
  display: flex;
  justify-content: center;
`;

const GridPage = styled.div`
  height: 630px;
  display: grid;
  grid-template-columns: 0.5fr 5fr 0.5fr;
  grid-template-areas: '. Routes .';
  padding-top: 30px;
`;

const ExportPage = styled.div`
  height: 650px;
  display: grid;
  grid-template-columns: 0.5fr 5fr 0.5fr;
  grid-template-areas: '. Routes .';
  background-color: #f4f0ed;
  margin-top: 100px;
  padding-top: 80px;
  padding-bottom: 30px;
`;

export default ThreeplMain;
