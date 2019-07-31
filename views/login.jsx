var React = require("react");
var DefaultLayout = require("./layouts/default");
var LoginForm = require("./components/form-login");

class Home extends React.Component {
	render() {
		return (
			<DefaultLayout>
				<div className="row">
					<div className="col-4 offset-4">
						<LoginForm/>
					</div>
				</div>
			</DefaultLayout>
		);
	}
}

module.exports = Home;
