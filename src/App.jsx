import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Header from './Layout/Header';
import Home from './Layout/Home.jsx';

import Index from './PAGES/Write/Index';
import Update from './PAGES/Write/Update';
import Footer from './Layout/Footer';
import SignIn from './PAGES/Home/Signin';
import SignUp from './PAGES/Home/Signup';
import ContactUs from './PAGES/Home/Contect';
import AddProject from './pages/Write/AddProject.jsx';
import ShowMorePage from './Layout/ShowMorePage.jsx';


function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Index" element={<Index />} />
          <Route path="/ProjectDetails/:id" element={<ShowMorePage />} />
          <Route path="/edit/:id" element={<Update />} />
          <Route path="/add" element={<AddProject />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
        <Footer />
      </Router >
    </>
  )
}

export default App

