document.addEventListener('DOMContentLoaded', function () {
    
    //reset form fields each time page is reloaded
    document.getElementById('ingredientForm').reset()

    ingredientButton = document.getElementById('ingredient');
    pantryListButton = document.getElementById('pantry');
    recomButton = document.getElementById('recommendations');

    let dropdown = document.getElementById('dropdown');
    const dateWrapper = document.getElementById('dateWrapper');

    //making sure that user can't put a past date as expiry date
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('dateInput').setAttribute('min', today);

    //event listener so that the expiry date column is not visible for inapplicable items
    dropdown.addEventListener('change', function() {
        if (dropdown.value == 'spice' || dropdown.value == 'default') {
            dateWrapper.style.display = 'none';
        }
        else {
            dateWrapper.style.display = 'inline';
        }
    })

    let showIngForm = false;
    let showPantry = false;
    let showRecom = false;
    
    //making sure other overlays are hidden when item addition button is clicked
    ingredientButton.addEventListener('click', function () {
        if (!showIngForm) {
        showPantry = false;
        document.getElementById('pantryList').style.display = 'none';
        pantryListButton.style.backgroundColor = '';
        
        showRecom = false;
        document.getElementById('recommendation').style.display = 'none';
        recomButton.style.backgroundColor = '';

        showIngForm = true;
        document.getElementById('ingredientForm').style.display = 'block';
        ingredientButton.style.backgroundColor = 'rgb(15,0,74)';
        }

        else {
            document.getElementById('ingredientForm').style.display = 'none';
            ingredientButton.style.backgroundColor = '';
            showIngForm = false;

        }
    })

    //making sure other overlays are hidden when user tries to see their current pantry list
    pantryListButton.addEventListener('click', function () {
        if (!showPantry) {
            showIngForm = false;
            document.getElementById('ingredientForm').style.display = 'none';
            ingredientButton.style.backgroundColor = '';

            showRecom = false;
            document.getElementById('recommendation').style.display = 'none';
            recomButton.style.backgroundColor = '';

            showPantry = true;
            document.getElementById('pantryList').style.display = 'block';
            pantryListButton.style.backgroundColor = 'rgb(15,0,74)';
        }

        else {
            document.getElementById('pantryList').style.display = 'none';
            pantryListButton.style.backgroundColor = '';
            showPantry = false;
        }
    })

    recomButton.addEventListener('click', function () {
        if (!showRecom) {
            showPantry = false;
            document.getElementById('pantryList').style.display = 'none';
            pantryListButton.style.backgroundColor = '';

            showIngForm = false;
            document.getElementById('ingredientForm').style.display = 'none';
            ingredientButton.style.backgroundColor = '';

            showRecom = true;
            document.getElementById('recommendation').style.display = 'inline';
            recomButton.style.backgroundColor = 'rgb(15,0,74)';
        }

        else {
            showRecom = false;
            document.getElementById('recommendation').style.display = 'none';
            recomButton.style.backgroundColor = '';
        }
    })

});