import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FaUserFriends,
  FaFighterJet,
  FaTrophy,
  FaTimesCircle,
} from 'react-icons/fa';
import Results from './Results';

function Instructions() {
  return (
    <div className='instructions-container'>
      <h1 className='center-text header-lg'>Instructions</h1>
      <ol className='container-sm grid center-text battle-instructions'>
        <li>
          <h3 className='header-sm'>Enter two Github users</h3>
          <FaUserFriends
            className='bg-light'
            color='rgb(255, 191, 116)'
            size={140}
          />
        </li>
        <li>
          <h3 className='header-sm'>Battle</h3>
          <FaFighterJet className='bg-light' color='#727272' size={140} />
        </li>
        <li>
          <h3 className='header-sm'>See the winners</h3>
          <FaTrophy className='bg-light' color='rgb(255, 215, 0)' size={140} />
        </li>
      </ol>
    </div>
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
      <form className='flex-center column player' onSubmit={this.handleSubmit}>
        <label htmlFor='username' className='player-label'>
          {this.props.label}
        </label>
        <div className='row player-inputs'>
          <input
            type='text'
            id='username'
            placeholder='Github username'
            onChange={this.handleChange}
            value={this.state.username}
            autoComplete='off'
          />
          <button
            className='btn dark-btn'
            type='submit'
            disabled={!this.state.username}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

function PlayerPreview({ username, onReset, label }) {
  return (
    <div className='column player'>
      <h3 className='player-label'>{label}</h3>
      <div className='row bg-light'>
        <div className='player-info'>
          <img
            src={`https://github.com/${username}.png?size=200`}
            alt={`Avatar for ${username}`}
            className='avatar-small'
          />
          <a href={`https://github.com/${username}`} className='link'>
            {username}
          </a>
        </div>
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
      return <Results playerOne={playerOne} playerTwo={playerTwo} />;
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
