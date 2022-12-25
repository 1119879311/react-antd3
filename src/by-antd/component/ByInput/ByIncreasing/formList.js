import React from "react";

let formGroupIndex = 0;

class ByFormList extends React.Component {
  state = {
    ids: [],
  };
  getFormValue = () => {
    let { id, form } = this.props;
    let values = form?.getFieldValue(id);
    if (!values || Array.isArray(values)) return values || [];
    if (typeof values === "object")
      return Object.values(values).filter((item) => item);
    return [];
  };

  serialize = (data = []) => {
    let { id, form } = this.props;
    form?.setFieldsValue({ [id]: data });
  };
  /**
   * 异步 ,确保 唯一 key 已经被渲染
   * @param {*} data
   */
  updateFormValues = async (data = []) => {
    let ids = data.map(() => formGroupIndex++);
    await this.setState({ ids });
    this.serialize(data);
  };
  onAction = async (type, key) => {
    let { ids = [] } = this.state;
    let formValues = this.getFormValue();
    if (type === "add") {
      //添加
      ids = ids.concat(formGroupIndex++);
    } else {
      // 删除
      ids = ids.filter((_, index) => index !== key);

      formValues.splice(key, 1);
    }
    this.serialize(formValues);

    await this.setState({ ids });
    //删除表单数据
  };

  render() {
    const { children } = this.props;
    const { ids } = this.state;
    return (
      <div className="by-input-increasing-container">
        {typeof children === "function"
          ? children(ids, {
              add: () => this.onAction("add"),
              remove: (key) => this.onAction("delete", key),
            })
          : children}
      </div>
    );
  }
}
export default ByFormList;
