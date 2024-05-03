import React, {useState} from "react";

const ingredientForm = ({ onAddIngredient }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [expDate, setExpDate] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() != '' && type.trim() != '') {
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
                placeholder="name"
                />
            </div>
            <div>
                <input
                    type='text'
                    value = {type}
                    onChange={(e) => setType(e.target.value)}
                />
                <label for="dropdown">Select Item type:</label>
                <select id="dropdown" name="dropdown">
                <option value = 'default'>Select an Option</option>
                <option value="fruit">Fruit</option>
                <option value="vegetable">Vegetable</option>
                <option value="meat">Meat</option>
                <option value="foodgrains">Foodgrains</option>
                <option value = 'spice'>Spice/Condiment</option>
                <option value = 'Other'>Other</option>
                </select>
            </div>
        </form>
    );
}

const ingredientList = ({ ingredients}) => (
    <ul>
        {ingredients.map((ingredient, index) => 
        <li key = {index}>
            {ingredient.name} (Type: {ingredient.type})
        </li>
    )}
    </ul>
);
// function pantryList () {
//     const [ingredients, changeIngredients] = useState([]);
    
//     const [inputIngredient, setInput] = useState('');

//     function addIngredient () {

//         if (inputIngredient.trim() !== '') {
//             changeIngredients([...ingredients, inputIngredient.trim()]);
//             setInput('');
//         }
//     }

//     function removeIngredient () {
//         const updatedList = [...ingredients];
//         updatedList.splice(index, 1);
//         changeIngredients(updatedList);
//     }

    return (
        <div>
            <h1>
                Your Pantry List
            </h1>
            <input
            type= 
            
        </div>
    )
}