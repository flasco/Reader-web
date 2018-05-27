import React from 'react';
import sass from '../../sass/a.scss';

class TestPage extends React.PureComponent{
  state = {
    time: new Date().toLocaleTimeString(),
  }
  componentDidMount(){
    setInterval(()=>{
      this.setState({
        time: new Date().toLocaleTimeString()
      })
    },1000);
    if(__DEV__) console.log(`it's dev prd`)
  }
  render(){
    return (
      <div>
        <p className="unx">你好 世界</p>
        <p>可是我却并不好</p>
        <p>尽管过的不如意</p>
        <p>可是生活要继续</p>
        <p>现在的时间是 - {this.state.time}</p>
      </div>
    )
  }
}

export default TestPage;