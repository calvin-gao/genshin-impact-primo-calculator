import './App.css';
import PrimoForm from './components/PrimoForm'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {


  return (
    <div className="App">
        <h1>Primo Calculator</h1>
        <h6>This calculation is assuming you do dailies everyday and not counting any event primos or achievements.</h6>
        <PrimoForm/>
    </div>
  );
}

export default App;
