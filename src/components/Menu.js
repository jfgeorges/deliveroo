import React from "react";

class Menu extends React.Component {
  render() {
    return (
      <div key={this.props.menu.id} className="cardMenu">
        <div className="menuTitle">{this.props.menu.title}</div>
        <div className="menuDescription">{this.props.menu.description}</div>
        <div className="menuPrice">{this.props.menu.price}</div>
      </div>
    );
  }
}

export default Menu;
