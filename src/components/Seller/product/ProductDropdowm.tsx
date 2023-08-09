import React from 'react';
import { styled } from 'styled-components';

function ProductDropdowm({ value, setGroupName, setIsOpen, isOpen }: any) {
  const ValueClick = () => {
    setGroupName(value);
    setIsOpen(!isOpen);
  };
  return (
    <List onClick={ValueClick}>
      <Li>{value}</Li>
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

  &:hover {
    display: flex;
    border-radius: 5px;
    background-color: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 3px;
  }
`;

const Li = styled.li`
  font-family: 'Jalnan';
  font-size: 15px;
`;
export default ProductDropdowm;
