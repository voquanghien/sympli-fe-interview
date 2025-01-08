import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import { SwapiPerson } from "../models/swapi";
import { comparePerson } from "../utils/utils";

interface SwapiPeopleTableProps {
  /**
   * The total number of rows.
   */
  count?: number;
  /**
   * The zero-based index of the current page.
   */
  page?: number;
  /**
   * The number of rows per page.
   */
  rowsPerPage?: number;
  rows: SwapiPerson[];
  selectedRow?: SwapiPerson;
  onRowClick(person: SwapiPerson): void;
  onPageChange(pageNumber: number): void;
}

function SwapiPeopleTable({
  count = 0,
  rows,
  page = 0,
  rowsPerPage = 10,
  selectedRow,
  onPageChange,
  onRowClick,
}: SwapiPeopleTableProps) {
  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    onPageChange(newPage);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Height</TableCell>
            <TableCell align="right">Mass</TableCell>
            <TableCell align="right">Movies</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              onClick={() => onRowClick(row)}
              selected={comparePerson(row, selectedRow)}
              hover={true}
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.height}</TableCell>
              <TableCell align="right">{row.mass}</TableCell>
              <TableCell align="right">{row.films.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[rowsPerPage]}
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    "aria-label": "people per page",
                  },
                },
              }}
              onPageChange={handleChangePage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default SwapiPeopleTable;
