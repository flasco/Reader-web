import React from 'react';
import sass from '../../sass/a.scss';
import { Button } from 'antd';

class TestPage extends React.PureComponent {
  state = {
    time: new Date().toLocaleTimeString(),
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({
        time: new Date().toLocaleTimeString()
      })
    }, 1000);
    // if (__DEV__) console.log(`it's dev prd`)
  }
  render() {
    return (
      <div style={{marginLeft:20}}>
        <p className="unx">你好 世界</p>
        <p>可是我却并不好</p>
        <p>尽管过的不如意</p>
        <p>可是生活要继续</p>
        <p>现在的时间是 - {this.state.time}</p>
        <Button type="primary">Primary</Button>
      </div>
    )
  }
}

export default TestPage;