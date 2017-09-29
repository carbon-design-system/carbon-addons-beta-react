import React, { Component } from 'react';
import Downshift from 'downshift';
import ComboBoxDropdown from './ComboBoxDropdown';
import ComboBoxDropdownItem from './ComboBoxDropdownItem';

class ComboBox extends Component {
  render() {
    return (
      <div className="bx--combo-box">
        <ComboBoxDropdown
          className="some-class"
          defaultText="Choose something.."
        >
          <ComboBoxDropdownItem id="combobox-1" itemText="All" value="all" />
          <ComboBoxDropdownItem
            id="combobox-2"
            itemText="Cloud Foundry API"
            value="cloudFoundry"
          />
          <ComboBoxDropdownItem id="combobox-3" itemText="Staging" value="staging" />
          <ComboBoxDropdownItem
            id="combobox-4"
            itemText="Droplet Execution Agent"
            value="dea"
          />
          <ComboBoxDropdownItem id="combobox-5" itemText="Router" value="router" />
        </ComboBoxDropdown>
      </div>
    );
  }
}

export default ComboBox;
