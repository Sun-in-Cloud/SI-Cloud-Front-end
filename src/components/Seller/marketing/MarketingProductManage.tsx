import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Tab from '../../common/Tab';
import MarketingChartWeekly from './MarketingChartWeekly';
import MarketingChartMonthly from './MarketingChartMonthly';
import MarketingChartYearly from './MarketingChartYearly';
import LoginBtn from '../../common/Loginbtn';
import Modal from '../../common/Modal';
import SellerMarketingSerch from './SellerMarketingSerch';
import { useAppSelect } from '../../../redux/configStore.hooks';

function MarketingProductManage(props: any) {
  const seller = useAppSelect((state) => state.seller);
  const [product, setProduct] = useState<Array<string>>([]);
  const [isSearchModal, setSearchModal] = useState<boolean>(false);
  const [weeklyType, setWeeklyType] = useState('weeklyCount');
  const [monthlyType, setMonthlyType] = useState('monthlyCount');
  const [yearlyType, setyearlyType] = useState('yearlyCount');

  const [data, setData] = useState<any>();
  const [check, setCheck] = useState<boolean>(false);

  async function getMarketingByPro() {
    //const listurl = `${process.env.REACT_APP_API_URL}/seller/marketing/product`;
    const listurl = `/seller/marketing/product`;

    await axios
      .get(listurl, {
        params: {
          sellerNo: seller.userNo,
          productNo: product[0],
        },
      })
      .then(function (response) {
        setData(response.data);
        setCheck(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function onChangeTab(e: any) {
    const name = e.target.name;
    if (name.includes('week')) {
      setWeeklyType(name);
    } else if (name.includes('month')) {
      setMonthlyType(name);
    } else {
      setyearlyType(name);
    }
  }

  function getProductNo(props: string[]) {
    setProduct(props);
  }

  function onclick(): void {
    setSearchModal(true);
  }

  const onClickSearchModal = useCallback(() => {
    setSearchModal(!isSearchModal);
    setProduct([]);
    setCheck(false);
  }, [isSearchModal]);

  useEffect(() => {
    getMarketingByPro();
  }, [product]);

  useEffect(() => {}, [data]);

  return (
    <StatisticsPage>
      <Title>
        <SubTitle> 상품별 통계 확인하기</SubTitle>
      </Title>
      <Search>
        <SearchForm value={product[1]} onFocus={onclick} readOnly></SearchForm>
        <LoginBtn variant="dark" type="landscape" onClick={() => onclick()}>
          상품찾기
        </LoginBtn>
      </Search>
      {isSearchModal && (
        <Modal onClickToggleModal={onClickSearchModal}>
          <SellerMarketingSerch getProductNo={getProductNo} onClickToggleModal={onClickSearchModal} />
        </Modal>
      )}
      {check && (
        <>
          <Weekly>
            <StaticsWeekly>
              <Btns>
                <Tab
                  variant="primary"
                  bg={`${weeklyType === 'weeklyCount' ? 'primary' : 'basic'}`}
                  name="weeklyCount"
                  onClick={(e) => onChangeTab(e)}
                >
                  판매수
                </Tab>
                <Tab
                  variant="secondary"
                  bg={`${weeklyType === 'weeklySales' ? 'secondary' : 'basic'}`}
                  name="weeklySales"
                  onClick={(e) => onChangeTab(e)}
                >
                  매출
                </Tab>
                <WeekItem>Weekly</WeekItem>
              </Btns>
              <MarketingChartWeekly type={weeklyType} data={data} />
            </StaticsWeekly>
          </Weekly>

          <Monthly>
            <Statics>
              <Btns>
                <Tab
                  variant="primary"
                  bg={`${monthlyType === 'monthlyCount' ? 'primary' : 'basic'}`}
                  name="monthlyCount"
                  onClick={(e) => onChangeTab(e)}
                >
                  판매수
                </Tab>
                <Tab
                  variant="secondary"
                  bg={`${monthlyType === 'monthlySales' ? 'secondary' : 'basic'}`}
                  name="monthlySales"
                  onClick={(e) => onChangeTab(e)}
                >
                  매출
                </Tab>
                <Item>Monthly</Item>
              </Btns>
              <MarketingChartMonthly type={monthlyType} data={data} />
            </Statics>
          </Monthly>

          <Yearly>
            <Statics>
              <Btns>
                <Tab
                  variant="primary"
                  bg={`${yearlyType === 'yearlyCount' ? 'primary' : 'basic'}`}
                  name="yearlyCount"
                  onClick={(e) => onChangeTab(e)}
                >
                  판매수
                </Tab>
                <Tab
                  variant="secondary"
                  bg={`${yearlyType === 'yearlySales' ? 'secondary' : 'basic'}`}
                  name="yearlySales"
                  onClick={(e) => onChangeTab(e)}
                >
                  매출
                </Tab>
                <Item>Yearly</Item>
              </Btns>
              <MarketingChartYearly type={yearlyType} data={data} />
            </Statics>
          </Yearly>
        </>
      )}
    </StatisticsPage>
  );
}

const Title = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  background-color: #f6f2ef;
  width: 100%;
  height: 120px;
  border-radius: 0 0 10px 10px;
`;

const SubTitle = styled.div`
  display: grid;
  margin-top: 75px;
  font-size: 20px;
  font-family: 'GmarketSansMedium';
`;
const StatisticsPage = styled.div`
  height: 550px;
  padding-top: 50px;
  display: grid;
  grid-template-columns: 0.5fr 3.5fr 2fr 0.5fr;
  grid-template-rows: 45px 2fr 2fr;
  grid-template-areas:
    '. search . .'
    '. weekly monthly .'
    '. weekly yearly .';
`;
const Search = styled.div`
  display: flex;
  margin-top: -15px;
  padding: 10px;
  grid-area: search;
  z-index: 3;
`;

const SearchForm = styled.input`
  margin-left: 10px;
  background: #fff;
  width: 250px;
  height: 80%;
  border: 2px solid black;
  border-radius: 10px;
  font-size: 13px;
  font-family: 'Jalnan';
  margin: 0 10px;
`;

const Weekly = styled.div`
  grid-area: weekly;
  display: grid;
  padding: 5px;
`;
const Monthly = styled.div`
  grid-area: monthly;
  display: grid;
  padding: 5px 10px;
`;
const Yearly = styled.div`
  grid-area: yearly;
  display: grid;
  padding: 5px 10px;
`;

const StaticsWeekly = styled.div`
  display: grid;
  grid-template-rows: 40px 400px;
`;

const Statics = styled.div`
  display: grid;
  grid-template-rows: 40px 250px;
`;

const Btns = styled.div`
  height: 40px;
  display: flex;
  background-color: tansparent;
  margin-left: 10px;
  align-items: center;
`;

const Item = styled.div`
  font-size: 17px;
  font-family: 'Jalnan';
  letter-spacing: 2px;
  margin-left: 30px;
  display: flex;
  justify-content: flex-start;
  width: 120px;
`;

const WeekItem = styled.div`
  font-size: 17px;
  font-family: 'Jalnan';
  letter-spacing: 2px;
  margin-left: 150px;
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
  width: 200px;
`;

export default MarketingProductManage;
