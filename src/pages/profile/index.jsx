import { useState } from "react"

function profile() {

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  if(!isLoggedIn) {
    setIsLoggedIn(false);
  }

  return (
    <div>
      <h1>Profile</h1>
    </div>
  )
}

export default profile
