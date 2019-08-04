var React = require("react");
var DefaultLayout = require("./layouts/default");
var ChannelCard = require("./components/channel-card");
var ChannelModal = require("./modal-channel");

class Home extends React.Component {
	render() {
		let channels =this.props.category.channels.map((channel,index) => {
			return (<ChannelCard channel={channel}/>);
		});
		return (
			<React.Fragment>
				<DefaultLayout username={this.props.username}>
					<div className="section">
						<div className="row">
							<div className="col s12">
								<ChannelModal/>
							</div>
							<div className="col s12">
								<div className="row">
									<div className="col s9">
										<h4 id="category-title" className="title" data-category={this.props.category.id}>{this.props.category.name} </h4>
									</div>
									<div className="col s3">
										<label>Sort by</label>
										<select id="sortby" name="sortby" className="browser-default">
											<option className="htl" value="htl">Rating (high to low)</option>
											<option className="lth" value="lth">Rating (low to high)</option>
											<option className="a-z" value="a-z">Name (ascending)</option>
											<option className="z-a" value="z-a">Name (descending)</option>
											<option className="reviews" value="reviews">Number of reviews</option>
										</select>
									</div>
								</div>
								<div className="row">
									<div className="col s12">
										<div className="row">
											{channels}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</DefaultLayout>
				<script src="/js/project/categories.js"/>
			</React.Fragment>
		);
	}
}

module.exports = Home;
