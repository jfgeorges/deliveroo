import React from "react";

class Restaurant extends React.Component {
  render() {
    return (
      <div className="restaurant">
        <div className="restaurantNameDesc">
          <div className="restaurantName">{this.props.name}</div>
          <div className="restaurantDescription">{this.props.description}</div>
        </div>
        <img className="restaurantPicture" src={this.props.picture} alt="Restaurant" />
      </div>
    );
  }
}

export default Restaurant;
