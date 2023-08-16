import ApexCharts from 'apexcharts';
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import ApexChart from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { title } from 'process';

function MarketingChartMonthly(props: any) {
  const [numberMonthly, setNumberMonthly] = useState<any>();
  const [numberMonthlyTitle, setNumberMonthlyTitle] = useState<Array<string>>([]);
  const [salesMonthly, setSalesMonthly] = useState<any>();
  const [weekData, setWeekData] = useState<any>();

  function getMonthlyTitle() {
    const numberOfSalesMonthly = props.data.numberOfSalesMonthly;
    let titles = [];
    for (let i = 0; i < props.data.numberOfSalesMonthly.length; i++) {
      let tmp = '';
      tmp += String(props.data.numberOfSalesMonthly[i].year).slice(2, 4);

      if (String(props.data.numberOfSalesMonthly[i].month).length == 1) {
        tmp += '0';
        tmp += String(props.data.numberOfSalesMonthly[i].month);
      } else {
        tmp += String(props.data.numberOfSalesMonthly[i].month);
      }

      titles.push(tmp);
    }
    setNumberMonthlyTitle(titles);
  }

  function getMonthlyCount() {
    let data = [];
    for (let i = 0; i < props.data.numberOfSalesMonthly.length; i++) {
      data.push(props.data.numberOfSalesMonthly[i].numberOfSales);
    }
    setNumberMonthly(data);
  }

  function getMonthlySales() {
    let data = [];
    for (let i = 0; i < props.data.totalSalesMonthly.length; i++) {
      data.push(props.data.totalSalesMonthly[i].totalSales);
    }
    setSalesMonthly(data);
  }

  useEffect(() => {
    getMonthlyTitle();
    getMonthlyCount();
    getMonthlySales();

    setWeekData(props.data);
  }, [props.type]);

  return (
    <>
      {weekData && (
        <Graph>
          {props.type == 'monthlyCount' ? (
            <ReactApexChart
              type="bar"
              series={[{ name: '판매건수', data: numberMonthly }]}
              options={{
                theme: { mode: 'light' },
                chart: {
                  height: 350,
                  toolbar: { show: false },
                },
                stroke: { curve: 'smooth' },
                grid: { show: true },
                yaxis: { show: false },
                xaxis: {
                  categories: numberMonthlyTitle,
                  labels: {
                    style: {
                      fontSize: '12px',
                      fontFamily: 'GmarketSansMedium',
                      colors: ['#1E1008'],
                    },
                  },
                  position: 'top',
                  axisBorder: {
                    show: false,
                  },
                  axisTicks: {
                    show: false,
                  },
                },
                labels: numberMonthly,

                dataLabels: {
                  style: {
                    fontSize: '12px',
                    fontFamily: 'GmarketSansMedium',
                    colors: ['#1E1008'],
                  },
                },
                fill: {
                  type: 'gradient',
                  gradient: { gradientToColors: ['#fad0c4'], stops: [0, 100] },
                },
                colors: ['#ff9a9e'],
                tooltip: {
                  y: { formatter: (value) => `${value}건` },
                  style: {
                    fontSize: '12px',
                    fontFamily: 'GmarketSansMedium',
                  },
                },
              }}
            />
          ) : (
            <ReactApexChart
              type="area"
              series={[{ name: '매출', data: salesMonthly }]}
              options={{
                theme: { mode: 'light' },
                chart: {
                  height: 330,
                  zoom: { enabled: false },
                },
                markers: {
                  colors: undefined,
                  fillOpacity: 1,
                  shape: 'circle',
                  radius: 3,
                },
                stroke: { curve: 'smooth' },
                grid: { show: true },
                xaxis: {
                  categories: numberMonthlyTitle,
                  labels: {
                    style: {
                      fontSize: '12px',
                      fontFamily: 'GmarketSansMedium',
                      colors: ['#1E1008'],
                    },
                  },
                  position: 'top',
                  axisBorder: {
                    show: false,
                  },
                  axisTicks: {
                    show: false,
                  },
                },
                labels: salesMonthly,
                dataLabels: {
                  style: {
                    fontSize: '12px',
                    fontFamily: 'GmarketSansMedium',
                    colors: ['#1E1008'],
                  },
                },
                fill: {
                  type: 'gradient',
                  gradient: { gradientToColors: ['#fad0c4'], stops: [0, 100] },
                },
                colors: ['#ff9a9e'],
                tooltip: {
                  enabled: true,
                  enabledOnSeries: undefined,
                  shared: true,
                  intersect: false,
                  y: { formatter: (value) => `${value}원` },
                  marker: {
                    show: true,
                  },
                  style: {
                    fontSize: '12px',
                    fontFamily: 'GmarketSansMedium',
                  },
                },
              }}
            />
          )}
        </Graph>
      )}
    </>
  );
}
const Graph = styled.div`
  display: flex;
  height: 210px;
  width: 350px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 3px -2px black;
  margin-top: -3px;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;
export default MarketingChartMonthly;
