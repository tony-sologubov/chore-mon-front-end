import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios'

const URL = 'http://localhost:9000/api/charge'

const successPayment = data => {
  alert('Payment Successful');
};

const errorPayment = data => {
  alert('Payment Error');
};

export default class BillingPage extends React.Component {
  onToken = (amount, description) => token =>
  axios.post(URL,{source: token.id})
    .then(successPayment)
    .catch(errorPayment);
    
    render() {
      return (
        <div>
          <h1>Please Buy Our Premium Things!</h1>
        <StripeCheckout
        stripeKey="pk_test_DxmfbYWW8YHJec5ESRF9n0XS002ib6dHug"
        token={this.onToken}
        description="For the coolest stuff in the world"
        amount={1000}
        currency="USD"
        name="ChoreMonkey"
        />
        </div>
        )
    }
  }