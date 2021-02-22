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
      repos: {},
      error: null,
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
    });

    if (!this.state.repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
        .then((data) => {
          this.setState(({ repos }) => ({
            repos: {
              ...repos,
              [selectedLanguage]: data,
            },
            error: null,
          }));
        })
        .catch((err) => {
          console.warn(`Error fetching repos: ${err}`);

          this.setState({
            error: `There was an error fetching the repos`,
          });
        });
    }
  }

  isLoading(language) {
    return this.state.error === null && !this.state.repos[language];
  }

  render() {
    const { selectedLanguage, repos, error } = this.state;
    return (
      <React.Fragment>
        <LanguagesNav
          selectedLanguage={selectedLanguage}
          updateLanguage={this.updateLanguage}
        />

        {this.isLoading(selectedLanguage) && <p>Loading...</p>}

        {error && <p>{error}</p>}

        {repos[selectedLanguage] && (
          <pre>{JSON.stringify(repos[selectedLanguage], null, `\t`)}</pre>
        )}
      </React.Fragment>
    );
  }
}
