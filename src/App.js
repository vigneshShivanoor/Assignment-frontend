import React, { useState } from "react";
import axios from "axios";
import "./App.css";

// Define columns globally to avoid redundancy
const columns = [
  { label: "Title", key: "title" },
  { label: "Rating", key: "rating" },
  { label: "Calories", key: "calories" },
  { label: "Protein", key: "protein" },
  { label: "Fat", key: "fat" },
  { label: "Sodium", key: "sodium" },
  { label: "#CakeWeek", key: "#cakeweek" },
  { label: "#WasteLess", key: "#wasteless" },
  { label: "22-Minute Meals", key: "22-minute meals" },
  { label: "3-Ingredient Recipes", key: "3-ingredient recipes" },
  { label: "30 Days of Groceries", key: "30 days of groceries" },
  { label: "Advance Prep Required", key: "advance prep required" },
  { label: "Alabama", key: "alabama" },
  { label: "Alaska", key: "alaska" },
  { label: "Alcoholic", key: "alcoholic" },
  { label: "Almond", key: "almond" },
  { label: "Amaretto", key: "amaretto" },
  { label: "Anchovy", key: "anchovy" },
  { label: "Anise", key: "anise" },
  { label: "Anniversary", key: "anniversary" },
  { label: "Anthony Bourdain", key: "anthony bourdain" },
  { label: "Aperitif", key: "aperitif" },
  { label: "Appetizer", key: "appetizer" },
  { label: "Apple", key: "apple" },
  { label: "Apple Juice", key: "apple juice" },
  { label: "Apricot", key: "apricot" },
  { label: "Arizona", key: "arizona" },
  { label: "Artichoke", key: "artichoke" },
  { label: "Arugula", key: "arugula" },
  { label: "Asian Pear", key: "asian pear" },
  { label: "Asparagus", key: "asparagus" },
  { label: "Aspen", key: "aspen" },
  { label: "Atlanta", key: "atlanta" },
  { label: "Australia", key: "australia" },
  { label: "Avocado", key: "avocado" },
  { label: "Back to School", key: "back to school" },
  { label: "Backyard BBQ", key: "backyard bbq" },
  { label: "Bacon", key: "bacon" },
  { label: "Bake", key: "bake" },
  { label: "Banana", key: "banana" },
  { label: "Barley", key: "barley" },
  { label: "Basil", key: "basil" },
  { label: "Bass", key: "bass" },
  { label: "Bastille Day", key: "bastille day" },
  { label: "Bean", key: "bean" },
  { label: "Beef", key: "beef" },
  { label: "Beef Rib", key: "beef rib" },
  { label: "Beef Shank", key: "beef shank" },
  { label: "Beef Tenderloin", key: "beef tenderloin" },
  { label: "Beer", key: "beer" },
  { label: "Beet", key: "beet" },
  { label: "Bell Pepper", key: "bell pepper" },
  { label: "Berry", key: "berry" },
  { label: "Beverly Hills", key: "beverly hills" },
  { label: "Birthday", key: "birthday" },
  { label: "Biscuit", key: "biscuit" },
  { label: "Bitters", key: "bitters" },
  { label: "Blackberry", key: "blackberry" },
  { label: "Blender", key: "blender" },
  { label: "Blue Cheese", key: "blue cheese" },
  { label: "Blueberry", key: "blueberry" },
  { label: "Boil", key: "boil" },
  { label: "Bok Choy", key: "bok choy" },
  { label: "Bon Appétit", key: "bon appétit" },
  { label: "Boston", key: "boston" },
  { label: "Bourbon", key: "bourbon" },
  { label: "Braise", key: "braise" },
  { label: "Bran", key: "bran" },
  { label: "Brandy", key: "brandy" },
  { label: "Bread", key: "bread" },
  { label: "Breadcrumbs", key: "breadcrumbs" },
  { label: "Breakfast", key: "breakfast" },
  { label: "Brie", key: "brie" },
  { label: "Brine", key: "brine" },
  { label: "Brisket", key: "brisket" },
  { label: "Broccoli", key: "broccoli" },
  { label: "Broccoli Rabe", key: "broccoli rabe" },
  { label: "Broil", key: "broil" },
  { label: "Brooklyn", key: "brooklyn" },
  { label: "Brown Rice", key: "brown rice" },
  { label: "Brownie", key: "brownie" },
  { label: "Brunch", key: "brunch" },
  { label: "Brussel Sprout", key: "brussel sprout" },
  { label: "Buffalo", key: "buffalo" },
  { label: "Buffet", key: "buffet" },
  { label: "Bulgaria", key: "bulgaria" },
  { label: "Bulgur", key: "bulgur" },
  { label: "Burrito", key: "burrito" },
  { label: "Butter", key: "butter" },
  { label: "Buttermilk", key: "buttermilk" },
  { label: "Butternut Squash", key: "butternut squash" },
  { label: "Butterscotch/Caramel", key: "butterscotch/caramel" },
  { label: "Cabbage", key: "cabbage" },
  { label: "Cake", key: "cake" },
  { label: "California", key: "california" },
  { label: "Calvados", key: "calvados" },
  { label: "Cambridge", key: "cambridge" },
  { label: "Campari", key: "campari" },
  { label: "Camping", key: "camping" },
  { label: "Canada", key: "canada" },
  { label: "Candy", key: "candy" },
  { label: "Candy Thermometer", key: "candy thermometer" },
  { label: "Cantaloupe", key: "cantaloupe" },
  { label: "Capers", key: "capers" },
  { label: "Caraway", key: "caraway" },
  { label: "Cardamom", key: "cardamom" },
  { label: "Carrot", key: "carrot" },
  { label: "Cashew", key: "cashew" },
  { label: "Casserole/Gratin", key: "casserole/gratin" },
  { label: "Cauliflower", key: "cauliflower" },
  { label: "Caviar", key: "caviar" },
  { label: "Celery", key: "celery" },
  { label: "Chambord", key: "chambord" },
  { label: "Champagne", key: "champagne" },
  // Continue with the remaining items
];

function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [matchingRecipe, setMatchingRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchRecipes = async () => {
    if (!query) {
      alert("Please enter a recipe name to search!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `http://localhost:8000/search?q=${query}`
      );
      if (response.data.search_results) {
        setRecipes(response.data.search_results);
        setMatchingRecipe(response.data.matching_recipe);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err) {
      setError("Error fetching recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };
// Filter out columns where the key is "NA" or where all values in that column are "N/A"
const getValidColumns = () => {
  const columnKeys = new Set();

  // Collect all column keys that have at least one non-"N/A" value
  recipes.forEach((recipe) => {
    Object.keys(recipe).forEach((key) => {
      if (recipe[key] && recipe[key] !== "N/A") {
        columnKeys.add(key);
      }
    });
  });

  // Return columns that are in the set of valid keys
  return columns.filter((col) => columnKeys.has(col.key));
};

const filteredColumns = getValidColumns();

return (
  <div className="App">
    <h1>Recipe Search Platform</h1>

    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search for a recipe..."
      className="search-input"
    />

    <button onClick={searchRecipes} className="search-button">
      Search
    </button>

    {loading && <div className="loading">Loading...</div>}
    {error && <p style={{ color: "red" }}>{error}</p>}

    <div className="recipe-results">
      <h2>Search Results</h2>
      {recipes.length > 0 ? (
        <table className="recipe-table">
          <thead>
            <tr>
              {filteredColumns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe, index) => (
              <tr key={index}>
                {filteredColumns.map((col) => (
                  <td key={col.key}>
                    {recipe[col.key] && recipe[col.key] !== "N/A" ? recipe[col.key] : null}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No recipes found</p>
      )}
    </div>

    {matchingRecipe && (
      <div className="recipe-details">
        <h2>Detailed Recipe</h2>
        <RecipeDetails recipe={matchingRecipe} />
      </div>
    )}
  </div>
);
}
function RecipeDetails({ recipe }) {
  return (
    <div>
      <h3>{recipe.title}</h3>
      <p>
        <strong>Description:</strong>{" "}
        {recipe.desc || "No description available"}
      </p>
      <p>
        <strong>Ingredients:</strong>
      </p>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <p>
        <strong>Directions:</strong>
      </p>
      <ol>
        {recipe.directions.map((direction, index) => (
          <li key={index}>{direction}</li>
        ))}
      </ol>
      <p>
        <strong>Rating:</strong> {recipe.rating || "N/A"}
      </p>
      <p>
        <strong>Calories:</strong> {recipe.calories || "N/A"}
      </p>
      <p>
        <strong>Protein:</strong> {recipe.protein || "N/A"}
      </p>
      <p>
        <strong>Fat:</strong> {recipe.fat || "N/A"}
      </p>
      <p>
        <strong>Sodium:</strong> {recipe.sodium || "N/A"}
      </p>
    </div>
  );
}

export default App;
