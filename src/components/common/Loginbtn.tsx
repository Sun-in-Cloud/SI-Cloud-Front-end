import styled from 'styled-components';

const backgroundColor = {
  primary: '#0073FF',
  secondary: '#DA3915',
  dark: '#1E1008',
};

const color = {
  primary: '#0073FF',
  secondary: '#DA3915',
  dark: '#1E1008',
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
  readonly variant: 'primary' | 'secondary' | 'dark';
  readonly type: 'portrait' | 'landscape';
}

// const LoginBtn = styled.button<StyledButtonProps>`
//   border-radius: 15px;
//   border: 2px solid black;
//   background: ${(props) => backgroundColor[props.variant]};
//   color: ${(props) => color[props.variant]};
//   display: flex;
//   width: ${(props) => width[props.type]};
//   padding: ${(props) => padding[props.type]};
//   justify-content: center;
//   align-content: center;
//   font-size: ${(props) => fontSize[props.type]};
//   font-family: Jalnan;
//   margin: 0 3% 3% 0;
//   z-index: 1;
// `;

const LoginBtn = styled.button<StyledButtonProps>`
  position: relative;
  z-index: 3;
  border-style: solid;
  cursor: pointer;
  border-width: 2px;
  border-radius: 10px;
  text-decoration: none;
  padding: 10px 20px;
  text-transform: uppercase;
  transition: all 0.2s linear 0;
  font-family: KBO-Light;
  color: ${(props) => color[props.variant]};
  border-color: ${(props) => backgroundColor[props.variant]};
  background: transparent;
  font-size: 14px !important;
`;

export default LoginBtn;
