import React, { Component } from 'react';

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

export default class Popular extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: 'All',
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage,
    });
  }

  render() {
    return (
      <LanguagesNav
        selectedLanguage={this.state.selectedLanguage}
        updateLanguage={this.updateLanguage}
      />
    );
  }
}
