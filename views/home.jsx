var React = require("react");
var DefaultLayout = require("./layouts/default");
var ReviewModal = require("./modal-review");

class Home extends React.Component {
	render() {
		return (
			<DefaultLayout username={this.props.username}>
				<div className="section">
					<div className="row">
						<div className="col s12 m4">
							<ReviewModal/>
						</div>
						<div className="col s12 m8">
							<p>placeholder text</p>
						</div>
					</div>
				</div>
			</DefaultLayout>
		);
	}
}

module.exports = Home;