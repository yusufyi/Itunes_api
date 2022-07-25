import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useFetchItunesQuery } from "./song-api-slice";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
interface Songs {
  results: {};
  artistName: string;
  trackName: string;
  collectionName: string;
  trackId: number;
}

export default function DataTable() {
  const [numSong, setNumSong] = useState(10);
  const [name, setName] = useState<String>();
  const [nameC, SetNameC] = useState<String>();
  const [song, setSong] = useState<String>();
  const [songC, SetSongC] = useState<String>();
  const [albums, setAlbums] = useState<String>();
  const [albumsC, SetAalbumsC] = useState<String>();
  const {
    data = [],
    error,
    isLoading,
    isFetching,
  } = useFetchItunesQuery({ numSong, name, song, albums });
  console.log(isLoading);

  function handleClick() {
    setName(nameC);
    setSong(songC);
    setAlbums(albumsC);
  }

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          display: "flex",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          onChange={(e) => SetNameC(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Albums"
          variant="outlined"
          onChange={(e) => SetAalbumsC(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Song"
          variant="outlined"
          onChange={(e) => SetSongC(e.target.value)}
        />
        <Button variant="contained" size="large" onClick={handleClick}>
          Search...
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Artist Name</StyledTableCell>
              <StyledTableCell align="right">Track Name</StyledTableCell>
              <StyledTableCell align="right">CollectionName</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: Songs) => (
              <StyledTableRow key={row.trackId}>
                <StyledTableCell component="th" scope="row">
                  {row.artistName}
                </StyledTableCell>
                <StyledTableCell align="right">{row.trackName}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.collectionName}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        size="large"
        onClick={() => {
          setNumSong(numSong + 10);
        }}
      >
        Load more...
      </Button>
    </div>
  );
}
