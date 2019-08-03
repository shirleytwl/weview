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
			if (review.edited) {
				review.date_created += " (edited)";
			}
			return (
				<div className="col s12">
					<div className="card review-card">
						<div className="card-content">
							<div className="row">
								<div className="col s2">
									<a href={link}><span className="card-title">{review.username}</span></a>
									<p>Posted on {review.date_created}</p>
								</div>
								<div className="col s8">
									<p>{review.content}</p>
								</div>
								<div className="col s2">
									<h5 className="review-rating"><span className="score">{review.rating}</span><span className="slash">╱</span><span className="total-score">5</span></h5>
								</div>
							</div>
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
						<div className="channel-overview card horizontal">
							<div className="card-image">
								<img src={channel.thumbnail_url}/>
							</div>
							<div className="card-stacked">
								<div className="card-content">
									<div className="row">
										<div className="col s10">
											<span className="card-title">{channel.name}</span>
											{categories}
										</div>
										<div className="col s2">
											<h4 className="review-rating"><span className="score">{channel.rating}</span><span className="slash">╱</span><span className="total-score">5</span></h4>
										</div>
									</div>
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
						<h4>{reviewTitle}</h4>
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
