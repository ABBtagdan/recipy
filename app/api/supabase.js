import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fgkgklznquijtrrwthkt.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function getClient(token) {
  return createClient(supabaseUrl, supabaseKey, {
    db: {
      schema: "public",
    },
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : null,
    },
  });
}

export async function deleteRecipe(token, Id) {
  const supabase = getClient(token);

  const { error } = await supabase.from("Recipes").delete().eq("id", Id);
  return error;
}

export async function getUserRecipes(userId, token) {
  const supabase = getClient(token);

  return await supabase.from("Recipes").select("*").eq("user_id", userId);
}

export async function getPublicRecipes(token) {
  const supabase = getClient(token);

  return await supabase.from("Recipes").select("*").eq("public", true);
}

export async function getRecipe(Id, token) {
  const supabase = getClient(token);

  return await supabase.from("Recipes").select("*").eq("id", Id);
}

export async function createRecipe(data, token, userId) {
  const supabase = getClient(token);

  return await supabase.from("Recipes").insert([
    {
      user_id: userId,
      Title: data.Title,
      Ingredients: data.Ingredients,
      Instructions: data.Instructions,
      public: data.Public,
    },
  ]);
}
