import React from "react";
import Menu from "./Menu";

class Category extends React.Component {
  renderMenu = menus => {
    return menus.map((menu, i) => {
      return <Menu key={"menu" + i} menu={menu} />;
    });
  };
  render() {
    return (
      <>
        <div className="categoryTitle">{this.props.category}</div>
        <div className="containerMenu">{this.renderMenu(this.props.menus)}</div>
      </>
    );
  }
}

export default Category;
