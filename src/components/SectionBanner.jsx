import React from "react";

const SectionBanner = ({ title, subtitle, icon, badge, imgURL }) => {
     return (
       <section className="relative pt-5 px-6 md:px-12">
         {badge}
         <div className="max-w-7xl p-5 rounded-3xl border border-pink-100 bg-gradient-to-br from-pink-50 via-pink-50 to-amber-50  mx-auto grid md:grid-cols-2 gap-8 items-center">
           <div className="space-y-6 text-center md:text-right">
             <h1 className="text-4xl md:text-5xl font-extrabold font-title">
               {icon} {title}
             </h1>
             <p className="text-gray-600 font-subtitle">{subtitle}</p>
           </div>
           <div className="flex justify-center">
             <img
               src={imgURL}
               alt="sectionimg"
               className="h-40 object-contain"
             />
           </div>
         </div>
       </section>
     );
};

export default SectionBanner;
