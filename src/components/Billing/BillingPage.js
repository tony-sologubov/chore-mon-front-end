import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const URL = 'https://tonys-demo-backend.herokuapp.com/api/charge';

const successPayment = (data) => {
	alert('Payment Successful');
};

const errorPayment = (data) => {
	alert('Payment Error');
};

export default class BillingPage extends React.Component {
	onToken = (amount, description) => (token) =>
		axios.post(URL, { source: token.id }).then(successPayment).catch(errorPayment);

	render() {
		return (
			<div className="billingContainer">
				<div className="billingCard">
					<div className="section-3">
						<div className="subsection-3">
							<h1>Choose Your Plan</h1>
							<div className="panels">
								<div className="card-panel">
									<h3>FREE</h3>
									<h1>
										<span id="sup">$</span>0<span id="sub">/mo</span>
									</h1>
									<ul class="collection">
										<li class="collection-item">3 Projects</li>
										<li class="collection-item">5 Team Members</li>
										<li class="collection-item">20 Contacts</li>
										<li class="collection-item">1000 Messages</li>
									</ul>
								</div>
								<div className="card-panel">
									<h3>PREMIUM</h3>
									<h1>
										<span id="sup">$</span>10<span id="sub">/mo</span>
									</h1>

									<ul class="collection">
										<li class="collection-item">10 Projects</li>
										<li class="collection-item">25 Team Members</li>
										<li class="collection-item">200 Contacts</li>
										<li class="collection-item">10000 Messages</li>
									</ul>
									<StripeCheckout
										stripeKey="pk_test_DxmfbYWW8YHJec5ESRF9n0XS002ib6dHug"
										token={this.onToken}
										description="ListMonkey Premium Plan"
										amount={1000}
										label="Choose Premium"
										currency="USD"
                    name="ListMonkey"
               
									/>
								</div>
								<div className="card-panel">
									<h3>PLATINUM</h3>
									<h1>
										<span id="sup">$</span>20<span id="sub">/mo</span>
									</h1>
									<ul class="collection">
										<li class="collection-item">Ultd Projects</li>
										<li class="collection-item">Ultd Team Members</li>
										<li class="collection-item">Ultd Contacts</li>
										<li class="collection-item">Ultd Messages</li>
									</ul>
									<StripeCheckout
										stripeKey="pk_test_DxmfbYWW8YHJec5ESRF9n0XS002ib6dHug"
										token={this.onToken}
										description="ListMonkey Platinum Plan"
										amount={2000}
										label="Choose Platinum"
										currency="USD"
										name="ListMonkey"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
