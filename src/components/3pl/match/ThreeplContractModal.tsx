import React, { useEffect, useMemo, useState } from 'react';
import { styled } from 'styled-components';
import DayPicker from './DayPicker';

// dummy data
const optionData = [
  { optionKey: 'key01', optionName: 'my option 1' },
  { optionKey: 'key02', optionName: 'my option 2' },
];

// const
const moWidth = 575;

// custom hook
const useDevice = () => {
  // 모바일 디바이스인지 아닌지 체크
  // uaParser 패키지 이용
  //   const uaParser = new UAParser(window.navigator.userAgent);
  //   return useMemo(() => {
  //     try {
  //       return uaParser.getDevice();
  //     } catch (err) {
  //       return null;
  //     }
  //   }, []);
};

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
  const [selected, setSelected] = useState('key01');

  //const { type: deviceType } = useDevice();
  const { w: deviceWidth } = useResize();

  const handleKeydown = (e: any) => {
    // 키보드 제어
    // KeyCode
    // 38 : 화살표 위 | 40 : 화살표 아래 | 13:엔터
    if (e.KeyCode === 38 || e.KeyCode === 40 || e.keyCode === 13) {
      e.preventDefault(); // 기본동작을 막아 options 비노출
    }

    if (e.keyCode === 38 || e.keyCode === 40) {
      // 위, 아래 키 눌렀을 때 선택한 데이터 변경
      setIsExpand(() => true);
      setSelected((prev) => {
        function newIdx(): undefined | number {
          const oldIdx = props.remain.findIndex((option: any) => option.key === prev);
          if (e.keyCode === 38) {
            return oldIdx === 0 ? oldIdx : oldIdx - 1;
          }
          if (e.keyCode === 40) {
            return oldIdx === props.remain.length - 1 ? oldIdx : oldIdx + 1;
          }
        }

        return props.remain[newIdx()!].optionKey;
      });
    }
    if (e.keyCode === 13) {
      // 엔터 키 눌렀을 때 ul리스트 토글
      setIsExpand((prev) => !prev);
    }
  };

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
  return (
    <ContractModal>
      <p>
        {props.companyName} : {props.sellerNo}
      </p>
      <Box>
        <p>창고 위치</p>
        <Wrapper
          onBlur={() => {
            // onBlur일 때 하단 드롭다운 메뉴를 닫는다
            // select 태그가 아니라 ul리스트도 함께 감싼 wrapper에
            // onBlur를 넣어줘야 ul태그의 버튼 이벤트를 onClick에 넣을 수 있다
            setIsExpand(() => false);
          }}
          onKeyDown={(e) => {
            if (deviceWidth > moWidth) handleKeydown(e);
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

        <p>계약 종료일</p>
        <DayPicker />
      </Box>
      <p></p>
    </ContractModal>
  );
}
const ContractModal = styled.div`
  display: grid;
  width: 100%;
  heihgt: 100%;
  grid-template-rows: 0.5fr 5fr 0.2fr
  
  justify-items: center;
  font-size: 16px;
  font-family: jalnan;
`;

const Box = styled.div`
  width: 100%;
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

const Arrow = styled.div`
  width: 20px;
  height: 20px;
  background: #000;
  display: block;
  position: absolute;
  right: 0.5rem;
  top: 10px;
  border-radius: 0.25rem;
  pointer-events: none;
  &:before,
  &:after {
    content: '';
    background-color: transparent;
    width: 2px;
    height: 12px;
    background: yellow;
    border-bottom: 7px solid white;
    display: block;
    position: absolute;
    background: none;
    box-sizing: border-box;
    transform: rotate(0);
    transform-origin: center;
    top: 2px;
    left: 9px;
    transition: all 0.3s;
  }
  &.is-expanded {
    &:before,
    &:after {
      top: 6px;
    }
    &:before {
      transform: rotate(135deg);
    }
    &:after {
      transform: rotate(-135deg);
    }
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`;
export default ThreeplContractModal;
