import React, { useState } from 'react';
import { styled } from 'styled-components';
function SelectTable(props: any) {
  const [selected, setSelected] = useState<string>(props.title);
  const [onList, setOnList] = useState<boolean>(false);

  //const toggleList = () => {
  //  if (onList === true) setOnList(false);
  //  else setOnList(true);
  //};

  const clickItem = (item: string) => {
    setSelected(item);
    //setOnList(false);
    console.log(item);
  };
  return (
    <>
      <Title>{props.title}</Title>
      <Chips>
        {props.option.map((item: string, idx: number) => {
          return (
            <>
              <Chip
                onClick={() => {
                  clickItem(item);
                }}
                style={{
                  backgroundColor: selected === item ? '#1e1008' : '#ffffff',
                  color: selected === item ? '#ffffff' : '#1e1008',
                }}
              >
                {item}
              </Chip>
            </>
          );

          //드롭다운
          //   return (
          //     <>
          //       <Title>{props.title}</Title>
          //       <TitleBtn onClick={toggleList}>{selected}</TitleBtn>

          //       <ListBox>
          //         {props.option.map((item: string, idx: number) => {
          //           return (
          //             <>
          //               <List
          //                 onClick={() => {
          //                   clickItem(item);
          //                 }}
          //                 toggle={onList}
          //               >
          //                 {item}
          //               </List>
          //             </>
          //           );
          //         })}
          //       </ListBox>
          //     </>
          //   );
        })}
      </Chips>
    </>
  );
}

// interface StyledButtonProps {
//   readonly toggle: true | false;
// }

const Title = styled.div`
  font-family: Jalnan;
  font-size: 20px;
  margin-bottom: 10px;
`;
// const TitleBtn = styled.button`
//   width: 200px;
//   border: 1px solid #c4c4c4;
//   box-sizing: border-box;
//   border-radius: 10px;
//   padding: 12px 13px;
//   font-family: Dotum_Bold;
//   font-style: normal;
//   font-weight: 400;
//   font-size: 14px;
//   line-height: 16px;
//   background: #f4f0df;
//   // background: url(./img/Polygon_up.png) 93% no-repeat; /*화살표 이미지 삽입*/
//   appearance: none;
//   text-align: left;

//   &:focus {
//     border: 1px solid #9b51e0;
//     box-sizing: border-box;
//     border-radius: 10px;
//     outline: 3px solid #0073ff;
//     border-radius: 10px;
//   }
// `;

// const ListBox = styled.ul`
//   width: 200px;
//   list-style: none;
//   background: #ffffff;
//   border: 1px solid #c4c4c4;
//   box-sizing: border-box;
//   box-shadow: 4px 4px 14px rgba(0, 0, 0, 0.15);
//   border-radius: 10px;
//   margin-top: 9px;
// `;

// const List = styled.li<StyledButtonProps>`
//   display: ${(props) => {
//     if (props.toggle === true) return 'block';
//     else return 'none';
//   }};
//   border: none;
//   background-color: #ffffff;
//   font-family: Dotum_Medium;
//   font-style: normal;
//   font-weight: 400;
//   font-size: 14px;
//   line-height: 16px;
//   padding: 7px 10px;
//   margin: 5px 7px;
//   box-sizing: border-box;
//   text-align: left;

//   &:focus {
//     background: #f8e4ff;
//     width: 90%;
//     border-radius: 8px;
//     box-sizing: border-box;
//   }
// `;

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
