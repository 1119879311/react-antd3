/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { Input } from "antd";

/**
 * {
 *
 *   id,  //getFieldDecorator
 *
 *   label,
 *
 *   children|inputType,
 *
 *   defaultValue|value,  // getFieldDecorator
 *
 *   rules:{}|[], // getFieldDecorator
 *
 *   formFieldDecorator:{},
 *
 *   formItemParam:{},
 *
 *   mutexIds:[],
 *
 *   isHidden:(formValues,formInstance)=>boolean | boolean ,
 *
 *   afterNode:String | ReactNode,
 *
 *   beforeNode:String | ReactNode,
 *
 *   beforeDesc:String | ReactNode,
 *
 *   afterDesc:String | ReactNode,
 *
 *   onChage:(event)=>{}
 *
 *   required:boolean
 *
 *
 *
 * }
 */

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
export default [
  {
    id: "name1",
    label: "姓名1",
    inputType: "ByString",
    // children: <Input />,
    // value: "789",
    formItemParam: { ...formItemLayout },
    rules: [
      { required: true, message: "Please select your favourite colors!" },
    ],

    inputParam: {
      className: "sss",
    },
    fieldChange(val, form) {
      console.log("---form-onChange---", val, form.getFieldsValue());
    },
    defaultValue: "123",
    mutexIds: ["name3"],
    isHidden: (val, form) => {
      console.log("name2--", form.getFieldsValue());
      return val.name3 === true;
    },
  },
  {
    id: "name2",
    label: "姓名2",
    children: <Input />,
    formItemParam: { ...formItemLayout },
    // inputParam: {
    // },
    fieldChange(val) {
      console.log("---form-onChange---", val);
    },
    defaultValue: "123456",
    mutexIds: ["name1"],
    isHidden: (val, form) => {
      return !val.name1;

      // return val.name3 === true;
    },
  },
  {
    id: "sss.name3",
    inputType: "ByCheckbox",
    label: "ByCheckbox",
    defaultValue: false,
    formItemParam: { ...formItemLayout },
  },
  {
    id: "name4",
    label: "自定义控件",
    formItemParam: { ...formItemLayout },
    inputType: "ByInputCustom",
    fieldChange(val) {
      console.log("---form-onChange---", val);
    },
    // children: <ByZIDingYi></ByZIDingYi>,
    rules: [
      {
        required: true,
        message: "Please select your favourite colors!",
      },
    ],
    // defaultValue: { number: 0, currency: "rmb" },
  },
  {
    id: "BySelect",
    inputType: "BySelect",
    label: "下拉",
    formItemParam: { ...formItemLayout },
    requestParam: {},
    data: [
      {
        value: "12",
        label: "label1",
      },
      {
        label: "label2",
        data: [
          {
            value: "123",
            label: "label16",
          },
        ],
      },
    ],
    optionProps: {
      render: (itme) => itme.label + "--aa",
      className: "sdfsdf",
    },
  },
  {
    id: "increasing",
    inputType: "ByIncreasing",
    noInsertForm: false,
    defaultValue: [{ add1: "1" }, { add1: "2" }],
    label: "ByIncreasing",
    rules: [
      {
        required: true,
        message: "Please select your favourite ByIncreasing",
        type: "array",
      },
    ],
    // noInsertForm: false,
    fieldChange: (...val) => {
      console.log("fieldChange---------", ...val);
    },
    TemplateParam: [],
    Template: [
      {
        id: "add1",
        label: "自增1",
        inputType: "ByString",
        defaultValue: "默认值",
        rules: [
          { required: true, message: "Please select your favourite colors!" },
        ],
        // rules: [
        //   {
        //     required: true,
        //     message: "Please select your favourite colors!",
        //   },
        // ],
        belong: { group: 0 }, //[null,0]
      },
      {
        id: "add2",
        label: "自增2",
        inputType: "ByString",
        // belong: { group: 1 }, //[null,0]
        rules: [
          { required: true, message: "Please select your favourite colors!" },
        ],
      },
      {
        id: "check",
        inputType: "ByCheckbox",
      },
    ],
    // children: () => 1212,
  },
];
