import { useState } from "react";
import Header from "./components/header";

function App() {
  const [recipe, setRecipe] = useState("");
  const [dish, setDish] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const findRecipe = async () => {
    if (recipe.trim().length < 3) {
      setError("Please enter at least 3 characters.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      if (data.meals) {
        setDish(data);
      } else {
        setDish(null);
        setError("No recipes found.");
      }
    } catch (error) {
      setError(error.message);
      setDish(null);
    } finally {
      setLoading(false);
    }
  };

  const getIngredients = (meal) => {
    return Object.keys(meal)
      .filter((key) => key.startsWith("strIngredient") && meal[key])
      .map((key, index) => (
        <li key={index}>
          {meal[key]} - {meal[`strMeasure${key.slice(13)}`]}
        </li>
      ));
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white p-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full max-w-md">
          <input
            type="text"
            onChange={(e) => setRecipe(e.target.value)}
            value={recipe}
            placeholder="Enter recipe name"
            className="px-4 py-2 rounded-md shadow-md text-black border border-gray-300 w-full focus:ring-2 focus:ring-green-500 outline-none"
            aria-label="Enter recipe name"
            onKeyDown={(e) => e.key === 'Enter' && findRecipe()}
          />
          <button
            className={`px-4 py-2 rounded-md shadow-md focus:outline-none w-full md:w-auto ${
              recipe.length < 3 || loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
            aria-label="Search Recipe"
            onClick={findRecipe}
            disabled={recipe.length < 3 || loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {dish && dish.meals && (
          <div className="mt-8 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dish.meals.map((meal) => (
              <div
                key={meal.idMeal}
                className="border border-gray-700 rounded-lg shadow-md p-6 bg-gray-800 flex flex-col items-center"
              >
                <h2 className="text-2xl font-bold mb-2">{meal.strMeal}</h2>
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-64 object-cover rounded-md mb-4"
                />
                <p className="mb-2">
                  <strong className="text-green-400">Category:</strong>{" "}
                  {meal.strCategory}
                </p>
                <p className="mb-2">
                  <strong className="text-green-400">Area:</strong>{" "}
                  {meal.strArea}
                </p>
                <p className="mb-4 text-center">
                  <strong className="text-green-400">Instructions:</strong>{" "}
                  {meal.strInstructions.substring(0, 100)}...
                </p>
                <ul className="mb-4 text-center">
                  <strong className="text-green-400">Ingredients:</strong>
                  {getIngredients(meal)}
                </ul>
                <a
                  href={meal.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Watch on YouTube
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
