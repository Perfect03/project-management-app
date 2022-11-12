import React from 'react';
import './main.scss';

const Main = () => {
  return (
    <>
      <div className="firstSection">
        <div className="aboutApp">
          <h1>Planer for your tasks.</h1>
          <p>
            It is a project management software that allows you to centrally manage tasks and their
            timely completion. Trackers are widely used in project management, because they allow
            you to easily monitor all work processes and control the work of the team.
          </p>
          <button> Start </button>
        </div>
      </div>
      <div className="secondSection">
        <h1>Our team:</h1>
        <div>
          <div>
            <h3>
              Gleb Zlobin
              <a href="https://github.com/Perfect03">
                <span></span>
              </a>
            </h3>
            <p>
              Team communication, organizing meetings and assignments. Took over development of
              Textbook. Created roating. And gave us the sprint game. Also did a lot of statistics
              gathering.
            </p>
          </div>
          <div>
            <h3>
              Nikita Staselovich
              <a href="https://github.com/Falderian">
                <span></span>
              </a>
            </h3>
            <p>
              Took care of all the backend, including the authorization and registration backend.
              Developed the audio challenge game. Made the statistics page work.
            </p>
          </div>
          <div>
            <h3>
              Alisa Fedorova
              <a className="githunDev" href="https://github.com/AlisaFed">
                <span></span>
              </a>
            </h3>
            <p>
              Layout of homepage, statistics, and all the basic elements. Styling of the games. The
              design of the entire application. Took part in creating the authorization and
              registration.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export { Main };
