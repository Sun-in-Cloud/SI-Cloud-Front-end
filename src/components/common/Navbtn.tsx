import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function Navbtn(props: any) {
  const [pages, setPages] = useState<number[]>(props.number);

  useEffect(() => {
    setPages(props.number);
  }, [props.number]);

  const navigatePage = (e: any) => {
    props.navPage(e);
  };

  return (
    <>
      {pages?.map((item: number, index: number) => {
        return (
          <PagingBtn onClick={navigatePage} value={item} key={item}>
            {item}
          </PagingBtn>
        );
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
  background: transparent;
  width: 30px;
  height: 30px;
  margin: 7px;

  &:hover {
    background: #1e1008;
    color: #fff;
  }
`;

export default Navbtn;
