var React = require("react");
var DefaultLayout = require("./layouts/default");

class Home extends React.Component {
	render() {
		let user = this.props.data.user;
		let reviews = user.reviews.map((review)=>{
			let link = '/channels/'+review.youtube_id;
			if (review.edited) {
				review.date_created += " (edited)";
			}
			return (
				<div className="col s12">
					<div className="card review-card">
						<div className="card-content">
							<div className="row">
								<div className="col s2">
									<img src={review.thumbnail_url}
									     className="responsive-img"/>
									<a href={link}><p className="center-align">{review.name}</p></a>
								</div>
								<div className="col s8">
									<p>{review.content}</p>
									<p>{review.date_created}</p>
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
			reviewTitle = `Review posted (${reviews.length})`;
		}
		else {
			reviewTitle = `Reviews posted (${reviews.length})`;
		}
		return (
			<DefaultLayout username={this.props.data.username}>
				<div className="section">
					<div className="col s12">
						<div className="card horizontal">
							<div className="card-stacked">
								<div className="card-content">
									<span className="card-title">{user.username}</span>
									<p>Date Joined: {user.date_joined}</p>
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
