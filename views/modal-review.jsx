var React = require('react');
var ReviewForm = require("./components/form-review");

class ReviewModal extends React.Component {
	render() {
		let button = <a className="waves-effect waves-light btn modal-trigger btn-new" href="#review-modal" data-channel={this.props.channel}>Create review</a>
		if (!this.props.username) {
			button = <a className="waves-effect btn waves-light" href="/login">Login to create review</a>
		}
		return (
			<React.Fragment>
				{button}
				<div id="review-modal" className="modal left-align">
					<div className="modal-content">
						<h4>Create channel review</h4>
						<ReviewForm/>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

module.exports = ReviewModal;