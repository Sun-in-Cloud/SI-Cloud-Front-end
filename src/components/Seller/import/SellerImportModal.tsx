import React, { useCallback, useState } from 'react';
import TableColumn from '../../TableColumn';
import { styled } from 'styled-components';
import TableRow from '../../TableRow';
import LoginBtn from '../../common/Loginbtn';

interface PreProductList {
  productNo: string;
  productName: string;
  amount: number;
}

function SellerImportModal(props: any) {
  const [checkedList, setCheckedList] = useState<Array<PreProductList>>([]);

  const onCheckedItem = useCallback(
    (checked: boolean, item: PreProductList) => {
      if (checked) {
        setCheckedList((prev) => [...prev, item]);
      } else if (!checked) {
        setCheckedList(checkedList.filter((el) => el !== item));
      }
    },
    [checkedList],
  );

  function getCheckProList() {
    props.onClickToggleModal();
    props.getProductList(checkedList);
    props.inputList(checkedList);
    setCheckedList([]);
  }

  return (
    <ImportModal>
      <ModalDiv>
        <TableColumn title={props.titles} columns={props.titles.length} />
        <RowDiv>
          <TableRow
            title={props.titles}
            rows={props.rows}
            columns={props.titles.length}
            getDetail={false}
            useCheckBox={true}
            onCheckedItem={onCheckedItem}
          />
        </RowDiv>
        <Btns>
          <LoginBtn variant="primary" type="landscape" onClick={getCheckProList}>
            입고대기
          </LoginBtn>
        </Btns>
      </ModalDiv>
    </ImportModal>
  );
}
const ImportModal = styled.div`
  display: grid;
  width: 100%;
  justify-items: center;
`;

const ModalDiv = styled.div`
  display: grid;
  width: 85%;
`;

const RowDiv = styled.div`
  display: grid;
  margin-left: 10px;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 330px;
`;

const Btns = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
`;

export default SellerImportModal;
