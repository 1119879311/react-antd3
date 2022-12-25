import React from "react";

// import { Checkbox } from "antd";

import ByString from "../byString";
import BySelect from "../BySelect/index.jsx";

import ByInputCustom from "../byZIDingYi";
import ByCheckbox from "../ByCheckbox";
import ByIncreasing from "../ByIncreasing";

// eslint-disable-next-line import/no-anonymous-default-export
const InputType = {
  ByString: <ByString></ByString>,

  ByCheckbox: <ByCheckbox></ByCheckbox>,

  BySelect: <BySelect></BySelect>,

  ByInputCustom: <ByInputCustom></ByInputCustom>,
  ByIncreasing: <ByIncreasing></ByIncreasing>,
};
export default InputType;
