import React from 'react';

class Hover extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hovering: false,
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  handleMouseOver() {
    this.setState({ hovering: true });
  }

  handleMouseOut() {
    this.setState({ hovering: false });
  }

  render() {
    return (
      <div onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
        {this.props.children(this.state.hovering)}
      </div>
    );
  }
}

export default Hover;
