import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from 'styled-components';
import Tab from '../../common/Tab';
import MarketingChartYearly from './MarketingChartYearly';
import ChannelPortion from './ChannelPortion';
import { isElementAccessExpression } from 'typescript';

function MarketingChannel(props: any) {
  const [channelInfo, setChannelInfo] = useState<any>();
  const [yearlyType, setyearlyType] = useState('yearlyCount');
  const [yearlyTopType, setyearlyTopType] = useState('yearlyTopCount');
  const [channelTitle, setChannelTitle] = useState<Array<string>>();

  async function getChannel() {
    const sellerNo = 44;

    const listurl = '/seller/marketing/channel';
    await axios
      .get(listurl, {
        params: {
          sellerNo: sellerNo,
        },
      })
      .then(function (response) {
        setChannelInfo(response.data);
        console.log(response.data);
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
  function getChannelTitle(data: any) {}

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
            <ChannelPortion data={setChannelInfo} />
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
            <ChannelPortion data={setChannelInfo} />
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
const WholeSales = styled.div``;

const SalesDetail = styled.div``;

export default MarketingChannel;
