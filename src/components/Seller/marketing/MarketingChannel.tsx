import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from 'styled-components';

function MarketingChannel(props: any) {
  const [channelInfo, setChannelInfo] = useState<any>();
  async function getChannel() {
    const sellerNo = 8;
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
  return (
    <Channel>
      <p></p>
      <h1>전체 매출별</h1>
      <h1>상세조회</h1>
      <p></p>
    </Channel>
  );
}
const Channel = styled.div`
  margin-top: -10px;
  display: grid;
  width: 100%;
  height: 600px;
  grid-template-columns: 0.7fr 3fr 3fr 0.7fr;
  border: 2px solid gray;
`;
export default MarketingChannel;
