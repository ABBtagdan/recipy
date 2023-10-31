import { auth } from "@clerk/nextjs";
import { getUserRecipies } from "../api/supabase";

export default async function UserRecipies(props) {
  let { userId, getToken } = auth();

  const token = await getToken({ template: "supabase" });

  const { data: recipies, error } = await getUserRecipies(userId, token);

  return (
    <h1>
      {recipies.map((value, index) => (
        <div key={index} className="p-5">
          <h1 className="text-2xl font-bold">{value.Title}</h1>
          {value.Ingredients.map((value, index) => (
            <div key={index}>{value}</div>
          ))}
          <div className="font-bold text-lg mt-3">Instructions:</div>
          <div>{value.Instructions}</div>
        </div>
      ))}
    </h1>
  );
}
