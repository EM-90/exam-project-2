import React from 'react'; 
import './index.css'
import './App.css'
import Layout from './components/layout';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Profile from './pages/profile';
import Nopage from './pages/nopage';
import { CrudProvider } from './context/crud';


function App() {

  return (
    <>
    <BrowserRouter>
     <CrudProvider>
       <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="*" element={<Nopage/>}/>
          </Route>
        </Routes>
      </CrudProvider>
    </BrowserRouter>
    </>
  )
}

export default App


