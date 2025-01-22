const Card = ({ strMeal, strMealThumb, strCategory, strArea, strInstructions, strYoutube, ...ingredients }) => {
    const getIngredients = () => {
      return Object.keys(ingredients)
        .filter((key) => key.startsWith("strIngredient") && ingredients[key])
        .map((key, index) => (
          <li key={index}>
            {ingredients[key]} - {ingredients[`strMeasure${key.slice(13)}`]}
          </li>
        ));
    };
  
    return (
      <div className="border border-gray-700 rounded-lg shadow-md p-6 bg-gray-800 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-2">{strMeal}</h2>
        <img
          src={strMealThumb}
          alt={strMeal}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <p className="mb-2">
          <strong className="text-green-400">Category:</strong> {strCategory}
        </p>
        <p className="mb-2">
          <strong className="text-green-400">Area:</strong> {strArea}
        </p>
        <p className="mb-4 text-center">
          <strong className="text-green-400">Instructions:</strong> {strInstructions.substring(0, 100)}...
        </p>
        <ul className="mb-4 text-center">
          <strong className="text-green-400">Ingredients:</strong>
          {getIngredients()}
        </ul>
        <a
          href={strYoutube}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          Watch on YouTube
        </a>
      </div>
    );
  };
  
  export default Card;  