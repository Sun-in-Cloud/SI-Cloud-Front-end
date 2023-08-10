import ApexCharts from 'apexcharts';
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import ApexChart from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { title } from 'process';

function MarketingChartYearly(props: any) {
  const [numberYearly, setNumberYearly] = useState<any>();
  const [numberYearlyTitle, setNumberYearlyTitle] = useState<Array<string>>([]);
  const [salesYearly, setSalesYearly] = useState<any>();
  const [weekData, setWeekData] = useState<any>();

  function getYearlyTitle() {
    let titles = [];
    for (let i = 0; i < props.data.numberOfSalesYearly.length; i++) {
      let tmp = '';
      tmp += String(props.data.numberOfSalesYearly[i].year);

      titles.push(tmp);
    }
    setNumberYearlyTitle(titles);
  }

  function getYearlyCount() {
    let data = [];
    for (let i = 0; i < props.data.numberOfSalesYearly.length; i++) {
      data.push(props.data.numberOfSalesYearly[i].numberOfSales);
    }
    setNumberYearly(data);
  }

  function getYearlySales() {
    let data = [];
    for (let i = 0; i < props.data.totalSalesYearly.length; i++) {
      data.push(props.data.totalSalesYearly[i].totalSales);
    }
    setSalesYearly(data);
  }

  useEffect(() => {
    getYearlyTitle();
    getYearlyCount();
    getYearlySales();

    setWeekData(props.data);
  }, [props.type]);

  return (
    <>
      {weekData && (
        <Graph>
          {props.type == 'yearlyCount' ? (
            <ReactApexChart
              type="bar"
              series={[{ name: '판매건수', data: numberYearly }]}
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
                  categories: numberYearlyTitle,

                  position: 'top',
                  axisBorder: {
                    show: false,
                  },
                  axisTicks: {
                    show: false,
                  },
                  labels: {
                    style: {
                      fontSize: '12px',
                      fontFamily: 'Jalnan',
                      colors: ['#1E1008'],
                    },
                  },
                },
                labels: numberYearly,
                dataLabels: {
                  style: {
                    fontSize: '12px',
                    fontFamily: 'Jalnan',
                    colors: ['#ffffff'],
                  },
                },
                fill: {
                  type: 'gradient',
                  gradient: { gradientToColors: ['#A4BFEF'], stops: [0, 100] },
                },
                colors: ['#6A93CB'],
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
              series={[{ name: '매출', data: salesYearly }]}
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
                  categories: numberYearlyTitle,
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
                labels: salesYearly,
                dataLabels: {
                  style: {
                    fontSize: '12px',
                    fontFamily: 'Jalnan',
                    colors: ['#ffffff'],
                  },
                },
                fill: {
                  type: 'gradient',
                  gradient: { gradientToColors: ['#A4BFEF'], stops: [0, 100] },
                },
                colors: ['#6A93CB'],
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
  display: flex;
  height: 210px;
  width: 350px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 3px -2px black;
  margin-top: -3px;
  padding: 6px;
  z-index: 10;
  justify-content: center;
  align-items: center;
`;
export default MarketingChartYearly;
