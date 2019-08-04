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
						<div className="input-field col s6">
							<input type="password" className="form-password-old validate"/>
							<label htmlFor="password-old">Old Password</label>
						</div>
						<div className="input-field col s6">
							<input type="password" className="form-password-new validate" disabled/>
							<label htmlFor="password-new">New Password</label>
						</div>
					</div>
					<div className="row">
						<div className="file-field input-field col s10">
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
						<div className="col s2">
							<img className="responsive-img form-image-preview" src=""/>
						</div>
					</div>
					<div className="row">
						<div className="col s12 center-align">
							<button className="waves-effect waves-light btn btn-submit" disabled>Update Profile</button>
						</div>
					</div>
				</form>
				<script src="/js/project/form-profile.js"/>
			</React.Fragment>
		);
	}
}

module.exports = ProfileForm;