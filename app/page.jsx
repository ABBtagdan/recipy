import { SignedIn} from "@clerk/nextjs"
import RecipeAddForm from "./ui/RecipeAddForm"
import UserRecipies from "./ui/UserRecipies"

// const user = await currentUser()

export default function Home() {
  return (
    <div className="h-full w-full">
      <SignedIn>
        <RecipeAddForm/>
        <UserRecipies></UserRecipies>
      </SignedIn>
    </div>
  )
}