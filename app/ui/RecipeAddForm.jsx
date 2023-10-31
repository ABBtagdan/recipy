"use client"
import { useState } from "react"
import { createRecipe} from "../api/supabase.js";
import { useAuth } from "@clerk/nextjs"


export default function RecipeAddForm(){ 

    let [titleValue, setTitleValue] = useState("");
    let [ingredientValue, setIngredientValue] = useState("");
    let [ingredients, setIngredients] = useState([""])

    const { getToken, userId } = useAuth();


    function addIngredient(){
        if(ingredientValue == null || ingredientValue.trim() == '') return
        setIngredients([ingredientValue, ...ingredients])
        setIngredientValue("")
    }

    return (
        <div className="w-full h-full bg-gray-600 flex flex-row">
            <div className="bg-gray-500 w-1/2 p-5">
                <input type="text" id="title" placeholder="Title" className="bg-white rounded-full text-black p-2 text-sm" onChange={(e)=>{setTitleValue(e.target.value)}}/>
                <div className="flex flex-row gap-5 my-5">
                    <input type="text" id="ingredient" placeholder="Ingredient" className="bg-white rounded-full text-black p-2 text-sm" value={ingredientValue} onChange={(e)=>{setIngredientValue(e.target.value)}}/>
                    <button onClick={addIngredient}>ADD</button>
                </div>
                
                <ul className="mb-5">
                    {ingredients.map((value, index)=>(<li key={index}>
                        {value}
                    </li>))}
                </ul>
                <button className="bg-black rounded-full p-2 text-center" onClick={()=>{createRecipe({userId: userId, Title: titleValue, Ingredients: ingredients}, getToken)}}>Create Recipe</button>
            </div>
        </div>
    )
}