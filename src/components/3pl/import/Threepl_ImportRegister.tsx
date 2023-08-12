import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Threepl_ListingPage from '../Threepl_ListingPage';
import axios from 'axios';
import BarcodeScan from '../../common/BarcodeScan';
import { styled } from 'styled-components';
import LoginBtn from '../../common/Loginbtn';
import { Box, Button, Dialog, DialogContent } from '@material-ui/core';
import { BarcodeScanner } from '../../common/BarcodeScanner';

function Threepl_ImportRegister(props: any) {
  const { state } = useLocation();

  // const columns: string[] = ['바코드 번호', '상품명', '입고 예정 수량', '실제 입고량'];
  const row = [
    { productNo: 8809718020261, productName: '마스크', requestAmount: 200, importAmount: 23 },
    { productNo: 4029787487862, productName: '비타민', requestAmount: 300, importAmount: 10 },
    { productNo: 8806521017211, productName: '소화제', requestAmount: 180, importAmount: null },
  ];

  const title: string[][] = [
    ['바코드 번호', 'productNo'],
    ['상품명', 'productName'],
    ['입고 예정 수량', 'requestAmount'],
    ['실제 입고량', 'importAmount'],
  ];

  const rows = useRef<any[]>(row); //처음 axios 값 가져와서 저장 후 변경

  const [vRows, setVRows] = useState<any[]>(rows.current); //변경될 때마다 화면 렌더링을 위함

  //바코드 스캔
  const [scanCode, setScanCode] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [modal, setModal] = useState(false);

  const onChangeAmount = (e: any) => {
    setAmount(e.target.value);
  };

  const _toggle = () => {
    setModal(!modal);
  };

  const [modal2, setModal2] = useState(false);

  const _toggle2 = () => {
    setModal2(!modal2);
  };

  const _onDetected = (result: any) => {
    setModal(false);
    setScanCode(result ? result.codeResult.code : '');
    setModal2(true);
    {
      /*let set: boolean = true;
    rows.current.map((value: any, index: number) => {
      value.productNo === result ? (set = false) : '';
    });
    if (set !== true) {
      setModal(false);
      setScanCode(result ? result.codeResult.code : '');
      setModal2(true);
    }*/
    }
  };

  async function getProductList() {
    const listurl = '/3pl/import/register';
    await axios
      .get(listurl, {
        params: {
          //importNo: state.item.importNo,
        },
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(function (response) {
        console.log('-', response.data);
        rows.current = response.data;
        setVRows(rows.current);
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
        //sellerNo: state.sellerNo,
        //importNo: state.item.importNo,
        importList: vRows,
      })
      .then(function (response) {
        console.log('res', response);
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

  function getProductNo(barcode: string, amount: number) {
    console.log('***', barcode);
    console.log('rows', rows.current);
    const newRow: any[] = [];
    rows.current.map((value: any, index: number) => {
      if (value.productNo == barcode) {
        let chAmount: number = Number(value.importAmount) + Number(amount);
        newRow[index] = {
          productNo: value.productNo,
          productName: value.productName,
          requestAmount: value.requestAmount,
          importAmount: chAmount,
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
    rows.current = newRow;
    setVRows(rows.current);
  }

  useEffect(() => {
    console.log('---');
    //getProductList();
  }, []);

  return (
    <>
      <MainPage>
        <List>
          <Title>{/*<p>입고예정번호: {state.item.importNo}</p>*/}</Title>
          <Threepl_ListingPage
            sellerNo={props.seller}
            titles={title}
            number={[]}
            rows={vRows}
            columns={title.length}
            onDetail={true}
          />
        </List>
        <LoginBtn variant="primary" type="landscape" onClick={_toggle}>
          바코드 인식
        </LoginBtn>
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

        <Dialog
          open={modal}
          onClose={_toggle}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <DialogContent>
            <BarcodeScanner handleScan={_onDetected} />
          </DialogContent>
        </Dialog>

        <Dialog
          open={modal2}
          onClose={_toggle2}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <DialogContent>
            <p>{scanCode}</p>
            수량
            <input type="number" onChange={onChangeAmount} />
            <LoginBtn
              variant="primary"
              type="landscape"
              onClick={() => {
                console.log(rows);
                getProductNo(scanCode, amount);
                setModal2(!modal2);
              }}
            ></LoginBtn>
          </DialogContent>
        </Dialog>

        {/*<p></p>
        <ScanNBtn>
          <BarcodeScan getItem={getProductNo} />
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
          </ScanNBtn>*/}
      </MainPage>
    </>
  );
}
const MainPage = styled.div`
  margin-top: -40px;
  //display: grid;
  //grid-template-columns: 10fr 0.5fr 5fr;
  //grid-template-area: Threepl_ListingPage . ScanNBtn;
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
