import { auth, useAuth } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fgkgklznquijtrrwthkt.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function getUserRecipies(userId, token) {
  const supabase = createClient(supabaseUrl, supabaseKey, {
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

  return await supabase.from("Recipies").select("*").eq("user_id", userId);
}

export async function createRecipe(data, token, userId) {
  console.log(token);

  const supabase = createClient(supabaseUrl, supabaseKey, {
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

  return await supabase.from("Recipies").insert([
    {
      user_id: userId,
      Title: data.Title,
      Ingredients: data.Ingredients,
      Instructions: data.Instructions,
    },
  ]);
}
