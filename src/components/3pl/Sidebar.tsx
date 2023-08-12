import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import line from '../../img/miniLine.svg';
import { sellerCompany } from '../../global/CompanyInterface';

interface ScreenTypeProps {
  readonly type: 'portrait' | 'landscape';
  readonly bg: 'active' | 'none';
}

function Sidebar(props: any) {
  console.log(props.company);

  const [tab, setTab] = useState<string>('curr');

  useEffect(() => {}, [tab, props.company]);

  useEffect(() => {
    props.move ? setTab(props.seller) : '';
    props.setMove(false);
  }, [props.move]);

  return (
    <SideBars>
      {props.company.map((item: sellerCompany, index: number) => {
        return (
          <>
            <Company
              onClick={() => {
                setTab(item.companyName);
                props.findSeller({ item });
              }}
              key={index}
              value={item.companyName}
              style={{
                backgroundColor: tab === item.companyName ? '#B0DAFF' : 'transparent',
                transition: tab === item.companyName ? 'all 0.5s' : 'none',
                left: tab === item.companyName ? '0' : '0',
              }}
            >
              {item.companyName}
            </Company>
            <img src={line} style={{ zIndex: '0', marginTop: '-15px', width: '80%' }}></img>
          </>
        );
      })}
    </SideBars>
  );
}

const SideBars = styled.div`
  display: grid;
  grid-template-rows: repeat(16, 30px);
  width: fit-content;
  justify-items: center;
  margin-right: 20px;
  margin-top: 10px;
`;
const Company = styled.button`
  font-family: chab;
  color: #fff;
  font-size: 20px;
  width: 85%;
  letter-spacing: 3px;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
  background-color: none;
  border: none;
  border-radius: 30px;
  padding: 5px;
  z-index: 1;
`;

export default Sidebar;
