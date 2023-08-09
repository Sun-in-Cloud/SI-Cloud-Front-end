import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import MarketingStatisticsCommon from '../../common/MarketingStatisticsCommon';

import Tab from '../../common/Tab';

// [list] numberOfSalesWeekly(일주일 판매건수)(year, month, day, numberOfSales)
// [list] numberOfSalesWeekly(year, month, numberOfSales) -  이번달 판매건수, 지난달 판매건수, 작년 동월 판매건수
// [list]  numberOf SalesYearly(year, numberOfSales) - 작년 판매건수, 올해 판매건수
// [list] totalSalesWeekly(year, month, day, totalSales)
// [list]  totalSalesMonthly(year, month, totalSales) - 이번달 매출, 지난달 매출, 작년 동월 매출
// [list]  totalSalesYearly(year, totalSales)- 작년 매출, 올해 매출

function MarketingStatistics(props: any) {
  const [weeklyType, setWeeklyType] = useState('');
  const [monthlyType, setMonthlyType] = useState('');
  const [yearlyType, setyearlyType] = useState('');

  const [tmp, setTemp] = useState<any>();

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
          </Btns>
          <MarketingStatisticsCommon type="weekly" data={tmp} />
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
          </Btns>
          <MarketingStatisticsCommon type="monthly" data={tmp} />
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
          </Btns>
          <MarketingStatisticsCommon type="yearly" data={tmp} />
        </Statics>
      </Yearly>
    </StatisticsPage>
  );
}
const StatisticsPage = styled.div`
  margin-top: -40px;
  height: 570px;
  display: grid;
  grid-template-columns: 0.5fr 3fr 3.5fr 0.5fr;
  grid-template-rows: 2fr 2fr;
  grid-template-areas:
    ' . weekly monthly .'
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
  padding: 5px;
`;
const Yearly = styled.div`
  grid-area: yearly;
  display: grid;
  padding: 5px;
`;

const StaticsWeekly = styled.div`
  display: grid;
  height: 550px;
  grid-template-rows: 40px 5fr;
`;

const Statics = styled.div`
  display: grid;
  grid-template-rows: 40px 225px;
`;

const Btns = styled.div`
  height: 40px;
  display: flex;
  background-color: tansparent;
  margin-left: 10px;
`;

export default MarketingStatistics;
