import React from 'react';
import { styled } from 'styled-components';
import line from '../../img/miniLine.svg';

function Sidebar(props: any) {
  console.log(props.company);
  return (
    <SideBars>
      {props.company.map((item: string, index: number) => {
        return (
          <>
            <Company>{item}</Company>
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
  font-size: 18px;
  letter-spacing: 2px;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
  background: none;
  border: none;
  z-index: 1;

  &:hover {
    width: 85%;
    left: 0;
    transition: all 0.5s;
    background: #ffe9a9;
    border-radius: 30px;
    z-index: 1;
  }
`;

export default Sidebar;
