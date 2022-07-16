import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Dasboard from './pages/Dasboard';
import Register from './pages/Register';
import Login from './pages/Login';
import Header from './components/Header';
import {ToastContainer} from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import AdminDashboard from './pages/AdminDashboard';
import UserEdit from './pages/UserEdit';

function App() {
  return (
<>
<Router>
 

    <div className='container'> 
    <Header />
      <Routes>
      <Route path='/' element={<Dasboard />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/admin' element={<AdminDashboard />} />
      <Route path='/useredit/:id' element={<UserEdit />}/>
      </Routes>
    </div>
    
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
