import React from 'react';
import { styled } from 'styled-components';
import Filter from './Filter';
import LoginBtn from '../Loginbtn';
function SelectTable(props: any) {
  const options1: string[] = ['냉장', '냉동', '의류', '가전제품', '식물'];
  const options2: string[] = [
    '서울',
    '인천',
    '대전',
    '부산',
    '대구',
    '광주',
    '제주',
    '경기',
    '강원',
    '충북',
    '충남',
    '전북',
    '전남',
    '경북',
    '경남',
  ];
  const options3: string[] = ['1000건 이하', '1000~10000건', '10000건~500000건', '500000건 이상'];
  return (
    <>
      <Table>
        <h1></h1>
        <hr></hr>
        <Filter title="상품군" option={options1}></Filter>
        <Filter title="위치" option={options2}></Filter>
        <Filter title="최소출고건수" option={options3}></Filter>
        <ChkFilter>
          <Title>계약 종료된 곳만 보기</Title>
          <ChkBox type="checkbox"></ChkBox>
        </ChkFilter>
        <LoginBtn variant="primary" type="landscape">
          조회하기
        </LoginBtn>
      </Table>
    </>
  );
}

const Table = styled.div`
  //display: grid;
  margin-bottom: 10px;
  border: 1.5px solid #1e1008;
  border-radius: 25px;
  text-align: left;
  padding: 30px;
`;

const Title = styled.div`
  display: inline-block;
  font-family: Jalnan;
  font-size: 20px;
  margin-top: 40px;
`;

const ChkFilter = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 50px;
`;

const ChkBox = styled.input`
  appearance: none;
  border: 1.5px solid gainsboro;
  border-radius: 0.35rem;
  width: 1.5rem;
  height: 1.5rem;
  margin-left: 10px;

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #0073ff;
  }
`;

export default SelectTable;
