import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Filter from './Filter';
import LoginBtn from '../Loginbtn';
import { Location, useLocation } from 'react-router-dom';
import axios from 'axios';

function SelectTable(props: any) {
  const location: Location = useLocation();

  const [options1, setOptions1] = useState<string[]>([]);

  async function getGroupList() {
    const listurl = '/productGroup/list';
    await axios
      .get(listurl, {})
      .then(function (response) {
        console.log('-', response.data);
        setOptions1(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const options2: string[] = ['서울', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남'];

  const options3: any[][] = [
    ['전체', 0],
    ['1000 이상', 1000],
    ['10000 이상', 10000],
    ['50000 이상', 50000],
  ];
  const options4: any[][] = [
    ['전체', 0],
    ['1000 이상', 1000],
    ['10000 이상', 10000],
    ['50000 이상', 50000],
  ];
  const options5: any[][] = [
    ['즉시 가능', 0],
    ['1달', 1],
    ['2달', 2],
    ['3달', 3],
    ['4달', 4],
    ['5달', 5],
  ];

  interface filter {
    productGroup: string;
    address: string;
    numValue?: number;
    price?: number;
    contractPeriod: number;
  }

  const initFilter: filter = {
    productGroup: '',
    address: '',
    numValue: 0,
    price: 0,
    contractPeriod: 0,
  };

  const [filters, setFilters] = useState<filter>(initFilter);

  function findFilter(item: string[]): void {
    const name: string = item[0];
    const value: string = item[1];
    setFilters({ ...filters, [name]: value });
  }

  const getMacthList = () => {
    console.log(filters);
    props.getFilter(filters);
  };

  useEffect(() => {
    getGroupList();
  }, []);

  return (
    <>
      <Table>
        <h1></h1>
        <hr></hr>
        <Filter title={['상품군', 'productGroup']} option={options1} findFilter={findFilter}></Filter>
        <Filter title={['위치', 'address']} option={options2} findFilter={findFilter}></Filter>
        {location.pathname.includes('3pl') && (
          <Filter title={['출고건수', 'numValue']} option={options3} findFilter={findFilter}></Filter>
        )}
        {location.pathname.includes('seller') && (
          <Filter title={['가격', 'price']} option={options4} findFilter={findFilter}></Filter>
        )}
        <Filter title={['남은 계약 기간', 'contractPeriod']} option={options5} findFilter={findFilter}></Filter>
        <LoginBtn variant="primary" type="landscape" onClick={getMacthList} style={{ marginTop: '20px' }}>
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
  background-color: #f4f0df;
`;

const Title = styled.div`
  display: inline-block;
  font-family: Jalnan;
  font-size: 20px;
  margin-top: 40px;
`;

export default SelectTable;
