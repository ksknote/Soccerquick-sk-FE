import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
// import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import './App.css';
import MainPage from './Pages/Main';
import ReviewPage from './Pages/ReviewPages/ReviewPage';
import TeamPage from './Pages/TeamPage/MainPage';
import SearchPage from './Pages/SearchPage';
import GroundDetail from './Pages/groundDetail';
import Admin from './Pages/AdminPage/Views/MainPage';
import { MyPage } from './Pages/MyPage';
// Redux 공부를 위한 추가 Store
import { store, persistor } from './ReduxStore/store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/ground" element={<SearchPage />} />
            <Route path="/admin/*" element={<Admin />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/teampage/*" element={<TeamPage />} />
            <Route path="/review/*" element={<ReviewPage />} />
            <Route path="/ground/:dom_id" element={<GroundDetail />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
