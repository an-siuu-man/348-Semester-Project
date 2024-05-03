#include <iostream>
#include <map>
#include <vector>
#include <string>
#include <algorithm>

class Ingredient {
public:
    std::string name;
    int quantity;
    std::string quantityType;
    std::string expiryDate;
    int category; // 1 = meat, 2 = grain, 3 = vegetable, 4 = spice, etc.
    int calories; // Optional calorie information

    // Default constructor
    Ingredient() : name(""), quantity(0), quantityType(""), expiryDate(""), category(0), calories(0) {}

    // Parameterized constructor
    Ingredient(const std::string& name, int quantity, const std::string& quantityType,const std::string& expiryDate, int category, int calories = 0)
        : name(name), quantity(quantity), quantityType(quantityType) ,expiryDate(expiryDate), category(category), calories(calories) {}
};

class Recipe {
public:
    std::string name;
    std::vector<std::string> ingredients;
    std::string description;
    int totalCalories;

    Recipe(const std::string& name, const std::vector<std::string>& ingredients, const std::string& description, int totalCalories)
        : name(name), ingredients(ingredients), description(description), totalCalories(totalCalories) {}
};

class ShelfSmart {
private:
    std::map<std::string, Ingredient> inventory; // Map of ingredients by name
    std::vector<Recipe> recipes;

public:
    // Function to add ingredients to inventory
    void addIngredient(const std::string& name, int quantity, const std::string& quantityType, const std::string& expiryDate, int category, int calories = 0) {
        inventory[name] = Ingredient(name, quantity, quantityType, expiryDate, category, calories);
    }

    // Function to add recipes
    void addRecipe(const Recipe& recipe) {
        recipes.push_back(recipe);
    }

    // Function to display inventory
    void displayInventory() {
        std::cout << "Inventory:\n";
        for (const auto& pair : inventory) {
            const auto& ingredient = pair.second;
            std::cout << "- " << ingredient.name << " (" << ingredient.quantity << " " << ingredient.quantityType << ") - Expires on " << ingredient.expiryDate;
            if (ingredient.calories > 0) {
                std::cout << " - Calories: " << ingredient.calories;
            }
            std::cout << std::endl;
        }
    }

    // Function to recommend recipes based on inventory
    void recommendRecipes() {
        std::cout << "\nPersonalized Recommendations:\n";
        std::vector<Recipe> possibleRecipes;

        // Filter recipes based on available ingredients
        for (const auto& recipe : recipes) {
            bool canMake = true;
            for (const auto& ingredientName : recipe.ingredients) {
                if (inventory.find(ingredientName) == inventory.end() || inventory[ingredientName].quantity <= 0) {
                    canMake = false;
                    break;
                }
            }
            if (canMake) {
                possibleRecipes.push_back(recipe);
            }
        }

        // Sort recipes by total calories (low to high)
        std::sort(possibleRecipes.begin(), possibleRecipes.end(), [](const Recipe& a, const Recipe& b) {
            return a.totalCalories < b.totalCalories;
        });

        // Display the top 3 recipes
        int count = 0;
        for (const auto& recipe : possibleRecipes) {
            if (count >= 3) break;
            std::cout << "- " << recipe.name << ": " << recipe.description << " - Total calories: " << recipe.totalCalories << std::endl;
            count++;
        }
    }
};

int main() {
    ShelfSmart shelfSmart;

    // Adding some sample recipes (can be expanded)
    shelfSmart.addRecipe(Recipe("Chicken and Rice", {"Chicken Breast", "Rice", "Carrot", "Garlic"}, "A delicious combination of chicken and rice with vegetables.", 412));
    shelfSmart.addRecipe(Recipe("Vegetable Soup", {"Carrot", "Garlic"}, "A healthy and comforting vegetable soup.", 41));
    shelfSmart.addRecipe(Recipe("Spaghetti Carbonara", {"Spaghetti", "Bacon", "Eggs", "Parmesan Cheese", "Black Pepper"}, "A classic Italian pasta dish.", 540));
    shelfSmart.addRecipe(Recipe("Grilled Salmon", {"Salmon Fillet", "Lemon", "Garlic", "Olive Oil"}, "Grilled salmon seasoned with lemon and garlic.", 350));
    shelfSmart.addRecipe(Recipe("Quinoa Salad", {"Quinoa", "Cucumber", "Tomato", "Red Onion", "Feta Cheese", "Lemon Juice", "Olive Oil"}, "A refreshing and nutritious salad with quinoa.", 250));
    shelfSmart.addRecipe(Recipe("Beef Stir-Fry", {"Beef Strips", "Bell Peppers", "Broccoli", "Soy Sauce", "Garlic", "Ginger"}, "A quick and flavorful beef stir-fry.", 380));
    shelfSmart.addRecipe(Recipe("Mushroom Risotto", {"Arborio Rice", "Mushrooms", "White Wine", "Parmesan Cheese", "Onion", "Garlic", "Vegetable Broth"}, "Creamy and savory mushroom risotto.", 420));
    shelfSmart.addRecipe(Recipe("Chickpea Curry", {"Chickpeas", "Tomatoes", "Coconut Milk", "Onion", "Garlic", "Ginger", "Curry Powder"}, "A fragrant and spicy chickpea curry.", 320));
    shelfSmart.addRecipe(Recipe("Caprese Salad", {"Tomatoes", "Fresh Mozzarella", "Basil Leaves", "Balsamic Glaze", "Olive Oil"}, "A simple and elegant salad with tomatoes and mozzarella.", 180));
    shelfSmart.addRecipe(Recipe("Tofu Stir-Fry", {"Tofu", "Broccoli", "Carrots", "Bell Peppers", "Soy Sauce", "Sesame Oil", "Garlic", "Ginger"}, "A vegetarian stir-fry with tofu and vegetables.", 280));
    shelfSmart.addRecipe(Recipe("Lentil Soup", {"Lentils", "Carrots", "Celery", "Onion", "Garlic", "Vegetable Broth", "Tomatoes"}, "A hearty and nutritious soup made with lentils and vegetables.", 220));


    int choice;
    bool exit = false;

    while (!exit) {
        std::cout << "\nShelf-Smart Menu:\n";
        std::cout << "1. Add Ingredient\n";
        std::cout << "2. Display Inventory\n";
        std::cout << "3. Recommend Recipes\n";
        std::cout << "4. Exit\n";
        std::cout << "Enter your choice: ";
        std::cin >> choice;

        switch (choice) {
            case 1: {
                // Adding a new ingredient
                std::string name, expiryDate, quantityType;
                int quantity, category, calories = 0;

                std::cout << "Enter ingredient name: ";
                std::cin.ignore();
                std::getline(std::cin, name);
                
                std::cout << "Enter quantity: ";
                std::cin >> quantity;

                std::cout << "Enter quantity type (lbs/tsp/count): ";
                std::cin >> quantityType;

                std::cout << "Enter expiry date (YYYY-MM-DD): ";
                std::cin.ignore();
                std::getline(std::cin, expiryDate);

                std::cout << "Enter category (1 = meat, 2 = grain, 3 = vegetable, 4 = spice): ";
                std::cin >> category;

                std::cout << "Enter calories (optional, 0 for none): ";
                std::cin >> calories;

                shelfSmart.addIngredient(name, quantity, quantityType, expiryDate, category, calories);
                std::cout << "Ingredient added successfully!\n";
                break;
            }
            case 2:
                // Display inventory
                shelfSmart.displayInventory();
                break;
            case 3:
                // Recommend recipes based on inventory
                shelfSmart.recommendRecipes();
                break;
            case 4:
                // Exit the program
                std::cout << "Exiting the program. Goodbye!\n";
                exit = true;
                break;
            default:
                std::cout << "Invalid choice. Please try again.\n";
                break;
        }
    }

    return 0;
}
