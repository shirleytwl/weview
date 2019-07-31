var React = require('react');

class LoginForm extends React.Component {
	render() {
		return (
			<React.Fragment>
				<form id="form-login">
					<div className="form-group row">
						<div className="col-sm-12">
							<input type="text" name="username" className="form-control form-username" placeholder="Username" autoComplete="username"/>
						</div>
					</div>
					<div className="form-group row">
						<div className="col-sm-12">
							<input type="password" name="password" className="form-control form-password" placeholder="Password" autoComplete="current-password"
							/>
						</div>
					</div>
					<div className="buttons text-center">
						<button type="submit" className="btn btn-lg btn-primary btn-submit">Login</button>
					</div>
				</form>
				<script src="/js/form-login.js"/>
			</React.Fragment>
		);
	}
}

module.exports = LoginForm;