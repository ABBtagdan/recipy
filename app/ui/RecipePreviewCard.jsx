export default function RecipePreviewCard(props) {
  let IngredientsString = "";
  for (let i = 0; i < props.data.Ingredients.length; i++) {
    if (i != 0) IngredientsString += ", ";
    IngredientsString += props.data.Ingredients[i];
  }

  return (
    <a href={`/recipes/${props.data.id}`}>
      <div className="w-80 m-5">
        <h1 className="text-2xl font-bold text-center">{props.data.Title}</h1>
        <div className="font-bold text-lg mt-3 text-center">Ingredients:</div>
        <div className="text-center">{IngredientsString}</div>
      </div>
    </a>
  );
}
