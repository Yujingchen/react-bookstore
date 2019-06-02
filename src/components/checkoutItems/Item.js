import React, { Component } from "react";
import { FaChevronCircleUp, FaChevronCircleDown } from "react-icons/fa";

class Item extends Component {
  render() {
    return (
      <tr>
        <td className="dataCell">
          <div className="cart-product">
            <div>
              <img
                className="cart-img"
                src={this.props.image}
                alt={this.props.title}
              />
            </div>
            <div>
              <ul className="cart-info-list">
                <li>{this.props.industryIdentifiers}</li>
                <li>Subject: {this.props.subject}</li>
                <li>
                  Authors:{" "}
                  {this.props.authors !== null
                    ? this.props.authors[0]
                    : "Unknown Author"}
                </li>
                <li>Publisher: {this.props.publisher}</li>
                <li>{this.props.stock}</li>
              </ul>
            </div>
          </div>
        </td>
        <td>
          <FaChevronCircleDown
            className="text-primary cart-icon"
            onClick={this.props.decrement}
          />
          <span>{this.props.itemCount}</span>
          <FaChevronCircleUp
            className="text-primary cart-icon"
            onClick={this.props.increment}
          />
        </td>
        <td>{this.props.price}€</td>
        <td>{this.props.subtotal}€</td>
        <td>
          <i className="fas fa-trash-alt" />
        </td>
      </tr>
    );
  }
}

export default Item;
