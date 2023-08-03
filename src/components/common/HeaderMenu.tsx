import styled from 'styled-components';

const color = {
  portrait: '#0073FF',
  landscape: 'black',
};

const fontSize = {
  portrait: '18px',
  landscape: '20px',
};

const width = {
  portrait: '100%',
  landscape: '100%',
};

const hover_width = {
  portrait: '80%',
  landscape: '85%',
};

const clickItem = {
  active: '#D9EAFF',
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
  font-family: Jalnan;
  color: ${(props) => color[props.type]};
  font-size: ${(props) => fontSize[props.type]};

  letter-spacing: 4px;
  border-radius: 15px 15px 0 0;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => clickItem[props.bg]};
  width: ${(props) => width[props.type]};
  margin-bottom: 20px;
  padding: ${(props) => padding[props.type]};
`;

export default HeaderMenu;

// /-webkit-text-stroke: 1px black;
