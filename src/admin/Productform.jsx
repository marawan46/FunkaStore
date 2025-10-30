import { useEffect, useState } from "react";
import {
     Upload,
     Tag,
     Palette,
     Ruler,
     Sparkles,
     TrendingUp,
     Check,
     Image,
     Pencil,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../customhooks/useFetch";
import { Spinner, Textarea } from "@material-tailwind/react";
import { supabase } from "../supabaseClient";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Loading } from "./components/Loading";


const Productform = () => {
     const navigate = useNavigate()
     const { id } = useParams();
     const MySwal = withReactContent(Swal)

     const [loading, setloading] = useState(false)
     const [product, setProduct] = useState({
          name: "",
          price: "",
          description:"",
          offer_price: "",
          imageURL: "",
          category: "عبايات",
          colors: [],
          sizes: [],
          isOffer: false,
          isHot: false,
          available: true,
     });
     const handleUpdate = async () => {
          try {
               setloading(true)
               // Step 1: Insert Product
               const { error: updateProductError } = await supabase
                    .from("Products")
                    .update({
                         name: product.name,
                         description: product.description,
                         price: Number(product.price),
                         offer_price: Number(product.offer_price),
                         imgURL: product.imageURL,
                         category: product.category, // category ID
                         isOffer: product.isOffer,
                         isHot: product.isHot,
                         available: product.available,
                    })
                    .eq('id',id);

               if (updateProductError) throw updateProductError;

               const productId = id;

               // Step 2: Insert Sizes (junction table)
               if (product.sizes.length > 0) {
                    const sizesToInsert = product.sizes.map((sizeId) => ({
                         product_id: productId,
                         size: sizeId, // size ID from Sizes table
                    }));
                    //delete first
                    const { error: dleteSizesError } = await supabase
                         .from("product_size")
                         .delete()
                         .eq("product_id", productId);

                    if (dleteSizesError) throw dleteSizesError;

                    //then insert
                    const { error: insertSizesError } = await supabase
                         .from("product_size")
                         .insert(sizesToInsert);

                    if (insertSizesError) throw insertSizesError;
               }

               // Step 3: Insert Colors (junction table)
               if (product.colors.length > 0) {
                    const colorsToInsert = product.colors.map((colorId) => ({
                         product_id: productId,
                         color_id: colorId, // color ID from Colors table
                    }));
                    //delete first
                    const { error: deleteColorsError } = await supabase
                         .from("products_colors")
                         .delete()
                         .eq("product_id", productId);
                    if (deleteColorsError) throw deleteColorsError;

                    const { error: insertColorsError } = await supabase
                         .from("products_colors")
                         .insert(colorsToInsert);
                    if (insertColorsError) throw insertColorsError;
               }

               //console.log("تم إضافة المنتج بنجاح!");
               setloading(false)
               MySwal.fire({
               title: <strong>نجح!</strong>,
               html: <i>تم التعديل بنجاح</i>,
               icon: 'success'
               }).then((res)=>{
                    if(res.isConfirmed)
                         navigate(-1)
               }
               )
          } catch (error) {
               setloading(false)
               console.error("Error:", error);
                              MySwal.fire({
               title: <strong>خطا!</strong>,
               html: <i>حدث خطا ما {error.message}</i>,
               icon: 'error'
               }).then((res)=>{
                    if(res.isConfirmed)
                         navigate(-1)
               }
               )
          }
     };
     const [sizesList, sizesError] = useFetch({ tableName: "Sizes" });
     const [colorsList, colorsError] = useFetch({ tableName: "Colors" });
     const [categories, categoriesError] = useFetch({tableName: "categories"});
     const [productData, productError] = useFetch({
          tableName: "Products",
          selectStatment: `
      id, name, imgURL, price, category, offer_price,
      isOffer, available, isHot,
      product_size(Sizes:size(size, id)),
      products_colors(Colors:color_id(color, ColorName,id))
    `,
          filter: "id",
          condition: id,
     });
     console.log(sizesList, colorsList, categories, productData);

     useEffect(() => {
          if (productData?.[0]) {
               const p = productData[0];
               setProduct({
                    name: p.name || "",
                    price: p.price || "",
                    offer_price: p.offer_price || "",
                    imageURL: p.imgURL || "",
                    category: p.category || "",
                    colors:
                         p.products_colors?.map((pc) => pc.Colors.id) || [],
                    sizes: p.product_size?.map((ps) => ps.Sizes.id) || [],
                    isOffer: p.isOffer || false,
                    isHot: p.isHot || false,
                    available: p.available ?? true,
               });
          }
     }, [productData]);
console.log();

     const toggleColor = (hex) => {
          setProduct((prev) => ({
               ...prev,
               colors: prev.colors.includes(hex)
                    ? prev.colors.filter((c) => c !== hex)
                    : [...prev.colors, hex],
          }));
     };

     const toggleSize = (size) => {
          setProduct((prev) => ({
               ...prev,
               sizes: prev.sizes.includes(size)
                    ? prev.sizes.filter((s) => s !== size)
                    : [...prev.sizes, size],
          }));
     };

     return (
          
          <div
               className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8"
               dir="rtl"
          >
               {loading && <Loading />}
               <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                         <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                              <div className="w-12 h-12 bg-green-700 rounded-xl flex items-center justify-center">
                                   <Pencil className="w-6 h-6 text-white" />
                              </div>
                              تعديل تفاصيل منتج{" "}
                         </h1>
                         <p className="text-gray-600 text-lg">تعديل منتج</p>
                    </div>

                    <div className="bg-white border border-gray-300 rounded-2xl shadow-xl overflow-hidden">
                         {/* Form */}
                         <div className="p-6 md:p-8">
                              <div className="space-y-8">
                                   {/* Basic Info Section */}
                                   <div>
                                        <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-gray-900">
                                             <Tag className="w-5 h-5" />
                                             <h2 className="text-xl font-bold text-gray-900">
                                                  معلومات المنتج
                                             </h2>
                                        </div>

                                        <div className="space-y-5">
                                             {/* Product Name */}
                                             <div>
                                                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                       اسم المنتج{" "}
                                                       <span className="text-red-500">
                                                            *
                                                       </span>
                                                  </label>
                                                  <input
                                                       type="text"
                                                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-colors"
                                                       placeholder="أدخل اسم المنتج"
                                                       value={product.name}
                                                       onChange={(e) =>
                                                            setProduct({
                                                                 ...product,
                                                                 name: e.target
                                                                      .value,
                                                            })
                                                       }
                                                  />
                                             </div>
                                             {/* Product descriptin */}
                                             <div>
                                                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                       وصف مختصر
                                                       <span className="text-red-500">
                                                            *
                                                       </span>
                                                  </label>
                                                  <Textarea
                                                       label="وصف مختصر"
                                                       value={
                                                            product.description
                                                       }
                                                       onChange={(e) =>
                                                            setProduct({
                                                                 ...product,
                                                                 description:
                                                                      e.target
                                                                           .value,
                                                            })
                                                       }
                                                  />
                                             </div>
                                             {/* Prices */}
                                             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                  <div>
                                                       <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                            السعر الأساسي{" "}
                                                            <span className="text-red-500">
                                                                 *
                                                            </span>
                                                       </label>
                                                       <div className="relative">
                                                            <input
                                                                 type="number"
                                                                 className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-colors"
                                                                 placeholder="0.00"
                                                                 value={
                                                                      product.price
                                                                 }
                                                                 onChange={(
                                                                      e
                                                                 ) =>
                                                                      setProduct(
                                                                           {
                                                                                ...product,
                                                                                price: e
                                                                                     .target
                                                                                     .value,
                                                                           }
                                                                      )
                                                                 }
                                                            />
                                                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                                                                 ر.س
                                                            </span>
                                                       </div>
                                                  </div>

                                                  <div>
                                                       <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                            سعر العرض (اختياري)
                                                       </label>
                                                       <div className="relative">
                                                            <input
                                                                 type="number"
                                                                 className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-colors"
                                                                 placeholder="0.00"
                                                                 value={
                                                                      product.offer_price
                                                                 }
                                                                 onChange={(
                                                                      e
                                                                 ) =>
                                                                      setProduct(
                                                                           {
                                                                                ...product,
                                                                                offer_price:
                                                                                     e
                                                                                          .target
                                                                                          .value,
                                                                           }
                                                                      )
                                                                 }
                                                            />
                                                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                                                                 ر.س
                                                            </span>
                                                       </div>
                                                  </div>
                                             </div>

                                             {/* Category */}
                                             <div>
                                                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                       التصنيف{" "}
                                                       <span className="text-red-500">
                                                            *
                                                       </span>
                                                  </label>
                                                  <div className="relative">
                                                       <select
                                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-colors appearance-none bg-white cursor-pointer"
                                                            value={productData[0]?.category || undefined}
                                                            onChange={(e) =>
                                                                 setProduct({
                                                                      ...product,
                                                                      category:
                                                                           e
                                                                                .target
                                                                                .value,
                                                                 })
                                                            }
                                                       >
                                                            {categories.map(
                                                                 ({
                                                                      name,
                                                                      id,
                                                                 }) => (
                                                                      <option
                                                                           key={
                                                                                id
                                                                           }
                                                                           value={
                                                                                id
                                                                           }
                                                                      >
                                                                           {
                                                                                name
                                                                           }
                                                                      </option>
                                                                 )
                                                            )}
                                                       </select>
                                                       <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                                            <svg
                                                                 className="w-5 h-5 text-gray-500"
                                                                 fill="none"
                                                                 stroke="currentColor"
                                                                 viewBox="0 0 24 24"
                                                            >
                                                                 <path
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                      strokeWidth={
                                                                           2
                                                                      }
                                                                      d="M19 9l-7 7-7-7"
                                                                 />
                                                            </svg>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>

                                   {/* Image Section */}
                                   <div>
                                        <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-gray-900">
                                             <Image className="w-5 h-5" />
                                             <h2 className="text-xl font-bold text-gray-900">
                                                  صورة المنتج
                                             </h2>
                                        </div>

                                        <div className="space-y-4">
                                             <div>
                                                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                       رابط الصورة{" "}
                                                       <span className="text-red-500">
                                                            *
                                                       </span>
                                                  </label>
                                                  <div className="relative">
                                                       <input
                                                            type="url"
                                                            className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-colors"
                                                            placeholder="https://example.com/image.jpg"
                                                            value={
                                                                 product.imageURL
                                                            }
                                                            onChange={(e) =>
                                                                 setProduct({
                                                                      ...product,
                                                                      imageURL:
                                                                           e
                                                                                .target
                                                                                .value,
                                                                 })
                                                            }
                                                       />
                                                       <Upload className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                  </div>
                                             </div>

                                             {product.imageURL && (
                                                  <div className="flex justify-center">
                                                       <div className="relative group">
                                                            <img
                                                                 src={
                                                                      product.imageURL
                                                                 }
                                                                 alt="Preview"
                                                                 className="w-48 h-48 object-cover rounded-xl border-4 border-gray-200 shadow-lg"
                                                            />
                                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded-xl flex items-center justify-center">
                                                                 <span className="text-white opacity-0 group-hover:opacity-100 font-semibold">
                                                                      معاينة
                                                                 </span>
                                                            </div>
                                                       </div>
                                                  </div>
                                             )}
                                        </div>
                                   </div>

                                   {/* Colors Section */}
                                   <div>
                                        <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-gray-900">
                                             <Palette className="w-5 h-5" />
                                             <h2 className="text-xl font-bold text-gray-900">
                                                  الألوان المتاحة
                                             </h2>
                                        </div>

                                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                                             {colorsList.map(
                                                  ({ color, ColorName,id }) => (
                                                       <button
                                                            key={ColorName}
                                                            type="button"
                                                            onClick={() =>
                                                                 toggleColor(
                                                                      id
                                                                 )
                                                            }
                                                            className="relative group"
                                                       >
                                                            <div
                                                                 className={`w-full aspect-square rounded-xl border-4 transition-all cursor-pointer ${
                                                                      product.colors.includes(
                                                                           id
                                                                      )
                                                                           ? "border-gray-900 scale-95"
                                                                           : "border-gray-200 hover:border-gray-400"
                                                                 }`}
                                                                 style={{
                                                                      backgroundColor:
                                                                           color,
                                                                 }}
                                                            >
                                                                 {product.colors.includes(
                                                                      id
                                                                 ) && (
                                                                      <div className="absolute inset-0 flex items-center justify-center">
                                                                           <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                                                                                <Check className="w-5 h-5 text-gray-900" />
                                                                           </div>
                                                                      </div>
                                                                 )}
                                                            </div>
                                                            <p className="text-xs text-center mt-2 font-medium text-gray-700">
                                                                 {color.name}
                                                            </p>
                                                       </button>
                                                  )
                                             )}
                                        </div>
                                   </div>

                                   {/* Sizes Section */}
                                   <div>
                                        <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-gray-900">
                                             <Ruler className="w-5 h-5" />
                                             <h2 className="text-xl font-bold text-gray-900">
                                                  المقاسات المتاحة
                                             </h2>
                                        </div>

                                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                                             {sizesList.map(({ size,id }) => (
                                                  <button
                                                       key={size}
                                                       type="button"
                                                       onClick={() =>
                                                            toggleSize(id)
                                                       }
                                                       className={`py-3 px-4 rounded-xl font-bold text-lg transition-all ${
                                                            product.sizes.includes(
                                                                 id
                                                            )
                                                                 ? "bg-gray-900 text-white scale-95"
                                                                 : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                       }`}
                                                  >
                                                       {size}
                                                  </button>
                                             ))}
                                        </div>
                                   </div>

                                   {/* Product Properties */}
                                   <div>
                                        <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-gray-900">
                                             <Sparkles className="w-5 h-5" />
                                             <h2 className="text-xl font-bold text-gray-900">
                                                  خصائص المنتج
                                             </h2>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                             <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-gray-400 transition-colors group">
                                                  <input
                                                       type="checkbox"
                                                       checked={product.isOffer}
                                                       onChange={() =>
                                                            setProduct({
                                                                 ...product,
                                                                 isOffer: !product.isOffer,
                                                            })
                                                       }
                                                       className="w-5 h-5 rounded border-2 border-gray-300"
                                                  />
                                                  <div className="flex items-center gap-2">
                                                       <Tag className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
                                                       <span className="font-semibold text-gray-900">
                                                            عرض خاص
                                                       </span>
                                                  </div>
                                             </label>

                                             <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-gray-400 transition-colors group">
                                                  <input
                                                       type="checkbox"
                                                       checked={product.isHot}
                                                       onChange={() =>
                                                            setProduct({
                                                                 ...product,
                                                                 isHot: !product.isHot,
                                                            })
                                                       }
                                                       className="w-5 h-5 rounded border-2 border-gray-300"
                                                  />
                                                  <div className="flex items-center gap-2">
                                                       <TrendingUp className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
                                                       <span className="font-semibold text-gray-900">
                                                            الأكثر مبيعًا
                                                       </span>
                                                  </div>
                                             </label>

                                             <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-gray-400 transition-colors group">
                                                  <input
                                                       type="checkbox"
                                                       checked={
                                                            product.available
                                                       }
                                                       onChange={() =>
                                                            setProduct({
                                                                 ...product,
                                                                 available:
                                                                      !product.available,
                                                            })
                                                       }
                                                       className="w-5 h-5 rounded border-2 border-gray-300"
                                                  />
                                                  <div className="flex items-center gap-2">
                                                       <Check className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
                                                       <span className="font-semibold text-gray-900">
                                                            متاح للبيع
                                                       </span>
                                                  </div>
                                             </label>
                                        </div>
                                   </div>
                              </div>
                         </div>

                         {/* Submit Button */}
                         <div className="bg-gray-50 px-6 md:px-8 py-6 border-t border-gray-200">
                              <button
                                   onClick={handleUpdate}
                                   className="w-full py-4 bg-green-700 text-white font-bold text-lg rounded-xl hover:bg-gray-800 transition-all transform hover:scale-[0.99] active:scale-95 shadow-lg"
                              >
                                   تطبيق{" "}
                              </button>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Productform;
