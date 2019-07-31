var React = require('react');

class DefaultLayout extends React.Component {
	render() {
		return (
			<html>
			<head>
				<title>WeView</title>
				<meta charSet="utf-8" name="viewport" content="width=device-width, initial-scale=1"/>
				<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"/>
				<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossOrigin="anonymous"/>
				<link rel="stylesheet" type="text/css" href="/css/style.css"/>
			</head>
			<body>
			<nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark justify-content-center">
				<a className="navbar-brand" href="/">
					<img src="https://www.shareicon.net/data/256x256/2016/07/09/118682_video_512x512.png" width="30" height="30"
					     className="d-inline-block align-top mr-3" alt=""/>
					WeView
				</a>
			</nav>
			<div className="container-fluid my-5">
				{this.props.children}
			</div>
			<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"  crossOrigin="anonymous"/>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossOrigin="anonymous"/>
			<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossOrigin="anonymous"/>
			<script src="/js/script.js"/>
			</body>
			</html>
		);
	}
}

module.exports = DefaultLayout;