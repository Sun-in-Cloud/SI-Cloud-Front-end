import React from 'react';
import TableColumn from '../../TableColumn';
import TableRowOrder from '../order/TableRowOrder';
import ExportTableRow from './ExportTableRow';

function ExportList(props: any) {
  console.log(props.length);
  return (
    <>
      <ExportList>
        <TableColumn title={props.title} columns={props.columns} />
        <ExportTableRow
          title={props.title}
          rsfasfows={props.rows}
          columns={props.columns}
          onDetail={true}
        ></ExportTableRow>
      </ExportList>
    </>
  );
}

export default ExportList;
