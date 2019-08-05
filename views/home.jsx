var React = require("react");
var DefaultLayout = require("./layouts/default");
var ChannelModal = require("./modal-channel");
var Category = require("./components/category");

class Home extends React.Component {
	render() {
		let categories = "No channel reviews";
		let sideNav = "No channel reviews";
		if (this.props.categories) {
			categories = this.props.categories.map((category) => {
				if (category.channels) {
					return (<Category category={category}/>)
				}
				else {
					return;
				}
			});
			sideNav = this.props.categories.map((category) => {
				if (category.channels) {
					let link = "#"+category.id;
					return (<a href={link}>{category.name.split("_").join(" ")}</a>)
				}
				else {
					return;
				}
			});
		}

		return (
			<DefaultLayout username={this.props.username}>
				<div className="section">
					<div className="row">
						<div className="col s2 side-nav">
							<ChannelModal username={this.props.username}/>
							<div class="card sidenav-items hide-on-small-only">
								<div class="card-content">
									{sideNav}
								</div>
							</div>
						</div>
						<div className="col m9 offset-m3">
							{categories}
						</div>
					</div>
				</div>
			</DefaultLayout>
		);
	}
}

module.exports = Home;