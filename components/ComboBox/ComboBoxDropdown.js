import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Downshift from 'downshift';
import { Icon } from 'carbon-components-react';

class ComboBoxDropdown extends PureComponent {
  state = {
    inputValue: '',
    hasContent: false
  };

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    defaultText: PropTypes.string,
    value: PropTypes.string,
    tabIndex: PropTypes.number,
    onClick: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    selectedText: PropTypes.string,
    open: PropTypes.bool,
    iconDescription: PropTypes.string,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    tabIndex: 0,
    open: false,
    disabled: false,
    iconDescription: 'open list of options',
    onChange: () => {},
  };

  constructor(props) {
    super(props);
    const { children, selectedText, value, defaultText, open } = props;

    let matchingChild;
    React.Children.forEach(children, child => {
      if (
        child.props.itemText === selectedText ||
        child.props.value === value
      ) {
        matchingChild = child;
      }
    });

    if (matchingChild) {
      this.state = {
        open,
        selectedText: matchingChild.props.itemText,
        value: matchingChild.props.value,
      };
    } else {
      this.state = {
        open,
        selectedText: defaultText,
        value: '',
      };
    }
  }

  close = () => {
    this.setState({ open: false });
  };

  toggle = evt => {
    if (this.props.disabled) {
      return;
    }

    const isInput = this.dropdownTrigger.contains(evt.target);

    // Open on click, enter, or space
    if (evt.which === 13 || evt.which === 32 || evt.type === 'click' && isInput) {
      this.setState({ open: !this.state.open });
    }
  };

  handleItemClick = info => {
    this.props.onChange(info);
    this.setState({
      selectedText: info.itemText,
      value: info.value,
    });
  };

  clearInput = evt => {
    this.setState({ hasContent: false, inputValue: '' }, () => this.input.focus());
    this.input.value = '';
  };


  render() {
    const {
      tabIndex,
      defaultText, // eslint-disable-line no-unused-vars
      iconDescription,
      disabled,
      selectedText, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    const dropdownClasses = classNames({
      'bx--dropdown': true,
      'bx--dropdown--open': this.state.open,
      'bx--dropdown--disabled': disabled,
      [this.props.className]: this.props.className,
    });

    const items = React.Children
    .map(this.props.children, child => {
      const isSelected = (!(this.state.inputValue === undefined)) && this.state.inputValue.length > 0 && child.props.itemText.toLowerCase().includes(this.state.inputValue.toLowerCase())
      return React.cloneElement(child, {
        onClick: this.handleItemClick,
        selected: isSelected
      })
    });
    const clearClasses = classNames({
      'bx--search-close': true,
      'bx--search-close--hidden': !this.state.hasContent
    });
    return (
      <Downshift
        onStateChange={({ inputValue }) => {
          return inputValue && this.setState({ inputValue });
        }}
        selectedItem={this.state.inputValue}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem,
        }) => (
          <ul
            {...other}
            onClick={this.toggle}
            onKeyPress={this.toggle}
            value={this.state.value}
            className={dropdownClasses}
            tabIndex={tabIndex}
          >
            <li ref={(dropdownTrigger) => { this.dropdownTrigger = dropdownTrigger }} className="bx--dropdown-text">
              <input
                placeholder="Choose something..."
                className="bx--combo-box__input"
                type="text"
                ref={(input) => { this.input = input }}
                onChange={e => {
                  this.setState({ inputValue: e.target.value });
                }}
                onInput={e => {
                  this.setState({ hasContent: e.target.value.length > 0 })
                }}
              />
              <Icon
                name="close--glyph"
                description="close"
                className={clearClasses}
                onClick={this.clearInput}
              />
            </li>
            <li>
              <svg
                className="bx--dropdown__arrow"
                fillRule="evenodd"
                height="5"
                name="caret--down"
                role="img"
                viewBox="0 0 10 5"
                width="10"
                aria-label="open list of options"
              >
                <title>open list of options</title>
                <path d="M10 0L5 5 0 0z" />
              </svg>
            </li>
            <li>{<ul className="bx--dropdown-list">{items.filter(i => !this.state.inputValue || i.props.itemText.toLowerCase().includes(this.state.inputValue.toLowerCase()))}</ul>}</li>
          </ul>
        )}
      </Downshift>
    );
  }
}

export default ComboBoxDropdown;
