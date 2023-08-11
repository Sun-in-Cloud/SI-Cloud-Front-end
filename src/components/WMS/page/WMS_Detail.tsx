import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { styled } from 'styled-components';
import MyInfo from '../../common/my/MyInfo';
import { Seller } from '../../../global/SellerInterface';

function WMS_Detail(props: any) {
  const { state } = useLocation();

  const sellerTitles: string[][] = [
    ['화주사명', 'companyName'],
    ['상품군', 'productGroupName'],
    ['사업자 번호', 'businessNo'],
    ['주소', 'address'],
    ['매출', 'sales'],
    ['출고건수', 'exportCnt'],
    ['대표자명', 'ceoName'],
    ['담당자명', 'managerName'],
    ['담당자 메일', 'managerEmail'],
    ['담당자 번호', 'managerPhone'],
    ['마케팅 구독', 'marketing'],
  ];

  const threeplTitles: string[][] = [
    ['3PL명', 'companyName'],
    ['상품군', 'productGroupName'],
    ['사업자 번호', 'businessNo'],
    ['주소', 'address'],
    ['출고건수', 'exportCnt'],
    ['전체 창고 자리', 'cntTotal'],
    ['남은 창고 자리', 'leftContract'],
    ['100박스 당 가격', 'fee'],
    ['대표자명', 'ceoName'],
    ['담당자명', 'managerName'],
    ['담당자 메일', 'managerEmail'],
    ['담당자 번호', 'managerPhone'],
    // ['매칭', 'matchings'],
  ];

  const [titles, setTitles] = useState<string[][]>();

  const [rows, setRows] = useState<any[]>([]);

  const [name, setName] = useState<string>('');

  async function getSellerDetail() {
    const listurl = '/wms/seller/' + state.sellerNo;
    await axios
      .get(listurl, {})
      .then(function (response) {
        console.log('-', response.data);
        setRows(response.data);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function get3plDetail() {
    const listurl = '/wms/3pl/' + state.threePLNo;
    await axios
      .get(listurl, {})
      .then(function (response) {
        console.log('-', response.data);
        setRows(response.data);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    if (state.sellerNo !== undefined) {
      getSellerDetail();
      setTitles(sellerTitles);
    } else if (state.threePLNo !== undefined) {
      get3plDetail();
      setTitles(threeplTitles);
    }
  }, []);

  return (
    <MyPage>
      <p></p>
      <Container>
        <PageTitle>
          <Title>{name}</Title>
          <Line></Line>
          {/* <img src={dashedLine} /> */}
        </PageTitle>
        {rows && titles && <MyInfo title={titles} rows={rows} columns={titles.length} getItem={setName}></MyInfo>}
      </Container>
      <p></p>
    </MyPage>
  );
}

const MyPage = styled.div`
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

export default WMS_Detail;
