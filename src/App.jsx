import React, { Component } from 'react';
import './App.css'
import EditDetails from './FCComps/EditDetails'
import Login from './FCComps/Login'
import Proflie from './FCComps/Proflie'
import Register from './FCComps/Register'
import SystemAdmin from './FCComps/SystemAdmin'


export default function App() {

//פונקציה המתבצעת בכל טעינה של המערכת
  const loadUsers = () => {
    // Access localStorage and retrieve the users array
    const storedUsers = localStorage.getItem('users');

    // Check if storedUsers is not null or undefined
    if (storedUsers) {
      // Parse the storedUsers string to convert it back to an array
      return JSON.parse(storedUsers);
    } else {
      // If no data exists in localStorage, return an empty array
      return [];
    }
  };

  const componentDidMount = () => {
    // Call loadUsers function and use the returned array as needed
    let users = loadUsers();
    console.log(users);

  };

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
