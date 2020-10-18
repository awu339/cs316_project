import React from 'react';
import './App.css';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Container } from '@material-ui/core'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, year, synopsis, platform_name, platform_cost) {
  return { name, year, synopsis, platform_name, platform_cost };
}

const rows = [
  createData('Schindlers List', 1993, 'Schindlers List movie', 'iTunes', 2.99),
  createData('E.T.', 1982, 'Movie about alien and child', 'iTunes', 2.99),
  createData('Raiders of the Lost Ark', 1981, 'Movie about Indiana Jones', 'iTunes', 2.99),
  createData('Saving Private Ryan', 1998, 'Movie about saving Private Ryan', 'iTunes', 2.99),
];


function Favorites() {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <h1 class='text-center'>My Favorites</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Movie</TableCell>
              <TableCell align="right">Year</TableCell>
              <TableCell align="right">Synopsis</TableCell>
              <TableCell align="right">Platform</TableCell>
              <TableCell align="right">Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.year}</TableCell>
                <TableCell align="right">{row.synopsis}</TableCell>
                <TableCell align="right">{row.platform_name}</TableCell>
                <TableCell align="right">{row.platform_cost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Favorites;
