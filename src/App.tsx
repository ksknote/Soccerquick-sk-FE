import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from './Pages/Main';
import ReviewPage from './Pages/Review';
import TeamPage from './Pages/TeamPage/MainPage';
import SearchPage from './Pages/SearchPage';
import GroundDetail from './Pages/groundDetail';
import Admin from './Pages/AdminPage/MainPage';
import { MyPage } from './Pages/MyPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/ground" element={<SearchPage />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/teampage/*" element={<TeamPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/groundDetail" element={<GroundDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
