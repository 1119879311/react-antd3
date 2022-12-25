import React from "react";
import { Form, Icon, Button } from "antd";
import { TramfromGroupFormFieldList } from "../../ByForm/src/uilt";
import ByForm from "../../ByForm/src/ByForm";
import { debounce } from "../../../utils";
import ByFormList from "./formList";

class ByIncreasing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ids: [],
    };
  }
  listRef = React.createRef(null);

  componentDidMount() {
    let { value, defaultValue, loadRef } = this.props;

    this.listRef.current.updateFormValues(value || defaultValue || []);
    if (typeof loadRef === "function") {
      loadRef({
        validator: [{ validator: this.validator }],
      });
    }
  }

  validator = (rule, value, cb) => {
    // this.props.form.validateFields((errors, values) => {
    //   if (value && value.length > 2) {
    //     cb("校验失败");
    //   } else {
    //     cb();
    //   }
    //   // console.log("errors", errors, values);
    // });
  };
  // 独立表单接入需要同步更新
  componentWillReceiveProps = debounce((nextProps) => {
    // let oldFormValue = this.getFormValue();
    // let oldvalue = this;

    const { pform, form, id, value } = nextProps;
    let oldvalue = form.getFieldValue(id);
    console.log(
      "nextProps",
      nextProps.form.getFieldsValue(),
      nextProps.pform.getFieldValue("increasing"),
      nextProps
    );
    console.log("Object.is(oldvalue, value)", Object.is(oldvalue, value));
    console.log("nextProps", oldvalue, value, nextProps);

    if (!Object.is(oldvalue, value)) {
      // this.listRef.current?.updateFormValues(value || []);
    }

    // this.props.form.setFieldsValue(nextProps.value);
    // let newFormValue = nextProps.value || [];
    // if (
    //   Array.isArray(newFormValue) &&
    //   newFormValue.length !== oldFormValue.length
    // ) {
    //   this.updateValue(nextProps);
    // }
  });

  // 操作 新增，删除的
  onAction = (actionCallback, idx) => {
    actionCallback(idx).then(() => {
      this.onChagngeFormValue();
    });
    //删除表单数据
  };

  // 从表单实例获取的数据
  getInstanceFormValue = () => {
    let { id, form } = this.props;
    let values = form.getFieldValue(id);

    if (!values || Array.isArray(values)) return values || [];
    if (typeof values === "object")
      return Object.values(values).filter((item) => item);
    return [];
  };

  // 表单接入 的事件
  onChagngeFormValue = (values) => {
    const { onChange } = this.props;
    let value = values || this.getInstanceFormValue() || [];
    typeof onChange === "function" && onChange(value);
  };

  onFormChange = debounce((val, form, id) => {
    let { fieldChange, noInsertForm } = this.props;
    // form 不是独立的
    if (noInsertForm === false) {
      typeof fieldChange === "function" &&
        fieldChange(this.getInstanceFormValue(), form, id, this.props.id);
    } else {
      // 这里 ，form 独立的，单独的表单项, 对接只需要执行 表单的 change 事件
      this.onChagngeFormValue();
    }
  }, 16.67);

  //处理自增表单 id 参数
  createGroupTel(gkey) {
    let { Template = [], id } = this.props;
    return Template.map((item) => ({
      ...item,
      id: `${id}[${gkey}].${item.id}`,
    }));
  }
  // 动态渲染器自增表单
  renderDyForm(key, index, remove) {
    const { form, pform, TemplateParam } = this.props;
    return (
      <div className="by-input-increasing_group" key={key}>
        <ByForm
          form={form || pform}
          config={{
            onFormChange: this.onFormChange,
            formGroup: TramfromGroupFormFieldList(
              this.createGroupTel(index),
              TemplateParam
            ),
          }}
        ></ByForm>
        <Icon
          className="by-input-increasing_deleteIonic"
          type="minus-circle-o"
          onClick={() => this.onAction(remove, index)}
        />
      </div>
    );
  }
  render() {
    const { id, form, pform } = this.props;
    return (
      <>
        <ByFormList id={id} form={form || pform} ref={this.listRef}>
          {(fieldList, { add, remove }) => {
            return (
              <>
                {fieldList.map((fieldKey, index) =>
                  this.renderDyForm(fieldKey, index, remove)
                )}
                <Button
                  className="by-input-increasing_addContainer"
                  type="dashed"
                  onClick={() => this.onAction(add)}
                >
                  <Icon type="plus" /> Add field
                </Button>
              </>
            );
          }}
        </ByFormList>
      </>
    );
  }
}

function HOCForm(WrappedComponent) {
  let CacheCompoent = WrappedComponent;
  return class extends React.Component {
    constructor(props) {
      super(props);

      let { noInsertForm } = this.props;
      if (noInsertForm !== false) {
        CacheCompoent = Form.create({ name: "by-increasing" })(CacheCompoent);
      }
    }
    render() {
      // console.log("form", this.props);
      let { form, ...otherProps } = this.props;
      return <CacheCompoent pform={form} {...otherProps} />;
    }
  };
}
export default HOCForm(ByIncreasing);

// export default Form.create({ name: "by-increasing" })(ByIncreasing);
