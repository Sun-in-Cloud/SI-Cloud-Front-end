import React, { useEffect } from 'react';
import styled from 'styled-components';

function Navbtn(props: any) {
  return (
    <>
      {props.number.map((item: number, index: number) => {
        return <PagingBtn>{item + 1}</PagingBtn>;
      })}
    </>
  );
}

const PagingBtn = styled.button`
  border: 1.5px solid #1e1008;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Jalnan;
  color: #1e1008;
  background: #f7e600;
  width: 30px;
  height: 30px;
  margin: 7px;

  &:hover {
    background: #1e1008;
    color: #f7e600;
  }
`;

export default Navbtn;
