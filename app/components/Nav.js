import React from 'react';
import { ThemeConsumer } from '../contexts/theme';

function Nav() {
  return (
    <ThemeConsumer>
      {({ theme, setTheme }) => (
        <div className='nav'>
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
