import { styled } from 'styled-components';

const RegisterNew = styled.input`
  width: 80%;
  height: 40px;
  border: 2px solid #382f2d;
  background-color: #fdfaf7;
  font-family: GmarketSansMedium;
  font-size: 15px;
  padding-left: 13px;

  &:focus {
    box-shadow:
      inset 0 1px 2px rgba(0, 0, 0, 0.075),
      0 0 5px rgba(81, 167, 232, 0.5);
  }
`;

export default RegisterNew;
