import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import { Checkbox } from 'carbon-components-react';


class ComboBoxDropdownItem extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    itemText: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
  };

  handleClick = () => {
    console.log('clicked')
  }

  render() {
    const { className, value, handleClick, itemText, selected, id, ...other } = this.props;
    const dropdownItemClasses = classNames({
      'bx--dropdown-item': true,
      'bx--combo-box-dropdown-item': true,
      'bx--combo-box-dropdown-item--selected': selected,
      [className]: className,
    });

    return (
      <li
        {...other}
        value={value}
        className={dropdownItemClasses}
        onClick={handleClick}
      >
        <label htmlFor={id} className="bx--checkbox-label">
          <input ref={(input) => { this.input = input; }} id={id} className="bx--checkbox" type="checkbox" value={value} name="checkbox" />
          <span className="bx--checkbox-appearance">
            <svg className="bx--checkbox-checkmark" width="12" height="9" viewBox="0 0 12 9" fillRule="evenodd">
              <path d="M4.1 6.1L1.4 3.4 0 4.9 4.1 9l7.6-7.6L10.3 0z"></path>
            </svg>
          </span>
          <span className="bx--checkbox-label-text">{itemText}</span>
        </label>
      </li>
    );
  }
}

export default ComboBoxDropdownItem;
