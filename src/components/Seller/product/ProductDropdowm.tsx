import React from 'react';
import { styled } from 'styled-components';

function ProductDropdowm({ value, setGroupName, setIsOpen, isOpen }: any) {
  const ValueClick = () => {
    setGroupName(value);
    setIsOpen(!isOpen);
  };
  return (
    <List onClick={ValueClick}>
      <Li> *{value}</Li>
    </List>
  );
}

const List = styled.div`
  position: relative;
  list-style: none;

  height: 23px;
  margin: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Li = styled.li`
  font-family: 'Jalnan';
  font-size: 15px;

  &:before {
    width: fit-content;
    background-color: #e1dad3;
    transition-duration: 2s;
    transform: translate(-8%);
  }
`;
export default ProductDropdowm;
