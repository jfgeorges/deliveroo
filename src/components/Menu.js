import React from "react";

class Menu extends React.Component {
  render() {
    let shorterDesc = this.props.menu.description;
    if (shorterDesc.length > 150) {
      shorterDesc = this.props.menu.description.substring(0, 150) + "...";
    }
    return (
      <div key={this.props.menu.id} className="cardMenu" onClick={() => this.props.addMenu(this.props.menu)}>
        <div className="menuContainerDetail">
          <div className="menuTitle">{this.props.menu.title}</div>
          <div className="menuDescription">{shorterDesc}</div>
          <div className="menuPrice">
            {this.props.menu.price} € {this.props.menu.popular ? "Populaire" : ""}
          </div>
        </div>
        <img src={this.props.menu.picture} alt="Menu" />
      </div>
    );
  }
}

export default Menu;
