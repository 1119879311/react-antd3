import React from "react";
import { Input, Select } from "antd";

const { Option } = Select;

class PriceInput extends React.Component {
  handleNumberChange = (e) => {
    const number = e.target.value;
    // if (isNaN(number)) {
    //   return;
    // }
    this.triggerChange({ number });
  };

  handleCurrencyChange = (currency) => {
    this.triggerChange({ currency });
  };

  triggerChange = (changedValue) => {
    const { onChange1, value = {} } = this.props;

    if (onChange1) {
      onChange1({
        ...value,
        ...changedValue,
      });
    }
  };

  render() {
    const { size, value, defaultValue = {} } = this.props;
    let param1 =
      value === undefined
        ? { defaultValue: defaultValue.number }
        : { value: value.number };
    let param2 =
      value === undefined
        ? { defaultValue: defaultValue.currency }
        : { value: value.currency };

    return (
      <span>
        <Input
          type="text"
          size={size}
          onChange={this.handleNumberChange}
          style={{ width: "65%", marginRight: "3%" }}
          {...param1}
        />
        <Select
          {...param2}
          size={size}
          style={{ width: "32%" }}
          onChange={this.handleCurrencyChange}
        >
          <Option value="rmb">RMB</Option>
          <Option value="dollar">Dollar</Option>
        </Select>
      </span>
    );
  }
}

PriceInput.FormFieldDecorator = {
  // valuePropName: "list",
  trigger: "onChange1",
};

export default PriceInput;
