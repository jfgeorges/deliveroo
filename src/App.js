import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Restaurant from "./components/Restaurant";
import Category from "./components/Category";

class App extends Component {
  state = {
    restaurant: "",
    categories: "",
    loadingStatus: ""
  };
  componentDidMount = async () => {
    this.setState({ loadingStatus: await this.loadDataMenu() });
  };

  loadDataMenu = async () => {
    const url = "https://deliveroo-api.now.sh/menu";
    try {
      const response = await axios.get(url);
      await this.setState({ restaurant: response.data.restaurant, categories: response.data.menu });
      return true;
    } catch (error) {
      return error.message;
    }
  };
  renderRestaurant = () => {
    return <Restaurant name={this.state.restaurant.name} description={this.state.restaurant.description} picture={this.state.restaurant.picture} />;
  };
  renderCategories = () => {
    if (this.state.loadingStatus !== true) {
      return (
        <div className="error">
          <div>Erreur de chargement des données Deliveroo : {this.state.loadingStatus}</div>
        </div>
      );
    } else {
      const categories = Object.keys(this.state.categories);
      return categories.map((category, i) => {
        return <Category key={"cat" + i} category={category} menus={this.state.categories[category]} />;
      });
    }
  };

  render() {
    return (
      <div className="container">
        <header>
          <img
            src="https://consumer-component-library.roocdn.com/9.3.0/static/images/logo-teal.64a39561252047a022e5ce0929c75374.svg"
            alt="Deliveroo"
          />
        </header>
        {this.renderRestaurant()}
        <div className="containerCategories">{this.renderCategories()}</div>
      </div>
    );
  }
}

export default App;
