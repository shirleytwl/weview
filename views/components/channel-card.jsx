var React = require('react');

class ChannelCard extends React.Component {
	render() {
		let channel = this.props.channel;
		let link = "/channels/"+channel.youtube_id;
		return (
			<div className="col s12 m4 channel-card">
				<a href={link}>
					<div className="card">
						<div className="card-image">
							<img src={channel.thumbnail_url}/>
						</div>
						<div className="card-content">
							<h6>{channel.name}</h6>
							<p>{channel.rating}/5 ({channel.numreviews} reviews)</p>
						</div>
					</div>
				</a>
			</div>

		);
	}
}

module.exports = ChannelCard;