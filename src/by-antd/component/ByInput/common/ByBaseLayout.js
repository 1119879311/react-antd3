/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-vars */
import React from "react";
import { Form } from "antd";
import ByBaseField from "./ByBaseField";

function BeforeContaionerNode() {
  return null;
  // return <div className="by-input-beforeContaioner">sdf</div>;
}
function AfterContaionerNode() {
  return null;
  // return <div className="by-input-afterContaioner">sdf</div>;
}

function LabelNode(props) {
  let { label, labelAfterDes } = props;
  return labelAfterDes ? (
    <span>
      {label}
      11212
    </span>
  ) : (
    label
  );
}

export default (props) => {
  let { label, isHidden, mutexIds, formItemParam, layout, ...baseProps } =
    props;
  let className = [
    "by-input-formitem",
    layout && "by-input-formitem-" + layout,
  ];
  let param = {
    ...formItemParam,
    label: LabelNode({ label }),
    className: className.filter(Boolean).join(" "),
  };
  return (
    <Form.Item {...param}>
      <div style={{ display: "flex", width: "100%" }}>
        <BeforeContaionerNode></BeforeContaionerNode>
        {ByBaseField(baseProps)}
        <AfterContaionerNode></AfterContaionerNode>
      </div>
    </Form.Item>
  );
};
