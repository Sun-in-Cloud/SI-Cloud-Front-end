import styled from 'styled-components';

const backgroundColor = {
  primary: '#0073ff',
  secondary: '#F7E600',
};

const color = {
  primary: '#FFFFFF',
  secondary: '#1E1008',
};

const width = {
  portrait: '60px',
  landscape: '70px',
};

const fontSize = {
  portrait: '10px',
  landscape: '0.6rem',
};

const padding = {
  portrait: '5px 7px 7px 5px',
  landscape: '9px 11px 11px 9px',
};

interface StyledButtonProps {
  readonly variant: 'primary' | 'secondary';
  readonly type: 'portrait' | 'landscape';
}

const LoginBtn = styled.button<StyledButtonProps>`
  border-radius: 15px;
  border: none;
  background: ${(props) => backgroundColor[props.variant]};
  color: ${(props) => color[props.variant]};
  display: flex;
  width: ${(props) => width[props.type]};
  padding: ${(props) => padding[props.type]};
  justify-content: center;
  align-content: center;
  font-size: ${(props) => fontSize[props.type]};
  font-family: Jalnan;
  margin: 0 3% 3% 0;
  z-index: 1;
  position: relative;
`;

export default LoginBtn;
