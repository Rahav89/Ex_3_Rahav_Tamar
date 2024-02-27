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
  const [loggedInFlag, setLoggedInFlag] = useState(false);
  const [editDetailFlag, setEditDetailFlag] = useState(false);
  const [loggedInFlagAdmin, setLoggedInFlagAdmin] = useState(false);//admin 
  const [users, setUsers] = useState([]);//מערך של יוזרים
  const [currentLoggedUser, setCurrentLoggedUser] = useState();//יוזר מחובר
  const [userToUpdate, setUserToUpdate] = useState();//יוזר שעליו עושים עדכון

  
  useEffect(() => {
    let usersFromLS = loadUsers();
    let loggedUser = loadCurrentLoggedUser();
    setCurrentLoggedUser(loggedUser);
    setUserToUpdate(loggedUser);
    setUsers(usersFromLS);
    console.log(usersFromLS);
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  //מביאה מהסאן סטורג את היוזר המחובר 
  const loadCurrentLoggedUser = () => {
    return sessionStorage.currentUser ? JSON.parse(sessionStorage.currentUser) : null
  }

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
    let updatedUsers = [...users, userFromChildRegister]
    setUsers(updatedUsers)
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    console.log('user we recived from register', userFromChildRegister);
  }

  //פונקציה שמעבירה בין קומפוננטה
  const changePage = (flag) => {
    setMovePage_Register_LoIn(flag);
  }

  const showProflie = (flag) => {
    setLoggedInFlag(flag);
  }

  const setLogUser = (user) => {
    setCurrentLoggedUser(user);
  }
  const showAdminProflie = (flag) => {
    setLoggedInFlagAdmin(flag);
  }

  const showEditDetailComp = (flag) => {
    setEditDetailFlag(flag);
  }
  
  
  const getUserFromAdmin = (user)=>{
    setUserToUpdate(user);
  }
  
  

  //פונקצית מחיקה של היוזר 
  const deleteUserFromApp = (userEmail) => {
    let usersCopy = [...users]; // יצירת עותק של המערך
    let userIndex = usersCopy.findIndex(user => user.email === userEmail); // מציאת אינדקס של המשתמש למחיקה

    if (userIndex !== -1) {
      usersCopy.splice(userIndex, 1); // מחיקת המשתמש מהעותק
      setUsers(usersCopy); // עדכון המערך המקורי
      localStorage.setItem('users', JSON.stringify(usersCopy));//שמירה בלוקאל 
    }
  };

  // פונקציה המקבלת את כל פרטי המשתמש ומעדכנת אותם
  const editUserFromApp = (userToUpDate) => {
    //שומרים את כל היוזרים שלא השתנו
    let otherUsers = users.filter((stateUser) => userToUpDate.email !== stateUser.email);
    //שומרים את היוזר החדש עם כל היוזירם האחרים
    const newUsers = [userToUpDate, ...otherUsers];
    setUsers(newUsers);//עושים סאט ליוזרים החדשים
    localStorage.setItem('users', JSON.stringify(newUsers));//שומרים אותם בלוקלסטורג
    setCurrentLoggedUser(userToUpDate);//עושים סאט ליוזרים החדשים
    if(loggedInFlagAdmin){
      return;
    }
    sessionStorage.setItem('currentUser', JSON.stringify(userToUpDate));//מעדכנים בסאן סטורג את היוזרים שהשתנו
  };

  //- פונקציה המקבלת את כתובת המייל של משתמש מסויים ובודקת אם הוא
  //אכן משתמש המחובר
  const logoutUser = (email, password) => {
    if (currentLoggedUser.email === email && currentLoggedUser.password === password) {
      sessionStorage.clear();//ניקוי הססאן סטורג
      setLoggedInFlag(false);
      setCurrentLoggedUser(null);//מעדכנים את היוזר לנאל 
    }
    return;
  }

  return (
    <>
      {movePage_Register_LoIn ?
        <Login putLoggedUser={setLogUser} moveToLogInFlag={changePage} usersListFromApp={users}
          LoggedIn={showProflie} LoggedInAdmin={showAdminProflie} /> :
        <Register sendUserToApp={registerUser} moveToLogInFlag={changePage} />
      }

      {loggedInFlag ?
        <Proflie user={currentLoggedUser} logoutfromApp={logoutUser}
          LoggedIn={showProflie} showEditDetail={showEditDetailComp} /> : ''

      }

      {loggedInFlagAdmin ? <SystemAdmin usersListFromApp={users} sendUserToApp={getUserFromAdmin}
        showEditDetail={showEditDetailComp} deleteDetail={deleteUserFromApp} /> : ''}


      {(!loggedInFlag && !loggedInFlagAdmin) ?
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
        </Grid > : ''}

      {/*   לשלוח את היוזר הספציפי שמחובר ואז נוכל לעדכן לו את הפרטים שלו  */}
      {editDetailFlag ? <EditDetails user={userToUpdate}
        editUser={editUserFromApp} showEditDetail={showEditDetailComp} /> : ''}


    </>
  )
}