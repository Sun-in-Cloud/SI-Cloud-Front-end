import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const color = {
  active: '#fff',
  none: '#1e1008',
};

const backgroundColor = {
  active: '#1e1008',
  none: 'transparent',
};
interface ButtonTypeProps {
  readonly bg: 'active' | 'none';
}
function Navbtn(props: any) {
  const [pages, setPages] = useState<number[]>(props.number);
  const [cur, setCur] = useState(1);

  useEffect(() => {
    setPages(props.number);
  }, []);

  const navigatePage = (e: any) => {
    props.navPage(e);
    setCur(e.target.value);
  };
  useEffect(() => {}, [cur]);

  return (
    <>
      {pages?.map((item: number, index: number) => {
        return (
          <PagingBtn onClick={navigatePage} value={item} key={item} bg={`${item == cur ? 'active' : 'none'}`}>
            {item}
          </PagingBtn>
        );
      })}
    </>
  );
}
const PagingBtn = styled.button<ButtonTypeProps>`
  border: 1.5px solid #1e1008;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Jalnan;
  color: ${(props) => color[props.bg]};
  background: ${(props) => backgroundColor[props.bg]};
  width: 30px;
  height: 30px;
  margin: 7px;
`;
export default Navbtn;
