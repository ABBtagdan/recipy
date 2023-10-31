import { useAuth } from '@clerk/nextjs'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fgkgklznquijtrrwthkt.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function getUserRecipies(userId, getToken) {
    const token = await getToken({ template: 'supabase' })

    supabase.auth.setAuth(token)

    return await supabase.from("Recipies").select("*").eq("user_id", userId)
}

export async function createRecipe(data, getToken) {
    const token = await getToken({ template: 'supabase' })
    supabase.auth.setAuth(token)
    return await supabase.from("Recipies").insert([{ user_id: data.userId, Title: data.Title, Ingredients: data.Ingredients },])
}