import { auth } from "@clerk/nextjs";
import { getUserRecipes } from "../api/supabase";
import RecipePreviewCard from "./RecipePreviewCard";

export default async function UserRecipes(props) {
  let { userId, getToken } = auth();

  const token = await getToken({ template: "supabase" });

  const { data: recipes, error } = await getUserRecipes(userId, token);

  return (
    <div className="flex w-full justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4">
        {recipes.map((value, index) => (
          <RecipePreviewCard key={index} data={value} />
        ))}
      </div>
    </div>
  );
}
