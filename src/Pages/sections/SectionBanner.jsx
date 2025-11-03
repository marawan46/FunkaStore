import React from "react";

const SectionBanner = ({ title, subtitle, icon, imgURL }) => {
     return (
<section className="relative px-6 md:px-12">
  {/* Background blur shapes */}
  <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-200/40 rounded-full blur-3xl"></div>
  <div className="absolute -bottom-20 right-0 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl"></div>

  <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-1 md:gap-10 items-center bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-lg px-10">
    <div className="space-y-5 text-center md:text-right p-5">
      <h1 className="text-4xl md:text-5xl font-bold font-title text-gray-900 dark:text-white">{icon}{title}</h1>
      <p className="text-gray-600 dark:text-gray-400 font-subtitle leading-relaxed">{subtitle}</p>
    </div>

    <div className="flex justify-center md:justify-end">
      <img
        src={imgURL}
        alt={title}
        className="h-56 object-contain drop-shadow-lg"
      />
    </div>
  </div>
</section>


     );
};

export default SectionBanner;
