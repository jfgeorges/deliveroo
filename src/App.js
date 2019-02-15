import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Restaurant from "./components/Restaurant";
import Category from "./components/Category";
import Basket from "./components/Basket";

class App extends Component {
  state = {
    restaurant: "",
    categories: "",
    loadingStatus: "",
    basket: []
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
        if (this.state.categories[category].length > 0) {
          return <Category key={"cat" + i} category={category} menus={this.state.categories[category]} addMenu={this.addMenu} />;
        } else {
          return null;
        }
      });
    }
  };

  addMenu = menuAdded => {
    const newBasket = [...this.state.basket];
    // Cherche si le menu existe déjà dans le panier
    const menuIndex = newBasket.findIndex(menu => menu.id === menuAdded.id);

    if (menuIndex >= 0) {
      newBasket[menuIndex].quantity = newBasket[menuIndex].quantity + 1;
    } else {
      newBasket.push({ id: menuAdded.id, title: menuAdded.title, price: menuAdded.price, quantity: 1 });
    }
    this.setState({ basket: newBasket });
  };

  changeQty = (id, plusMoins) => {
    const newBasket = [...this.state.basket];
    // Cherche l'index du produit dans le panier
    const menuIndex = newBasket.findIndex(menu => menu.id === id);
    if (menuIndex >= 0) {
      newBasket[menuIndex].quantity = newBasket[menuIndex].quantity + (plusMoins === "plus" ? 1 : -1);
      if (newBasket[menuIndex].quantity === 0) {
        newBasket.splice(menuIndex, 1);
      }
    }
    this.setState({ basket: newBasket });
  };

  totalBasket = () => {
    let basketTotal = 0;
    if (this.state.basket.length > 0) {
      basketTotal = this.state.basket.reduce((total, menu) => {
        return total + menu.quantity * menu.price;
      }, 0);
      return basketTotal.toFixed(2);
    }
  };
  renderTotal = () => {
    const total = this.totalBasket();
    if (total > 0) {
      return (
        <>
          <div>Total</div>
          <div>{total} €</div>
        </>
      );
    } else {
      return null;
    }
  };
  // ------ //
  // RENDER //
  // ------ //
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
        <div className="containerCatBasket">
          <div className="containerCategories">{this.renderCategories()}</div>
          <div className="basket">
            <button>Valider mon panier</button>
            <Basket basket={this.state.basket} changeQty={this.changeQty} />
            <div className="basketTotal">{this.renderTotal()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
