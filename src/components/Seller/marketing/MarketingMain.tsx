import React, { Suspense } from 'react';
import MarketingRegister from '../SellerMainPage';
import { styled } from 'styled-components';

function MarketingMain(props: any) {
  return <Marketing></Marketing>;
}

const Marketing = styled.div`
  display: grid;
  grid-template-columns: 0.7fr 2fr 4.5fr 0.7fr;
`;

export default MarketingMain;
