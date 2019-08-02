var React = require("react");
var DefaultLayout = require("./layouts/default");

class Home extends React.Component {
	render() {
		let user = this.props.data.user;
		let reviews = user.reviews.map((review)=>{
			console.log(review);
			let link = '/channels/'+review.youtube_id;
			return (
				<div className="col s12">
					<div className="card">
						<div className="card-content">
							<a href={link}><span className="card-title">{review.name}</span></a>
							<p>{review.content}</p>
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
