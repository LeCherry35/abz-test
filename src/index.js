import './index.scss';
import App from './App';
import './index.scss'

import ReactDOM from "react-dom";

ReactDOM.render(<App />, document.getElementById("root"));

const devMode = process.env.NODE_ENV === 'development';
if (devMode && module && module.hot) {
    module.hot.accept();
}