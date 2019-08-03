var React = require("react");
var DefaultLayout = require("./layouts/default");
var ChannelModal = require("./modal-channel");
var Category = require("./components/category");

class Home extends React.Component {
	render() {
		let categories = "No channel reviews";
		if (this.props.categories) {
			categories = this.props.categories.map((category) => {
				if (category.channels) {
					return (<Category category={category}/>)
				}
				else {
					return;
				}
			});
		}
		return (
			<DefaultLayout username={this.props.username}>
				<div className="section">
					<div className="row">
						<div className="col s12">
							<ChannelModal username={this.props.username}/>
						</div>
						<div className="col s12">
							{categories}
						</div>
					</div>
				</div>
			</DefaultLayout>
		);
	}
}

module.exports = Home;