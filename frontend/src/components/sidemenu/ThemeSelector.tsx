import { useContext, useEffect, useState } from 'react';
import style from './ThemeSelector.module.scss';
import { ThemeContext } from '../../context/ThemeContext';

interface props {
  className?: string;
  dataDropdown: 'true' | 'false';
}

const ThemeSelector = ({ className, dataDropdown }: props) => {
  const [toggleTheme, setToggleTheme] = useState(
    localStorage.getItem('kanbanTheme')
      ? localStorage.getItem('kanbanTheme') === 'true'
        ? true
        : false
      : false
  );

  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    setToggleTheme(
      localStorage.getItem('kanbanTheme') === 'true' ? true : false
    );
    themeContext?.setTheme(toggleTheme === true ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    localStorage.setItem('kanbanTheme', toggleTheme.toString());
    // console.log(localStorage.getItem('kanbanTheme') === 'true' ? true : false);
    themeContext?.setTheme(toggleTheme === true ? 'dark' : 'light');
  }, [toggleTheme]);

  return (
    <div className={`${className}`} data-dropdown={dataDropdown}>
      <label className={style['theme-selector__group']}>
        <input
          type="checkbox"
          title="toggle dark-mode"
          checked={toggleTheme}
          onChange={() => setToggleTheme(!toggleTheme)}
          className={`${toggleTheme ? 'toggle' : ''}`}
        />
        <span className={style.slider} />
      </label>
    </div>
  );
};

export default ThemeSelector;
