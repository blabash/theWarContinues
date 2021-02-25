import React, { Component } from 'react';
import { battle } from '../utils/api';
import {
  FaUser,
  FaUsers,
  FaCompass,
  FaBriefcase,
  FaUserFriends,
  FaCode,
} from 'react-icons/fa';

export default class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true,
    };
  }

  componentDidMount() {
    const { playerOne, playerTwo } = this.props;

    battle([playerOne, playerTwo])
      .then((players) => {
        this.setState({
          winner: players[1],
          loser: players[0],
          loading: false,
        });
      })
      .catch((e) => {
        this.setState({
          error: e.message,
          loading: false,
        });
      });
  }
  render() {
    const { winner, loser, error, loading } = this.state;

    if (loading === true) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>{error}</p>;
    }

    return (
      <div className='grid space-around container-sm'>
        <div className='card bg-light'>
          <h4 className='center-text'>
            {winner.score === loser.score ? 'Tie' : 'Winner'}
          </h4>
          <img
            className='avatar'
            src={winner.profile.avatar_url}
            alt={`Avatar for ${winner.profile.login}`}
          />
          <h2 className='center-text'>{winner.score}</h2>
          <h2 className='center-text'>
            <a
              href={winner.profile.html_url}
              target='_blank'
              rel='noopener noreferrer'
            >
              {winner.profile.login}
            </a>
          </h2>
          <ul>
            <li>
              <FaUser color='rgb(239, 115, 115)' size={22} />
              {winner.profile.name}
            </li>
            {winner.profile.location && (
              <li>
                <FaCompass color='rgb(144, 115, 255)' size={22} />
                {winner.profile.location}
              </li>
            )}
            {winner.profile.company && (
              <li>
                <FaBriefcase color='#795548' size={22} />
                {winner.profile.company}
              </li>
            )}
            <li>
              <FaUsers color='rgb(129, 195, 245)' size={22} />
              {winner.profile.followers.toLocaleString()}
            </li>
            <li>
              <FaUserFriends color='rgb(64, 195, 95)' size={22} />
              {winner.profile.following.toLocaleString()}
            </li>
            <li>
              <FaCode color='black' size={22} />
              {winner.profile.public_repos.toLocaleString()}
            </li>
          </ul>
        </div>
        <div className='card bg-light'>
          <h4 className='center-text'>
            {winner.score === loser.score ? 'Tie' : 'Loser'}
          </h4>
          <img
            className='avatar'
            src={loser.profile.avatar_url}
            alt={`Avatar for ${loser.profile.login}`}
          />
          <h2 className='center-text'>{loser.score}</h2>
          <h2 className='center-text'>
            <a
              href={loser.profile.html_url}
              target='_blank'
              rel='noopener noreferrer'
            >
              {loser.profile.login}
            </a>
          </h2>
          <ul>
            <li>
              <FaUser color='rgb(239, 115, 115)' size={22} />
              {loser.profile.name}
            </li>
            {loser.profile.location && (
              <li>
                <FaCompass color='rgb(144, 115, 255)' size={22} />
                {loser.profile.location}
              </li>
            )}
            {loser.profile.company && (
              <li>
                <FaBriefcase color='#795548' size={22} />
                {loser.profile.company}
              </li>
            )}
            <li>
              <FaUsers color='rgb(129, 195, 245)' size={22} />
              {loser.profile.followers.toLocaleString()} followers
            </li>
            <li>
              <FaUserFriends color='rgb(64, 195, 95)' size={22} />
              {loser.profile.following.toLocaleString()} following
            </li>
            <li>
              <FaCode color='black' size={22} />
              {loser.profile.public_repos.toLocaleString()} repos
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
