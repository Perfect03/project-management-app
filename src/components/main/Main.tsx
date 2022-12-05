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
          <h1 className="main-firstsection-about-h1">{t('Planer for your tasks.')}</h1>
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
              Team communication, organizing meetings and assignments. Took over development of
              Textbook. Created roating. And gave us the sprint game. Also did a lot of statistics
              gathering.
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
              Took care of all the backend, including the authorization and registration backend.
              Developed the audio challenge game. Made the statistics page work.
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
              Layout of homepage, statistics, and all the basic elements. Styling of the games. The
              design of the entire application. Took part in creating the authorization and
              registration.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export { Main };
