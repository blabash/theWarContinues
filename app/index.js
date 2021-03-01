import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './index.css';
import { ThemeProvider } from './contexts/theme';
import Popular from './components/Popular';
import Battle from './components/Battle';
import Nav from './components/Nav';
import Results from './components/Results';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: 'dark',
      setTheme: () =>
        this.setState(({ theme }) => ({
          theme: theme === 'dark' ? 'light' : 'dark',
        })),
    };
  }

  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className='container'>
              <Nav />

              <Route exact path='/' component={Popular} />
              <Route exact path='/battle' component={Battle} />
              <Route path='/battle/results' component={Results} />
            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
