var React = require("react");
var DefaultLayout = require("./layouts/default");

class Home extends React.Component {
	render() {
		let channel = this.props.data.channel;
		let categories = channel.categories.map((category)=>{
			let link = "/categories/"+category.id;
			return (<a className="btn btn-small btn-categories" href={link}>{category.name}</a>);
		});
		return (
			<DefaultLayout username={this.props.data.username}>
				<div className="section">
					<div className="col s12">
						<div className="card horizontal">
							<div className="card-image">
								<img src={channel.thumbnail_url}/>
							</div>
							<div className="card-stacked">
								<div className="card-content">
									<span className="card-title">{channel.name}</span>
									{categories}
								</div>
								<div className="card-action right-align">
									<a href={channel.link} target="_blank" className="materialize-red-text">Visit Channel in YouTube</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="section">
					<div className="col s12">
						<h5>Reviews</h5>
					</div>
				</div>
			</DefaultLayout>
		);
	}
}

module.exports = Home;
