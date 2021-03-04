import React, { Component, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
  FaUserFriends,
  FaFighterJet,
  FaTrophy,
  FaTimesCircle,
} from 'react-icons/fa';
import { ThemeContext } from '../contexts/theme';
import { Link } from 'react-router-dom';

function Instructions() {
  const theme = useContext(ThemeContext);

  return (
    <div className='instructions-container'>
      <h1 className='center-text header-lg'>Instructions</h1>
      <ol className='container-sm grid center-text battle-instructions'>
        <li>
          <h3 className='header-sm'>Enter two Github users</h3>
          <FaUserFriends
            className={`bg-${theme}`}
            color='rgb(255, 191, 116)'
            size={140}
          />
        </li>
        <li>
          <h3 className='header-sm'>Battle</h3>
          <FaFighterJet className={`bg-${theme}`} color='#727272' size={140} />
        </li>
        <li>
          <h3 className='header-sm'>See the winners</h3>
          <FaTrophy
            className={`bg-${theme}`}
            color='rgb(255, 215, 0)'
            size={140}
          />
        </li>
      </ol>
    </div>
  );
}

function PlayerInput({ label, onSubmit }) {
  const [username, setUserName] = useState('');
  const theme = React.useContext(ThemeContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(username);
  };

  const handleChange = (e) => {
    setUserName(e.target.value);
  };

  return (
    <form className='flex-center column player' onSubmit={handleSubmit}>
      <label htmlFor='username' className='player-label'>
        {label}
      </label>
      <div className='row player-inputs'>
        <input
          type='text'
          id='username'
          className={`input-${theme}`}
          placeholder='Github username'
          onChange={handleChange}
          value={username}
          autoComplete='off'
        />
        <button
          className={`btn ${theme === 'dark' ? 'light-btn' : 'dark-btn'}`}
          type='submit'
          disabled={!username}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

function PlayerPreview({ username, onReset, label }) {
  const theme = React.useContext(ThemeContext);

  return (
    <div className='column player'>
      <h3 className='player-label'>{label}</h3>
      <div className={`column flex-center bg-${theme}`}>
        <img
          src={`https://github.com/${username}.png?size=200`}
          alt={`Avatar for ${username}`}
          className='avatar-small'
        />
        <a href={`https://github.com/${username}`} className='link'>
          {username}
        </a>

        <button className='btn-clear flex-center' onClick={onReset}>
          <FaTimesCircle color='rgb(194, 57, 42)' size={26} />
        </button>
      </div>
    </div>
  );
}

PlayerPreview.propTypes = {
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default function Battle() {
  const [playerOne, setPlayerOne] = useState(null);
  const [playerTwo, setPlayerTwo] = useState(null);

  return (
    <React.Fragment>
      <Instructions />
      {playerOne === null ? (
        <PlayerInput
          label={'Player One:'}
          onSubmit={(playerName) => setPlayerOne(playerName)}
        />
      ) : (
        <PlayerPreview
          username={playerOne}
          label='Player One'
          onReset={() => setPlayerOne(null)}
        />
      )}

      {playerTwo === null ? (
        <PlayerInput
          label={'Player Two:'}
          onSubmit={(playerName) => setPlayerTwo(playerName)}
        />
      ) : (
        <PlayerPreview
          username={playerTwo}
          label='Player Two'
          onReset={() => setPlayerTwo(null)}
        />
      )}

      {playerOne && playerTwo && (
        <Link
          to={{
            pathname: `/battle/results`,
            search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`,
          }}
          className='btn dark-btn btn-space'
        >
          Battle
        </Link>
      )}
    </React.Fragment>
  );
}
