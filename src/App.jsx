import './App.css'
import EditDetails from './FCComps/EditDetails'
import Login from './FCComps/Login'
import Proflie from './FCComps/Proflie'
import Register from './FCComps/Register'
import SystemAdmin from './FCComps/SystemAdmin'


function App() {

  return (
    <>
      <Register />
      <Login />
      <Proflie />
      <EditDetails/>
      <SystemAdmin/>
    </>
  )
}

export default App
