import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Job from '../components/job/Job';
import StaticProfile from '../components/profile/StaticProfile';
import Grid from '@material-ui/core/Grid';

import JobSkeleton from '../util/JobSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class user extends Component {
  state = {
    profile: null,
    jobIdParam: null
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const jobId = this.props.match.params.jobId;

    if (jobId) this.setState({ jobIdParam: jobId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { jobs, loading } = this.props.data;
    const { jobIdParam } = this.state;

    const jobsMarkup = loading ? (
      <JobSkeleton />
    ) : jobs === null ? (
      <p>No jobs from this user</p>
    ) : !jobIdParam ? (
      jobs.map((job) => <Job key={job.jobId} job={job} />)
    ) : (
      jobs.map((job) => {
        if (job.jobId !== jobIdParam)
          return <Job key={job.jobId} job={job} />;
        else return <Job key={job.jobId} job={job} openDialog />;
      })
    );

    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {jobsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getUserData }
)(user);
