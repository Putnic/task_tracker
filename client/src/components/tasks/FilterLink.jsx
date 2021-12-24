import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setVisibilityFilter } from '../../store/actions/taskActions';
import { VisibilityFilters } from '../../store/actions/types';

const FilterLink = (props) => {
  const { activeFilter, setFilter, styleFilterLink } = props;
  
  return (
    <Fragment>
      {Object.values(VisibilityFilters).map(f => {
        let name = f.split('_')[1];
        name = name.charAt(0) + name.substring(1).toLowerCase();
        let styleButton = activeFilter === f ? (styleFilterLink + ' active') : styleFilterLink;
        return (
          <button className={styleButton}
            key={f}
            onClick={() => setFilter(f)}>
            {name}
          </button>
        )
      })}
    </Fragment>
  );
  
};

FilterLink.propTypes = {
activeFilter: PropTypes.string.isRequired,
setFilter: PropTypes.func.isRequired,
styleFilterLink: PropTypes.string
};


const mapStateToProps = (state, ownProps) => ({
  activeFilter: state.task.filter
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setFilter: (filter) => dispatch(setVisibilityFilter(filter))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterLink);