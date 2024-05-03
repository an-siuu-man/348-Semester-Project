import React, {useState} from 'react';
import './App.css';
import PantryButton from './pantryButton';

const IngredientForm = ({ onAddIngredient }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [expDate, setExpDate] = useState('');
  
  const handleSubmit = (e) => {
      e.preventDefault();
      if (name.trim() !== '' && type.trim() !== '') {
          onAddIngredient({ name: name.trim(), type: type.trim(), expDate: expDate});
          setName('');
          setType('');
          setExpDate('');
      }
  }

  return (
      <form onSubmit={handleSubmit}>
          <div>
              <label>Name of Ingredient:</label>
              <input
              type='text'
              value = {name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              />
          </div>
          <div>
              {/* <input
                  type='text'
                  value = {type}
                  onChange={(e) => setType(e.target.value)}
              /> */}
              <label for="dropdown">Select Item type: </label>
              <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value = 'default'>Choose a Type</option>
              <option value="fruit">Fruit</option>
              <option value="vegetable">Vegetable</option>
              <option value="meat">Meat</option>
              <option value="foodgrains">Foodgrains</option>
              <option value = 'spice'>Spice/Condiment</option>
              <option value = 'Other'>Other</option>
              </select>
          </div>
          <button type='submit'>Add Ingredient</button>
      </form>
  );
}

const IngredientList = ({ ingredients}) => (
  <ul>
      {ingredients.map((ingredient, index) => 
      <li key = {index}>
          {ingredient.name} (Type: {ingredient.type})
      </li>
  )}
  </ul>
);



function App() {

  const [ingredients, setIngredient] = useState([]);

  const addIngredient = (ingredient) => {
    setIngredient([...ingredients, ingredient]);
  };

  return (
    <div className="App" >
      <h1 style ={{textAlign: 'left', fontSize: '40px'}}>
        ShelfSmart
      </h1>
      <div>
        <IngredientForm onAddIngredient={addIngredient}/>
        <h1>Your Pantry List:</h1>
        <IngredientList ingredients = {ingredients} />
      </div>
      <PantryButton caption = 'Suggest me some dishes' />
    </div>
  );
}

export default App;