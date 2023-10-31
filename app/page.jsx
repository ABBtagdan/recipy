import { SignedIn, currentUser} from "@clerk/nextjs"
import RecipeAddForm from "./ui/RecipeAddForm"
import UserRecipies from "./ui/UserRecipies"

export default async function Home() {

  let user = await currentUser()
  if (!user) user = {id: -1}

  return (
    <div className="h-full w-full">
      <SignedIn>
        <RecipeAddForm userId={user.id}/>
        <UserRecipies userId={user.id}>

        </UserRecipies>
      </SignedIn>
    </div>
  )
}