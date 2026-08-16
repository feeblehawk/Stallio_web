import { Outlet } from 'react-router-dom'

const AuthLayout = () => (
  <div className="min-h-screen bg-background text-foreground flex flex-col antialiased">
    <main className="flex-grow flex flex-col w-full">
      <Outlet />
    </main>
  </div>
)

export default AuthLayout