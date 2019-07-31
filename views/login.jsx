var React = require("react");
var DefaultLayout = require("./layouts/default");
var LoginForm = require("./components/form-login");

class Home extends React.Component {
	render() {
		return (
			<DefaultLayout>
				<div className="section">
					<div className="row">
						<div className="col s12 m4 offset-m4">
							<LoginForm/>
						</div>
					</div>
				</div>
			</DefaultLayout>
		);
	}
}

module.exports = Home;
