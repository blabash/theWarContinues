import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/theme';
import { Link } from 'react-router-dom';

function Nav({ toggleTheme }) {
  const theme = useContext(ThemeContext);
  return (
    <div className='nav space-evenly'>
      <div className='row'>
        <Link className='btn' to='/'>
          Popular
        </Link>
        <Link className='btn' to='/battle'>
          Battle
        </Link>
      </div>

      <button
        onClick={toggleTheme}
        className='btn-clear'
        style={{ fontSize: 30 }}
      >
        {theme === 'dark' ? '💡' : '🔦'}
      </button>
    </div>
  );
}

export default Nav;
