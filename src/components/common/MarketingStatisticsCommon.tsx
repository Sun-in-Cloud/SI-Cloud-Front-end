import ApexCharts from 'apexcharts';
import React from 'react';
import { styled } from 'styled-components';
import ApexChart from 'apexcharts';
import ReactApexChart from 'react-apexcharts';

function MarketingStatisticsCommon(props: any) {
  return (
    <Graph>
      <ReactApexChart
        type="bar"
        series={[
          { name: 'Price', data: [1000, 2000, 3000] },
          { name: 'Price2', data: [1500, 1000, 2500] },
        ]}
        options={{
          theme: { mode: 'light' },
          chart: {
            height: 300,
            width: 500,
            toolbar: { show: false },
            background: 'transparent',
          },
          stroke: { curve: 'smooth', width: 4 },
          grid: { show: false },
          yaxis: { show: false },
          xaxis: {
            labels: { show: false },
            axisTicks: { show: false },
            axisBorder: { show: false },
            categories: [1660004640, 1660091040, 1660177440],
            type: 'datetime',
          },
          fill: {
            type: 'gradient',
            gradient: { gradientToColors: ['#D8E3F0'], stops: [0, 100] },
          },
          colors: ['#BED1E6'],
          tooltip: {
            y: { formatter: (value) => `$ ${value.toFixed(2)}` },
          },
        }}
      />
    </Graph>
  );
}
const Graph = styled.div`
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 3px -2px black;
  margin-top: -6px;
`;
export default MarketingStatisticsCommon;
