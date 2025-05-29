import { AddCards } from "../components/add-cards"
import { AddPasswords } from "../components/add-passwords"
import { YourCards } from "../components/your-cards"
import { YourPasswords } from "../components/your-passwords"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">Password Manager</h1>
          <p className="text-slate-600 dark:text-slate-400">Securely manage your passwords and credit cards</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">Add Credit Cards</h2>
              <AddCards />
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">Add Your Passwords</h2>
              <AddPasswords />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">Your Cards</h2>
              <YourCards />
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">Your Passwords</h2>
              <YourPasswords />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
