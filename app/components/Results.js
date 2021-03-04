import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { battle } from '../utils/api';
import {
  FaUser,
  FaUsers,
  FaCompass,
  FaBriefcase,
  FaUserFriends,
  FaCode,
} from 'react-icons/fa';
import Card from './Card';
import Loading from './Loading';
import Tooltip from './Tooltip';
import { Link } from 'react-router-dom';

function ProfileList({ profile }) {
  return (
    <ul className='card-list'>
      <li>
        <FaUser color='rgb(239, 115, 115)' size={22} />
        {profile.name}
      </li>
      {profile.location && (
        <li style={{ position: 'relative', display: 'flex' }}>
          <Tooltip text="User's location">
            <FaCompass color='rgb(144, 115, 255)' size={22} />
            {profile.location}
          </Tooltip>
        </li>
      )}
      {profile.company && (
        <li style={{ position: 'relative', display: 'flex' }}>
          <Tooltip text="User's company">
            <FaBriefcase color='#795548' size={22} />
            {profile.company}
          </Tooltip>
        </li>
      )}
      <li>
        <FaUsers color='rgb(129, 195, 245)' size={22} />
        {profile.followers.toLocaleString()} followers
      </li>
      <li>
        <FaUserFriends color='rgb(64, 195, 95)' size={22} />
        {profile.following.toLocaleString()} following
      </li>
      <li>
        <FaCode color='black' size={22} />
        {profile.public_repos.toLocaleString()} repos
      </li>
    </ul>
  );
}

ProfileList.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default function Results({ location }) {
  const [winner, setWinner] = useState(null);
  const [loser, setLoser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const playerOne = params.get('playerOne');
    const playerTwo = params.get('playerTwo');

    battle([playerOne, playerTwo])
      .then((players) => {
        setWinner(players[1]);
        setLoser(players[0]);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  if (loading === true) {
    return <Loading text='Battling' speed={100} />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='flex-center'>
      <Card
        header={winner.score === loser.score ? 'Tie' : 'Winner'}
        subheader={`Score: ${winner.score.toLocaleString()}`}
        avatar={winner.profile.avatar_url}
        href={winner.profile.html_url}
        name={winner.profile.login}
      >
        <ProfileList profile={winner.profile} />
      </Card>
      <Card
        header={winner.score === loser.score ? 'Tie' : 'Loser'}
        subheader={`Score: ${loser.score.toLocaleString()}`}
        avatar={loser.profile.avatar_url}
        href={loser.profile.html_url}
        name={loser.profile.login}
      >
        <ProfileList profile={loser.profile} />
      </Card>
      <Link className='btn dark-btn btn-space' to='/battle'>
        Reset
      </Link>
    </div>
  );
}
