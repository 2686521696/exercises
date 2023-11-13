import "./App.css";
import { useState } from "react";

const addRemote = async (a, b) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(a + b), 100);
  });

async function add(...inputs) {
  // 记录计算开始时间
  const startTime = Date.now();

  try {
    // 使用 Promise.all 来并行计算多个加法
    const results = await Promise.all(inputs.map((num) => addRemote(0, num)));

    // 计算总和
    const sum = results.reduce((acc, val) => acc + val, 0);

    // 计算结束时间
    const endTime = Date.now();

    // 返回计算结果和耗时
    return { result: sum, time: endTime - startTime };
  } catch (error) {
    // 如果发生错误，返回错误信息
    return { error: error.message };
  }
}

function App() {
  const [result, setResult] = useState({ result: null, time: null, error: null });

  const handleAdd = async () => {
    const inputElement = document.querySelector("input");
    const inputValue = inputElement.value;

    // 检查输入是否合法
    const inputs = inputValue.split(",").map((num) => parseFloat(num.trim()));

    if (inputs.some(isNaN)) {
      // 输入不是有效数字，处理错误
      setResult({ error: "请输入有效的数字", result: null, time: null });
      return;
    }

    // 设置按钮和输入框的状态
    inputElement.setAttribute("disabled", true);
    document.querySelector("button").setAttribute("disabled", true);

    try {
      // 调用 add 方法计算结果
      const result = await add(...inputs);
      setResult(result);
    } catch (error) {
      // 处理错误
      setResult({ error: error.message, result: null, time: null });
    } finally {
      // 恢复按钮和输入框的状态
      inputElement.removeAttribute("disabled");
      document.querySelector("button").removeAttribute("disabled");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          请实现 App.js 中 add 方法，当用户在输入框中输入多个数字(逗号隔开)时，
          <br />
          点击相加按钮能显示最终结果，并给出计算时间
        </p>
        <div>用例：2, 3, 3, 3, 4, 1, 3, 3, 5, 6, 1, 4, 7 =&gt; 38，最慢1200ms</div>
      </header>
      <section className="App-content">
        <input type="text" placeholder="请输入要相加的数字（如1,4,3,3,5）" />
        <button onClick={handleAdd}>相加</button>
      </section>
      <section className="App-result">
        <p>
          相加结果是：{result.result}， 计算时间是：{result.time} ms
        </p>
        {result.error && <p style={{ color: "red" }}>{result.error}</p>}
      </section>
    </div>
  );
}

export default App;
