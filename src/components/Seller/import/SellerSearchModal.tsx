import React, { useCallback, useState } from 'react';
import TableColumn from '../../TableColumn';
import TableRow from '../../TableRow';
import LoginBtn from '../../common/Loginbtn';
import { styled } from 'styled-components';
import RegisterNew from '../../common/RegisterNew';

//모달 검색리스트
interface PreProductList {
  productNo: string;
  productName: string;
  safetyStock: number;
  currentStock: number;
  amount: 0;
}

function SellerSearchModal(props: any) {
  const [checkedList, setCheckedList] = useState<Array<PreProductList>>([]);
  const [search, setSearch] = useState('');

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

  function getSearch(search: string) {
    props.searchProductList(search);
  }

  function getCheckProList() {
    props.onClickSearchModal();
    props.getProductList(checkedList);
    props.inputList(checkedList);
    setCheckedList([]);
    props.resetSearch();
  }

  return (
    <ImportModal>
      <ModalDiv>
        <SearchDiv>
          <RegisterNew onChange={(e) => setSearch(e.target.value)} />
          <LoginBtn variant="primary" type="landscape" onClick={() => getSearch(search)}>
            검색
          </LoginBtn>
        </SearchDiv>

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
  height: 300px;
`;

const SearchDiv = styled.div`
  display: grid;
  width: 450px;
  grid-template-columns: 4fr 0.8fr;
  padding: 10px;
`;

const Btns = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
`;

export default SellerSearchModal;
