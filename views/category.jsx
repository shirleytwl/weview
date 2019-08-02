var React = require("react");
var DefaultLayout = require("./layouts/default");
var ChannelCard = require("./components/channel-card");
var ReviewModal = require("./modal-review");

class Home extends React.Component {
	render() {
		let channels =this.props.category.channels.map((channel,index) => {
			return (<ChannelCard channel={channel}/>)
		});
		return (
			<DefaultLayout username={this.props.username}>
				<div className="section">
					<div className="row">
						<div className="col s12">
							<ReviewModal/>
						</div>
						<div className="col s12">
							<div className="row">
								<div className="col s12 ">
									<h4>{this.props.category.name} </h4>
								</div>
								<div className="col s12">
									<div className="row">
										{channels}
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
