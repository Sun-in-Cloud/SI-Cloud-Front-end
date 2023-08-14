import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import RegisterNew from '../common/RegisterNew';
import LoginBtn from '../common/Loginbtn';
import axios from 'axios';
import UseProductGroup from '../Seller/customHook/UseProductGroup';
import ProductDropdowm from '../Seller/product/ProductDropdowm';
import { useAppSelect } from '../../redux/configStore.hooks';
import threepl from '../../redux/threepl';

function ThreePlRegister(props: any) {
  const [newThreePL, setNewThreePL] = useState<any>();
  const [productList, setProductList] = useState([]);

  const dropDownRef = useRef(null);
  const [groupName, setGroupName] = useState('');
  const [isOpen, setIsOpen] = UseProductGroup(dropDownRef, false);

  const seller = useAppSelect((state) => state.seller);

  const title_1 = [
    ['회사이름', 'companyName'],
    ['사업자 번호', 'businessNo'],
    ['아이디', 'loginId'],
    ['비밀번호', 'loginPassword'],
    ['회사 대표', 'ceoName'],
    ['주소', 'address'],
  ];
  const title_2 = [
    ['상품군', 'productGroupName'],
    ['관리자 이름', 'managerName'],
    ['관리자 연락처', 'managerPhone'],
    ['관리자 이메일', 'managerEmail'],
    ['100박스당 사용료', 'fee'],
    ['계약가능 화주사수', 'cntTotal'],
  ];

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setNewThreePL({ ...newThreePL, [e.currentTarget.name]: e.currentTarget.value });
  };
  const onClick = () => {
    console.log(newThreePL);
    postUserInfo();
  };

  async function postUserInfo() {
    const listurl = '/3pl/auth/register';
    await axios
      .post(listurl, newThreePL)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function getProductTypeList() {
    const listurl = '/productGroup/list';
    await axios
      .get(listurl)
      .then(function (response) {
        setProductList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getProductGroup(props: string) {
    setNewThreePL({ ...newThreePL, ['productGroupName']: props });
  }

  useEffect(() => {
    getProductTypeList();
    console.log(seller);
  }, []);

  useEffect(() => {
    getProductGroup(groupName);
  }, [groupName]);

  return (
    <ThreePLform>
      <Title>
        <SubTitle>3PL 회원가입</SubTitle>
      </Title>
      <p></p>
      <First>
        {title_1.map((item, index) => {
          return (
            <OneRow>
              <List>{item[0]}</List>
              <RegisterNew name={item[1]} onChange={onChange} />
            </OneRow>
          );
        })}
      </First>
      <Second>
        {title_2.map((item, index) => {
          return (
            <>
              {item[0] == '상품군' ? (
                <OneRow>
                  <List>{item[0]}</List>
                  <div ref={dropDownRef}>
                    <RegisterDrop onClick={() => setIsOpen(!isOpen)} type="button" name={item[1]} value={groupName} />
                    {isOpen && (
                      <RegisterUl>
                        {productList.map((it: any, index: number) => {
                          return (
                            <ProductDropdowm
                              key={index}
                              value={it}
                              setIsOpen={setIsOpen}
                              setGroupName={setGroupName}
                              isOpen={isOpen}
                            />
                          );
                        })}
                      </RegisterUl>
                    )}
                  </div>
                </OneRow>
              ) : (
                <OneRow>
                  <List>{item[0]}</List>
                  <RegisterNew name={item[1]} onChange={onChange} />
                </OneRow>
              )}
            </>
          );
        })}
      </Second>
      <p></p>
      <p></p>
      <p></p>
      <Btns>
        <LoginBtn type="landscape" variant="dark" onClick={onClick}>
          회원가입
        </LoginBtn>
      </Btns>
    </ThreePLform>
  );
}
const ThreePLform = styled.div`
  display: grid;
  width: 100%;
  padding-top: 160px;
  height: 430px;
  grid-template-columns: 0.7fr 3fr 3fr 0.7fr;
`;
const Title = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  background-color: #f6f2ef;
  width: 100%;
  height: 200px;
  border-radius: 0 0 10px 10px;
`;

const SubTitle = styled.div`
  display: grid;
  margin-top: 130px;
  font-size: 20px;
  font-family: 'GmarketSansMedium';
`;

const First = styled.div`
  display: grid;
  justify-items: start;
`;
const Second = styled.div`
  display: grid;
  justify-items: start;
`;

const List = styled.div`
  font-size: 20px;
  font-family: 'GmarketSansMedium';
`;
const OneRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
`;

const Btns = styled.div`
  display: grid;
  height: fit-content;
  justify-content: flex-end;
  padding: 10px;
`;

const RegisterDrop = styled.input`
  width: 190px;
  height: 45px;
  margin-left: 10px;
  border: 2px solid #382f2d;
  background-color: #fdfaf7;
  font-family: GmarketSansMedium;
  font-size: 15px;
`;
const RegisterUl = styled.ul`
  padding-left: 50px;
`;
export default ThreePlRegister;
