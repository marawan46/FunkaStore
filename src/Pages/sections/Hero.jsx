export default function Hero({title,subtitle,img1,img2,img3,strong}) {
  return (
<section className="w-full relative pt-28 min-h-screen flex items-center justify-center bg-gradient-to-r from-violet-200 to-pink-200 px-8 pb-8" dir="rtl">
                {/* Background blur shapes */}
  <div className="absolute z-0 -top-20 -left-20  w-72 h-72 bg-pink-200/40 rounded-full blur-3xl"></div>
  <div className="absolute z-0 -bottom-20 right-0 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl"></div>
      <div className="max-w-7xl relative z-20 min-h-80 w-full grid md:grid-cols-2 gap-10 items-center">
        {/* Left side: text */}
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-relaxed font-title">
            {title}
            <span className="text-pink-300">{" "}{strong}</span>
          </h1>

          <p className="text-gray-600 sm:text-2xl leading-relaxed max-w-md">
              {subtitle}
          </p>

          <button className="bg-gray-900 text-white px-6 py-3 rounded-md w-fit hover:bg-gray-800 transition-all">
            تصفحي المنتجات
          </button>
        </div>

        {/* Right side: image placeholders */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6">

          <div className="col-cols-1 md:col-span-1 md:row-span-1 flex items-center overflow-hidden justify-center bg-gray-200 rounded-xl aspect-[3/4]">
            <img src={img1}/>
          </div>
          <div className="flex flex-col gap-5">
          <div className="flex items-center justify-center overflow-hidden bg-gray-200 rounded-xl aspect-[4/3]">
            <img src={img2}/>
          </div>
          <div className="flex items-center justify-center overflow-hidden bg-gray-200 rounded-xl aspect-[4/3]">
            <img src={img3}/>
          </div>
          </div>
        </div>


      </div>
    </section>
  );
}
