var React = require('react');
var ChannelCard = require("./channel-card");

class Category extends React.Component {
	render() {
		let channels =this.props.category.channels.map((channel,index) => {
			return (<ChannelCard channel={channel}/>)
		});
		return (
			<div className="row">
				<div className="col s12">
					<h5>{this.props.category.name}</h5>
					<div className="row">
						{channels}
					</div>
				</div>
			</div>
		);
	}
}

module.exports = Category;