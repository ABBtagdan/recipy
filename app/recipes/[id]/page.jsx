import { auth, clerkClient } from "@clerk/nextjs";
import { getRecipe } from "@/app/api/supabase";

export default async function recipiePage({ params }) {
  const id = params.id;

  const { getToken } = auth();

  const getData = async () => {
    const token = await getToken({ template: "supabase" });

    return await getRecipe(id, token);
  };

  const { data: recipeData, error } = await getData();

  const user = await clerkClient.users.getUser(recipeData[0].user_id);

  return (
    <div className="p-5 w-full">
      <div className="text-5xl font-bold">{recipeData[0].Title}</div>
      <div className="text-md font-thin text-gray-200">By: {user.username}</div>
      <div className="mt-10">
        <div className="font-bold text-xl">Ingredients:</div>
        {recipeData[0].Ingredients.map((value, index) => (
          <div key={index}>- {value}</div>
        ))}
      </div>
      <div className="mt-10">
        <div className="font font-light">{recipeData[0].Time}</div>
        <div className="font-bold text-xl">Instructions:</div>
        {recipeData[0].Instructions}
      </div>
    </div>
  );
}
