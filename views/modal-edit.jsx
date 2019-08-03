var React = require('react');
//var EditForm = require("./components/form-edit");

class ChannelModal extends React.Component {
	render() {
		return (
			<React.Fragment>
				<div id="edit-modal" className="modal">
					<div className="modal-content">
						<h4>Edit channel review</h4>
						/*<EditForm/>*/
					</div>
				</div>
			</React.Fragment>
		);
	}
}

module.exports = ChannelModal;