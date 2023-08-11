import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import axios from 'axios';
import Slider from 'react-slick';
import DangerProductList from '../../common/DangerProductList';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface DangerProduct {
  consumerPrice: number;
  currentStock: number;
  importPrice: number;
  lastOrderDate: string;
  orderDate: string;
  productName: string;
  productNo: string;
}

function MarketingDanger(props: any) {
  const [prodctList, setProductList] = useState<Array<DangerProduct | undefined>>([]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
  };

  async function getProduct() {
    const listurl = '/seller/marketing/danger';

    const sellerNo = 8;
    await axios
      .get(listurl, {
        params: {
          sellerNo: sellerNo,
        },
      })
      .then(function (response) {
        console.log(response);
        setProductList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <DangerList>
      <p></p>
      <StyledSlider {...settings}>
        {prodctList.map((item) => {
          return (
            <SliderPos>
              <DangerProductList data={item} />
            </SliderPos>
          );
        })}
      </StyledSlider>
      <p></p>
    </DangerList>
  );
}
const DangerList = styled.div`
  margin-top: -45px;
  height: 550px;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 0.5fr 6.6fr 0.5fr;
`;

const StyledSlider = styled(Slider)`
  width: 1100px;
  height: 500px;

  .slick-prev:before,
  .slick-next:before {
    color: black;
  }
`;
const SliderPos = styled.div`
  height: 500px;
`;

export default MarketingDanger;
