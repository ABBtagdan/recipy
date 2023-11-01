import { SignedIn } from "@clerk/nextjs";
import RecipeAddForm from "./ui/RecipeAddForm";
import UserRecipes from "./ui/UserRecipes";

// const user = await currentUser()

export default function Home() {
  return (
    <div className="h-full w-full">
      <SignedIn>
        <RecipeAddForm />
        <UserRecipes></UserRecipes>
      </SignedIn>
    </div>
  );
}
