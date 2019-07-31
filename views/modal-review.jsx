var React = require('react');
var ChannelForm = require("./components/form-channel");

class ChannelModal extends React.Component {
	render() {
		return (
			<React.Fragment>
				<a className="waves-effect waves-light btn modal-trigger" href="#review-modal">Create channel review</a>
				<div id="review-modal" className="modal">
					<div className="modal-content">
						<h4>Create channel review</h4>
						<ChannelForm/>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

module.exports = ChannelModal;