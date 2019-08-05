var React = require("react");
var DefaultLayout = require("./layouts/default");
var EditForm = require("./components/form-review-edit");
var DeleteForm = require("./components/form-review-delete");
var ReviewModal = require("./modal-review");

class Home extends React.Component {
	render() {
		let channel = this.props.data.channel;
		let categories = channel.categories.map((category)=>{
			let link = "/categories/"+category.id;
			return (<a className="btn btn-small btn-categories" href={link}>{category.name.split("_").join(" ")}</a>);
		});
		let editModal = '';
		let deleteModal = '';
		let reviews = channel.reviews.map((review)=>{
			let link = '/users/'+review.username;
			if (review.edited) {
				review.date += " (edited)";
			}
			let buttonTools = '';
			if (this.props.data.username) {
				if (review.username.toLowerCase() === this.props.data.username.toLowerCase()) {
					buttonTools = <div className="col s12 m10 right-align">
						<a className="btn-edit waves-effect waves-light btn modal-trigger" href="#edit-modal"
						   data-channel={review.channel_id} data-review={review.review_id}>
							<i className="material-icons">edit</i>
						</a>
						<a className="btn-delete waves-effect waves-light btn modal-trigger" href="#delete-modal"
						   data-channel={review.channel_id} data-review={review.review_id}>
							<i className="material-icons">delete</i>
						</a>
					</div>;
					if (editModal === '') {
						editModal = <div id="edit-modal" className="modal">
							<div className="modal-content">
								<h4>Edit channel review</h4>
								<EditForm/>
							</div>
						</div>
					}
					if (deleteModal === '') {
						deleteModal = <div id="delete-modal" className="modal">
							<div className="modal-content">
								<h4>Delete channel review</h4>
								<DeleteForm/>
							</div>
						</div>
					}
				}
			}
			return (
				<div className="col s12">
					<div className="card review-card">
						<div className="card-content">
							<div className="row">
								<div className="col s4 m2">
									<a href={link}>
										<img src={review.image} className="responsive-img"/>
									</a>
								</div>
								<div className="col s5 m8">
									<a href={link}><span className="card-title">{review.username}</span></a>
									<p className="hide-on-small-and-down">{review.content}</p>
									<p className="hide-on-med-and-up">Posted on {review.date}</p>
								</div>
								<div className="col s3 m2">
									<h5 className="review-rating"><span className="score">{review.rating}</span><span className="slash">╱</span><span className="total-score">5</span></h5>
								</div>
							</div>
							<div className="row">
								<div className="col s12 m2">
									<p className="hide-on-med-and-up">{review.content}</p>
									<p className="hide-on-small-and-down">Posted on {review.date}</p>
								</div>
								{buttonTools}
							</div>
						</div>
					</div>
				</div>
			)
		});
		let reviewTitle = "";
		if (channel.numreviews <= 1) {
			reviewTitle = `Review (${channel.numreviews})`;
		}
		else {
			reviewTitle = `Reviews (${channel.numreviews})`;
		}
		return (
			<React.Fragment>
					<DefaultLayout username={this.props.data.username}>
					<div className="section">
						<div className="col s12">
							<div className="channel-overview card horizontal">
								<div className="card-stacked">
									<div className="card-content">
										<div className="row">
											<div className="col s6 m2">
												<img className="responsive-img" src={channel.thumbnail_url}/>
											</div>
											<div className="col s6 hide-on-med-and-up">
												<h4 className="review-rating"><span className="score">{channel.rating}</span><span className="slash">╱</span><span className="total-score">5</span></h4>
											</div>
											<div className="col s12 m8">
												<span className="card-title">{channel.name}</span>
												{categories}
											</div>
											<div className="col s2 hide-on-small-and-down">
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
						<div className="row">
							<div className="col s12 m6">
								<h4 className="review-title">{reviewTitle}</h4>
							</div>
							<div className="col s6 m3 right-align">
								<ReviewModal username={this.props.data.username} channel={channel.youtube_id}/>
							</div>
							<div className="col s6 m3">
								<div className="review-sorting">
									<label>Sort by</label>
									<select id="sortby" name="sortby" className="browser-default">
										<option className="desc" value="desc">Latest Reviews</option>
										<option className="asc" value="asc">Earliest Reviews</option>
										<option className="htl" value="htl">Rating (high to low)</option>
										<option className="lth" value="lth">Rating (low to high)</option>
									</select>
								</div>
							</div>
						</div>
						<div className="row">
							{reviews}
						</div>
						{editModal}
						{deleteModal}
					</div>
				</DefaultLayout>
				<script src="/js/project/channel-review-sorting.js"/>
			</React.Fragment>
		);
	}
}

module.exports = Home;
