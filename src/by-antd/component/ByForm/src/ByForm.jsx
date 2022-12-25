import React, { Component, Fragment } from "react";
import { Row, Col } from "antd";
import { HideFormItmeHoc } from "../../ByInput/common";
import { ByFormField } from "../../ByInput/index/index";
import { TramfromGroupFormFieldList } from "./uilt";

/**
 *  渲染一列
 */
const RenderSingleCol = HideFormItmeHoc(
  (props) => {
    let { colParam, inputParam, onFormChange, form } = props;
    let { isShow } = inputParam;
    let className = [
      "by-form-col-itme",
      colParam.className || "",
      isShow && "by-form-col-hidden",
    ]
      .filter(Boolean)
      .join(" ");
    return (
      <Col {...colParam} className={className}>
        <ByFormField
          form={form}
          {...inputParam}
          fieldChange={(...args) => {
            typeof inputParam.fieldChange === "function" &&
              inputParam.fieldChange(...args);
            typeof onFormChange === "function" && onFormChange(...args);
          }}
        ></ByFormField>
      </Col>
    );
  },
  { mapIsHide: "inputParam.isHidden", mapMutexIds: "inputParam.mutexIds" }
);

/**
 *  渲染一行(多列的布局)
 * @param {*} props
 * @returns
 */
function RenderFormCol(props) {
  let { FieldList, column, onFormChange } = props;
  let colParamCommon = props.colParam || {};
  let rowParamCommon = props.rowParam || {};
  let colSpan =
    typeof column === "number" && !isNaN(column)
      ? Math.ceil(24 / column)
      : null;
  let result = [];
  FieldList.forEach((inputField, index) => {
    let { colParam = {}, inline, belong, ...inputParam } = inputField;
    let renderColParam = {
      colParam: { ...colParamCommon, ...colParam },
      inputParam,
      form: props.form,
      onFormChange,
      key: inputParam.key !== undefined ? inputParam.key : index,
    };
    // 计算列
    if (colSpan !== null) {
      let { colParam } = renderColParam;
      renderColParam.colParam = { span: colSpan, ...colParam };
    }
    // 判断是否独占一行
    if (inline) {
      let style = renderColParam.colParam.style || {};
      renderColParam.colParam.style = { ...style, width: "100%" };
    }

    result.push(<RenderSingleCol {...renderColParam}></RenderSingleCol>);
  });
  let { className, ...otherRowParam } = rowParamCommon;
  className = ["by-form-row-itme", className || ""].join(" ");
  return result.length ? (
    <Row {...otherRowParam} className={className} type="flex">
      {result}
    </Row>
  ) : null;
}

// 渲染多行的布局
function RenderFormRow(props) {
  let { formList, onFormChange, form } = props;
  if (Array.isArray(formList)) {
    return formList.map((itme, index) => (
      <RenderFormCol
        key={index}
        {...itme}
        onFormChange={onFormChange}
        form={form}
      ></RenderFormCol>
    ));
  }
  return null;
}
/**
 * 渲染组的布局
 * @param {*} props
 * @returns
 */
function RenderFormGroup(props) {
  let { formGroup, onFormChange, form } = props;
  if (Array.isArray(formGroup) && formGroup.length) {
    return formGroup.map((itme, index) => (
      <Fragment key={index}>
        {/* <div>{itme.title}</div> ** 渲染分组模板  */}

        <RenderFormRow
          {...itme}
          onFormChange={onFormChange}
          form={form}
        ></RenderFormRow>
      </Fragment>
    ));
  }
  return null;
}

function ByFieldListLayout(props) {
  let { config, form } = props;
  let { FieldList = [], FieldListParams = [], ...otherConfig } = config || {};

  let formGroup = TramfromGroupFormFieldList(FieldList, FieldListParams);

  return (
    <RenderFormGroup
      {...otherConfig}
      formGroup={formGroup}
      form={form}
    ></RenderFormGroup>
  );
}

// 一个完整的表单布局，不涉及数据处理,单纯布局
class ByForm extends Component {
  renderForm = () => {
    let { config, form } = this.props;
    if (!config) return null;

    // 行
    if (config.formList) {
      return <RenderFormRow {...config} form={form}></RenderFormRow>;
    }
    // 组

    if (config.formGroup) {
      return <RenderFormGroup {...config} form={form}></RenderFormGroup>;
    }
    //列,要手动构建
    if (config.FieldList) {
      return <ByFieldListLayout {...config} form={form}></ByFieldListLayout>;
    }
    return null;
  };
  render() {
    return <div className="by-form">{this.renderForm()}</div>;
  }
}

export default ByForm;
