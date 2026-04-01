import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sections/:mode" element={<Sections />} />
        {/* MUHIM: /exams/:mode/:section ko'rinishida */}
        <Route path="/exams/:mode/:section" element={<Exam />} />
      </Routes>
    </div>
  );
}

export default App;