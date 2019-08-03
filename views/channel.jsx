var React = require("react");
var DefaultLayout = require("./layouts/default");
var EditForm = require("./components/form-review-edit");
var DeleteForm = require("./components/form-review-delete");

class Home extends React.Component {
	render() {
		let channel = this.props.data.channel;
		let categories = channel.categories.map((category)=>{
			let link = "/categories/"+category.id;
			return (<a className="btn btn-small btn-categories" href={link}>{category.name}</a>);
		});
		let editModal = '';
		let deleteModal = '';
		let reviews = channel.reviews.map((review)=>{
			let link = '/users/'+review.username;
			if (review.edited) {
				review.date_created += " (edited)";
			}
			let buttonTools = '';
			if (review.username.toLowerCase() === this.props.data.username.toLowerCase()) {
				buttonTools = <div className="col s10 right-align">
					<a className="btn-edit waves-effect waves-light btn modal-trigger" href="#edit-modal" data-review={review.review_id}>
						<i className="material-icons">edit</i>
					</a>
					<a className="btn-delete waves-effect waves-light btn modal-trigger" href="#delete-modal" data-channel={review.channel_id} data-review={review.review_id}>
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
			return (
				<div className="col s12">
					<div className="card review-card">
						<div className="card-content">
							<div className="row">
								<div className="col s2">
									<a href={link}><span className="card-title">{review.username}</span></a>
								</div>
								<div className="col s8">
									<p>{review.content}</p>
								</div>
								<div className="col s2">
									<h5 className="review-rating"><span className="score">{review.rating}</span><span className="slash">╱</span><span className="total-score">5</span></h5>
								</div>
							</div>
							<div className="row">
								<div className="col s2">
									<p>Posted on {review.date_created}</p>
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
					{editModal}
					{deleteModal}
				</div>
			</DefaultLayout>
		);
	}
}

module.exports = Home;
