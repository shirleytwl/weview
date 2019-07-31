var React = require("react");
var DefaultLayout = require("./layouts/default");
var LoginForm = require("./components/form-login");
var RegisterForm = require("./components/form-register");

class Home extends React.Component {
	render() {
		return (
			<DefaultLayout>
				<div className="row">
					<div className="col-4 offset-4">
						<ul className="nav nav-tabs nav-fill" id="login-register" role="tablist">
							<li className="nav-item">
								<a className="nav-link active" id="home-tab" data-toggle="tab" href="#login"
								   role="tab" aria-controls="home" aria-selected="true">Login</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" id="profile-tab" data-toggle="tab" href="#register"
								   role="tab" aria-controls="profile" aria-selected="false">Register</a>
							</li>
						</ul>
						<div className="tab-content" id="login-register-content">
							<div className="tab-pane fade show active" id="login" role="tabpanel"
							     aria-labelledby="home-tab">
								<LoginForm/>
							</div>
							<div className="tab-pane fade" id="register" role="tabpanel"
							     aria-labelledby="home-tab">
								<RegisterForm/>
							</div>
						</div>
					</div>
				</div>
			</DefaultLayout>
		);
	}
}

module.exports = Home;
