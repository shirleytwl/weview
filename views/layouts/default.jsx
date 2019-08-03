var React = require('react');

class DefaultLayout extends React.Component {
	render() {
		let userNavItems = "";

		if (this.props.username) {
			let profileLink = "/users/"+this.props.username;
			userNavItems = (
				<React.Fragment>
					<li className="nav-item">
						<a className="nav-link" href={profileLink}>{this.props.username}!</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/logout">Log out</a>
					</li>
				</React.Fragment>
			);
		}
		else {
			userNavItems = (
				<React.Fragment>
					<li><a href="/login">Login</a></li>
					<li><a href="/register">Register</a></li>
				</React.Fragment>
			);
		}
		return (
			<html>
			<head>
				<title>WeView</title>
				<meta charSet="utf-8" name="viewport" content="width=device-width, initial-scale=1"/>
				<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
				<link rel="stylesheet" type="text/css" href="/css/materialize.min.css"/>
				<link rel="stylesheet" type="text/css" href="/css/mstepper.min.css"/>
				<link rel="stylesheet" type="text/css" href="/css/project/style.css"/>
			</head>
			<body className="grey lighten-2">
				<div className="navbar-fixed">
					<nav className="grey darken-4" role="navigation">
						<div className="nav-wrapper container">
							<a id="logo-container " href="/" className="brand-logo">
								<img src="https://www.shareicon.net/data/256x256/2016/07/09/118682_video_512x512.png" width="30" height="30"
								     className="weview-logo" alt=""/>
								<span>WeView</span>
							</a>
							<ul className="right hide-on-med-and-down">
								<li><a href="/">Home</a></li>
								{userNavItems}
							</ul>

							<ul id="nav-mobile" className="sidenav">
								<li><a href="/">Home</a></li>
								{userNavItems}
							</ul>
							<a href="#" data-target="nav-mobile" className="sidenav-trigger right"><i
								className="material-icons">menu</i></a>
						</div>
					</nav>
				</div>
				<div className="container content ">
					{this.props.children}
				</div>
				<script src="/js/jquery.min.js"/>
				<script src="/js/materialize.min.js"/>
				<script src="/js/mstepper.min.js"/>
				<script src="/js/project/script.js"/>
			</body>
			</html>
		);
	}
}

module.exports = DefaultLayout;