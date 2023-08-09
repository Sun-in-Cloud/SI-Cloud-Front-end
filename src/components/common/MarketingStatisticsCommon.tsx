import React from 'react';
import { styled } from 'styled-components';

function MarketingStatisticsCommon(props: any) {
  return <Graph></Graph>;
}
const Graph = styled.div`
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 3px -2px black;
  margin-top: -6px;
`;
export default MarketingStatisticsCommon;
