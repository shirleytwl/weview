var React = require('react');

class ChannelForm extends React.Component {
	render() {
		return (
			<React.Fragment>
				<ul className="stepper linear horizontal" id="add-review-form">
					<li className="step">
						<div className="step-title waves-effect waves-dark">Write Review</div>
						<div className="step-content step-1">
							<div className="row">
								<div className="col s2">
									<img className="responsive-img channel-thumbnail"/>
								</div>
								<div className="col s10">
									<h5 className="channel-name"></h5>
									<div className="channel-categories"></div>
								</div>
							</div>
							<div className="row valign-wrapper">
								<div className="col s2">
									<p className="rating-score" htmlFor="channel_rating">Rating <span className="teal-text">0/5</span></p>

								</div>
								<div className="col s10">
									<p className="range-field">
										<input name="channel_rating" type="range" id="channel_rating" min="0" max="5" value="0"/>
									</p>
								</div>
							</div>
							<div className="row">
								<div className="input-field col s12">
									<textarea id="channel_review" name="channel_review" className="materialize-textarea validate" required></textarea>
									<label id="channel_review_label" htmlFor="channel_review">Write your review here</label>
								</div>
							</div>
							<div className="step-actions">
								<button className="waves-effect waves-dark btn next-step" data-feedback="reviewOverview">Next</button>
							</div>
						</div>
					</li>
					<li className="step">
						<div className="step-title waves-effect waves-dark">Confirm Review</div>
						<div className="step-content step-2">
							<div className="row">
								<div className="col s2">
									<img className="responsive-img channel-thumbnail"/>
								</div>
								<div className="col s10">
									<h5 className="channel-name"></h5>
									<div className="channel-categories"></div>
								</div>
							</div>
							<div className="row valign-wrapper">
								<div className="col s2">
									<p className="overview-score" htmlFor="channel_rating">Rating <span className="teal-text">0/5</span></p>

								</div>
								<div className="col s10">
									<p className="range-field">
										<input name="channel_rating" type="range" id="overview_rating" min="0" max="5" disabled/>
									</p>
								</div>
							</div>
							<div className="row">
								<div className="input-field col s12">
									<textarea id="overview_review" name="overview_review" className="materialize-textarea validate" disabled></textarea>
									<label id="overview_review_label" htmlFor="overview_review">Review</label>
								</div>
							</div>
							<div className="step-actions">
								<button className="btn-submit waves-effect waves-dark btn">Confirm &amp; Submit</button>
								<button className="waves-effect waves-dark btn-flat previous-step">BACK</button>
							</div>
						</div>
					</li>
				</ul>
				<script src="/js/project/form-review.js"/>
			</React.Fragment>
		);
	}
}

module.exports = ChannelForm;