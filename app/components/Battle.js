import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FaUserFriends,
  FaFighterJet,
  FaTrophy,
  FaTimesCircle,
} from 'react-icons/fa';
import { ThemeConsumer } from '../contexts/theme';
import Results from './Results';

function Instructions() {
  return (
    <ThemeConsumer>
      {({ theme }) => (
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
              <FaFighterJet
                className={`bg-${theme}`}
                color='#727272'
                size={140}
              />
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
      )}
    </ThemeConsumer>
  );
}

export class PlayerInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.onSubmit(this.state.username);
  }

  handleChange(e) {
    this.setState({
      username: e.target.value,
    });
  }

  render() {
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <form
            className='flex-center column player'
            onSubmit={this.handleSubmit}
          >
            <label htmlFor='username' className='player-label'>
              {this.props.label}
            </label>
            <div className='row player-inputs'>
              <input
                type='text'
                id='username'
                className={`input-${theme}`}
                placeholder='Github username'
                onChange={this.handleChange}
                value={this.state.username}
                autoComplete='off'
              />
              <button
                className={`btn ${theme === 'dark' ? 'light-btn' : 'dark-btn'}`}
                type='submit'
                disabled={!this.state.username}
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </ThemeConsumer>
    );
  }
}

PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

function PlayerPreview({ username, onReset, label }) {
  return (
    <ThemeConsumer>
      {({ theme }) => (
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
      )}
    </ThemeConsumer>
  );
}

PlayerPreview.propTypes = {
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default class Battle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOne: null,
      playerTwo: null,
      battle: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(id, playerName) {
    this.setState({
      [id]: playerName,
    });
  }

  handleReset(id) {
    this.setState({
      [id]: null,
    });
  }

  render() {
    const { playerOne, playerTwo, battle } = this.state;

    if (battle === true) {
      return (
        <Results
          playerOne={playerOne}
          playerTwo={playerTwo}
          onReset={() =>
            this.setState({
              playerOne: null,
              playerTwo: null,
              battle: false,
            })
          }
        />
      );
    }

    return (
      <React.Fragment>
        <Instructions />
        {playerOne === null ? (
          <PlayerInput
            label={'Player One:'}
            onSubmit={(playerName) =>
              this.handleSubmit('playerOne', playerName)
            }
          />
        ) : (
          <PlayerPreview
            username={playerOne}
            label='Player One'
            onReset={() => this.handleReset('playerOne')}
          />
        )}

        {playerTwo === null ? (
          <PlayerInput
            label={'Player Two:'}
            onSubmit={(playerName) =>
              this.handleSubmit('playerTwo', playerName)
            }
          />
        ) : (
          <PlayerPreview
            username={playerTwo}
            label='Player Two'
            onReset={() => this.handleReset('playerTwo')}
          />
        )}

        {playerOne && playerTwo && (
          <button
            className='btn dark-btn btn-space'
            onClick={() => this.setState({ battle: true })}
          >
            Battle
          </button>
        )}
      </React.Fragment>
    );
  }
}
