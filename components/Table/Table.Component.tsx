import React from "react";
import {
  Table as MuiTable,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import Link from "next/link";

import { Style } from "./Table.Style";

interface TableProps {
  Data: any[];
}

const Table = ({ Data }: TableProps) => {
  return (
    <TableContainer component={Paper} sx={Style.Table}>
      <MuiTable>
        <TableHead sx={Style.TableHead}>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Data.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{index}</TableCell>
              <TableCell>{item.Name}</TableCell>
              <TableCell>
                <Link href={`/dashboard/${item.id}`}>Details</Link>
              </TableCell>
              <TableCell>
                <Button>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
