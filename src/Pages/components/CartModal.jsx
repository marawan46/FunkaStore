import React, { useEffect, useState } from "react";
import { useCartState, useCart } from "../context/cartContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { X, Trash2, Plus, Minus } from "lucide-react";

export default function CartModal({ isOpen, onClose }) {
  const MySwal = withReactContent(Swal);
  const state = useCartState();
  const cart = useCart();
  const [form, setForm] = useState({ name: "", phone: "", address: "" });

  useEffect(() => {
    if (!isOpen) setForm({ name: "", phone: "", address: "" });
  }, [isOpen]);

  const handleRemove = (id) => cart.removeItem(id);

  const handleSendWhatsApp = () => {
    if (state.items.length === 0)
      return Swal.fire({ title: "خطأ!", text: "سلة التسوق فارغة", icon: "error" });

    if (!form.name || !form.phone || !form.address)
      return Swal.fire({ title: "خطأ!", text: "املأ جميع البيانات قبل الإرسال", icon: "error" });

    const lines = [
      `مرحبًا، أود إنشاء طلب:`,
      ...state.items.map(
        (i) =>
          `- ${i.product.name} (الكمية: ${i.qty}) => ${
            i.qty * (i.product.isOffer ? i.product.offer_price : i.product.price)
          } جنيه`
      ),
      `الإجمالي: ${cart.total()} جنيه`,
      `الاسم: ${form.name}`,
      `رقم الهاتف: ${form.phone}`,
      `العنوان: ${form.address}`,
    ];

    const message = encodeURIComponent(lines.join("\n"));
    const url = `https://wa.me/201099262424?text=${message}`;
    window.open(url, "_blank");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl animate-scaleIn"
        style={{
          animation: isOpen ? 'scaleIn 0.3s ease-out' : 'none'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-all hover:rotate-90 shadow-lg z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 text-right">سلة التسوق</h2>
          <p className="text-sm text-gray-500 mt-1 text-right">
            {state.items.length} {state.items.length === 1 ? 'منتج' : 'منتجات'}
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="text-lg font-medium text-gray-900 mb-2">السلة فارغة</p>
              <p className="text-sm text-gray-500">أضيفي منتجاتك المفضلة للبدء</p>
            </div>
          ) : (
            <div className="space-y-4">
              {state.items.map((it) => (
                <div
                  key={it.id}
                  className="flex gap-4 p-4 rounded-2xl border border-gray-200 hover:border-gray-300 transition-all"
                >
                  {/* Image */}
                  <img
                    src={it.product.imgURL}
                    alt={it.product.name}
                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-4">
                      <h3 className="font-semibold text-gray-900 text-right flex-1">{it.product.name}</h3>
                      <button
                        onClick={() => handleRemove(it.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          {it.product.isOffer ? it.product.offer_price : it.product.price} جنيه
                        </p>
                        {it.product.isOffer && (
                          <p className="text-sm text-gray-400 line-through">
                            {it.product.price} جنيه
                          </p>
                        )}
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => cart.updateQty(it.id, it.qty + 1)}
                          className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{it.qty}</span>
                        <button
                          onClick={() => cart.updateQty(it.id, Math.max(1, it.qty - 1))}
                          className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors flex items-center justify-center"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="px-8 py-6 border-t border-gray-100 bg-gray-50 rounded-b-3xl">
            {/* Customer Form */}
            <div className="space-y-3 mb-6">
              <input
                placeholder="الاسم الكامل"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-gray-400 transition-colors text-right bg-white"
              />
              <input
                placeholder="رقم الهاتف"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-gray-400 transition-colors text-right bg-white"
              />
              <input
                placeholder="عنوان التوصيل"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-gray-400 transition-colors text-right bg-white"
              />
            </div>

            {/* Total & Actions */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">الإجمالي</p>
                <p className="text-3xl font-bold text-gray-900">{cart.total()} جنيه</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => cart.clear()}
                className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-all font-medium"
              >
                تفريغ
              </button>
              <button
                onClick={handleSendWhatsApp}
                className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all font-medium"
              >
                إرسال الطلب
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}