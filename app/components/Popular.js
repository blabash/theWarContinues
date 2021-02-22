import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';

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

export default class Popular extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: 'All',
      error: null,
      repos: null,
    };

    this.updateLanguage = this.updateLanguage.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage,
      error: null,
      repos: null,
    });

    fetchPopularRepos(selectedLanguage)
      .then((repos) => {
        this.setState({
          repos,
          error: null,
        });
      })
      .catch((err) => {
        console.warn(`Error fetching repos: ${err}`);

        this.setState({
          error: `There was an error fetching the repos`,
        });
      });
  }

  isLoading() {
    return this.state.error === null && this.state.repos === null;
  }

  render() {
    const { selectedLanguage, repos, error } = this.state;
    return (
      <React.Fragment>
        <LanguagesNav
          selectedLanguage={selectedLanguage}
          updateLanguage={this.updateLanguage}
        />

        {this.isLoading() && <p>Loading...</p>}

        {error && <p>{error}</p>}

        {repos && <pre>{JSON.stringify(repos, null, `\t`)}</pre>}
      </React.Fragment>
    );
  }
}
