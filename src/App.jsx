import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './pages/Home/Home.jsx';
import Index from './PAGES/Write/Index.jsx';
import ShowMore from './pages/Home/ShowMore.jsx';
import UpdatePro from './pages/Home/UpdatePro.jsx';
import AddProjects from './pages/Write/AddProjects.jsx';
import SignIn from './pages/Home/Signin.jsx';
import SignUp from './pages/Home/Signup.jsx';
import Contact from './pages/Home/Contect.jsx';
import Footer from './Layout/Footer.jsx';
import Header from './Layout/Header.jsx';




function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Index" element={<Index />} />
          <Route path="/ProjectDetails/:id" element={<ShowMore />} />
          <Route path="/edit/:id" element={<UpdatePro />} />
          <Route path="/add" element={<AddProjects />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </Router >
    </>
  )
}

export default App

