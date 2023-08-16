import styled from 'styled-components';

const borderColor = {
  primary: '#d09da6',
  secondary: '#382F2D',
};

const fontColor = {
  primary: '#fff',
  secondary: '#fff',
  basic: '#000',
};

const backgroundColor = {
  primary: '#d09da6',
  secondary: '#382F2D',
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
  font-family: GmarketSansMedium;
  font-size: 15px;
  color: ${(props) => fontColor[props.bg]};
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
`;

export default Tab;
