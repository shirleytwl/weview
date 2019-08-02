var React = require("react");
var DefaultLayout = require("./layouts/default");

class Home extends React.Component {
	render() {
		let channel = this.props.data.channel;
		let categories = channel.categories.map((category)=>{
			let link = "/categories/"+category.id;
			return (<a className="btn btn-small btn-categories" href={link}>{category.name}</a>);
		});
		let reviews = channel.reviews.map((review)=>{
			let link = '/users/'+review.username;
			return (
				<div className="col s12">
					<div className="card">
						<div className="card-content">
							<a href={link}><span className="card-title">{review.username}</span></a>
							<p>{review.content}</p>
						</div>
					</div>
				</div>
			)
		});
		let reviewTitle = "";
		if (reviews.length <= 1) {
			reviewTitle = `Review (${reviews.length})`;
		}
		else {
			reviewTitle = `Reviews (${reviews.length})`;
		}
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
						<h5>{reviewTitle}</h5>
						<div className="row">
							{reviews}
						</div>
					</div>
				</div>
			</DefaultLayout>
		);
	}
}

module.exports = Home;
