import './App.css';
import Main from './Components/Main';
import { TodoProvider } from './context/taskContext';

function App() {
  return (
    <div className="App">
        <TodoProvider>
          <Main/>
        </TodoProvider>       
    </div>
  );
}

export default App;
