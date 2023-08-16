import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { styled } from 'styled-components';

function TopProduct(props: any) {
  const [tab, setTab] = useState('');

  useEffect(() => {
    setTab(props.tab);
  }, [props.tab]);

  return (
    <PortionPage>
      <Btns>
        {tab === 'lastYearTop'
          ? props.channelLastYearTitle.map((item: string, index: number) => {
              return (
                <Label>
                  <Radio type="radio" name="channel" value={item} onClick={props.getChannelType} />
                  <SubOpt>{item}</SubOpt>
                </Label>
              );
            })
          : props.channelThisYearTitle.map((item: string, index: number) => {
              return (
                <Label>
                  <Radio type="radio" name="channel" value={item} onClick={props.getChannelType} />
                  <SubOpt>{item}</SubOpt>
                </Label>
              );
            })}
      </Btns>
    </PortionPage>
  );
}
const PortionPage = styled.div`
  height: 380px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 3px -2px black;
  margin-top: -3px;
  padding: 10px 3px;
  display: grid;
  align-items: start;
  z-index: 10;
`;

const Label = styled.div`
  display: flex;
  width: fit-content;
  margin: 10px;
`;
const SubOpt = styled.div`
  font-size: 15px;
  font-family: 'GmarketSansMedium';
  margin-top: 3px;
`;

const Btns = styled.div`
  display: flex;
`;

const Radio = styled.input`
  appearance: none;
  border: max(2px, 0.1em) solid gray;
  border-radius: 50%;
  width: 1.25em;
  height: 1.25em;
  transition: border 0.2s ease-in-out;

  &: checked {
    border: 0.4em solid tomato;
  }

  &:focuse-visible {
    outline-offset: max(2px, 0.1em);
    outline: max(2px, 0.1em) dotted tomato;
  }
`;
export default TopProduct;
