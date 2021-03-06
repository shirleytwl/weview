var React = require("react");
var DefaultLayout = require("./layouts/default");
var EditForm = require("./components/form-review-edit");
var DeleteForm = require("./components/form-review-delete");
var ProfileForm = require("./components/form-profile");

class Home extends React.Component {
	render() {
		let user = this.props.data.user;
		let profileModal = '';
		let profileButton = '';
		let editModal = '';
		let deleteModal = '';
		let reviews = '';
		if (user.reviews) {
			 reviews = user.reviews.map((review) => {
				let link = '/channels/' + review.youtube_id;
				let userLink = '/users/' + user.username;
				if (review.edited) {
					review.date_created += " (edited)";
				}
				let buttonTools = '';
				if (this.props.data.username) {
					if (user.username.toLowerCase() === this.props.data.username.toLowerCase()) {
						buttonTools = <div className="col s12 m10 right-align">
							<a className="btn-edit waves-effect waves-light btn modal-trigger" href="#edit-modal"
							   data-review={review.id}>
								<i className="material-icons">edit</i>
							</a>
							<a className="btn-delete waves-effect waves-light btn modal-trigger" href="#delete-modal"
							   data-review={review.id}>
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
											<img src={review.thumbnail_url}
											     className="responsive-img"/>
											<p className="center-align">{review.name}</p>
										</a>
									</div>
									<div className="col s5 m8">
										<a href={userLink}><span className="card-title">{user.username}</span></a>
										<p className="hide-on-small-and-down">{review.content}</p>
										<p className="hide-on-med-and-up">Posted on {review.date}</p>
									</div>
									<div className="col s3 m2">
										<h5 className="review-rating"><span
											className="score">{review.rating}</span><span
											className="slash">╱</span><span className="total-score">5</span></h5>
									</div>
								</div>
								<div className="row">
									<div className="col s2">
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
		}
		let reviewTitle = "Review posted (0)";
		if (reviews) {
			if (reviews.length <= 1) {
				reviewTitle = `Review posted (${reviews.length})`;
			} else {
				reviewTitle = `Reviews posted (${reviews.length})`;
			}
		}
		else {
			reviews = <div className="col s12">
				<div className="card review-card">
					<div className="card-content">
						<p>This user has not posted any review.</p>
					</div>
				</div>
			</div>;
		}
		if (this.props.data.username){
			if (user.username.toLowerCase() === this.props.data.username.toLowerCase()) {
				profileModal = <div id="profile-modal" className="modal">
					<div className="modal-content">
						<h4>Edit Profile</h4>
						<ProfileForm/>
					</div>
				</div>;
				profileButton =
					<a className="btn-profile waves-effect waves-light btn modal-trigger" href="#profile-modal">
						<i className="material-icons">edit</i>
					</a>;
			}
		}
		return (
			<React.Fragment>
				<DefaultLayout username={this.props.data.username}>
					<div className="section">
						<div className="col s12">
							<div className="user-card card horizontal" data-user={user.username}>
								<div className="card-stacked">
									<div className="card-content">
										<div className="row">
											<div className="col s6 m2">
												<img className="responsive-img" src={user.image}/>
											</div>
											<div className="col s6 m9 hide-on-small-and-down">
												<span className="card-title">{user.username}</span>
												<p>Date Joined: {user.date_joined}</p>
											</div>
											<div className="col s6 m1 right-align">
												{profileButton}
											</div>
										</div>
										<div className="row hide-on-med-and-up">
											<div className="col s12">
												<span className="card-title">{user.username}</span>
												<p>Date Joined: {user.date_joined}</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="section">
						<div className="col s12">
							<div className="row">
								<div className="col s12 m9">
									<h4 className="review-title">{reviewTitle}</h4>
								</div>
								<div className="col s12 m3">
									<label>Sort by</label>
									<select id="sortby" name="sortby" className="browser-default">
										<option className="desc" value="desc">Latest Reviews</option>
										<option className="asc" value="asc">Earliest Reviews</option>
										<option className="htl" value="htl">Rating (high to low)</option>
										<option className="lth" value="lth">Rating (low to high)</option>
									</select>
								</div>
							</div>
							<div className="row">
								{reviews}
							</div>
						</div>
						{profileModal}
						{editModal}
						{deleteModal}
					</div>
				</DefaultLayout>
				<script src="/js/project/user-review-sorting.js"/>
			</React.Fragment>
		);
	}
}

module.exports = Home;
