/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-vars */

import React from "react";
import { get } from "../../../utils";

/**
 * 高阶,三个字段映射 mapIsHide,mapForm,mapMutexIds
 * 处理隐藏逻辑
 * @param {*} DOM
 * @returns
 */
export function HideFormItmeHoc(DOM, mapField = {}) {
  let {
    mapIsHide = "isHidden",
    mapForm = "form",
    mapMutexIds = "mutexIds",
  } = mapField;
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.cacheHideCallback = null;
      // let { isHidden, mutexIds } = props;
      let isHidden = get(props, mapIsHide);
      let mutexIds = get(props, mapMutexIds);

      // let isHidden = get(props,mapIsHide)
      // 这个依赖表单的，需要渲染完成后再触发一次
      this.isInitHideFn =
        Array.isArray(mutexIds) &&
        mutexIds.length &&
        typeof isHidden === "function"
          ? true
          : null;
      this.state = {};
    }
    componentDidMount() {
      // let { isHidden, mutexIds, form } = this.props;
      //表单渲染完成后,再次进行一次渲染进行表单获取
      // this.cacheHideCallback = undefined;
      if (this.isInitHideFn) {
        this.isInitHideFn = null;
        this.setState({});
      }
    }
    hiddenItem(ishide, mutexIds, form) {
      if (typeof ishide === "function") {
        let value = {};
        if (form && Array.isArray(mutexIds) && mutexIds.length) {
          value = form.getFieldsValue(mutexIds);
        }
        return ishide(value, form) === true;
      }
      return ishide === true;
    }
    get isGetItmeHide() {
      // let { isHidden, mutexIds, form } = this.props;
      let isHidden = get(this.props, mapIsHide);
      let mutexIds = get(this.props, mapMutexIds);
      let form = get(this.props, mapForm);

      // let { isItemHiden } = this.state;
      return this.isInitHideFn === null
        ? this.hiddenItem(isHidden, mutexIds, form)
        : null;
    }

    render() {
      return this.isGetItmeHide ? null : <DOM {...this.props}></DOM>;
    }
  };
}
