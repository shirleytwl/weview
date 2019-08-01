var React = require('react');

class ChannelCard extends React.Component {
	render() {
		return (
			<div className="col s3">
				<div className="card">
					<div className="card-image">
						<img src={this.props.channel.thumbnail_url}/>
					</div>
					<div className="card-content">
						<p>{this.props.channel.name}</p>
					</div>
					<div className="card-action">
						<a href="#">This is a link</a>
					</div>
				</div>
			</div>
		);
	}
}

module.exports = ChannelCard;