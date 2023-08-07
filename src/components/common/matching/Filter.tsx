import React, { useState } from 'react';
import { styled } from 'styled-components';
function SelectTable(props: any) {
  const [selected, setSelected] = useState<string>(props.title);
  const [onList, setOnList] = useState<boolean>(false);

  const clickItem = (item: string) => {
    setSelected(item);
    props.findFilter([props.title[1], item]);
  };
  return (
    <>
      <Title>{props.title[0]}</Title>
      <Chips>
        {props.option.map((item: string, idx: number) => {
          return (
            <>
              <Chip
                onClick={() => {
                  typeof item === 'string' ? clickItem(item) : clickItem(item[1]);
                }}
                style={{
                  backgroundColor: selected === (typeof item === 'string' ? item : item[1]) ? '#1e1008' : '#ffffff',
                  color: selected === (typeof item === 'string' ? item : item[1]) ? '#ffffff' : '#1e1008',
                }}
              >
                {typeof item === 'string' ? item : item[0]}
              </Chip>
            </>
          );
        })}
      </Chips>
    </>
  );
}

const Title = styled.div`
  font-family: Jalnan;
  font-size: 20px;
  margin-bottom: 10px;
`;

const Chips = styled.div`
  margin-bottom: 10px;
  width: 300px;
  overflow: auto;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Chip = styled.button`
  display: inline-block;
  border: 1px solid #1e1008;
  border-radius: 30px;
  font-family: Jalnan;
  font-size: 15px;
  color: #1e1008;
  background: #ffffff;
  letter-spacing: 2px;
  width: fit-content;
  padding: 10px;
  margin: 5px;

  &:hover {
    color: #ffffff;
    background: #1e1008;
  }
`;
export default SelectTable;
