var React = require('react');

class ProfileForm extends React.Component {
	render() {
		return (
			<React.Fragment>
				<form id="form-profile">
					<div className="row">
						<div className="input-field col s12">
							<input type="text" className="form-username validate" disabled/>
							<label className="username-label" htmlFor="form-username">Username</label>
						</div>
						<div className="input-field col s12 m6">
							<input type="password" className="form-password-old validate"/>
							<label className="password-old-label" htmlFor="password-old">Old Password</label>
						</div>
						<div className="input-field col s12 m6">
							<input type="password" className="form-password-new validate" disabled/>
							<label className="password-new-label" htmlFor="password-new">New Password</label>
						</div>
					</div>
					<div className="row">
						<div className="file-field input-field col s8 m10">
							<div className="btn">
								<span>Upload New Profile Image</span>
								<input className="form-profile-image" name="profile-image" type="file"/>
							</div>
							<div className="file-path-wrapper">
								<input className="file-path validate" type="text"/>
							</div>
							<div>
								<p className="grey-text darken-4">Size limit: 10 MB</p>
							</div>
						</div>
						<div className="col s4 m2">
							<img className="responsive-img form-image-preview" src=""/>
						</div>
					</div>
					<div className="row">
						<div className="col s12 center-align">
							<button className="waves-effect waves-light btn btn-submit" disabled>Update Profile</button>
							<a className="waves-effect waves-light btn modal-trigger btn-prof-delete red darken-2" href="#confirm-delete-modal">Delete Account</a>
						</div>
					</div>
				</form>
				<div id="confirm-delete-modal" className="modal">
					<div className="modal-content center-align">
						<h6>Please type your password to <strong>delete</strong> your account</h6>
						<div className="input-field col s6">
							<input type="password" className="form-password-del validate"/>
							<label htmlFor="password-del">Password</label>
						</div>
						<button className="waves-effect waves-light btn btn-confirm-delete red darken-2">Delete Account</button>
					</div>
				</div>
				<script src="/js/project/form-profile.js"/>
			</React.Fragment>
		);
	}
}

module.exports = ProfileForm;