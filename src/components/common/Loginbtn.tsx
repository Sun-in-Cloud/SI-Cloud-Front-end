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
  landscape: '60px',
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
  align-items: center;
  cursor: pointer;
  transition: 0.1s background-color ease-in-out;
  font-size: ${(props) => fontSize[props.type]};
  font-style: normal;
  font-weight: 600;
  margin: 3%;

  &:hover {
    background-color: ${(props) => backgroundColor[props.variant]};
    filter: brightness(0.95);
  }
`;

export default LoginBtn;
