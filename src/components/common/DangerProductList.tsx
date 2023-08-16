import React from 'react';
import Slider from 'react-slick';
import { styled } from 'styled-components';
import TableColumn from '../TableColumn';
import TableTitleBk from './TableTitleBk';
import TableTitleWH from './TableTitleWH';
import ReactApexChart from 'react-apexcharts';

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
  const titles = [
    ['상품명', 'productName'],
    ['상품번호', 'productNo'],
    ['최종주문', 'lastOrderDate'],
    ['입고가격', 'importPrice'],
    ['소비자가', 'consumerPrice'],
    ['위험도', 'dangerDegree'],
  ];

  return (
    <Product>
      {props.data &&
        titles.map((item, index) => {
          if (item[1] === 'dangerDegree') {
            let num = [];
            num.push(props.data[item[1]]);
            return (
              <OneRow>
                <DItem>{item[0]}</DItem>
                <Chart>
                  <ReactApexChart
                    type="bar"
                    series={[{ name: '위험도', data: num }]}
                    options={{
                      dataLabels: {
                        style: {
                          fontSize: '12px',
                          fontFamily: 'GmarketSansMedium',
                          colors: ['#fff'],
                        },
                      },
                      colors: ['#f5576c'],
                      chart: {
                        type: 'bar',
                        width: 90,
                        height: 30,
                      },
                      xaxis: {
                        categories: [''],
                        max: 100,
                      },
                      plotOptions: {
                        bar: {
                          borderRadius: 4,
                          horizontal: true,
                        },
                      },
                    }}
                  />
                </Chart>
              </OneRow>
            );
          }
          return (
            <OneRow>
              <Title>{item[0]}</Title>
              <Item>{props.data[item[1]]}</Item>
            </OneRow>
          );
        })}
    </Product>
  );
}

const Product = styled.div`
  display: grid;
  background-color: #fdfaf7;
  margin: 15px;
  padding: 20px;
  height: 400px;
  width: 260px;
  border-radius: 10px;
  box-shadow: 0 0 3px -2px black;
`;

const OneRow = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
`;

const Title = styled.div`
  font-size: 17px;
  font-family: KBO;
  margin-right: 10px;
`;
const Item = styled.div`
  font-size: 16px;
  font-family: 'GmarketSansMedium';
  letter-spacing: 2px;
  background-color: 'green';
  align-items: center;
  width: 150px;
`;

const DItem = styled.div`
  display: flex;
  font-size: 17px;
  font-family: KBO;
  width: 49px;
`;

const Chart = styled.div`
  margin-top: 20px;
`;

export default DangerProductList;
