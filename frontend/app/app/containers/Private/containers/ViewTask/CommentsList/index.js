import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import { List, Comment, Spin, Modal, Button } from 'antd';

import {
  useInjectReducerSaga as useInjectLoadComments,
  loadComments,
  makeSelectComments,
  makeSelectLoading,
} from './loadComments';
import {
  useInjectReducerSaga as useInjectDeleteComment,
  deleteComment,
  makeSelectLoading as makeSelectDelCommentLoading,
} from './deleteComment';
import { selectors as commentInputSelectors } from '../CommentInput/redux';
import { selectors as userDataSelectors } from '../../UserData';

const StyledButton = styled(Button)`
  font-size: 12px;
  height: 24px;
  padding: 0px 10px;
`;

function showDeleteConfirm(dispatchDeleteComment, itemId) {
  Modal.confirm({
    title: 'Are you sure delete this comment?',
    okText: 'Yes',
    okType: 'danger',
    okButtonProps: {
      id: 'confirmDelete',
    },
    cancelText: 'No',
    onOk() {
      dispatchDeleteComment(itemId);
    },
  });
}

function CommentsList({
  comments,
  taskId,
  inputLoading,
  isSuperuser,
  commentsLoading,
  commentDelLoading,
  dispatchLoadComments,
  dispatchDeleteComment,
}) {
  useInjectLoadComments();
  useInjectDeleteComment();

  useEffect(() => {
    dispatchLoadComments(taskId);
  }, []);

  const loading = inputLoading || commentsLoading || commentDelLoading;

  return (
    <Spin spinning={loading}>
      <List
        id="comments"
        className="comment-list"
        header={`${comments.length} comments`}
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={item => (
          <li>
            <Comment
              author={item.created_by}
              content={item.text}
              datetime={item.date}
              actions={
                isSuperuser && [
                  <StyledButton
                    type="danger"
                    ghost
                    onClick={() =>
                      showDeleteConfirm(dispatchDeleteComment, item.id)
                    }
                    id="deleteButton"
                  >
                    Delete
                  </StyledButton>,
                ]
              }
            />
          </li>
        )}
      />
    </Spin>
  );
}

CommentsList.propTypes = {
  comments: PropTypes.array,
  taskId: PropTypes.number,
  inputLoading: PropTypes.bool,
  isSuperuser: PropTypes.bool,
  commentDelLoading: PropTypes.bool,
  commentsLoading: PropTypes.bool,
  dispatchLoadComments: PropTypes.func,
  dispatchDeleteComment: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  inputLoading: commentInputSelectors.makeSelectLoading(),
  commentsLoading: makeSelectLoading(),
  commentDelLoading: makeSelectDelCommentLoading(),
  comments: makeSelectComments(),
  isSuperuser: userDataSelectors.makeSelectIsSuperuser(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatchLoadComments: taskId => dispatch(loadComments(taskId)),
    dispatchDeleteComment: commentId => dispatch(deleteComment(commentId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CommentsList);
