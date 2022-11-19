import React from 'react';
import Registration from 'components/forms/registration/Registration';
import { Main } from 'components/main/Main';
import Autorization from 'components/forms/autorization/Autorization';
import { Route, Routes } from 'react-router-dom';
import { Header } from 'components/header/Header';
import { Notfoundpage } from 'components/notfound/Notfoundpage';
import Footer from 'components/footer/footer';
import { Profile } from 'components/profile/Profile';
import { Provider } from 'react-redux';
import store from 'helpers/redux/store';
import { BoardsPage } from 'components/boards/BoardsPage';
import { OpenedBoard } from 'components/boards/openedboard/OpenedBoard';
import board from 'api/board';

function App() {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Main />} />
            <Route path="login" element={<Autorization />} />
            <Route path="signup" element={<Registration />} />
            <Route path="profile" element={<Profile />} />
            <Route path="boards" element={<BoardsPage />} />
            <Route path="boards/:id" element={<OpenedBoard />} />
            <Route path="*" element={<Notfoundpage />} />
          </Route>
        </Routes>
        <Footer />
      </Provider>
    </>
  );
}

export default App;
