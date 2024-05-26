import Footer from "./footer";
import Navbar from "./navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <article className=" flex flex-col min-h-screen">
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      <section className="flex-grow">
        <main>
          <Outlet />
        </main>
      </section>

      <footer>
        <Footer />
      </footer>
    </article>
  );
}

export default Layout;
