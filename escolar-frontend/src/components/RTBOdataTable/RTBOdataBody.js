import React from "react";
import { useTable } from "react-table";

const RTBOdataBody = ({ columns, data }) => {
  const { prepareRow, rows } = useTable({
    columns,
    data,
    initialState: { pageIndex: 0 }
  });

  return (
    <>
      <tbody className="tbody">
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            <tr key={"tbody-" + index } {...row.getRowProps()} >
              {row.cells.map((cell) => {
                return <td style={{ textAlign: (cell.column.align ?? 'left')}}  {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr> 
          );
        })}
      </tbody>
    </>
  );
};

export default RTBOdataBody;
