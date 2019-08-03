var React = require('react');
var ChannelForm = require("./components/form-channel");

class ChannelModal extends React.Component {
	render() {
		let button = <a className="waves-effect waves-light btn modal-trigger" href="#review-modal">Create channel review</a>
		if (!this.props.username) {
			button = <a className="waves-effect btn waves-light" href="/login">Login to create review</a>
		}
		return (
			<React.Fragment>
				{button}
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