import ApexCharts from 'apexcharts';
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import ApexChart from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { title } from 'process';

function MarketingChartWeekly(props: any) {
  const [numberWeekly, setNumberWeekly] = useState<any>();
  const [numberWeeklyTitle, setNumberWeeklyTitle] = useState<Array<string>>([]);
  const [salesWeekly, setSalesWeekly] = useState<any>();
  const [weekData, setWeekData] = useState<any>();

  function getWeeklyTitle() {
    const numberOfSalesWeekly = props.data.numberOfSalesWeekly;
    let titles = [];
    for (let i = 0; i < props.data.numberOfSalesWeekly.length; i++) {
      let tmp = '';
      tmp += String(props.data.numberOfSalesWeekly[i].year).slice(2, 4);

      if (String(props.data.numberOfSalesWeekly[i].month).length == 1) {
        tmp += '0';
        tmp += String(props.data.numberOfSalesWeekly[i].month);
      } else {
        tmp += String(props.data.numberOfSalesWeekly[i].month);
      }

      if (String(props.data.numberOfSalesWeekly[i].day).length == 1) {
        tmp += '0';
        tmp += String(props.data.numberOfSalesWeekly[i].day);
      } else {
        tmp += String(props.data.numberOfSalesWeekly[i].day);
      }
      titles.push(tmp);
    }
    setNumberWeeklyTitle(titles);
  }

  function getWeeklyCount() {
    let data = [];
    for (let i = 0; i < props.data.numberOfSalesWeekly.length; i++) {
      data.push(props.data.numberOfSalesWeekly[i].numberOfSales);
    }
    setNumberWeekly(data);
  }

  function getWeeklySales() {
    let data = [];
    for (let i = 0; i < props.data.totalSalesWeekly.length; i++) {
      data.push(props.data.totalSalesWeekly[i].totalSales);
    }
    setSalesWeekly(data);
  }

  useEffect(() => {
    getWeeklyTitle();
    getWeeklyCount();
    getWeeklySales();

    setWeekData(props.data);
  }, [props.type]);

  return (
    <>
      {weekData && (
        <Graph>
          {props.type == 'weeklyCount' ? (
            <ReactApexChart
              type="bar"
              series={[{ name: '판매건수', data: numberWeekly }]}
              options={{
                theme: { mode: 'light' },
                chart: {
                  height: 400,
                  toolbar: { show: false },
                },
                stroke: { curve: 'smooth' },
                grid: { show: true },
                yaxis: { show: false },
                xaxis: {
                  categories: numberWeeklyTitle,
                  labels: {
                    style: {
                      fontSize: '14px',
                      fontWeight: 'bold',
                      fontFamily: 'Jalnan',
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
                labels: numberWeekly,
                dataLabels: {
                  style: {
                    fontSize: '12px',
                    fontFamily: 'Jalnan',
                    colors: ['#1E1008'],
                  },
                },
                fill: {
                  type: 'gradient',
                  gradient: { gradientToColors: ['#83EAF1'], stops: [0, 100] },
                },
                colors: ['#63A4FF'],
                tooltip: {
                  y: { formatter: (value) => `${value}건` },
                  style: {
                    fontSize: '12px',
                    fontFamily: 'Jalnan',
                  },
                },
              }}
            />
          ) : (
            <ReactApexChart
              type="area"
              series={[{ name: '매출', data: salesWeekly }]}
              options={{
                theme: { mode: 'light' },
                chart: {
                  height: 400,
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
                  categories: numberWeeklyTitle,
                  labels: {
                    style: {
                      fontSize: '12px',
                      fontFamily: 'Jalnan',
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
                labels: salesWeekly,

                dataLabels: {
                  style: {
                    fontSize: '12px',
                    fontFamily: 'Jalnan',
                    colors: ['#1E1008'],
                  },
                },
                fill: {
                  type: 'gradient',
                  gradient: { gradientToColors: ['#89D4CF'], stops: [0, 100] },
                },
                colors: ['#734AE8'],
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
                    fontFamily: 'Jalnan',
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
  height: 500px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 3px -2px black;
  margin-top: -3px;
  padding: 10px 3px;
  display: grid;
  align-items: center;
  z-index: 10;
`;
export default MarketingChartWeekly;
