import styled from 'styled-components';

const backgroundColor = {
  primary: '#0073ff',
  secondary: '#F7E600',
};

const color = {
  primary: '#FFFFFF',
  secondary: '#1E1008',
};

interface StyledButtonProps {
  readonly variant: 'primary' | 'secondary';
}

const LoginBtn = styled.button<StyledButtonProps>`
  border-radius: 20px;
  border: none;
  background: ${(props) => backgroundColor[props.variant]};
  color: ${(props) => color[props.variant]};
  display: flex;
  width: 120px;
  padding: 13px 10px 13px 10px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.1s background-color ease-in-out;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: 0.56px;

  &:hover {
    background-color: ${(props) => backgroundColor[props.variant]};
    filter: brightness(0.95);
  }
`;

export default LoginBtn;
