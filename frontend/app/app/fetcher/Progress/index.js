import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import nprogress from 'nprogress';
import { useInject, makeSelectLoading } from './redux';

function Progress({ loading }) {
  useInject();
  useEffect(() => {
    if (loading) {
      nprogress.start();
    } else {
      nprogress.done();
    }
  }, [loading]);

  return '';
}

Progress.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
});

export default connect(mapStateToProps)(Progress);
