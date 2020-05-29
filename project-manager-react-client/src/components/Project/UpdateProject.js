import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProject, createOrUpdateProject } from './../../redux/actions/projectActions';

import classnames from 'classnames';

class UpdateProject extends Component {

    constructor() {
        super();

        this.state = {
            id: "", 
            name: "",
            code: "",
            description: "",
            start_date: "",
            end_date: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const { code } = this.props.match.params;
        this.props.getProject(code, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        const { id, name, code, description, start_date, end_date } = nextProps.project;
        this.setState({ id, name, code, description, start_date, end_date });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const updatedProject = this.state;
        this.props.createOrUpdateProject(updatedProject, this.props.history);
    }

    render() {

        const { project } = this.props;
        const { id, name, code, description, start_date, end_date } = this.state;

        return (
            <div className="project">
                <div className="container">
                    <div className="row">
                        <div className="col-10 col-md-8 m-auto">

                            <h5 className="display-4 text-center">Edit Project</h5>
                            <hr />

                            <form onSubmit={this.onSubmit}>
                                <div className="form-row">

                                    <input type="hidden" name="id" value={id} />

                                    <div className="form-group col-md-12">
                                        <label for="name">Project Name</label>
                                        <input type="text" id="name" name="name" className="form-control form-control-md "
                                            value={name} onChange={this.onChange} />
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label for="code">Project Code</label>
                                        <input type="text" id="code" name="code" className="form-control form-control-md" disabled
                                            value={code} onChange={this.onChange} />
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label for="description">Project Description</label>
                                        <textarea name="description" id="description" className="form-control form-control-md" 
                                            value={description} onChange={this.onChange} />
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label for="start_date">Start Date</label>
                                        <input type="date" id="start_date" name="start_date" className="form-control form-control-md"
                                            value={start_date} onChange={this.onChange} />
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label for="end_date">Estimated End Date</label>
                                        <input type="date" id="end_date" name="end_date" className="form-control form-control-md"
                                            value={end_date} onChange={this.onChange} />
                                    </div>

                                    <input type="submit" className="btn btn-primary btn-block mt-4" />
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

UpdateProject.propTypes = {
    project: PropTypes.object.isRequired,
    getProject: PropTypes.func.isRequired,
    createOrUpdateProject: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    project: state.projectReducer.currentProject
});

export default connect(mapStateToProps, { getProject, createOrUpdateProject })(UpdateProject);