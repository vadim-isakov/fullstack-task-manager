import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Input } from 'antd';

const StyledButton = styled(Button)`
  margin-top: 20px !important;
`;

export default function CommentInput({ createComment }) {
  const [comment, setComment] = useState('');
  const handleCreateComment = () => {
    createComment(comment);
    setComment('');
  };

  useEffect(() => {
    const handleKey = e => {
      if (e.keyCode === 13 && e.metaKey && comment) handleCreateComment();
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
    };
  }, [comment]);

  return (
    <div>
      <Input.TextArea
        rows={4}
        onChange={e => setComment(e.target.value)}
        value={comment}
      />
      <StyledButton
        htmlType="submit"
        type="primary"
        onClick={handleCreateComment}
      >
        Add Comment
      </StyledButton>
    </div>
  );
}

CommentInput.propTypes = {
  createComment: PropTypes.func,
};
