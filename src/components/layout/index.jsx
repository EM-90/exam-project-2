import Footer from "./footer";
import Navbar from "./navbar";


function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

     
      <main className="flex-grow">
        {children}
      </main>

     
      <footer>
      <Footer />
      </footer>
    </div>
  );
}

export default Layout;
