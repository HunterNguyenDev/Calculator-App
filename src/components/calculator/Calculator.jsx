import "./calculator.css";

import { btns, BTN_ACTIONS } from "./btnConfig.js";
import { useRef, useState } from "react";
import { useEffect } from "react";
const Calculator = () => {
  const btnsRef = useRef(null);
  const expRef = useRef(null);

  const [expression, setExpression] = useState("");

  useEffect(() => {
    const btns = Array.from(btnsRef.current.querySelectorAll("button")); //Chuyển danh sách các phần tử <button> đó (NodeList) thành một mảng (Array)

    btns.forEach((e) => (e.style.height = e.offsetWidth + "px")); //Đặt chiều cao (height) của mỗi phần tử bằng đúng chiều rộng (offsetWidth), đảm bảo mỗi phần tử có dạng hình vuông.
  }, []);

  const btnClick = (item) => {
    console.log(item);

    const expDiv = expRef.current;

    if (item.action === BTN_ACTIONS.THEME)
      document.body.classList.toggle("dark");

    if (item.action === BTN_ACTIONS.ADD) {
      addAnimSpan(item.display);

      const oper = item.display !== "x" ? item.display : "*";
      setExpression(expression + oper);
    }

    if (item.action === BTN_ACTIONS.DELETE) {
      expDiv.parentNode.querySelector("div:last-child").innerHTML = "";  //
      expDiv.innerHTML = "";
      setExpression("");
    }

    if (item.action === BTN_ACTIONS.CALC) {
      if (expression.trim().length <= 0) return;

      expDiv.parentNode.querySelector("div:last-child").remove();

      const cloneNode = expDiv.cloneNode(true);
      expDiv.parentNode.appendChild(cloneNode);

      const transform = `translateY(${
        -(expDiv.offsetHeight + 10) + "px"
      })scale(0.4)`;

      try {
        let res = eval(expression); //

        setExpression(res.toString());
        setTimeout(() => {
          cloneNode.style.transform = transform;
          expDiv.innerHTML = "";
          addAnimSpan(Math.floor(res * 100000000) / 100000000);
        }, 200);

      } catch {
        setTimeout(() => {
          cloneNode.style.transform = transform;
          cloneNode.innerHTML = "Syntax error !!!";
        }, 200);

      } finally {
        console.log("Calc complete");
      }
    }
  };
  const addAnimSpan = (content) => {
    const expDiv = expRef.current;
    const span = document.createElement("span");

    span.innerHTML = content;
    span.style.opacity = "0";
    expDiv.appendChild(span);

    const width = span.offsetWidth + "px";
    span.style.width = "0";
    // expDiv.parentNode.querySelector(
    //   "div:last-child"
    // ).style.transform = `translateY(${-expDiv.offsetHeight + "px"}) scale(0.4)`;

    setTimeout(() => {
      span.style.opacity = "1";
      span.style.width = width;
    });
  };

  return (
    <div className="calculator">
      <div className="calculator__result">
        <div ref={expRef} className="calculator__result__exp"></div>
        <div className="calculator__result__exp"></div>
      </div>
      <div ref={btnsRef} className="calculator__btns">
        {btns.map((btn, index) => (
          <button
            key={index}
            className={btn.class}
            onClick={() => {
              btnClick(btn);
            }}
          >
            {btn.display}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
