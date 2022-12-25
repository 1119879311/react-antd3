//扁平化参数处理成结构化分组
export function TramfromGroupFormFieldList(fieldList, FieldListParams = []) {
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
    }, []);
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
