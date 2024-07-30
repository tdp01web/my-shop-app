import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
  // Khởi tạo trạng thái ban đầu nếu cần
};

const reducer = (state = initialState, action) => {
  return state;
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;