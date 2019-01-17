import React from "react";
import {
	Button,
	Form,
	Grid,
	Header,
	Segment,
	Message
} from "semantic-ui-react";
import PropTypes from "prop-types";
import InlineError from "../commons/InlineError";

class LoginForm extends React.Component {
	state = {
		data: {
			email: "",
			password: ""
		},
		loading: false,
		errors: {}
	};

	onChange = e =>
		this.setState({
			data: { ...this.state.data, [e.target.name]: e.target.value }
		});

	onSubmit = () => {
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			this.props.submit(this.state.data).catch(err => {
				this.setState({
					errors: { global: err.response.data.error },
					loading: false
				});
			});
		}
	};

	validate = data => {
		const errors = {};
		if (!data.email) errors.email = "Can't be blank";
		if (!data.password) errors.password = "Can't be blank";
		return errors;
	};

	render() {
		const { data, errors, loading } = this.state;
		return (
			<div className="login-form">
				<style>{`
	      body > div,
	      body > div > div,
	      body > div > div > div.login-form {
	        height: 100%;
	        padding: 4px;
	      }
	    `}</style>
				<Grid
					verticalAlign="middle"
					textAlign="center"
					style={{ height: "100%" }}
				>
					<Grid.Column style={{ maxWidth: 450 }}>
						<Header as="h2" color="teal" textAlign="center">
							Log-in to your account
						</Header>
						<Form
							size="large"
							onSubmit={this.onSubmit}
							loading={loading}
						>
							{errors.global && (
								<Message negative>
									<Message.Header>
										Something went wrong
									</Message.Header>
									<p>{errors.global}</p>
								</Message>
							)}
							<Segment stacked>
								<Form.Input
									fluid
									icon="user"
									iconPosition="left"
									placeholder="E-mail address or username"
									id="email"
									name="email"
									type="text"
									value={data.email}
									onChange={this.onChange}
									error={!!errors.email}
								/>
								{errors.email && (
									<InlineError text={errors.email} />
								)}
								<Form.Input
									fluid
									icon="lock"
									iconPosition="left"
									placeholder="Password"
									id="password"
									name="password"
									type="password"
									value={data.password}
									onChange={this.onChange}
									error={!!errors.password}
								/>
								{errors.password && (
									<InlineError text={errors.password} />
								)}
								<Button color="teal" fluid size="large">
									Login
								</Button>
							</Segment>
						</Form>
					</Grid.Column>
				</Grid>
			</div>
		);
	}
}

LoginForm.propTypes = {
	submit: PropTypes.func.isRequired
};

export default LoginForm;
