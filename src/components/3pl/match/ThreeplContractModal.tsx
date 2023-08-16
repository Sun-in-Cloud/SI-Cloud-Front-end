import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import DayPicker from './DayPicker';
import LoginBtn from '../../common/Loginbtn';
import axios from 'axios';
import { useAppSelect } from '../../../redux/configStore.hooks';

// dummy data
const optionData = [
  { optionKey: 'key01', optionName: 'my option 1' },
  { optionKey: 'key02', optionName: 'my option 2' },
];

// const
const moWidth = 575;

const useResize = () => {
  // 브라우저 가로 너비 감지
  const [state, setState] = useState({
    w: window?.innerWidth,
    h: window?.innerHeight,
  });

  const debounce = (func: any, delay: any) => {
    let timeoutId: any = null;
    return (...args: any) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const onResize = (e: any) => {
    setState(() => {
      return {
        w: e.target.innerWidth,
        h: e.target.innerHeight,
      };
    });
  };

  useEffect(() => {
    window.addEventListener('resize', debounce(onResize, 100));
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return state;
};
function ThreeplContractModal(props: any) {
  // state
  const [isExpand, setIsExpand] = useState(false);
  const [selected, setSelected] = useState<string>('A');

  const threepl = useAppSelect((state) => state.threepl);

  const [date, setDate] = useState<string>();

  //const { type: deviceType } = useDevice();
  const { w: deviceWidth } = useResize();

  function getDate(item: string) {
    setDate(item);
  }

  const handleMouseDown = (e: any) => {
    // select태그를 누르는 순간 option 리스트가 노출되므로
    // 마우스를 뗄 때 실행되는 onClick이 아닌
    // onMouseDown일 때 기본 동작을 막아야 함
    e.preventDefault();

    // select 리스트가 열려 있는 상태에서 다시 누른 상황이라면
    // focus되어 있는지 체크하고
    // focus되어 있는 상태라면 blur 처리
    if (e.target.matches(':focus')) {
      setIsExpand((prev) => !prev);
    } else {
      e.target.focus();
      setIsExpand(() => true);
    }

    return false;
  };

  async function postContract(location: string, endDate: string | undefined) {
    //const listurl = `${process.env.REACT_APP_API_URL}/3pl/match/contract`;
    const listurl = `/3pl/match/contract`;
    await axios
      .post(listurl, {
        location: location,
        endDate: endDate,
        sellerNo: props.sellerNo,
        threePLNo: threepl.userNo,
      })
      .then(function (response) {
        if (response.data === true) {
          alert('계약 성공');
        } else {
          alert('계약 실패');
        }
        props.setIsModalOpen(false);
      })
      .catch(function (error) {
        //console.log(error);
      });
  }

  return (
    <ContractModal>
      <p>
        {props.companyName} : {props.sellerNo}
      </p>
      <Box>
        <SelTitle>
          <p>창고 위치</p>
        </SelTitle>
        <Wrapper
          onBlur={() => {
            // onBlur일 때 하단 드롭다운 메뉴를 닫는다
            // select 태그가 아니라 ul리스트도 함께 감싼 wrapper에
            // onBlur를 넣어줘야 ul태그의 버튼 이벤트를 onClick에 넣을 수 있다
            setIsExpand(() => false);
          }}
          onMouseDown={(e) => {
            if (deviceWidth > moWidth) handleMouseDown(e);
          }}
        >
          <Wdiv>
            <span className={`arrow ${isExpand ? 'is-expanded' : ''}`}></span>
            <Select
              name="select"
              value={selected}
              onChange={(e) => {
                // option을 선택하면 selected 값을 변경
                setSelected(e.target.value);
              }}
            >
              {props.remain.length > 0 &&
                props.remain.map((value: string, index: number) => {
                  // optionData를 이용해 옵션 렌더링
                  return (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  );
                })}
            </Select>
          </Wdiv>
          {isExpand && (
            <ItemList>
              {props.remain.length > 0 &&
                props.remain.map((value: string, index: number) => {
                  // optionData를 이용해 리스트 렌더링
                  return (
                    <li key={index}>
                      <ListBtn
                        //buttonid={optionKey}
                        type="button"
                        onClick={() => {
                          // select option을 선택하면  onchange를 이용해 state 값을 변경한다
                          // selected state를 바로 변경함
                          setSelected(value);
                          setIsExpand(false);
                        }}
                        className={selected === value ? 'selected' : ''}
                      >
                        {value}
                      </ListBtn>
                    </li>
                  );
                })}
            </ItemList>
          )}
        </Wrapper>

        <SelTitle>
          <p>계약 종료일</p>
        </SelTitle>
        <DayPicker getDate={getDate} />
      </Box>
      <BtnDiv>
        <LoginBtn
          variant="primary"
          type="landscape"
          onClick={() => {
            postContract(selected, date);
          }}
        >
          계약하기
        </LoginBtn>
      </BtnDiv>
    </ContractModal>
  );
}
const ContractModal = styled.div`
  display: grid;
  width: 100%;
  heihgt: 100%;
  grid-template-rows: 0.5fr 5fr 0.2fr;

  justify-items: center;
  font-size: 16px;
  font-family: jalnan;
`;

const Box = styled.div`
  width: 400px;
  height: 3px;
  background-color: #1e1008;
`;

const Wrapper = styled.div`
  display: block;
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const Wdiv = styled.div`
  border-radius: 0.5rem;
  position: relative;
  font-weight: 600;
`;

const Select = styled.select`
  -moz-appearance: none;
  -webkit-appearance: none;
  -o-appearance: none;
  -ms-appearance: none;
  appearance: none;
  border-radius: 0;
  background: none transparent;
  vertical-align: middle;
  font-size: inherit;
  color: inherit;
  box-sizing: content-box;
  margin: 0;
  border-radius: 0.5rem;
  padding: 0.75rem 2.5rem 0.65rem 0.75rem;
  box-shadow: none;
  box-sizing: border-box;
  display: block;
  width: 100%;
  border: 2px solid #ddd;
  line-height: 1.06;
`;

const ItemList = styled.ul`
  position: absolute;
  z-index: 99;
  width: 100%;
  margin-top: 0.25rem;
  border-radius: 0.5rem;
  border: 2px solid black;
  padding: 0.5rem 0.5rem;
  background: white;
  list-style: none;
  box-sizing: border-box;
`;

const ListBtn = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  transition: all 0.3s;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 0;
  outline: 0;
  background: none;

  &:hover {
    background: #eee;
  }
  &:active {
    background: #aaa;
  }
  &.selected {
    background: #000;
    color: #fff;
  }
`;

const BtnDiv = styled.div`
  display: flex;
  width: 400px;
  justify-content: flex-end;
`;

const SelTitle = styled.div`
  display: flex;
  width: 400px;
  justify-content: flex-start;
`;
export default ThreeplContractModal;
