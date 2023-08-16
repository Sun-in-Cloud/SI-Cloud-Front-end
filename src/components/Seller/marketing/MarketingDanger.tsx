import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import axios from 'axios';
import Slider from 'react-slick';
import DangerProductList from '../../common/DangerProductList';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useAppSelect } from '../../../redux/configStore.hooks';

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
  const seller = useAppSelect((state) => state.seller);
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
    //const listurl = `${process.env.REACT_APP_API_URL}/seller/marketing/danger`;
    const listurl = `/seller/marketing/danger`;

    await axios
      .get(listurl, {
        params: {
          sellerNo: seller.userNo,
        },
      })
      .then(function (response) {
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
      <Title>
        <SubTitle> 위험상품 확인하기</SubTitle>
      </Title>
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

const Title = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  background-color: #f6f2ef;
  width: 100%;
  height: 120px;
  border-radius: 0 0 10px 10px;
`;

const SubTitle = styled.div`
  display: grid;
  margin-top: 75px;
  font-size: 20px;
  font-family: 'GmarketSansMedium';
`;
const DangerList = styled.div`
  padding-top: 30px;
  height: 550px;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 0.5fr 6.6fr 0.5fr;
  column-gap: 10px;
`;

const StyledSlider = styled(Slider)`
  width: 950px;
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
