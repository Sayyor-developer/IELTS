import { Route, Routes } from 'react-router-dom';
// ? toast
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



import './App.css';
import Header from './components/header/Header';
import Home from "./pages/home/Home";
import Sections from './pages/home/sections/Sections';
import Exam from './pages/home/exam/Exam';

function App() {
  
  return (
    
    <div className="App">
    <ToastContainer />
    
    <Header />
    
    
    
    
    
    
    {/* ? router */}
    
    <Routes>
    <Route path="/" element={ <Home /> } />
    <Route path="/sections/:mode" element={ <Sections /> } />
    <Route path="/exams/:mode/:section" element={ <Exam /> } />
    
    </Routes>
    
    
    </div>
  );
}

export default App;
