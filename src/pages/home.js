import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Job from '../components/job/Job';
import Profile from '../components/profile/Profile';
import JobSkeleton from '../util/JobSkeleton';

import { connect } from 'react-redux';
import { getJobs } from '../redux/actions/dataActions';

class home extends Component {
  componentDidMount() {
    this.props.getJobs();
  }
  render() {
    const { jobs, loading } = this.props.data;
    let recentJobsMarkup = !loading ? (
      jobs.map((job) => <Job key={job.jobId} job={job} />)
    ) : (
      <JobSkeleton />
    );
    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {recentJobsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getJobs: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getJobs }
)(home);
