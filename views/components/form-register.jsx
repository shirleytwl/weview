var React = require('react');

class RegisterForm extends React.Component {
	render() {
		return (
			<React.Fragment>
				<form id="form-register">
					<div className="row">
						<div className="input-field col s12">
							<input type="text" className="form-username validate"/>
							<label htmlFor="email">Username</label>
						</div>
						<div className="input-field col s12">
							<input type="password" className="form-password validate"/>
							<label htmlFor="password">Password</label>
						</div>
						<div className="center-align">
							<button className="waves-effect waves-light btn btn-submit">Register</button>
						</div>
					</div>
				</form>
				<script src="/js/project/form-register.js"/>
			</React.Fragment>
		);
	}
}

module.exports = RegisterForm;