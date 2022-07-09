import React,{useEffect,createContext,useReducer,useContext} from 'react';
import NavBar from "./components/Navbar";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";

import Home from "./components/screens/Home";
import Signin from "./components/screens/SignIn";
import Profile from "./components/screens/Profile";
import Signup from "./components/screens/Signup";
import CreatePost from "./components/screens/CreatePost";
import UserProfile from "./components/screens/UserProfile";
import {reducer,initialState } from "./reducers/userReducer";

export const UserContext = createContext()
const Routing = ()=>{
  const history = useNavigate()
  const {state,dispatch} = useContext(UserContext)

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      // history('/')
      
    }else{
      // if(!history.location.pathname.startsWith('/reset'))
      //      history.push('/signin')
    history('/signin')
    }
  },[])
return(
  <Routes>
  <Route path="/" element={<Home />} />
  <Route exact path="/profile" element={<Profile />} />
  <Route path="/signin" element={<Signin />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/create" element={<CreatePost />} />
  <Route path="/profile/:userid" element={<UserProfile />} />

</Routes>
)

}


function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <NavBar/>
    <Routing/>

    {/* <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/create" element={<CreatePost />} />
    </Routes> */}
  </BrowserRouter>

  </UserContext.Provider>

  );
}

export default App;
