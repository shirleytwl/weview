var React = require("react");
var DefaultLayout = require("./layouts/default");
var ReviewModal = require("./modal-review");
var Category = require("./components/category");

class Home extends React.Component {
	render() {
		let categories =this.props.categories.map((category,index) => {
			return (<Category category={category}/>)
		});
		return (
			<DefaultLayout username={this.props.username}>
				<div className="section">
					<div className="row">
						<div className="col s12 m4">
							<ReviewModal/>
						</div>
						<div className="col s12 m8">
							{categories}
						</div>
					</div>
				</div>
			</DefaultLayout>
		);
	}
}

module.exports = Home;