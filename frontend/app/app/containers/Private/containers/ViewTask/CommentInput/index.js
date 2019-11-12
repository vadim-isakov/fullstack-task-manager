import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import CommentInputComponent from './Component';

import { useInjectReducerSaga, createComment, selectors } from './redux';
const { makeSelectLoading } = selectors;

function CommentInput({ taskId, loading, dispatchCreateComment }) {
  const handleCreateComment = comment => {
    dispatchCreateComment(comment, taskId);
  };

  useInjectReducerSaga();

  return (
    <CommentInputComponent
      createComment={handleCreateComment}
      loading={loading}
    />
  );
}

CommentInput.propTypes = {
  loading: PropTypes.bool,
  taskId: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  dispatchCreateComment: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatchCreateComment: (comment, taskId) =>
      dispatch(createComment(comment, taskId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CommentInput);
