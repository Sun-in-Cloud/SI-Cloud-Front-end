import React, { useState } from 'react';
import { styled } from 'styled-components';
import RegisterNew from '../common/RegisterNew';
import LoginBtn from '../common/Loginbtn';

function ThreePlRegister(props: any) {
  const [newThreePL, setNewThreePL] = useState<any>();
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
  };
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
            <OneRow>
              <List>{item[0]}</List>
              <RegisterNew name={item[1]} onChange={onChange} />
            </OneRow>
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
  padding-top: 150px;
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
export default ThreePlRegister;
