import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { message as handleMessage } from 'antd';
import { useInject, clear, makeSelectMessage, makeSelectType } from './redux';

function Message({ message, msgType, dispatchClear }) {
  useInject();
  useEffect(() => {
    if (message) {
      if (msgType === 'error') {
        handleMessage.error(message);
      } else if (msgType === 'warning') {
        handleMessage.warning(message);
      }
      dispatchClear();
    }
  }, [message]);
  return '';
}

Message.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  msgType: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  dispatchClear: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  message: makeSelectMessage(),
  msgType: makeSelectType(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatchClear: () => dispatch(clear()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Message);
