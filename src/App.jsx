import React, { Component } from 'react';
import './App.css'
import EditDetails from './FCComps/EditDetails'
import Login from './FCComps/Login'
import Proflie from './FCComps/Proflie'
import Register from './FCComps/Register'
import SystemAdmin from './FCComps/SystemAdmin'
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Grid } from '@mui/material';

export default function App() {

  const [movePage_Register_LoIn, setMovePage_Register_LoIn] = useState(false);
  const [loggedInFlag, setloggedInFlag] = useState(false);
  const [editDetailFlag, setEditDetailFlag] = useState(false);

  useEffect(() => {
    // Call loadUsers function and use the returned array as needed
    let usersFromLS = loadUsers();
    console.log(usersFromLS);
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  //פונקציה המתבצעת בכל טעינה של המערכת
  //ניגשת ללוקאל סטוראג ומחזירה את מערך המשתמשים אם יש, אם אין מחזירה מערך ריק
  const loadUsers = () => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      return JSON.parse(storedUsers);
    } else {
      return [];
    }
  };

  //פונקציה המקבלת את פרטי המשתמש , יוצרת משתמש חדש ומוסיפה אותו למאגר המשתמשים
  const registerUser = (userFromChildRegister) => {
    let users = loadUsers();
    users.push(userFromChildRegister);
    localStorage.setItem('users', JSON.stringify(users));
    console.log('user we recived from register', userFromChildRegister);
  }

  //פונקציה שמעבירה בין קומפוננטה
  const changePage = (flag) => {
    setMovePage_Register_LoIn(flag);
  }

  const showProflie = (flag) => {
    setloggedInFlag(flag);
  }


  const showEditDetailComp = (flag) => {
    setEditDetailFlag(flag);
  }

  return (
    <>
      {movePage_Register_LoIn ?
        <Login moveToLogInFlag={changePage} usersListFromApp={loadUsers()} LoggedIn={showProflie} /> :
        <Register sendUserToApp={registerUser} moveToLogInFlag={changePage} />
      }

      {loggedInFlag ?
        <Proflie LoggedIn={showProflie} showEditDetail={showEditDetailComp} /> :
        <Grid container>
          <Grid item xs={12} >
            <Card style={{ textAlign: "center" }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }}>
                    <LockOutlinedIcon />
                  </Avatar>
                }
                title="יש להתחבר למערכת"
              />
            </Card>
          </Grid>
        </Grid >
      }


      {editDetailFlag ? <EditDetails showEditDetail={showEditDetailComp} /> : ''}

      <SystemAdmin />
    </>
  )
}