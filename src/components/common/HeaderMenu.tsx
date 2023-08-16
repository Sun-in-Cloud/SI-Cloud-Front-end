import styled from 'styled-components';

const color = {
  portrait: '#0073FF',
  landscape: 'black',
};

const fontSize = {
  portrait: '15px',
  landscape: '18px',
};

const hover_width = {
  portrait: '80%',
  landscape: '85%',
};

const clickItem = {
  active: '#e1dad3',
  none: 'transparent',
};

const padding = {
  portrait: '5px',
  landscape: '5px',
};

interface ScreenTypeProps {
  readonly type: 'portrait' | 'landscape';
  readonly bg: 'active' | 'none'; // 여기서 active를 안쓰는중..?
}

const HeaderMenu = styled.button<ScreenTypeProps>`
  font-family: KBO;
  color: ${(props) => color[props.type]};
  font-size: ${(props) => fontSize[props.type]};
  letter-spacing: 3px;
  border: none;
  display: flex;
  height: fit-content;
  width: fit-content;
  justify-content: center;
  align-items: center;
  padding: 3px;
  background-color: ${(props) => clickItem[props.bg]};

  &:hover {
    width: fit-content;
    background-color: #e1dad3;
    transition-duration: 2s;
    transform: translate(-8%);
  }
`;

export default HeaderMenu;
