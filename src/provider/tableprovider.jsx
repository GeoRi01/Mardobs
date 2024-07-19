import React, { createContext, useState, useContext } from "react";

const TableContext = createContext();

export const useTableContext = () => useContext(TableContext);

export const TableProvider = ({ children }) => {
  const [selectedTable, setSelectedTable] = useState(null);

  const setSelectedTableData = (tableData) => {
    setSelectedTable(tableData);
  };

  const clearSelectedTable = () => {
    setSelectedTable(null);
  };

  return (
    <TableContext.Provider
      value={{ selectedTable, setSelectedTableData, clearSelectedTable }}
    >
      {children}
    </TableContext.Provider>
  );
};
