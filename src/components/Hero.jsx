export default function Hero({title,subtitle,imgURL,strong}) {
  return (
    <section dir="rtl" className="pt-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto bg-gradient-to-br from-pink-50 via-pink-50 to-amber-50 rounded-3xl overflow-hidden border border-pink-100">
        <div className="grid sm:grid-cols-2 gap-0 items-center min-h-[500px]">
          {/* Image Section - Left */}
          <div className="order-2 md:order-1 p-8 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-200/30 to-amber-200/30 rounded-full blur-2xl"></div>
              <img
                src={imgURL}
                alt="hero"
                className="relative rounded-full w-80 h-80 md:w-96 md:h-96 object-cover shadow-2xl ring-4 ring-white/50"
              />
            </div>
          </div>

          {/* Content Section - Right */}
          <div className="order-1 md:order-2 p-8 md:p-12 space-y-8 text-right">
            <div className="space-y-4">
              <h1 className="text-2xl sm:text-4xl xl:text-6xl font-extrabold font-title leading-tight">
                {title}{" "}
                <span className="text-pink-400 mt-2">{strong}</span>
              </h1>
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-md mr-auto">
                {subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#products"
                className="px-2 py-2 md:px-8 md:py-4 font-bold bg-pink-400 hover:bg-pink-500 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-center"
              >
                تصفح العروض
              </a>
              <a
                href="#offers"
                className="px-2 py-2 md:px-8 md:py-4 font-bold border-2 border-pink-300 hover:bg-pink-50 text-gray-700 rounded-full transition-all duration-300 text-center"
              >
                الأكثر مبيعاً
              </a>
            </div>

            <div className="pt-4">
              <a
                href="#products"
                className="inline-flex items-center text-pink-400 hover:text-pink-500 font-semibold group transition-colors"
              >
                <span>تصفح كل المنتجات</span>
                <svg
                  className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
