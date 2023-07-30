import styled from 'styled-components';

const color = {
  portrait: '#0073FF',
  landscape: '#0073FF',
};

const fontSize = {
  portrait: '18px',
  landscape: '1.3rem',
};

const width = {
  portrait: '77%',
  landscape: '80%',
};

const hover_width = {
  portrait: '80%',
  landscape: '85%',
};

const padding = {
  portrait: '5px',
  landscape: '5px',
};

interface ScreenTypeProps {
  readonly type: 'portrait' | 'landscape';
  readonly bg: 'active' | 'none';
}

const HeaderMenu = styled.button<ScreenTypeProps>`
  font-family: chab;
  color: ${(props) => color[props.type]};
  font-size: ${(props) => fontSize[props.type]};
  letter-spacing: 4px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  width: ${(props) => width[props.type]};
  margin-bottom: 20px;
  padding: ${(props) => padding[props.type]};

  &:hover {
    width: ${(props) => hover_width[props.type]};
    left: 0;
    transition: all 0.5s;
    background: #ffe9a9;
    z-index: -1;
    border-radius: 15px;
  }
`;

export default HeaderMenu;
