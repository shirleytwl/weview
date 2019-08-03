var React = require('react');
var ChannelCard = require("./channel-card");

class Category extends React.Component {
	render() {
		let category = this.props.category.name.split("_").join(" ");
		let channels =this.props.category.channels.map((channel,index) => {
			if (channel) {
				if (channel.numreviews != '0') {
					return (<ChannelCard channel={channel}/>)
				}
				else { return;}
			}
			else { return; }
		});
		let link = "/categories/"+this.props.category.id;
		return (
			<div className="row">
				<div className="col s12 ">
					<a href={link} className="home-category-title">
						<h4>{category} </h4>
						<div>
							<p>View All <i className="material-icons">keyboard_arrow_right</i></p>
						</div>
					</a>
				</div>
				<div className="col s12">
					<div className="row">
						{channels}
					</div>
				</div>
			</div>
		);
	}
}

module.exports = Category;