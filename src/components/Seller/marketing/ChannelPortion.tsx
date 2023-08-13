import React from 'react';
import ReactApexChart from 'react-apexcharts';

function ChannelPortion(props: any) {
  return (
    <>
      <ReactApexChart
        type="pie"
        series={[44, 55, 13, 43, 22]}
        options={{
          labels: ['A', 'B', 'C', 'D', 'E'],
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
    </>
  );
}

export default ChannelPortion;
