import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class LandingPage extends Component {

    componentDidMount() {
        if(this.props.isAuthenticated)
            this.props.history.push("/dashboard");
    }

    render() {
        return (
            <div className="landing">
                <div className="light-overlay landing-inner text-dark">

                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">

                                <h1 className="display-3 mb-4">Project Management Tool</h1>
                                <p className="lead">
                                    Create your account to join active projects or start you own
                                </p>
                                <hr />
                                
                                <Link to="/register" className="btn btn-lg btn-primary mr-2"> Sign Up </Link>
                                <Link to="/login" className="btn btn-lg btn-secondary mr-2"> Login </Link>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
};

LandingPage.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.authStore.isAuthenticated
});

export default connect(mapStateToProps)(LandingPage);
