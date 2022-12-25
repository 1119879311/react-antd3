import React, { forwardRef } from "react";
import { Input } from "antd";
// import reactComponentDebounce from "react-component-debounce";

const ByString = forwardRef((props, ref) => {
  return <Input {...props} ref={ref}></Input>;
});
ByString.FormFieldDecorator = {};
export default ByString;
// export default reactComponentDebounce(150, 200)(ByString);
