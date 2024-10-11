import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Header from './Layout/Header.jsx';
import Home from './pages/Home/Home.jsx';

import Index from './PAGES/Write/Index.jsx';
import Update from './PAGES/Write/Update.jsx';
import Footer from './Layout/Footer.jsx';
import SignIn from './PAGES/Home/Signin.jsx';
import SignUp from './PAGES/Home/Signup.jsx';
import ContactUs from './PAGES/Home/Contect.jsx';
import AddProject from './PAGES/Write/AddProject.jsx';
import ShowMorePage from './pages/Home/ShowMorePage.jsx';


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

