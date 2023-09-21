import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import './App.css';
import MainPage from './pages/Main';
import TeamPage from './pages/team/TeamPage';
import SearchPage from './pages/SearchPage';
import GroundDetail from './pages/groundDetail';
import Admin from './pages/admin/MainPage';
import { MyPage } from './pages/MyPage';
import MyPageHome from './components/myPages/MyPageHome';
import MobileCategory from './components/common/MobileCategory';
import Auth from './pages/auth/Auth';
import Community from './pages/community/Community';
import NotFound from './pages/NotFound';

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
            <Route path="/ground/:dom_id" element={<GroundDetail />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/community/*" element={<Community />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
