var React = require("react");
var DefaultLayout = require("./layouts/default");

class Home extends React.Component {
	render() {
		return (
			<DefaultLayout username={this.props.username}>
				<div className="row">
					<div className="col-4 offset-4">
						<p>placeholder</p>
					</div>
				</div>
			</DefaultLayout>
		);
	}
}

module.exports = Home;
