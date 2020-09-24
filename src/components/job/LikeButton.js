import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// REdux
import { connect } from 'react-redux';
import { likeJob, unlikeJob } from '../../redux/actions/dataActions';

export class LikeButton extends Component {
  likedJob = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.jobId === this.props.jobId
      )
    )
      return true;
    else return false;
  };
  likeJob = () => {
    this.props.likeJob(this.props.jobId);
  };
  unlikeJob = () => {
    this.props.unlikeJob(this.props.jobId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedJob() ? (
      <MyButton tip="Undo like" onClick={this.unlikeJob}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeJob}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  jobId: PropTypes.string.isRequired,
  likeJob: PropTypes.func.isRequired,
  unlikeJob: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
  likeJob,
  unlikeJob
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LikeButton);
