import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Threepl_ListingPage from '../Threepl_ListingPage';
import axios from 'axios';
import { styled } from 'styled-components';
import LoginBtn from '../../common/Loginbtn';
import { Dialog, DialogContent } from '@material-ui/core';
import { BarcodeScanner } from '../../common/BarcodeScanner';

function Threepl_ImportRegister(props: any) {
  const { state } = useLocation();

  const title: string[][] = [
    ['바코드 번호', 'productNo'],
    ['상품명', 'productName'],
    ['입고 예정 수량', 'requestAmount'],
    ['실제 입고량', 'importAmount'],
  ];

  const rows = useRef<any[]>([]); //처음 axios 값 가져와서 저장 후 변경

  const [vRows, setVRows] = useState<any[]>(rows.current); //변경될 때마다 화면 렌더링을 위함

  //바코드 스캔
  const [scanCode, setScanCode] = useState<string>('');
  const [scanName, setScanName] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [modal, setModal] = useState(false);

  const [same, setSame] = useState<boolean>(false);

  const onChangeAmount = (e: any) => {
    setAmount(e.target.value);
  };

  const _toggle = () => {
    setModal(!modal);
    setSame(false);
  };

  const [modal2, setModal2] = useState(false);

  const _toggle2 = () => {
    setModal2(!modal2);
  };

  const _onDetected = (result: any) => {
    rows.current.map((value: any, index: number) => {
      if (value.productNo == result.codeResult.code) {
        setSame(true);
        setScanCode(result ? result.codeResult.code : '');
        setScanName(value.productName);
        setModal(false);
        setModal2(true);
        return;
      }
      setModal(false);
      setModal2(true);
    });
  };

  async function getProductList() {
    const listurl = '/3pl/import/register';
    await axios
      .get(listurl, {
        params: {
          importNo: state.item.importNo,
        },
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(function (response) {
        rows.current = response.data;
        setVRows(rows.current);
      })
      .catch(function (error) {
        //console.log(error);
      });
  }

  //입고 등록
  async function RegisterImport() {
    const listurl = '/3pl/import/register';
    await axios
      .post(listurl, {
        sellerNo: state.sellerNo,
        importNo: state.item.importNo,
        importList: vRows,
      })
      .then(function (response) {
        if (response.data === true) {
          alert('입고 등록 성공');
        } else {
          alert('입고 등록 실패');
        }
      })
      .catch(function (error) {
        //console.log(error);
      });
  }

  function getProductNo(barcode: string, amount: number) {
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
      } else {
        newRow[index] = {
          productNo: value.productNo,
          productName: value.productName,
          requestAmount: value.requestAmount,
          importAmount: value.importAmount,
        };
      }
    });
    rows.current = newRow;
    setVRows(rows.current);
    setAmount(0);
    setScanCode('');
  }

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <>
      <MainPage>
        <List>
          <Title>
            <p>입고예정번호: {state.item.importNo}</p>
            <Btn>
              <LoginBtn variant="primary" type="landscape" onClick={_toggle} style={{ marginRight: '10px' }}>
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
            </Btn>
          </Title>
          <Threepl_ListingPage
            sellerNo={props.seller}
            titles={title}
            number={[]}
            rows={vRows}
            columns={title.length}
            onDetail={true}
          />
        </List>

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
            <SelTitleCode>
              <p>{same ? [scanCode] : ''}</p>
            </SelTitleCode>
            <SelTitle>
              <p>{same ? scanName : '바코드를 다시 인식하세요'}</p>
            </SelTitle>

            <SelContent>
              <p>{same ? '입고된 수량을 입력해주세요' : ''}</p>
            </SelContent>

            <Input
              type="number"
              onChange={onChangeAmount}
              style={{
                display: same ? 'block' : 'none',
              }}
            />
            <Btn>
              <LoginBtn
                variant="primary"
                type="landscape"
                onClick={() => {
                  console.log(rows);
                  getProductNo(scanCode, amount);
                  setModal2(!modal2);
                }}
                style={{ display: same ? 'block' : 'none' }}
              >
                입고 수량 입력
              </LoginBtn>
            </Btn>
          </DialogContent>
        </Dialog>
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
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ScanNBtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

const SelTitleCode = styled.div`
  display: flex;
  width: 400px;
  justify-content: center;
  font-family: jalnan;
  font-size: 20px;
  margin-bottom: -20px;
`;

const SelTitle = styled.div`
  display: flex;
  width: 400px;
  justify-content: center;
  font-family: jalnan;
  font-size: 30px;
`;

const SelContent = styled.div`
  display: flex;
  width: 400px;
  justify-content: flex-start;
  font-family: jalnan;
  font-size: 20px;
`;

const Input = styled.input`
  width: 400px;
  height: 40px;
  font-family: jalnan;
  font-size: 20px;
  margin: 10px;
`;

const Btn = styled.div`
  display: flex;
  width: fit-content;
  justify-content: center;
  height: 40px;
`;
export default Threepl_ImportRegister;
