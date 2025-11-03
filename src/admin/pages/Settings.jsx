// src/pages/SettingsPage.jsx
import React from "react";
import ManageSection from "../components/ManageSection";
import ColorManager from "../components/ColorManger";

const SettingsPage = () => {
  return (
    <div className="min-h-screen max-w-[98%] flex flex-col gap-2 bg-gray-50 p-8" dir="rtl">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">إعدادات المتجر</h1>

      <ManageSection
        tableName="categories"
        title="الاصناف"
        fieldLabel="اسم الصنف"
        fieldName="name"
      />

      <ColorManager />

      <ManageSection
        tableName="Sizes"
        title="المقاسات"
        fieldLabel="المقاس"
        fieldName="size"
      />
    </div>
  );
};

export default SettingsPage;
