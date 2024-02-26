import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar } from '@mui/material';
import { Typography } from '@mui/material';

export default function SystemAdmin(props) {


  let userList = props.usersListFromApp;


  const editDetail = () => {
    props.showEditDetail(true);
  }

  const deleteDetail = () => {

  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, direction: 'rtl' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="left">
              <Typography fontWeight="bold">שם משתמש&nbsp;</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography fontWeight="bold">שם מלא&nbsp;</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography fontWeight="bold">תאריך לידה&nbsp;</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography fontWeight="bold">כתובת&nbsp;</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography fontWeight="bold">דואר אלקטרוני&nbsp;</Typography>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList.map((user) => (
            <TableRow
              key={user.userName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Avatar src={user.photoUser} alt="User image" sx={{ width: 40, height: 40, marginRight: 1 }} />
              </TableCell>
              <TableCell component="th" scope="row">
                {user.userName}
              </TableCell>
              <TableCell align="left">{`${user.firstName} ${user.lastName}`}</TableCell>
              <TableCell align="left">{user.dateUser}</TableCell>
              <TableCell align="left">{`${user.cityUser}, ${user.streetName} ${user.homeNumber}`}</TableCell>
              <TableCell align="left">{user.email}</TableCell>
              <TableCell>
                <CreateIcon sx={{ color: 'pink' }} onClick={() => editDetail(user)} />
                <DeleteIcon sx={{ color: 'blue' }} onClick={() => deleteDetail(user)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
