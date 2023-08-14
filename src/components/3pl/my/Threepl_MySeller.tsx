import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MyInfo from '../../common/my/MyInfo';
import { styled } from 'styled-components';

function Threepl_MySeller(props: any) {
  const titles: string[][] = [
    ['화주사명', 'companyName'],
    ['상품군', 'productGroupName'],
    ['사업자 번호', 'businessNo'],
    ['주소', 'address'],
    ['출고건수', 'exportCnt'],
    ['대표자명', 'ceoName'],
    ['담당자명', 'managerName'],
    ['담당자 메일', 'managerEmail'],
    ['담당자 번호', 'managerPhone'],
    ['계약 종료일', 'endDate'],
  ];

  const [row, setRow] = useState<any>();

  const [sellerName, setSellerName] = useState<string>('');

  async function getInfo() {
    const listurl = '/3pl/mypage/seller/' + props.seller;
    await axios
      .get(listurl, {})
      .then(function (response) {
        setRow(response.data);
      })
      .catch(function (error) {
        //console.log(error);
      });
  }

  useEffect(() => {
    getInfo();
  }, [props.seller]);

  return (
    <MyPage>
      <p></p>
      <Container>
        <PageTitle>
          <Title>{sellerName}</Title>
          <Line></Line>
        </PageTitle>
        {row && <MyInfo title={titles} rows={row} columns={titles.length} getItem={setSellerName}></MyInfo>}
      </Container>
      <p></p>
    </MyPage>
  );
}

const MyPage = styled.div`
  margin-top: -40px;
  display: grid;
  overflow-x: hidden;
`;

const PageTitle = styled.div`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      font-family=jalnan;
    `;

const Title = styled.h1`
  font-family: jalnan;
`;

const Line = styled.div`
  width: 100%;
  border: 1px solid black;
`;
const Container = styled.div``;

export default Threepl_MySeller;
