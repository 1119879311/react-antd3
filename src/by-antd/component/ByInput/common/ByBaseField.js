/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-vars */
import React, { Fragment } from "react";

const handleFormValue = (val) => {
  return val;
};

const handleRules = (currenRules = [], loadRef) => {
  let { validator } = loadRef.current || {};
  if (Array.isArray(validator) && validator.length) {
    return [...currenRules, ...validator];
  }
  return currenRules;
};

export default (props) => {
  let {
    id,
    children,
    defaultValue,
    value,
    rules,
    fieldChange, // 统一字段chagne后改变触发回调事件
    inputParam,
    formFieldDecorator = {},
    form,
    noInsertForm = true,
    ...args
  } = props;
  let loadRef = React.useRef(null);
  let resultChild = typeof children === "function" ? children() : children;
  resultChild = React.isValidElement(resultChild) ? (
    resultChild
  ) : (
    <Fragment>{resultChild}</Fragment>
  );
  let inputProps = resultChild.props;
  let resFieldDecorator = resultChild.type.FormFieldDecorator || {};
  if (!form || !id) {
    // 这里没有接入表单,支持 受控和非受控
    let { valuePropName = "value" } = resFieldDecorator;
    let isValue =
      value !== undefined
        ? { [valuePropName]: value }
        : { [`default${valuePropName}`]: defaultValue };
    return React.cloneElement(resultChild, {
      ...inputProps,
      ...inputParam,
      ...isValue,
      ...args,
    });
  }

  let decoratorParam = { ...resFieldDecorator, ...formFieldDecorator };
  let { trigger = "onChange", valuePropName = "value" } = decoratorParam;

  let warpChild = React.cloneElement(resultChild, {
    ...(!noInsertForm && {
      [valuePropName]: value || defaultValue,
      fieldChange,

      noInsertForm,
    }),
    form,
    id,
    ...inputProps,
    ...args,
    ...inputParam,
    loadRef: (values) => {
      loadRef.current = values;
    },
  });
  console.log("id", id, handleRules(rules, loadRef));
  return noInsertForm
    ? form.getFieldDecorator(id, {
        initialValue: handleFormValue(defaultValue),
        rules: handleRules(rules, loadRef),
        ...decoratorParam,
        [trigger]: (e) => {
          typeof fieldChange === "function" &&
            fieldChange(e.target ? e.target[valuePropName] : e, form, id);
        },
      })(warpChild)
    : warpChild;
};
