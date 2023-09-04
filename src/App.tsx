import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
// import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import './App.css';
import MainPage from './pages/Main';
import ReviewPage from './pages/ReviewPages/ReviewPage';
import TeamPage from './pages/TeamPage/MainPage';
import SearchPage from './pages/SearchPage';
import GroundDetail from './pages/groundDetail';
import Admin from './pages/AdminPage/Views/MainPage';
import { MyPage } from './pages/MyPage';
import MyPageHome from './components/MyPage/MyPageHome';
import MobileCategory from './components/Commons/MobileCategory';
// Redux 공부를 위한 추가 Store
import { store, persistor } from './redux/store';
import Auth from './pages/AuthPage/Auth';
import Community from './pages/Community/Community';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <MobileCategory />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/ground" element={<SearchPage />} />
            <Route path="/admin/*" element={<Admin />} />
            <Route path="/mypage/*" element={<MyPage />} />
            <Route path="/teampage/*" element={<TeamPage />} />
            <Route path="/review/*" element={<ReviewPage />} />
            <Route path="/ground/:dom_id" element={<GroundDetail />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/community/*" element={<Community />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
