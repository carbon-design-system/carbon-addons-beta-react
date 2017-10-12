import React, { Component } from 'react';
import { render } from 'react-dom';
import classNames from 'classnames';
import Downshift from 'downshift';

export default class Typeahead extends Component {
  static defaultProps = {
    isOpen: false,
    placeholder: 'Filter...',
    onChange: () => {},
  };

  handleChange = evt => {
    this.props.onChange(evt);
  };

  itemToString = item => (item ? item.label : '');

  render() {
    const { items, placeholder } = this.props;

    return (
      <Downshift onChange={this.handleChange} itemToString={this.itemToString}>
        {({
          getInputProps,
          getItemProps,
          getButtonProps,
          itemToString,
          isOpen,
          inputValue,
          selectedItem,
          highlightedIndex,
          clearSelection,
        }) => {
          const iconMenuClass = classNames({
            'bx--typeahead-menu-icon': true,
            'bx--typeahead-menu-icon--active': isOpen,
          });

          const iconClearClass = classNames({
            'bx--typeahead-clear-icon': true,
          });

          return (
            <div>
              <div className="bx--typeahead bx--form-item">
                <input
                  className="bx--typeahead__input bx--text-input"
                  {...getInputProps({ placeholder })}
                />
                {inputValue && (
                  <button
                    onClick={clearSelection}
                    className="bx--typeahead-clear"
                  >
                    <svg
                      className={iconClearClass}
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill-rule="evenodd"
                    >
                      <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm3.5 10.1l-1.4 1.4L8 9.4l-2.1 2.1-1.4-1.4L6.6 8 4.5 5.9l1.4-1.4L8 6.6l2.1-2.1 1.4 1.4L9.4 8l2.1 2.1z" />
                    </svg>
                  </button>
                )}
                <button
                  className="bx--typeahead-menu"
                  {...getButtonProps({
                    'aria-label': isOpen ? 'close.menu' : 'open.menu',
                  })}
                >
                  <svg
                    className={iconMenuClass}
                    width="10"
                    height="5"
                    viewBox="0 0 10 5"
                    fill-rule="evenodd"
                  >
                    <path d="M10 0L5 5 0 0z" />
                  </svg>
                </button>
                <div className="bx--typeahead-items">
                  {isOpen
                    ? items
                        .filter(
                          item =>
                            !inputValue ||
                            item.label
                              .toLowerCase()
                              .startsWith(inputValue.toLowerCase())
                        )
                        .map((item, index) => {
                          const itemClass = classNames({
                            'bx--typeahead__item': true,
                            'bx--typeahead__item--highlighted':
                              highlightedIndex === index,
                            'bx--typeahead__item--active':
                              selectedItem === item,
                          });

                          return (
                            <div
                              {...getItemProps({ item })}
                              key={item.value}
                              className={itemClass}
                            >
                              {itemToString(item)}
                            </div>
                          );
                        })
                    : null}
                </div>
              </div>
            </div>
          );
        }}
      </Downshift>
    );
  }
}

class TypeaheadItem extends Component {
  render() {
    const itemClass = classNames({
      'bx--typeahead__item': true,
      'bx--typeahead__item--highlighted': highlightedIndex === index,
      'bx--typeahead__item--active': selectedItem === item,
    });

    return (
      <div {...this.props} key={item.value} className={itemClass}>
        {itemToString(item)}
      </div>
    );
  }
}
