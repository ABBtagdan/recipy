"use client"
import { useAuth } from "@clerk/nextjs"
import { getUserRecipies } from "../api/supabase"


export default async function UserRecipies(props){

    const {getToken, userId} = useAuth()

    const recipies = await getUserRecipies(userId, getToken)

    return (
        <div></div>
    )
}