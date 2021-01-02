import FileSearch from './components/FileSearch'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App container-fluid">
      <div className="row">
        <div className="col left-panel">
          <FileSearch
            onFileSearch={(value) => { console.log(value) }}
          />
        </div>
        <div className="col bg-primary right-panel">
          <h1>this is the right</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
