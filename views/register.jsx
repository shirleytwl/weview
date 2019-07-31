var React = require("react");
var DefaultLayout = require("./layouts/default");
var RegisterForm = require("./components/form-register");

class Home extends React.Component {
	render() {
		return (
			<DefaultLayout>
				<div className="row">
					<div className="col-4 offset-4">
						<RegisterForm/>
					</div>
				</div>
			</DefaultLayout>
		);
	}
}

module.exports = Home;
