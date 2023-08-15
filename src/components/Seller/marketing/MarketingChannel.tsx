import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from 'styled-components';
import Tab from '../../common/Tab';
import MarketingChartYearly from './MarketingChartYearly';
import ChannelPortion from './ChannelPortion';
import { isElementAccessExpression } from 'typescript';
import { useAppSelect } from '../../../redux/configStore.hooks';
import TopProduct from './TopProduct';
import TopProductList from './TopProductList';
import { tab } from '@testing-library/user-event/dist/tab';

function MarketingChannel(props: any) {
  const [channelInfo, setChannelInfo] = useState<any>();
  const [yearlyType, setyearlyType] = useState('thisYear');
  const [yearlyTopType, setyearlyTopType] = useState('thisYearTop');

  const [channelLastYearTitle, setChannelLastYearTitle] = useState<any>();
  const [channelThisYearTitle, setChannelThisYearTitle] = useState<Array<string>>();

  const [channelLastYearSales, setChannelLastYearSales] = useState<any>();
  const [channelThisYearSales, setChannelThisYearSales] = useState<Array<string>>();
  const [channelType, setChannelType] = useState('');

  const [channelDetail, setChannelDetail] = useState<Array<any>>();

  const seller = useAppSelect((state) => state.seller);

  async function getChannel() {
    const listurl = '/seller/marketing/channel';
    await axios
      .get(listurl, {
        params: {
          sellerNo: seller.userNo,
        },
      })
      .then(function (response) {
        const data = response.data;
        setChannelInfo(response.data);
        let temp_title: any = [];
        let temp_sales: any = [];

        data.totalSalesLastYear.map((item: any, index: number) => {
          temp_title.push(item.channelName);
          temp_sales.push(Number(item.totalSales));
        });

        let temp2_title: any = [];
        let temp2_sales: any = [];

        data.totalSalesThisYear.map((item: any, index: number) => {
          temp2_title.push(item.channelName);
          temp2_sales.push(Number(item.totalSales));
        });

        setChannelLastYearTitle(temp_title);
        setChannelLastYearSales(temp_sales);

        setChannelThisYearTitle(temp2_title);
        setChannelThisYearSales(temp2_sales);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getChannel();
  }, []);

  function onChangeTab(e: any) {
    const name = e.target.name;
    if (name === 'thisYear') {
      setyearlyType('thisYear');
    } else if (name === 'lastYear') {
      setyearlyType('lastYear');
    } else if (name === 'thisYearTop') {
      setyearlyTopType('thisYearTop');
    } else {
      setyearlyTopType('lastYearTop');
    }
  }

  const getChannelType = (e: any) => {
    const channelName = e.currentTarget.value;
    setChannelType(channelName);

    if (yearlyTopType.includes('last')) {
      channelInfo.totalSalesLastYear.map((item: any, index: number) => {
        if (item.channelName === channelName) {
          setChannelDetail(item);
        }
      });
    } else if (yearlyTopType.includes('this')) {
      channelInfo.totalSalesThisYear.map((item: any, index: number) => {
        if (item.channelName === channelName) {
          setChannelDetail(item);
        }
      });
    }
  };

  return (
    <Channel>
      <Title>
        <SubTitle> 채널별 통계 확인하기</SubTitle>
      </Title>
      <p></p>
      <WholeSales>
        <Yearly>
          <Statics>
            <Btns>
              <Tab
                variant="primary"
                bg={`${yearlyType === 'thisYear' ? 'primary' : 'basic'}`}
                name="thisYear"
                onClick={(e) => onChangeTab(e)}
              >
                올해
              </Tab>
              <Tab
                variant="secondary"
                bg={`${yearlyType === 'lastYear' ? 'secondary' : 'basic'}`}
                name="lastYear"
                onClick={(e) => onChangeTab(e)}
              >
                작년
              </Tab>
              <Item>채널별 매출</Item>
            </Btns>
            {channelLastYearSales && channelLastYearSales && channelThisYearSales && channelThisYearTitle && (
              <ChannelPortion
                tab={yearlyType}
                channelLastYearTitle={channelLastYearTitle}
                channelLastYearSales={channelLastYearSales}
                channelThisYearSales={channelThisYearSales}
                channelThisYearTitle={channelThisYearTitle}
              />
            )}
          </Statics>
        </Yearly>
      </WholeSales>
      <SalesDetail>
        {' '}
        <Yearly>
          <Statics>
            <Btns>
              <Tab
                variant="primary"
                bg={`${yearlyTopType === 'thisYearTop' ? 'primary' : 'basic'}`}
                name="thisYearTop"
                onClick={(e) => onChangeTab(e)}
              >
                올해
              </Tab>
              <Tab
                variant="secondary"
                bg={`${yearlyTopType === 'lastYearTop' ? 'secondary' : 'basic'}`}
                name="lastYearTop"
                onClick={(e) => onChangeTab(e)}
              >
                작년
              </Tab>
              <Item>채널별 TOP5</Item>
              {/* https://goddino.tistory.com/227 */}
            </Btns>
            {channelLastYearTitle && channelThisYearTitle && (
              <>
                <TopProduct
                  tab={yearlyTopType}
                  channelLastYearTitle={channelLastYearTitle}
                  channelThisYearTitle={channelThisYearTitle}
                  getChannelType={getChannelType}
                />
                {channelDetail && <TopProductList channelType={channelType} channelDetail={channelDetail} />}
              </>
            )}
          </Statics>
        </Yearly>
      </SalesDetail>
      <p></p>
    </Channel>
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
const Yearly = styled.div`
  grid-area: yearly;
  display: grid;
  padding: 5px 10px;
`;
const Channel = styled.div`
  display: grid;
  width: 100%;
  padding-top: 40px;
  height: 550px;
  grid-template-columns: 0.7fr 3fr 3fr 0.7fr;
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
const WholeSales = styled.div`
  padding-top: 80px;
`;

const SalesDetail = styled.div`
  padding-top: 80px;
`;

export default MarketingChannel;
