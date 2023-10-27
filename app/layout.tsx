import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body>
        <div className="flex flex-row w-full justify-between items-center p-5">
        <div className='text-lg h-full text-center flex flex-row gap-5'>
          Recipy
          <SignedIn>
            <UserButton afterSignOutUrl='/'></UserButton>
          </SignedIn>
          <SignedOut>
            <div className='flex gap-5 flex-row'>
              <SignInButton></SignInButton>
              <SignUpButton></SignUpButton>
            </div>
            
          </SignedOut>
        </div>
        <div className='flex h-full flex-row gap-5'>
          <a href="/">
            Home
          </a>
          <a href="/Recipies/">
            Recipes
          </a>
          <a href ="/aboutUs/">
            About Us
          </a>
        </div>
      </div>
      <div className='h-[50vh]'>
      {children}
      </div>
      </body>
    </html>
    </ClerkProvider>
  )
}
