import './App.css';
import { useState, useEffect } from 'react';

// 默认的 URL 解析结果
const defaultParserResult = {
  protocol: '',
  hostname: '',
  port: '',
  pathname: '',
  params: {},
  hash: ''
}

// URL 解析函数
const parserUrl = (url) => {
  const result = { ...defaultParserResult };

  try {
    const urlObj = new URL(url);

    // 从 URL 对象中提取各部分信息
    result.protocol = urlObj.protocol;
    result.hostname = urlObj.hostname;
    result.port = urlObj.port;
    result.pathname = urlObj.pathname;

    // 提取查询参数
    const params = new URLSearchParams(urlObj.search);
    params.forEach((value, key) => {
      result.params[key] = value;
    });

    // 提取哈希部分
    result.hash = urlObj.hash;
  } catch (error) {
    console.error('无效的 URL:', error.message);
  }

  return result;
};

function App() {
  const [result, setResult] = useState(defaultParserResult);

  useEffect(() => {
    const handleParseUrl = () => {
      const inputUrl = document.querySelector('input').value;
      setResult(parserUrl(inputUrl));
    };

    const onKeyDown = (e) => {
      if (e.keyCode === 13) {
        console.log('在这里处理 Enter 事件');
        handleParseUrl();
      }
    }

    const parseButton = document.getElementById('J-parserBtn');
    parseButton.addEventListener('click', handleParseUrl, false);
    document.addEventListener('keydown', onKeyDown, false);

    return () => {
      parseButton.removeEventListener('click', handleParseUrl, false);
      document.removeEventListener('keydown', onKeyDown, false);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>请实现 App.js 中 parserUrl 方法，当用户在输入框中输入 URL 时，</div>
        <div>点击解析按钮（或者按 Enter 快捷键）能够识别出 URL 各个组成部分</div>
        <div>并将结果渲染在页面上（提示: 请尽可能保证 parserUrl 的健壮性和完备性）</div>
      </header>
      <section className="App-content">
        <input type="text" placeholder="请输入 URL 字符串" />
        <button id="J-parserBtn">解析</button>
      </section>
      <section className="App-result">
        <h2>解析结果</h2>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </section>
    </div>
  );
}

export default App;
