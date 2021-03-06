var React = require('react');

class ChannelForm extends React.Component {
	render() {
		let channel = this.props.channel;
		return (
			<React.Fragment>
				<ul className="stepper linear horizontal" id="review-delete-form">
					<li className="step">
						<div className="step-title waves-effect waves-dark">Edit Review</div>
						<div className="step-content step-1">
							<div className="row">
								<div className="col s6 m2">
									<img className="responsive-img channel-thumbnail"/>
								</div>
								<div className="col s12 m10">
									<h5 className="channel-name"></h5>
									<div className="channel-categories"></div>
								</div>
							</div>
							<div className="row valign-wrapper">
								<div className="col s4 m2">
									<p className="rating-score" htmlFor="channel_rating">Rating <span className="teal-text">0/5</span></p>

								</div>
								<div className="col s12 m10">
									<p className="range-field">
										<input name="channel_rating" type="range" className="channel_rating" min="0" max="5" value="0" disabled/>
									</p>
								</div>
							</div>
							<div className="row">
								<div className="input-field col s12">
									<textarea name="channel_review" className="channel_review materialize-textarea validate" disabled></textarea>
									<label className="channel_review_label" htmlFor="channel_review">Write your review here</label>
								</div>
							</div>
							<div className="step-actions">
								<button className="btn-submit waves-effect waves-dark btn">Confirm Delete</button>
							</div>
						</div>
					</li>
				</ul>
				<script src="/js/project/form-review-delete.js"/>
			</React.Fragment>
		);
	}
}

module.exports = ChannelForm;