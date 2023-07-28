import styled from 'styled-components';

const color = {
  portrait: '#0073FF',
  landscape: '#0073FF',
};

const fontSize = {
  portrait: '1em',
  landscape: '1.3rem',
};

const background = {
  active: '#ffe9a9',
  none: 'none',
};

interface ScreenTypeProps {
  readonly type: 'portrait' | 'landscape';
  readonly bg: 'active' | 'none';
}

const HeaderMenu = styled.button<ScreenTypeProps>`
  font-family: chab;
  color: ${(props) => color[props.type]};
  font-size: ${(props) => fontSize[props.type]};
  font-weight: 400;
  letter-spacing: 3px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  width: 80%;

  &:hover {
    width: 100%;
    left: 0;
    transition: all 0.4s;
    background: #ffe9a9;
    z-index: -1;
    border-radius: 15px;
  }
`;

export default HeaderMenu;
