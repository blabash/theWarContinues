import React, { Component } from 'react';

export default class Popular extends Component {
  render() {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

    return (
      <ul className='flex-center'>
        {languages.map((lang) => (
          <li key={lang}>
            <button className='btn-clear nav-link'>{lang}</button>
          </li>
        ))}
      </ul>
    );
  }
}
