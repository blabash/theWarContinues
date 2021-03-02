import React from 'react';
import { ThemeConsumer } from '../contexts/theme';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <ThemeConsumer>
      {({ theme, setTheme }) => (
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
            onClick={setTheme}
            className='btn-clear'
            style={{ fontSize: 30 }}
          >
            {theme === 'dark' ? '💡' : '🔦'}
          </button>
        </div>
      )}
    </ThemeConsumer>
  );
}

export default Nav;
