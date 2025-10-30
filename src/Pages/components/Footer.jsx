// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-10 font-subtitle">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-gray-600">© {new Date().getFullYear()}فيونكا ستور. كل الحقوق محفوطة.</div>
        <div className="flex gap-4 text-sm">
          <a className="hover:underline" href="#">الشروط</a>
          <a className="hover:underline" href="#">سياسة الخصوصية</a>
          <a className="hover:underline" href="#">تواصل معنا</a>
        </div>
      </div>
    </footer>
  );
}
