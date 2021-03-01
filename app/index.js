import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider } from './contexts/theme';
import Popular from './components/Popular';
import Battle from './components/Battle';
import Nav from './components/Nav';

//Component
//State
//Lifecycle
//UI

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
      <ThemeProvider value={this.state}>
        <div className={this.state.theme}>
          <div className='container'>
            <Nav />
            {/* <Battle /> */}
            <Popular />
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
