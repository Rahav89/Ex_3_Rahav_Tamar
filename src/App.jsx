import React, { Component } from 'react';
import './App.css'
import EditDetails from './FCComps/EditDetails'
import Login from './FCComps/Login'
import Proflie from './FCComps/Proflie'
import Register from './FCComps/Register'
import SystemAdmin from './FCComps/SystemAdmin'
import { useState, useEffect } from 'react';

export default function App() {

  //פונקציה המתבצעת בכל טעינה של המערכת
  //ניגשת ללוקאל סטוראג ומחזירה את מערך המשתמשים אם יש , אם אין מחזירה מערך ריק
  const loadUsers = () => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      return JSON.parse(storedUsers);
    } else {
      return [];
    }
  };


  useEffect(() => {
    // Call loadUsers function and use the returned array as needed
    let users = loadUsers();
    console.log(users);
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  //פונקציה המקבלת את פרטי המשתמש , יוצרת משתמש חדש ומוסיפה אותו למאגר המשתמשים
  const registerUser = (userFromChildRegister) => {
    let users = loadUsers();
    users.push(userFromChildRegister);
    localStorage.setItem('users', JSON.stringify(users));
    console.log('user we recived from register', userFromChildRegister);
  }

  return (
    <>
      <Register sendUserToApp={registerUser} />
      {/* <Login /> */}
      <Proflie />
      <EditDetails />
      <SystemAdmin />
    </>
  )
}

// function App() {
//   const [showFirstComponent, setShowFirstComponent] = useState(true);

//   return (
//     <div>
//       {showFirstComponent ? <FirstComponent /> : <SecondComponent />}
//       <button onClick={() => setShowFirstComponent(!showFirstComponent)}>
//         Toggle Component
//       </button>
//     </div>
//   );
// }
