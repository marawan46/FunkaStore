// src/components/ColorManager.jsx
import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Input, Typography } from "@material-tailwind/react";

const MySwal = withReactContent(Swal);

export default function ColorManager() {
  const [colors, setColors] = useState([]);
  const [colorName, setColorName] = useState("");
  const [hex, setHex] = useState("#000000");
  const [editingId, setEditingId] = useState(null);

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

  useEffect(() => {
    fetchColors();
  }, []);

  async function fetchColors() {
    const { data, error } = await supabase.from("Colors").select("*");
    if (error) errormessage(error);
    setColors(data);
    console.log(data);
    
  }

  async function handleAddOrEdit() {
    if (!colorName || !hex) return;

    if (editingId) {
      const { error } = await supabase
        .from("Colors")
        .update({ ColorName:colorName, color:hex })
        .eq("id", editingId);
      if (error) errormessage(error);
      MySwal.fire("Updated!", "Color updated successfully", "success");
    } else {
     const { error } = await supabase
        .from("Colors")
        .insert({ ColorName:colorName, color:hex });
      if (error) errormessage(error);
      MySwal.fire("Added!", "Color added successfully", "success");
    }

    setColorName("");
    setHex("#000000");
    setEditingId(null);
    fetchColors();
  }

  async function handleDelete(id) {
    const confirm = await MySwal.fire({
               title: "تأكيد الحذف؟",
               text: "سيؤدي ذلك الي حذف كل المنتجات المرتبطة به!!",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#d30",
               confirmButtonText: "نعم، احذف",
               cancelButtonText: "إلغاء",
          });

    if (!confirm.isConfirmed) return;

    const { error } = await supabase.from("Colors").delete().eq("id", id);
    if (error) return console.error(error);

    MySwal.fire("Deleted!", "Color has been deleted.", "success");
    fetchColors();
  }

  function handleEdit(color) {
    setEditingId(color.id);
    setColorName(color.ColorName);
    setHex(color.color);
  }
const handlClear = ()=>{
    setColorName("");
    setHex("#000000");
    setEditingId(null);
}
  return (
    <div className="p-4 bg-white rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">Manage Colors</h2>

      {/* Add / Edit Form */}
      <div className="flex gap-2 mb-4 items-center">  
<div className="relative w-full">
    {editingId && 
  <Typography as="button" onClick={handlClear} className="absolute z-40 left-3 top-1/2 -translate-y-1/2 text-gray-500">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  </Typography>
}
  <Input
    type="text"
    label="Name"
    placeholder="اسم اللون"
    value={colorName}
    onChange={(e) => setColorName(e.target.value)}
    className="pl-10" // add padding-left to make space for icon
  />
</div>

        <input
          type="color"
          value={hex}
          onChange={(e) => setHex(e.target.value)}
          className="w-12 h-12 border rounded"
        />
        <button
          onClick={handleAddOrEdit}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      {/* Color List */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {colors.map((color) => (
          <div
            key={color.id}
            className="flex items-center justify-between border rounded-lg p-3"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full border-1 border-gray-400"
                style={{ backgroundColor: color.color }}
              ></div>
              <span>{color.ColorName}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(color)}
                className="text-blue-600 hover:text-blue-800"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => handleDelete(color.id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
