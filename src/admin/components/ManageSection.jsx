// src/components/ManageSection.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Pencil, Trash2, Plus } from "lucide-react";
import InputField from "./InputField";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ManageSection = ({ tableName, title, fieldLabel, fieldName}) => {
     const [items, setItems] = useState([]);
     const [newValue, setNewValue] = useState("");
     const [loading, setLoading] = useState(false);
     const MySwal = withReactContent(Swal);

     function errormessage(message) {
          MySwal.fire({
               title: `ERROR ${message.code}`,
               text: `${message.message}`,
               icon: "error",
               showCancelButton: false,
               confirmButtonColor: "#25b800",
               confirmButtonText: "OK",
          });
     }
     const fetchItems = async () => {
          setLoading(true);
          const { data, error } = await supabase.from(tableName).select("*");
          if (error) errormessage(error);
          else setItems(data);
          setLoading(false);
     };

     const addItem = async () => {
          if (!newValue.trim()) return;
          const { error } = await supabase
               .from(tableName)
               .insert([{ [fieldName]: newValue }]);
          if (!error) {
               setNewValue("");
               fetchItems();
          } else {
               console.log(error.message);

               errormessage(error);
          }
     };

     const deleteItem = async (id) => {
          const res = await MySwal.fire({
               title: "تأكيد الحذف؟",
               text: "سيؤدي ذلك الي حذف كل المنتجات المرتبطة به!!",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#d30",
               confirmButtonText: "نعم، احذف",
               cancelButtonText: "إلغاء",
          });
          if (res.isConfirmed) {
               const { error } = await supabase
                    .from(tableName)
                    .delete()
                    .eq("id", id);
               if (!error) fetchItems();
               else errormessage(error);
          }
     };

     const editItem = async (id, oldValue) => {
          const { value: newName } = await MySwal.fire({
               title: "تعديل القيمة",
               input: "text",
               inputLabel: "القيمة الجديدة",
               inputValue: oldValue,
               showCancelButton: true,
               confirmButtonText: "تعديل",
               cancelButtonText: "إلغاء",
          });
          if (newName && newName !== oldValue) {
               const { error } = await supabase
                    .from(tableName)
                    .update({ [fieldName]: newName })
                    .eq("id", id);
               if (!error) fetchItems();
          }
     };

     useEffect(() => {
          fetchItems();
     }, []);

     return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
               <h2 className="text-2xl font-semibold mb-4">{title}</h2>

               <div className="flex gap-3 mb-4">
                    <InputField
                         label={fieldLabel}
                         value={newValue}
                         onChange={setNewValue}
                         placeholder={`أضف ${fieldLabel}`}
                    />
                    <button
                         onClick={addItem}
                         className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-1"
                    >
                         <Plus size={18} /> إضافة
                    </button>
               </div>

               {loading ? (
                    <p className="text-gray-500">جارِ التحميل...</p>
               ) : (
                    <ul className="divide-y divide-gray-200">
                         {items.map((item) => (
                              <li
                                   key={item.id}
                                   className="flex justify-between items-center py-2"
                              >
                                   <span>{item[fieldName]}</span>
                                   <div className="flex gap-2">
                                        <button
                                             onClick={() =>
                                                  editItem(
                                                       item.id,
                                                       item[fieldName]
                                                  )
                                             }
                                             className="text-blue-600 hover:text-blue-800"
                                        >
                                             <Pencil size={18} />
                                        </button>
                                        <button
                                             onClick={() => deleteItem(item.id)}
                                             className="text-red-600 hover:text-red-800"
                                        >
                                             <Trash2 size={18} />
                                        </button>
                                   </div>
                              </li>
                         ))}
                    </ul>
               )}
          </div>
     );
};

export default ManageSection;
