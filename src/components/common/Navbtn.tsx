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
  const [pages, setPages] = useState<any>([[]]);
  const [cur, setCur] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const count = 0;

  useEffect(() => {
    if (props.number.length > count) {
      const total = pageBtn();
      total.then((e) => {
        console.log(e);
        setPages(e);
      });
      //setPages(total);
    } else {
      //setPages(props.number);
    }
  }, [props.number]);

  useEffect(() => {}, [cur]);
  useEffect(() => {}, [pageCount]);

  async function pageBtn() {
    var count = 5;
    var total: any = [[]];
    var tmp: any = [];

    await props.number.map((item: number, index: number) => {
      if (item % count != 0) {
        tmp.push(item);
        if (item == props.number.length) {
          total.push(tmp);
        }
      } else {
        tmp.push(item);
        total.push(tmp);
        tmp = [];
      }
    });
    total.shift();
    return total;
  }

  const navigatePage = (e: any) => {
    console.log(e);
    console.log(cur);
    if (e.target.value === 'before') {
      if (pageCount !== 0) {
        setPageCount(pageCount - 1);
      }
    } else if (e.target.value === 'after') {
      if (pageCount < pages.length - 1) {
        setPageCount(pageCount + 1);
      }
    } else {
      props.navPage(e);
      setCur(e.target.value);
    }
  };

  return (
    <>
      {pages && props.number.length >= 6 ? (
        <>
          <PageBtn onClick={navigatePage} value="before" key={999} bg="none">
            &lt;
          </PageBtn>
          {pages[pageCount].map((item: any, index: number) => {
            return (
              <PagingBtn onClick={navigatePage} value={item} key={item} bg={`${item == cur ? 'active' : 'none'}`}>
                {item}
              </PagingBtn>
            );
          })}
          <PageBtn onClick={navigatePage} value="after" key={1000} bg="none">
            &gt;
          </PageBtn>
        </>
      ) : (
        pages[pageCount].map((item: number, index: number) => {
          return (
            <PagingBtn onClick={navigatePage} value={item} key={item} bg={`${item == cur ? 'active' : 'none'}`}>
              {item}
            </PagingBtn>
          );
        })
      )}
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

  &:hover {
    background-color: #1e1008;
    color: #fff;
  }
`;
const PageBtn = styled.button<ButtonTypeProps>`
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

  &:active {
    background-color: #1e1008;
    color: #fff;
  }
`;
export default Navbtn;
