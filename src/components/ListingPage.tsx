import React from 'react';
import Navbtn from './common/Navbtn';
import { styled } from 'styled-components';
import TableColumn from './TableColumn';
import TableRow from './TableRow';

interface rowProps {
  // 객체 1 row
  contents: string[];
}
interface propsItems {
  // 배열
  row: string[];
}

function ListingPage() {
  const titles: string[] = ['바코드 번호', '상품군', '상품명', '안전재고', '현재재고'];
  const paging: number[] = [0, 1, 2, 3, 4, 5]; // for문이 안돌아.. 다른 방법 찾겠숨..
  const rows = [
    ['0101010', '바지', '귀여운 핑크바지', '10', '15'],
    ['111111', '바지', '귀여운 파란바지', '13', '15'],
  ];
  return (
    <div>
      <TableForm>
        <TableColumn title={titles} />
        <TableRow content={rows} />
      </TableForm>
      <Navbtns>
        <Navbtn number={paging} />
      </Navbtns>
    </div>
  );
}
const TableForm = styled.div`
  display: grid;
`;
const Navbtns = styled.div`
  display: flex;
  justify-content: center;
`;
export default ListingPage;
