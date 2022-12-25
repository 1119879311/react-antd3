export function createElement(
  type: String,
  props?: { [x: string]: any },
  ...children: any[]
) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

export function createTextElement(text?: String) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

/**
 *  渲染器
 * @param element
 * @param container
 */
export function render(element: any, container: any) {
  /**
   *  创建 dom
   */

  let dom =
    element.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);

  /**
   *  设置属性
   */
  Object.keys(element.props)
    .filter((key) => key !== "children")
    .forEach((key) => {
      let attr = element.props[key];

      attr =
        typeof attr === "object"
          ? JSON.stringify(attr)
              .replace(/\'|\"|{|}/g, "")
              .replace(",", ";")
          : attr;

      dom[key] = attr;
    });

  element.props.children.forEach((el: any) => render(el, dom));
  container.appendChild(dom);
}

/**
 *  并发模式
 */

let nextUnitOfWork = null;

function workLoop(deadline: { [key: string]: any }) {}

requestIdleCallback(workLoop);

const MinReact = { createElement, render };

export default MinReact;
