import { Routes,Route } from "react-router-dom";
import Home from "./Pages/Home";
import Adminpage from "./admin/Adminpage";
import Productform from "./admin/Productform";
import Notfound from "./Pages/Notfound";
import Addproduct from "./admin/Addproduct";
import Adminlayout from "./admin/pages/Adminlayout";
export default function App() {

     return (
  <Routes>
      <Route>
        <Route path="*" element={<Notfound/>}/>
        <Route path="/" element={<Home/>}/>
</Route>

      <Route path="/admin-hksGuhI9uj8Hf3agfL/*" element={<Adminlayout/>}>
        <Route index element={<Adminpage/>} />
        <Route path="productform/:id" element={<Productform/>}/>
        <Route path="addproduct" element={<Addproduct/>}/>
      </Route>
</Routes>

     );
}
