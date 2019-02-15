import React from "react";

class Basket extends React.Component {
  render() {
    return this.props.basket.map((menu, i) => {
      return (
        <div key={"basket-i" + i} className="basket-item">
          <div className="basketQtyMenu">
            <div className="minus" onClick={() => this.props.changeQty(menu.id, "moins")} />
            <div className="basket-qty"> {menu.quantity} </div>
            <div className="plus" onClick={() => this.props.changeQty(menu.id, "plus")} />
            <div className="basket-title">{menu.title}</div>
          </div>
          <div className="basketMenuPrice">{(menu.quantity * menu.price).toFixed(2)} €</div>
        </div>
      );
    });
  }
}

export default Basket;
