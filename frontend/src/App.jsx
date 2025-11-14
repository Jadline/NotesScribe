import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import UserDashboard from "./components/UserDashboad";
import AdminDashboard from "./components/AdminDashboard";
import UserProfile from "./components/UserProfile";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import UsersNotes from "./pages/UsersNotes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
        <Route path="resetpassword/:token" element={<ResetPassword />} />
        <Route path='/' element={<Dashboard/>}>
        
           <Route index element={<UsersNotes/>} />
          <Route path='users' element={<Users/>}/>
          <Route path='all-notes' element={<UsersNotes/>}/>
          <Route path="user-profile" element={<UserProfile />} />
        </Route>
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
