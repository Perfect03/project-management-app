import React from 'react';
import useLocalStorage from 'hooks/use-localStorage';
import i18n from '../../../i18n';

const Language = () => {
  const [language, setLanguage] = useLocalStorage('language', 'en');

  const handleLenguageChange = () => {
    if (language === 'en') {
      i18n.changeLanguage('ru');
      setLanguage('ru');
    } else if (language === 'ru') {
      i18n.changeLanguage('en');
      setLanguage('en');
    }
  };
  return (
    <select className="header-content__language" onChange={handleLenguageChange}>
      <option value="en">EN</option>
      <option value="ru">RU</option>
    </select>
  );
};

export { Language };
