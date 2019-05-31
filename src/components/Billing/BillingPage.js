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
          <h1>Premium option 1</h1>
        <StripeCheckout
        stripeKey="pk_test_DxmfbYWW8YHJec5ESRF9n0XS002ib6dHug"
        token={this.onToken}
        description="For the coolest stuff in the world 1"
        amount={1000}
        label="Pay $10.00"
        currency="USD"
        name="ChoreMonkey"
        />
         <h1>Premium option 2</h1>
        <StripeCheckout
        stripeKey="pk_test_DxmfbYWW8YHJec5ESRF9n0XS002ib6dHug"
        token={this.onToken}
        description="For the coolest stuff in the world 2"
        amount={2000}
        label="Pay $20.00"
        currency="USD"
        name="ChoreMonkey"
        />
         <h1>Premium option 3</h1>
        <StripeCheckout
        stripeKey="pk_test_DxmfbYWW8YHJec5ESRF9n0XS002ib6dHug"
        token={this.onToken}
        description="For the coolest stuff in the world 3"
        amount={3000}
        label="Pay $30.00"
        currency="USD"
        name="ChoreMonkey"
        />
        </div>
        )
    }
  }
        