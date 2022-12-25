import React from "react";
// import Test from "../by-antd/component/ByInput/common/test";
import InputFieldTest from "../by-antd/component/ByInput/test/test1/index.test";
import ByFormTest from "../by-antd/component/ByForm/test/index.test";
// import TransferTree from "./TransferTree";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <InputFieldTest></InputFieldTest>
        {/* <ByFormTest></ByFormTest> */}
      </div>
    );
  }
}

// console.log("Test", <Test></Test>);
// function App() {
//   return (
//     <div className="App">
//       <InputFieldTest></InputFieldTest>
//       <ByFormTest></ByFormTest>
//     </div>
//   );
// }

export default App;
