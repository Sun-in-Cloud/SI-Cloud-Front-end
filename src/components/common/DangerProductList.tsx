import React from 'react';
import Slider from 'react-slick';
import { styled } from 'styled-components';
import TableColumn from '../TableColumn';
import TableTitleBk from './TableTitleBk';
import TableTitleWH from './TableTitleWH';

interface DangerProduct {
  consumerPrice: number;
  currentStock: number;
  importPrice: number;
  lastOrderDate: string;
  orderDate: string;
  productName: string;
  productNo: string;
}

function DangerProductList(props: any) {
  console.log(props);
  const titles = [
    ['상품명', 'productName'],
    ['상품번호', 'productNo'],
    ['마지막 주문', 'lastOrderDate'],
    ['입고가', 'importPrice'],
    ['소비자가', 'consumerPrice'],
    ['위험도', 'dangerDegree'],
  ];

  return (
    <Product>
      {titles.map((item, index) => {
        if (item[1] === 'dangerDegree') {
          <OneRow>
            <TableTitleWH key="6" disabled>
              {item[6]}
            </TableTitleWH>
            <Item>{props.data[item[1]]}</Item>
          </OneRow>;
        }
        if (index % 2 === 0) {
          return (
            <OneRow>
              <TableTitleBk key={index} disabled>
                {item[0]}
              </TableTitleBk>
              <Item>{props.data[item[1]]}</Item>
            </OneRow>
          );
        } else {
          return (
            <OneRow>
              <TableTitleWH key={index} disabled>
                {item[0]}
              </TableTitleWH>
              <Item>{props.data[item[1]]}</Item>
            </OneRow>
          );
        }
      })}
    </Product>
  );
}

const Product = styled.div`
  display: grid;
  background-color: #fff;
  margin: 15px;
  padding: 20px;
  height: 400px;
  width: 300px;
  border-radius: 10px;
  box-shadow: 0 0 3px -2px black;
`;

const OneRow = styled.div`
  display: flex;
  align-items: center;
  width: 380px;
  height: 40px;
`;

const Item = styled.div`
  font-size: 16px;
  font-family: 'Jalnan';
  letter-spacing: 2px;
  background-color: 'green';
  align-items: center;
  width: 200px;
`;

export default DangerProductList;
