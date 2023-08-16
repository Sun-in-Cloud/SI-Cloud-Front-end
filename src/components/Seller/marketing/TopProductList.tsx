import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { styled } from 'styled-components';

function TopProductList(props: any) {
  const [channel, setChannel] = useState('');
  const [channelDetail, setChannelDetail] = useState<any>();
  const [detailTitle, setDetailTitle] = useState<Array<string>>([]);
  const [detailSales, setDetailSales] = useState<Array<number>>([]);

  function setDetail() {
    let title: string[] = [];
    let sales: number[] = [];
    if (props.channelDetail) {
      props.channelDetail.topSalesProducts.map((item: any, index: number) => {
        title.push(item.productName);
        sales.push(item.totalSales);
      });
      setDetailTitle(title);
      setDetailSales(sales);
    }
  }

  useEffect(() => {
    setChannel(props.channelType);
    setChannelDetail(props.channelDetail);
    setDetail();
  }, [props.channelDetail]);
  return (
    <ProductRanking>
      <ReactApexChart
        type="donut"
        series={detailSales}
        options={{
          labels: detailTitle,
          tooltip: {
            y: {
              formatter: (value) => `${value}원`,
            },
            style: {
              fontSize: '15px',
              fontFamily: 'GmarketSansMedium',
            },
          },
          dataLabels: {
            enabled: true,
            style: {
              fontSize: '12px',
              fontFamily: 'GmarketSansMedium',
              colors: ['#fff'],
            },
          },
          colors: ['#fa709a', '#f9d423', '#e9e1d4', '#96e6a1', '#a1c4fd'],
          grid: {
            row: {
              colors: ['#F44336', '#E91E63', '#9C27B0'],
            },
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
          plotOptions: {
            pie: {
              expandOnClick: false,
            },
          },
        }}
      />
    </ProductRanking>
  );
}
const ProductRanking = styled.div`
  z-index: 100;
  margin-top: -150px;
  margin-left: 5px;
`;
export default TopProductList;
