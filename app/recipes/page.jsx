import { auth } from "@clerk/nextjs";
import { getPublicRecipes } from "../api/supabase";
import RecipePreviewCard from "../ui/RecipePreviewCard";

export default async function UserRecipes(props) {
  let { userId, getToken } = auth();

  const token = await getToken({ template: "supabase" });

  const { data: recipes, error } = await getPublicRecipes(token);

  return (
    <h1>
      {recipes.map((value, index) => (
        <RecipePreviewCard key={index} data={value}></RecipePreviewCard>
      ))}
    </h1>
  );
}
