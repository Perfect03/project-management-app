import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import './main.scss';
import { useNavigate } from 'react-router-dom';
import { IGetState } from 'interfaces/redux';

const Main = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const isAuth = useSelector((state: IGetState) => state.userData.isAuth);

  return (
    <>
      <section className="main-firstsection">
        <div className="main-firstsection-about">
          <h1 className="main-firstsection-about-h1">{t('Planner for your tasks.')}</h1>
          <p className="main-firstsection-about-p">{t('It is a project management')}</p>
          <button
            className="main-firstsection-about-button"
            onClick={() => {
              navigate(isAuth ? '/boards' : '/login');
            }}
          >
            {t('Start')}
          </button>
        </div>
      </section>
      <section className="main-secondsection">
        <h1 className="main-secondsection-h1">{t('Our team:')}</h1>
        <div className="main-secondsection-developers">
          <div className="main-secondsection-developers-developer">
            <h3 className="main-secondsection-developers-developer-name">
              {t('Gleb Zlobin')}
              <a href="https://github.com/Perfect03">
                <span className="main-secondsection-developers-developer-name-img"></span>
              </a>
            </h3>
            <p className="main-secondsection-developers-developer-did">
              {t(
                'Creating a load function. Added drag-n-drop functionality. Functionality of deleting a user. Authorization and registration. Changed language. Popup notifications after changes.'
              )}
            </p>
          </div>
          <div className="main-secondsection-developers-developer">
            <h3 className="main-secondsection-developers-developer-name">
              {t('Nikita Staselovich')}
              <a href="https://github.com/Falderian">
                <span className="main-secondsection-developers-developer-name-img"></span>
              </a>
            </h3>
            <p className="main-secondsection-developers-developer-did">
              {t(
                'Described the functionality of the server. Made a Redux configuration. Configured Local Storage. Changing the layout for an authorized user. Authorization and registration.  Deleting and updating user data. Board functionality. Search.'
              )}
            </p>
          </div>
          <div className="main-secondsection-developers-developer">
            <h3 className="main-secondsection-developers-developer-name">
              {t('Alisa Fedorova')}
              <a className="githunDev" href="https://github.com/AlisaFed">
                <span className="main-secondsection-developers-developer-name-img"></span>
              </a>
            </h3>
            <p className="main-secondsection-developers-developer-did">
              {t(
                'The layout of all pages and modal windows. Change the layout for the authorized user. Authorization and registration. Forms validation. Routing. Adaptivity. Board functionality. Editing tasks. Changing the header of the column.'
              )}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export { Main };
