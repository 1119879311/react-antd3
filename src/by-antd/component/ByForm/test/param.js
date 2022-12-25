/* eslint-disable import/no-anonymous-default-export */

function getFieldList(count = 10, prex = "", layout = false) {
  let result = [];
  for (let index = 0; index < count; index++) {
    if (layout) {
      layout = false;
    } else {
      layout = index === 6 ? "vertical" : false;
    }
    result.push({
      id: `${prex}-name-${index}`,
      label: prex + "-name" + index,
      inputType: "ByString",
      // inline: true,
      // inline: index % 6 === 1 ? true : false, // 独立占一行， rowParam,colParam
      defaultValue: index === 0 ? "123456" : undefined,
      // layout: layout,
      layout: "vertical",
      // colParam: { style: { width: "240px" } },
      // colParam: { style: { width: "50%" } },

      // mutexIds: ["test-1-name-0"],
      // isHidden: (val, form) => {
      //   console.log(
      //     "----",
      //     val,
      //     // form.getFieldsValue(),
      //     form.getFieldsValue()["test-1-name-0"]
      //   );
      //   if (form.getFieldsValue()["test-1-name-0"] === "123456") {
      //     return true;
      //   }
      // },
    });
  }
  return result;
}

// 还有一个全局的默认配置
const ByFormLayoutConfig = {
  // rowParam: { gutter: [40] },
  // colParam: { style: { width: "240px" } },
  // column: 2, // 这里配置列的
};

// 一组的参数
const formOptions = (groupId = "") => ({
  onFormChage: (id, vlaue, values, form) => {},
  deserialization: {},
  panelParam: {},
  // rowParam: { gutter: [40] },
  // colParam: { style: { width: "240px" } },
  // column: 2, // 这里配置列的
  formList: [
    // 一行的
    {
      rowParam: { gutter: [40] },
      // colParam: { style: { width: "240px" } },
      // column: 2, // 这里配置列的
      FieldList: getFieldList(20, groupId + "test-1"),
    },
    // 两行的
    {
      rowParam: { gutter: [40] },
      // colParam: {},
      // column: 4,
      FieldList: getFieldList(3, groupId + "test-2", true),
    },
  ],
});
export default formOptions();
export const GroupFormOptions = {
  onFormChage: (id, vlaue, values, form) => {},
  deserialization: {},
  panelParam: { title: "" }, //
  // rowParam: { gutter: [40] },
  // colParam: { style: { width: "240px" } },
  // column: 2, // 这里配置列的
  formGroup: Array.from({ length: 4 }, (v, k) => formOptions(`group-${k}-`)),
};

export const flatFormOtions = {
  onFormChage: (id, vlaue, values, form) => {},
  deserialization: {},
  panelParam: { title: "" }, //
  // rowParam: { gutter: [40] },
  // colParam: { style: { width: "240px" } },
  // column: 2, // 这里配置列的
  FieldListParams: [
    // 这是每一组的参数u
    {
      // rowParam: { gutter: [40] },
      // colParam: { style: { width: "240px" } },
      // column: 2, // 这里配置列的
      belongRowParam: [
        //这是一行的配置参数
        {
          rowParam: {},
          column: 2, // 这里配置列的
          colParam: {},
        },
      ],
    },
    {
      // belongGroud:null
      title: "分组二",
      belongRowParam: [
        {
          rowParam: {},
          // column: 3, // 这里配置列的
          colParam: {},
        },
      ],
    },
    {
      // belongGroud:null
      title: "分组三",
      belongRowParam: [
        {
          rowParam: {},
          column: 3, // 这里配置列的
          colParam: {},
        },
      ],
    },
  ],
  FieldList: [
    {
      id: "row-0",
      label: "row-0",
      inputType: "ByString",
      // belong: { group: 1, row: 1 }, //[null,0]
    },
    {
      id: "g1-row-0",
      label: "g1-row-0",
      inputType: "ByString",
      belong: { group: 0, row: 0 }, //[null,0]
    },
    {
      id: "g1-row-1",
      label: "g1-row-1",
      belong: { group: 0, row: 1 }, //[null,0]
    },
    {
      id: "g2-row-0",
      label: "g2-row-0",
      inputType: "ByString",
      belong: { group: 1, row: 0 }, //[null,0]
    },
    {
      id: "g2-row-1",
      label: "g2-row-1",
      inputType: "ByString",
      belong: { group: 1, row: 1 }, //[null,0]
    },
    {
      id: "row-1",
      label: "row-1",
      inputType: "ByString",
      // belong: { group: 1, row: 1 }, //[null,0]
    },
  ],
};

//扁平化参数处理成结构化分组
function GroupFieldList(fieldList, FieldListParams = []) {
  if (Array.isArray(fieldList)) {
    // eslint-disable-next-line array-callback-return

    let result = fieldList.reduce((resGroup, obj) => {
      // 先分组，再分行
      let { group, row } = obj.belong || { group: "_none_", row: "_none_" };

      // 计算组的索引
      let gIndex;
      // 不指定分组或者非法分组索引
      if (group === "_none_" || !/\d/.test(group)) {
        let glen = resGroup.length - 1;

        gIndex = glen >= 0 ? glen : 0;
      } else {
        gIndex = group;
      }

      // 创建组
      if (!resGroup[gIndex]) {
        // 这里取组的参数合拼
        let { belongRowParam, ...groupParam } = FieldListParams[gIndex] || {};
        resGroup[gIndex] = { ...groupParam, formList: [] };
      }

      //计算行的索引
      let formList = resGroup[gIndex].formList || [];
      let rIndex;
      if (row === "_none_" || !/\d/.test(row)) {
        let rlen = formList.length - 1;

        rIndex = rlen >= 0 ? rlen : 0;
      } else {
        rIndex = row;
      }
      if (!formList[rIndex]) {
        // 这里合拼参数
        let { belongRowParam = [] } = FieldListParams[gIndex] || {};
        let rowParam = belongRowParam[rIndex] || {};
        formList[rIndex] = { /*其他行参数*/ ...rowParam, FieldList: [] };
      }

      formList[rIndex].FieldList.push(obj);

      return resGroup;

      // let key = belong[property] !== undefined ? belong[property] : "_none_"; // 如果属性不存在
      // if (!res[key]) {
      //   res[key] = [];
      // }
      // res[key].push(obj);
      // return res;
    }, []);
    // if(){}
    // 如果分组参数大于 真实分组,则创建空分组
    if (FieldListParams.length > result.length) {
      result = result.concat(
        creatGroupEmpty(
          FieldListParams.slice(result.length, FieldListParams.length)
        ) || []
      );
    }
    return result;
  }
  return [];
}

// 创建空分组
function creatGroupEmpty(FieldListParams = []) {
  return FieldListParams.map((item) => {
    let { belongRowParam, ...groupParam } = item || {};
    return {
      ...groupParam,
      formList: [],
    };
  });
}

console.log(
  "GroupFieldList",
  GroupFieldList(flatFormOtions.FieldList, flatFormOtions.FieldListParams)
);
