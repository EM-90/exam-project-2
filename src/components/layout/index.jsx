import Footer from "./footer";
import Navbar from "./navbar";
import { Outlet } from "react-router-dom";


function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

     
      <main className="flex-grow mx-auto ">
        <div className="container flex justify-center items-center px-7">
         <Outlet/>
        </div>
      </main>

     
      <footer>
       <Footer />
      </footer>
    </div>
  );
}

export default Layout;
