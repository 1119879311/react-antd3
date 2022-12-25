import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Transfer, Tree } from "antd";

const { TreeNode } = Tree;

// Customize Table Transfer
const isChecked = (selectedKeys, eventKey) => {
  return selectedKeys.indexOf(eventKey) !== -1;
};

const generateTree = (treeNodes = [], checkedKeys = [], direction) => {
  console.log("checkedKeys", checkedKeys);
  return treeNodes.map(({ children, ...props }) => {
    if (direction === "left") {
      return !checkedKeys.includes(props.key) ? (
        <TreeNode
          {...props}
          //   disabled={checkedKeys.includes(props.key)}
          key={props.key}
        >
          {generateTree(children, checkedKeys, direction)}
        </TreeNode>
      ) : null;
    }
    return checkedKeys.includes(props.key) ? (
      <TreeNode {...props} key={props.key}>
        {generateTree(children, checkedKeys, direction)}
      </TreeNode>
    ) : null;
  });
};

const TreeTransfer = ({ dataSource, targetKeys, ...restProps }) => {
  const transferDataSource = [];
  function flatten(list = []) {
    list.forEach((item) => {
      transferDataSource.push(item);
      flatten(item.children);
    });
  }
  flatten(dataSource);
  console.log("---transferDataSource", transferDataSource);
  return (
    <Transfer
      showSearch
      {...restProps}
      targetKeys={targetKeys}
      dataSource={transferDataSource}
      className="tree-transfer"
      render={(item) => item.title}
      //   showSelectAll={false}
    >
      {({
        direction,
        onItemSelect,
        onItemSelectAll,
        selectedKeys,
        ...props
      }) => {
        console.log("---selectedKeys", selectedKeys, props);
        let checkedKeys = [];
        let treeParam = {};
        if (direction === "left") {
          //   checkedKeys = [...selectedKeys, ...targetKeys];
          treeParam.checkedKeys = checkedKeys;
        } else {
          //   checkedKeys = targetKeys;
        }
        return (
          <Tree
            blockNode
            checkable
            defaultExpandAll
            // checkedKeys={checkedKeys}1
            {...treeParam}
            onCheck={(
              _,
              {
                node: {
                  props: { eventKey, ...nodePorps },
                },
                ...checkPorps
              }
            ) => {
              console.log(
                "eventKey",
                _,
                eventKey,
                checkedKeys,
                checkPorps,
                nodePorps,
                isChecked(_, eventKey)
              );
              onItemSelectAll(_, isChecked(_, eventKey));
            }}
            // onSelect={(
            //   _,
            //   {
            //     node: {
            //       props: { eventKey },
            //     },
            //   }
            // ) => {
            //   onItemSelect(eventKey, !isChecked(checkedKeys, eventKey));
            // }}
          >
            {generateTree(dataSource, targetKeys, direction)}
          </Tree>
        );
      }}
    </Transfer>
  );
};

const treeData = [
  { key: "0-0", title: "0-0title" },
  {
    key: "0-1",
    title: "0-1title",
    children: [
      { key: "0-1-0", title: "0-1-0title" },
      { key: "0-1-1", title: "0-1-1title" },
    ],
  },
  { key: "0-2", title: "0-3title" },
];

class TransferTree extends React.Component {
  state = {
    targetKeys: [],
  };

  onChange = (targetKeys) => {
    console.log("Target Keys:", targetKeys);
    this.setState({ targetKeys });
  };

  render() {
    const { targetKeys } = this.state;
    return (
      <div>
        <TreeTransfer
          dataSource={treeData}
          targetKeys={targetKeys}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default TransferTree;
