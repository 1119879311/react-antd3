import React from "react";

import ByBaseLayout, { HideFormItmeHoc } from "../common/index";

import InputType from "./inputType";
import "./index.css";
export const ByFormField = (props) => {
  let { children, ...baseProps } = props;

  let newProps = {
    ...baseProps,
    children: children
      ? children
      : InputType[props.inputType] || InputType.ByString,
  };
  return <ByBaseLayout {...newProps}></ByBaseLayout>;
};

export const ByField = HideFormItmeHoc(ByFormField);
