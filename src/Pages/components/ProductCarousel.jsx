import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductCarousel = ({ title, products ,id ,cardClass ,onOpenCart = () => {} }) => {
     return (
<section className="mt-10 mx-auto px-6 md:px-12">
  <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-rose-50 via-white to-amber-50 shadow-sm border border-rose-100 relative">
    {/* Soft background decoration */}
    <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 bg-cover bg-center pointer-events-none"></div>

    {/* Header */}
    <div className="relative z-10 flex flex-row-reverse justify-between items-center p-6 border-b border-rose-100">
      <h2 className="text-3xl md:text-4xl font-extrabold text-rose-900 font-title">
        {title}
      </h2>
      <div className="flex items-center gap-2">
        <button
          className={`swiper-next-${id} bg-white hover:bg-rose-50 border border-rose-200 rounded-full p-2 shadow-sm transition`}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          className={`swiper-prev-${id} bg-white hover:bg-rose-50 border border-rose-200 rounded-full p-2 shadow-sm transition`}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>

    {/* Slider */}
    <div className="relative p-4 md:p-6">
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={4}
        spaceBetween={16}
        rewind={true}
        navigation={{
          nextEl: `.swiper-next-${id}`,
          prevEl: `.swiper-prev-${id}`,
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
        }}
        dir="rtl"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: { slidesPerView: 1.2 },
          460: { slidesPerView: 2.2 },
          750: { slidesPerView: 3.2 },
          1024: { slidesPerView: 4.2 },
        }}
        className="!overflow-hidden"
      >
        {products.map((p) => (
          <SwiperSlide key={p.id}>
            <div className={`transition-transform hover:-translate-y-2 hover:shadow-md rounded-2xl bg-white p-2 ${cardClass}`}>
              <ProductCard product={p} onOpenCart={onOpenCart} />
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination flex gap-1 justify-center mt-6"></div>
      </Swiper>
    </div>
  </div>
</section>

     );
};

export default ProductCarousel;
