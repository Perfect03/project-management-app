import React from 'react';
import Registration from 'components/forms/registration/Registration';
import { Main } from 'components/main/Main';
import Autorization from 'components/forms/autorization/Autorization';
import { Route, Routes } from 'react-router-dom';
import { Header } from 'components/header/Header';
import { Notfoundpage } from 'components/notfound/Notfoundpage';
import Footer from 'components/footer/footer';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Main />} />
          <Route path="login" element={<Autorization />} />
          <Route path="signup" element={<Registration />} />
          <Route path="*" element={<Notfoundpage />} />
        </Route>
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
