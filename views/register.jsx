var React = require("react");
var DefaultLayout = require("./layouts/default");
var RegisterForm = require("./components/form-register");

class Home extends React.Component {
	render() {
		return (
			<DefaultLayout>
				<div className="section">
					<div className="row">
						<div className="col s12 m6 offset-m3">
							<div className="form-card card">
								<div className="card-content">
									<RegisterForm/>
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
