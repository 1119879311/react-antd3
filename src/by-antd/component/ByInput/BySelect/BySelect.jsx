import React, { forwardRef } from "react";
import { Select } from "antd";

/**
 * antd...
 * fieldMapValue
 * fieldMapLabel
 * @param {*} props
 * @returns
 */

const ByOption = (props) => {
  let { data = [], optionProps = {} } = props;
  let { render, className } = optionProps;
  return data.map((item) => {
    return (
      <Select.Option className={className} key={item.value} {...item}>
        {typeof render === "function" ? render(item) : item.label}
      </Select.Option>
    );
  });
};

const ByRenderOption = (props) => {
  let { data = [], optionProps = {} } = props;
  let { render, className } = optionProps;

  return data.map((item, idx) => {
    return Array.isArray(item.data) ? (
      <Select.OptGroup label={item.label} key={idx}>
        {ByOption({ data: item.data, optionProps })}
      </Select.OptGroup>
    ) : (
      <Select.Option className={className} key={item.value} {...item}>
        {typeof render === "function" ? render(item) : item.label}
      </Select.Option>
    );
  });
};
const BySelect = forwardRef((props, ref) => {
  let { optionProps, data, requestParam, ...baseProps } = props;
  return (
    <Select {...baseProps} ref={ref}>
      {ByRenderOption({ data, optionProps })}
    </Select>
  );
});

export default BySelect;
