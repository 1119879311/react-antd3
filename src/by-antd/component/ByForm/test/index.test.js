import React from "react";

import { Form, Button } from "antd";
import ByForm from "../src/ByForm";
import testParam, { GroupFormOptions, flatFormOtions } from "./param";
function TestForm(props) {
  const submit = () => {
    props.form.validateFields((errors, values) => {
      console.log("errors", errors, values);
    });
    console.log("form", props.form.getFieldsValue());
  };
  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <Button onClick={submit}>获取</Button>
      <hr />
      <ByForm form={props.form} config={testParam}></ByForm>
      <br />
      <br />
      <hr></hr>
      <ByForm form={props.form} config={GroupFormOptions}></ByForm>

      <hr></hr>
      <ByForm form={props.form} config={flatFormOtions}></ByForm>
    </div>
  );
}
export default Form.create()(TestForm);
