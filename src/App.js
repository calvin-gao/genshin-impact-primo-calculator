import './App.css';
import PrimoForm from './components/PrimoForm'
import WeaponBanner from './components/WeaponBanner'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {


  return (
    <div className="App">
        <h1>Primo Calculator</h1>
        <h6>This calculation is assuming you do dailies everyday and not counting any event primos or achievements.</h6>
        <h3>Character Event Wish</h3>
        <PrimoForm/>
        <h3 className="mt-5">Weapon Event Wish </h3>
        <WeaponBanner/>
    </div>
  );
}

export default App;
