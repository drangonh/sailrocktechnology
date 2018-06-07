import React, {Component} from 'react';
import '../style/App.css';
import '../style/view.css';

class Footer extends Component {
    // state = {
    //     str: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() + "-" + new Date().toLocaleTimeString()
    // };
    //
    // componentDidMount() {
    //     // this.timer = setInterval(() => {
    //     //     this.setState({
    //     //         str: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() + "-" + new Date().toLocaleTimeString()
    //     //     })
    //     // }, 1000)
    // }
    //
    // componentWillUnmount() {
    //     this.timer && clearInterval(this.timer)
    // }

    render() {
        return (
            <Footer style={{textAlign: 'center'}}>
                {new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() + "-" + new Date().toLocaleTimeString()}
            </Footer>
        );
    }
}

export default Footer;
