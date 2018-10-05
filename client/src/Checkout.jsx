import React from 'react';
import styles from './../styles/checkout.css';
import Share from './Share.jsx';
import Container from './Container.jsx';
import exampleData from '../exampleData.js';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productData: exampleData.data,
    };
  }

  componentDidMount() {
    const endPath = window.location.search; // takes the current window URL

    $.ajax({
      url: `/checkout/${endPath.match(/\d+$/g)}`,
      method: 'GET',
      contentType: 'application/json',
      success: (data) => {
        console.log(data);
        this.setState({
          productData: data,
        });
      },
    });
  }

  render() {
    return (
      <div className={ styles.checkout}>
        <Share productData={this.state.productData}/>
        <Container productData={this.state.productData}/>
      </div>
    );
  }
}

export default Checkout;
