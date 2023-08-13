import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Tab from '../../common/Tab';
import MarketingChartWeekly from './MarketingChartWeekly';
import MarketingChartMonthly from './MarketingChartMonthly';
import MarketingChartYearly from './MarketingChartYearly';

function MarketingStatistics(props: any) {
  const [weeklyType, setWeeklyType] = useState('weeklyCount');
  const [monthlyType, setMonthlyType] = useState('monthlyCount');
  const [yearlyType, setyearlyType] = useState('yearlyCount');

  const [data, setData] = useState<any>();

  async function getThreeplList() {
    const listurl = '/seller/marketing/statistics';
    await axios
      .get(listurl, {
        params: {
          sellerNo: 8,
        },
      })
      .then(function (response) {
        console.log(response.data);
        setData(response.data);
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

  useEffect(() => {
    getThreeplList();
  }, []);

  return (
    <StatisticsPage>
      <Title>
        <SubTitle> 마케팅 통계 확인</SubTitle>
      </Title>
      {data && (
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
  grid-template-rows: 2fr 2fr;
  grid-template-areas:
    '. weekly monthly .'
    '. weekly yearly .';
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
  height: 450px;
  grid-template-rows: 40px 480px;
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
  font-size: 15px;
  font-family: 'KBO';
  letter-spacing: 2px;
  margin-right: 50px;
  display: flex;
  justify-content: flex-end;
  width: 120px;
`;

const WeekItem = styled.div`
  font-size: 15px;
  font-family: 'Jalnan';
  letter-spacing: 2px;
  margin-left: 150px;
  display: flex;
  justify-content: flex-end;
  width: 200px;
`;

export default MarketingStatistics;
