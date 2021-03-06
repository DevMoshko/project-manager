import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProjects } from './../redux/actions/projectActions';

import ProjectItem from "./Project/ProjectItem";
import CreateProjectButton from "./Project/CreateProjectButton";

class Dashboard extends Component {

	componentDidMount() {
		this.props.getProjects();
	}

	render() {
		const { projects } = this.props.projectStore;

		return (
			<div className="projects">
				<div className="container">
					<div className="row">
						<div className="col-md-11 mx-auto">
							<h1 className="display-4 text-center">Projects</h1>
							<br />
							<CreateProjectButton/>
							<br />
							<hr/>
							{ 
								projects.map(project => (
									<ProjectItem key={project.id} project={project}/>
								)
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
    projectStore: PropTypes.object.isRequired,
    getProjects: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    projectStore: state.projectStore
});

export default connect(mapStateToProps, { getProjects })(Dashboard);
