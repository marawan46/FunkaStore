import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ProductTable from "./Productstable";
import useFetch from "../customhooks/useFetch";
import { supabase } from "../supabaseClient";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { Loading } from "./components/Loading";
import { Nav } from "./components/Nav";

const Adminpage = () => {
     const MySwal = withReactContent(Swal);
     const [products, setProducts] = useState([]);
     const [loading, setloading] = useState(false)
     const [data, error] = useFetch({
          tableName: "Products",
          selectStatment: `
    id,
    name,
    description,
    imgURL,
    price,
    category,
    offer_price,
    isOffer,
    available,
    created_at,
    isHot,
 product_size(
      Sizes:size(size)
    ),
    products_colors(Colors:color_id(color, ColorName))
  `,
     });

     const onDelete = async (id) => {
          const res = await Swal.fire({
               title: "تاكيد الحذف؟",
               text: "هل انت متاكد من حذف هذا المنتج؟",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               confirmButtonText: "امسح الان",
          })
          if(res.isConfirmed){
              // console.log(res);
               
               setloading(true)
              const {error} = await supabase
                    .from("Products")
                    .delete()
                    .eq("id", id)
               setloading(false)
                    if(!error){
                         setProducts((prevProducts) =>prevProducts.filter((product) => product.id !== id))
                         Swal.fire({
                                   title: "تم الحذف",
                                   text: "تم حذف المنتج",
                                   icon: "success",
                              });
                         }
                    else{
                         Swal.fire({
                              title: "Error!",
                              text: "لم يتم حذف المنتج!",
                              icon: "error",
                              });
                    } 
               }
          }

     useEffect(() => {
          setProducts(data);
          //console.log(data);
     }, [data]);
     return (
          <div className="flex items-start justify-center">
               { loading  && <Loading/> }
               <Nav />
               <ProductTable products={products} onDelete={onDelete} />
          </div>
     );
};

export default Adminpage;
