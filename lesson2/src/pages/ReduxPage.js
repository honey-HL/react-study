import React, {Component} from "react";
import store from "../store/";

export default class ReduxPage extends Component {

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      // store state 改变
      this.forceUpdate();
    });
    console.log('this==>',this)
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  add = () => {
    store.dispatch({type: "ADD"});
  };

  asyAdd = () => {
    store.dispatch((dispatch, getState) => {
      setTimeout(() => {
        dispatch({type: "ADD"});
        console.log("getState", getState()); //sy-log
      }, 1000);
    });
  };

  promiseMinus = () => {
    store.dispatch(
      Promise.resolve({
        type: "MINUS",
        payload: 100
      })
    );
  };

  doubleClick = () => {
    store.dispatch({type: "DOUBLE"});
  }
  componentDidMount () {
    console.log('store==>',store)
  }

  render() {
    return (
      <div>
        <h3>ReduxPage</h3>
        <p>{store.getState().countReducer}</p>
        {/* 
          ! 课后补充： combineReducers用法
         */}
       <p>{store.getState().doubleReducer}</p>
        <button onClick={this.add}>add</button>
        {/* <button onClick={this.asyAdd}>asyAdd</button> */}
        {/* <button onClick={this.promiseMinus}>promise minus</button> */}
        <button onClick={this.doubleClick}>double click</button>
      </div>
    );
  }
}
