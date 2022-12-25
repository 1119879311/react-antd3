/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Form, Button } from "antd";

import paramArr from "./param";
import { ByField } from "../../index/index";

const TestInput = (props) => {
  useEffect(() => {
    console.log(
      "useEffect-form",
      props.form.getFieldsValue(),
      props.form.getFieldsValue(["name1", "name2", "name3"])
    );
    // props.form.setFieldsValue({ increasing: [] });
  }, []);
  const submit = () => {
    props.form.validateFields((errors, values) => {
      console.log("errors", errors, values);
    });
    console.log(
      "form",
      props.form.getFieldsValue(),
      props.form.getFieldsValue(["name1", "name2", "name3"])
    );
  };
  const setVaule = () => {
    props.form.setFieldsValue({ increasing: [] });
  };
  return (
    <div>
      <Button onClick={submit}>获取</Button>
      <Button onClick={setVaule}>设置值</Button>

      <Form>
        {paramArr.map((param, i) => (
          <ByField key={i} form={props.form} {...param}></ByField>
        ))}
      </Form>
    </div>
  );
};

export default Form.create({
  // onValuesChange: (props, changedValues, allValues) => {
  //   console.log("----allValues:", changedValues, allValues);
  // },
})(TestInput);
