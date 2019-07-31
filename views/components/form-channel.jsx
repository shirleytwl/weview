var React = require('react');

class ChannelForm extends React.Component {
	render() {
		return (
			<React.Fragment>
				<ul className="stepper linear horizontal" id="horizontal">
					<li className="step">
						<div className="step-title waves-effect waves-dark">Retrieve Channel</div>
						<div className="step-content">
							<div className="row">
								<div className="input-field col s12">
									<input id="channel_id" name="channel_id" type="text" className="form-channel validate" required/>
									<label htmlFor="channel_id">Channel URL</label>
								</div>
							</div>
							<div className="step-actions">
								<button className="waves-effect waves-dark btn blue next-step" data-feedback="checkChannel">Next</button>
							</div>
						</div>
					</li>
					<li className="step">
						<div className="step-title waves-effect waves-dark" data-feedback="checkChannel">Step 22</div>
						<div className="step-content">
							<div className="row">
								<div className="input-field col s12">
									<input id="horizontal_password" name="horizontal_password" type="password"
									       className="validate" required/>
										<label htmlFor="horizontal_password">Your password</label>
								</div>
							</div>
							<div className="step-actions">
								<button className="waves-effect waves-dark btn blue next-step"
								        data-feedback="someFunction">CONTINUE
								</button>
								<button className="waves-effect waves-dark btn-flat previous-step">BACK</button>
							</div>
						</div>
					</li>
					<li className="step">
						<div className="step-title waves-effect waves-dark">Step 3</div>
						<div className="step-content">
							Finish!
							<div className="step-actions">
								<button className="waves-effect waves-dark btn blue" type="submit">SUBMIT</button>
							</div>
						</div>
					</li>
				</ul>
				<script src="/js/form-channel.js"/>
			</React.Fragment>
		);
	}
}

module.exports = ChannelForm;