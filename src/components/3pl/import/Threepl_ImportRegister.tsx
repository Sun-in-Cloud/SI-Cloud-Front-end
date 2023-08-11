import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Threepl_ListingPage from '../Threepl_ListingPage';
import axios from 'axios';
import BarcodeScan from '../../common/BarcodeScan';
import { styled } from 'styled-components';
import LoginBtn from '../../common/Loginbtn';

function Threepl_ImportRegister(props: any) {
  const { state } = useLocation();

  // const columns: string[] = ['바코드 번호', '상품명', '입고 예정 수량', '실제 입고량'];
  // const row = [
  //   { productNo: 8809718020261, productName: '마스크', requestAmount: 200, importAmount: 23 },
  //   { productNo: 4029787487862, productName: '비타민', requestAmount: 300, importAmount: null },
  //   { productNo: 8806521017211, productName: '소화제', requestAmount: 180, importAmount: null },
  // ];

  const title: string[][] = [
    ['바코드 번호', 'productNo'],
    ['상품명', 'productName'],
    ['입고 예정 수량', 'requestAmount'],
    ['실제 입고량', 'importAmount'],
  ];

  const [rows, setRows] = useState<any[]>([]);

  async function getProductList() {
    const listurl = '/3pl/import/register';
    await axios
      .get(listurl, {
        params: {
          importNo: state.importNo,
        },
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(function (response) {
        console.log('-', response.data);
        setRows(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //입고 등록
  async function RegisterImport() {
    const listurl = '/3pl/import/register';
    await axios
      .post(listurl, {
        sellerNo: props.seller,
        importNo: state.importNo,
        importList: rows,
      })
      .then(function (response) {
        console.log('res', response.data);
        if (response.data === true) {
          alert('입고 등록 성공');
        } else {
          alert('입고 등록 실패');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getProductNo(barcode: string) {
    console.log('***', barcode);
    const newRow: any[] = [];
    rows.map((value: any, index: number) => {
      console.log('val', value);
      if (value.productNo == barcode) {
        newRow[index] = {
          productNo: value.productNo,
          productName: value.productName,
          requestAmount: value.requestAmount,
          importAmount: ++value.importAmount,
        };
        console.log('()', value.importAmount);
      } else {
        newRow[index] = {
          productNo: value.productNo,
          productName: value.productName,
          requestAmount: value.requestAmount,
          importAmount: value.importAmount,
        };
      }
    });
    console.log('s', rows);
    setRows(newRow);
  }

  useEffect(() => {
    console.log('---');
    getProductList();
  }, []);

  return (
    <>
      <MainPage>
        <List>
          <Title>
            <p>입고예정번호: {state.importNo}</p>
          </Title>
          <Threepl_ListingPage
            sellerNo={props.seller}
            titles={title}
            number={[]}
            rows={rows}
            columns={title.length}
            onDetail={true}
            getItem={getProductNo}
          />
        </List>

        <p></p>
        <ScanNBtn>
          <BarcodeScan />
          <LoginBtn
            variant="primary"
            type="landscape"
            onClick={() => {
              console.log(rows);
              RegisterImport();
            }}
          >
            입고 등록
          </LoginBtn>
        </ScanNBtn>
      </MainPage>
    </>
  );
}
const MainPage = styled.div`
  margin-top: -40px;
  display: grid;
  grid-template-columns: 10fr 0.5fr 5fr;
  grid-template-area: Threepl_ListingPage . ScanNBtn;
`;

const List = styled.div`
  display: grid;
  grid-template-rows: 0.1fr 0.9fr;
  margin-top: -10px;
`;

const Title = styled.div`
  display: flex;
  font-size: 16px;
  font-family: jalnan;
  justify-content: flex-start;
`;

const ScanNBtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;
export default Threepl_ImportRegister;
