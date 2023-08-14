import React, { useEffect, useState } from 'react';
import { sellerCompany } from '../../global/CompanyInterface';
import { styled } from 'styled-components';

function SubBar(props: any) {
  const [tab, setTab] = useState<string>('curr');

  useEffect(() => {}, [tab, props.company]);

  useEffect(() => {
    props.move ? setTab(props.seller) : '';
    props.setMove(false);
  }, []);

  const changeUnderLine = (e: any) => {
    setTab(e.target.value);
  };

  return (
    <BarList>
      {props.company.map((item: sellerCompany, index: number) => {
        return (
          <Item
            title={tab}
            value={item.companyName}
            onClick={() => {
              changeUnderLine;
              setTab(item.companyName);
              props.findSeller({ item });
            }}
            style={{
              color: tab === item.companyName ? 'black' : 'gray',
            }}
          >
            {item.companyName}
          </Item>
        );
      })}
    </BarList>
  );
}

const BarList = styled.div`
  width: 100%;
  display: flex;
  width: fit-content;
  justify-content: center;
  align-items: center;
`;

const Item = styled.button`
  font-family: KBO;
  display: inline-block;
  width: fit-content;
  padding: 10px;
  border: none;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  background-color: #f4f0ed;
  border-bottom: ${(props) => (props.title === props.value ? '4px solid #222' : '1px solid #222')};
  :active,
  :focus {
    border: none !important;
    box-shadow: none !important;
  }
`;

export default SubBar;
