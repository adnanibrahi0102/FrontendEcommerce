import Footer from "./Footer";
import Header from "./Header";
import { Toaster } from 'react-hot-toast';

// eslint-disable-next-line react/prop-types
const Layout = ({children}) => {
  return (
    <div >
      <Header/>
     <main style={{minHeight:'70vh'}}>
      <Toaster/>
     {children}
     </main>
     <Footer/>
    </div>
  )
}

export default Layout;