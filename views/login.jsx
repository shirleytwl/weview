var React = require("react");
var DefaultLayout = require("./layouts/default");
var LoginForm = require("./components/form-login");

class Home extends React.Component {
	render() {
		return (
			<DefaultLayout>
				<div class="wrapper">
					<div className="section">
						<div className="row">
							<div className="col s12 m6 offset-m3">
								<div className="form-card card">
									<div className="card-content">
										<LoginForm/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</DefaultLayout>
		);
	}
}

module.exports = Home;
