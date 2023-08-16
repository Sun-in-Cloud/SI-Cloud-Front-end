import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { styled } from 'styled-components';

function ChannelPortion(props: any) {
  const [tab, setTab] = useState('');
  const [lastTitle, setLastTitle] = useState();

  useEffect(() => {
    setTab(props.tab);
    setLastTitle(props.channelLastYearTitle);
  }, [props.tab]);

  return (
    <PortionPage>
      {tab == 'lastYear' ? (
        <ReactApexChart
          type="pie"
          series={props.channelLastYearSales}
          options={{
            labels: props.channelLastYearTitle,
            dataLabels: {
              style: {
                fontSize: '12px',
                fontFamily: 'GmarketSansMedium',
                colors: ['#fff'],
              },
            },
            colors: ['#ccdbe2', '#917b56', '#e9e1d4', '#c9ba9b', '#ee9ca7'],
            tooltip: {
              y: {
                formatter: (value) => `${value}원`,
              },
              style: {
                fontSize: '15px',
                fontFamily: 'GmarketSansMedium',
              },
            },
            fill: {
              colors: ['#ccdbe2', '#917b56', '#e9e1d4', '#c9ba9b', '#ee9ca7'],
            },
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 250,
                  },
                  legend: {
                    position: 'bottom',
                  },
                },
              },
            ],
          }}
        />
      ) : (
        <ReactApexChart
          type="pie"
          series={props.channelThisYearSales}
          options={{
            labels: props.channelThisYearTitle,
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 250,
                  },
                  legend: {
                    position: 'bottom',
                  },
                },
              },
            ],
          }}
        />
      )}
    </PortionPage>
  );
}

const PortionPage = styled.div`
  height: 380px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 3px -2px black;
  margin-top: -3px;
  padding: 10px 3px;
  display: grid;
  align-items: center;
  z-index: 10;
`;

export default ChannelPortion;
