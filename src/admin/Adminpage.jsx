import React, { useEffect, useState } from "react";
import useFetch from "../customhooks/useFetch";
import { supabase } from "../supabaseClient";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { Loading } from "./components/Loading";
import { Nav } from "./components/Nav";
import {
     Package,
     TrendingUp,
     ShoppingCart,
     AlertCircle,
     Search,
     Filter,
     Pencil,
     Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "./components/ProductCard";

const Adminpage = () => {
     const MySwal = withReactContent(Swal);
     const [products, setProducts] = useState([]);
     const [loading, setloading] = useState(false);
     const [searchQuery, setSearchQuery] = useState("");
     const [filterCategory, setFilterCategory] = useState("all");
     const [categories, setCategories] = useState([{name:"all",id:"all"}])

     const [data, error] = useFetch({
          tableName: "Products",
          selectStatment: `
    id,
    name,
    description,
    imgURL,
    price,
    category,
    Categories:category(id, name),
    offer_price,
    isOffer,
    available,
    created_at,
    isHot,
 product_size(
      Sizes:size(size)
    ),
    products_colors!products_colors_product_id_fkey(Colors:color_id(color, ColorName))
  `,
     });
useEffect(() => {
     if(error)
               Swal.fire({
               title: "ERROR!!!",
               text: JSON.stringify(error),
               icon: "warning",
               showCancelButton: false,
               confirmButtonColor: "#ff53c6ff",
               confirmButtonText: "ok",
          })
}, [error]);
     const onDelete = async (id) => {
          const res = await Swal.fire({
               title: "تاكيد الحذف؟",
               text: "هل انت متاكد من حذف هذا المنتج؟",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               confirmButtonText: "امسح الان",
          });
          if (res.isConfirmed) {
               setloading(true);
               const { error } = await supabase
                    .from("Products")
                    .delete()
                    .eq("id", id);
               setloading(false);
               if (!error) {
                    setProducts((prevProducts) =>
                         prevProducts.filter((product) => product.id !== id)
                    );
                    Swal.fire({
                         title: "تم الحذف",
                         text: "تم حذف المنتج",
                         icon: "success",
                    });
               } else {
                    Swal.fire({
                         title: "Error!",
                         text: "لم يتم حذف المنتج!",
                         icon: "error",
                    });
               }
          }
     };


     const [categoriesData, categoriesError] = useFetch({
          tableName: "categories",
          selectStatment:"id,name"
     });

     // Get unique categories
     useEffect(() => {
          setCategories([{ name: "الكل", id: "all" }, ...categoriesData]);
          console.log(categories);
          
     }, [categoriesData]);

     useEffect(() => {
          setProducts(data);
          console.log(data);
          
     }, [data]);

     // Calculate stats
     const totalProducts = products.length;
     const availableProducts = products.filter((p) => p.available).length;
     const productsOnOffer = products.filter((p) => p.isOffer).length;
     const outOfStock = products.filter((p) => !p.available).length;



     // Filter products
     const filteredProducts = products.filter((product) => {
          const matchesSearch = product.name
               .toLowerCase()
               .includes(searchQuery.toLowerCase());
          const matchesCategory =
               filterCategory === "all" || product.category === filterCategory;
          return matchesSearch && matchesCategory;
     });

     return (
          <div className="min-h-screen flex flex-col bg-gray-50" dir="rtl">
               {loading && <Loading />}
               <Nav />

               {/* Main Content */}
               <div className="max-w-full overflow-hidden mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
                    {/* Header */}
                    <div className="mb-8">
                         <h1 className="text-3xl font-bold text-gray-900 mb-2">
                              لوحة التحكم
                         </h1>
                         <p className="text-gray-600">
                              إدارة المنتجات والمخزون
                         </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="flex flex-wrap justify-center gap-3 mb-8 max-w-[100vw]">
                         <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                              <div className="flex items-center justify-between">
                                   <div>
                                        <p className="text-sm text-gray-600 mb-1">
                                             إجمالي المنتجات
                                        </p>
                                        <h3 className="text-2xl font-bold text-gray-900">
                                             {totalProducts}
                                        </h3>
                                   </div>
                                   <div className="p-3 rounded-full bg-blue-500">
                                        <Package
                                             size={24}
                                             className="text-white"
                                        />
                                   </div>
                              </div>
                         </div>

                         <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                              <div className="flex items-center justify-between">
                                   <div>
                                        <p className="text-sm text-gray-600 mb-1">
                                             المنتجات المتاحة
                                        </p>
                                        <h3 className="text-2xl font-bold text-gray-900">
                                             {availableProducts}
                                        </h3>
                                   </div>
                                   <div className="p-3 rounded-full bg-green-500">
                                        <ShoppingCart
                                             size={24}
                                             className="text-white"
                                        />
                                   </div>
                              </div>
                         </div>

                         <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                              <div className="flex items-center justify-between">
                                   <div>
                                        <p className="text-sm text-gray-600 mb-1">
                                             العروض النشطة
                                        </p>
                                        <h3 className="text-2xl font-bold text-gray-900">
                                             {productsOnOffer}
                                        </h3>
                                   </div>
                                   <div className="p-3 rounded-full bg-purple-500">
                                        <TrendingUp
                                             size={24}
                                             className="text-white"
                                        />
                                   </div>
                              </div>
                         </div>

                         <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                              <div className="flex items-center justify-between">
                                   <div>
                                        <p className="text-sm text-gray-600 mb-1">
                                             نفذت من المخزن
                                        </p>
                                        <h3 className="text-2xl font-bold text-gray-900">
                                             {outOfStock}
                                        </h3>
                                   </div>
                                   <div className="p-3 rounded-full bg-red-500">
                                        <AlertCircle
                                             size={24}
                                             className="text-white"
                                        />
                                   </div>
                              </div>
                         </div>
                    </div>

                    {/* Filters & Search */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
                         <div className="flex flex-col lg:flex-row gap-4">
                              <div className="flex-1 relative">
                                   <Search
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                        size={20}
                                   />
                                   <input
                                        type="text"
                                        placeholder="البحث عن منتج..."
                                        value={searchQuery}
                                        onChange={(e) =>
                                             setSearchQuery(e.target.value)
                                        }
                                        className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                   />
                              </div>

                              <div className="flex items-center gap-2">
                                   <Filter
                                        size={20}
                                        className="text-gray-400"
                                   />
                                   <select
                                        value={filterCategory}
                                        onChange={(e) =>
                                             setFilterCategory(e.target.value)
                                        }
                                        className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                   >
                                        {categories.map((cat) => (
                                             <option key={cat.id} value={cat.id}>
                                                  {cat === "الكل"
                                                       ? "جميع التصنيفات"
                                                       : cat.name}
                                             </option>
                                        ))}
                                   </select>
                              </div>
                         </div>
                    </div>

                    {/* Products Grid */}
                    <div className="mb-4">
                         <h2 className="text-xl font-semibold text-gray-900 mb-4">
                              المنتجات ({filteredProducts.length})
                         </h2>
                    </div>

                    {filteredProducts.length === 0 ? (
                         <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
                              <Package
                                   size={48}
                                   className="mx-auto text-gray-400 mb-4"
                              />
                              <h3 className="text-lg font-medium text-gray-900 mb-2">
                                   لا توجد منتجات
                              </h3>
                              <p className="text-gray-600">
                                   {searchQuery || filterCategory !== "all"
                                        ? "لم يتم العثور على منتجات تطابق البحث"
                                        : "ابدأ بإضافة منتجات جديدة"}
                              </p>
                         </div>
                    ) : (
                         <div className="bg-white rounded-lg shadow-sm border border-gray-100 ">
                              <div className="flex flex-col overflow-x-scroll"> {filteredProducts.map((p) => {
                                   return <ProductCard product={p} key={p.id} onDelete={onDelete} />;
                              })}
                              </div>
                         </div>
                    )}
               </div>
          </div>
     );
};

export default Adminpage;
