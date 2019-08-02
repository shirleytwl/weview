var React = require('react');

class ChannelCard extends React.Component {
	render() {
		let link = "/channels/"+this.props.channel.youtube_id;
		return (
			<div className="col s3 channel-card">
				<a href={link}>
					<div className="card">
						<div className="card-image">
							<img src={this.props.channel.thumbnail_url}/>
						</div>
						<div className="card-content">
							<p>{this.props.channel.name}</p>
						</div>
					</div>
				</a>
			</div>
		);
	}
}

module.exports = ChannelCard;