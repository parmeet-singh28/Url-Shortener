
import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/Home';
import FinalPage from './pages/Final';
import AllUrlsPage from './pages/AllUrls';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './components/NavBar';
import Footer from './components/Footer';
import LinksPage from './pages/LinksPage';
import AboutUsPage from './pages/AboutUs';
import ContactUsPage from './pages/ContactUs';
import TermsAndConditionsPage from './pages/TermsAndConditions';
import PrivacyPolicyPage from './pages/PrivacyPolicy';


function App() {
  return (
    <div>
      <MyNavbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='redirect/:id' element={<FinalPage/>}/>
        <Route path='/allUrls' element={<AllUrlsPage/>}/>
        <Route path='/links' element={<LinksPage/>}/>
        <Route path='/about' element={<AboutUsPage/>}/>
        <Route path='/contact' element={<ContactUsPage/>}/>
        <Route path='/terms' element={<TermsAndConditionsPage/>}/>
        <Route path='/privacy' element={<PrivacyPolicyPage/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
