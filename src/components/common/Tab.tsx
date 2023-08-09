import styled from 'styled-components';

const borderColor = {
  primary: '#0073FF',
  secondary: '#DA3915',
};

const fontColor = {
  primary: '#fff',
  secondary: '#fff',
  basic: '#000',
};

const backgroundColor = {
  primary: '#0073FF',
  secondary: '#DA3915',
  basic: 'transparent',
};

interface StyledButtonProps {
  readonly variant: 'primary' | 'secondary';
  readonly bg: 'primary' | 'secondary' | 'basic';
}

const Tab = styled.button<StyledButtonProps>`
  width: 100px;
  height: 35px;
  border: 2px solid ${(props) => borderColor[props.variant]};
  border-bottom-style: hidden;
  border-radius: 14px 14px 0 0;
  background-color: ${(props) => backgroundColor[props.bg]};
  font-family: 'Jalnan';
  color: ${(props) => fontColor[props.bg]};
  margin-left: 10px;
  z-index: 3;
`;

export default Tab;
