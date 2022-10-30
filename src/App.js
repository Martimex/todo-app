import './App.css';
import store from './components/store';
import { ToDo } from './components/ToDo.js';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ToDo />
      </div>
    </Provider>
  );
}

export default App;
