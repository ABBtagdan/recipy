"use client";
import { useState } from "react";
import { createRecipe } from "../api/supabase";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function RecipeAddForm() {
  const router = useRouter();

  const { getToken, userId } = useAuth();

  let [titleValue, setTitleValue] = useState("");
  let [ingredientValue, setIngredientValue] = useState("");
  let [ingredients, setIngredients] = useState([]);
  let [instructions, setInstructions] = useState("");
  let [Public, setPublic] = useState(false);

  const create = async () => {
    if (titleValue.trim() == "") return;
    if (ingredients.length == 0) return;
    let token = await getToken({ template: "supabase" });
    createRecipe(
      {
        Title: titleValue,
        Ingredients: ingredients,
        Instructions: instructions,
        Public: Public,
      },
      token,
      userId
    );
    setIngredients([]);
    setTitleValue("");
    setInstructions("");
    setPublic(false);
    router.refresh();
  };

  function addIngredient() {
    if (ingredientValue == null || ingredientValue.trim() == "") return;
    setIngredients([ingredientValue, ...ingredients]);
    setIngredientValue("");
  }

  return (
    <div className="w-full h-full bg-gray-600 flex flex-row">
      <div className="bg-gray-500 w-1/2 p-5">
        <input
          type="text"
          id="title"
          placeholder="Title"
          className="bg-white rounded-full text-black p-2 text-sm"
          value={titleValue}
          onChange={(e) => {
            setTitleValue(e.target.value);
          }}
        />
        <div className="flex flex-row gap-5 my-5">
          <input
            type="text"
            id="ingredient"
            placeholder="Ingredient"
            className="bg-white rounded-full text-black p-2 text-sm"
            onKeyUp={(e) => {
              e.key == "Enter" ? addIngredient() : null;
            }}
            value={ingredientValue}
            onChange={(e) => {
              setIngredientValue(e.target.value);
            }}
          />
          <button onClick={addIngredient}>ADD</button>
        </div>

        <ul className="mb-5">
          {ingredients.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
        <input
          type="checkbox"
          value={Public}
          onChange={(e) => setPublic(e.target.value)}
        />
      </div>
      <div className="w-1/2 flex flex-col gap-5 justify-start items-center m-5">
        <textarea
          className="text-black border-1 border-black h-full w-3/5 resize-none"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        ></textarea>
        <button
          className="bg-black rounded-full p-2 text-center"
          onClick={create}
        >
          Create Recipe
        </button>
      </div>
    </div>
  );
}
