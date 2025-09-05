import { Outlet } from "react-router"

function App() {
  return (
    <div className='max-w-[1200px] mx-auto px-4 mt-10'>
      <Outlet />
    </div>
  )
}

export default App
