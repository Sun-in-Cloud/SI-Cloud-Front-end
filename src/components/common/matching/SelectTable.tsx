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

  const options2: string[] = [
    '서울',
    '경기',
    '인천',
    '강원',
    '부산',
    '대전',
    '대구',
    '광주',
    '충청북도',
    '충청남도',
    '전라북도',
    '전라남도',
    '경상북도',
    '경상남도',
    '제주',
  ];

  const options3: string[][] = [
    ['전체', '0'],
    ['1000 이상', '1000'],
    ['10000 이상', '10000'],
    ['50000 이상', '50000'],
  ];
  const options4: any[][] = [
    ['전체', 0],
    ['1000 이상', 1000],
    ['10000 이상', 10000],
    ['50000 이상', 5000],
  ];
  const options5: any[][] = [
    ['전체', 0],
    ['1달', 1],
    ['2달', 2],
    ['3달', 3],
  ];

  interface filter {
    productGroup: string;
    location: string;
    exportAmount?: number;
    price?: number;
    period: number;
  }

  const initFilter: filter = {
    productGroup: '',
    location: '',
    exportAmount: 0,
    price: 0,
    period: 0,
  };

  const [filters, setFilters] = useState<filter>(initFilter);

  function findFilter(item: string[]): void {
    const name: string = item[0];
    const value: string = item[1];
    setFilters({ ...filters, [name]: value });
  }

  const getMacthList = () => {
    //console.log(filters);
    props.getFilter(filters);
  };

  useEffect(() => {
    getGroupList();
  }, []);

  return (
    <>
      <Table>
        <h1></h1>
        <hr style={{ border: '0', height: '2px', background: '#1e1008' }}></hr>
        <Filter title={['상품군', 'productGroup']} option={options1} findFilter={findFilter}></Filter>
        <Filter title={['위치', 'location']} option={options2} findFilter={findFilter}></Filter>
        {location.pathname.includes('3pl') && (
          <Filter title={['출고건수', 'exportAmount']} option={options3} findFilter={findFilter}></Filter>
        )}
        {location.pathname.includes('seller') && (
          <Filter title={['가격', 'price']} option={options4} findFilter={findFilter}></Filter>
        )}
        <Filter title={['남은 계약 기간', 'period']} option={options5} findFilter={findFilter}></Filter>
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
  border: 2px solid #1e1008;
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
