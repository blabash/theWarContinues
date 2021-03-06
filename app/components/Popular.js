import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle,
} from 'react-icons/fa';
import Card from './Card';
import Loading from './Loading';
import Tooltip from './Tooltip';

function LanguagesNav({ selectedLanguage, updateLanguage }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className='flex-center'>
      {languages.map((lang) => (
        <li key={lang}>
          <button
            onClick={() => updateLanguage(lang)}
            className='btn-clear nav-link'
            style={lang === selectedLanguage ? { color: `blue` } : null}
          >
            {lang}
          </button>
        </li>
      ))}
    </ul>
  );
}

LanguagesNav.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  updateLanguage: PropTypes.func.isRequired,
};

function ReposGrid({ repos }) {
  return (
    <ul className='grid space-evenly'>
      {repos.map((repo, idx) => {
        const { owner, html_url, stargazers_count, forks, open_issues } = repo;
        const { login, avatar_url } = owner;

        return (
          <li key={html_url}>
            <Card
              header={`#${idx + 1}`}
              avatar={avatar_url}
              href={html_url}
              name={login}
            >
              <ul className='card-list'>
                <li style={{ position: 'relative', display: 'flex' }}>
                  <Tooltip text='Github username'>
                    <FaUser color='rgb(255,191,116)' size={22} />
                    <a href={`https://github.com/${login}`}>{login}</a>
                  </Tooltip>
                </li>
                <li>
                  <FaStar color='rgb(255,215,0)' size={22} />
                  {stargazers_count.toLocaleString()} stars
                </li>
                <li>
                  <FaCodeBranch color='rgb(129,195,245)' size={22} />
                  {forks.toLocaleString()} forks
                </li>
                <li>
                  <FaExclamationTriangle color='rgb(241,138,147)' size={22} />
                  {open_issues.toLocaleString()} open issues
                </li>
              </ul>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired,
};

export default function Popular() {
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [repos, setRepos] = useState({});
  const [error, setError] = useState(null);

  React.useEffect(() => {
    updateLanguage(selectedLanguage);
  }, []);

  function updateLanguage(language) {
    setSelectedLanguage(language);
    setError(null);

    if (!repos[language]) {
      fetchPopularRepos(language)
        .then((data) => {
          setRepos((repos) => ({
            ...repos,
            [language]: data,
          }));

          setError(null);
        })
        .catch((e) => {
          console.warn(`Error fetching repos: ${e}`);

          setError('There was an error fetching the repos.');
        });
    }
  }

  function isLoading() {
    return error === null && !repos[selectedLanguage];
  }

  return (
    <React.Fragment>
      <LanguagesNav
        selectedLanguage={selectedLanguage}
        updateLanguage={updateLanguage}
      />

      {isLoading() && <Loading text='Fetching Repos' speed={100} />}

      {error && <p>{error}</p>}

      {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
    </React.Fragment>
  );
}
