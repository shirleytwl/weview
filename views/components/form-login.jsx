var React = require('react');

class LoginForm extends React.Component {
	render() {
		return (
			<React.Fragment>
				<form id="form-login">
					<div className="row">
						<div className="center-align">
							<h4>Login</h4>
						</div>
						<div className="input-field col s12">
							<input type="text" className="form-username validate"/>
								<label htmlFor="email">Username</label>
						</div>
						<div className="input-field col s12">
							<input type="password" className="form-password validate"/>
								<label htmlFor="password">Password</label>
						</div>
						<div className="center-align">
							<button className="waves-effect waves-light btn btn-submit">Login</button>
							<a href="/register">Don't have an account? Let's create one!</a>
						</div>
					</div>
				</form>
				<script src="/js/project/form-login.js"/>
			</React.Fragment>
		);
	}
}

module.exports = LoginForm;