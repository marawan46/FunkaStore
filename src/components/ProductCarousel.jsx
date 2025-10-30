import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductCarousel = ({ title, products ,id ,onOpenCart = () => {} }) => {
     return (
       <section className="mt-10 mx-auto pt-5 px-6 md:px-12">
         <div className="max-w-7xl rounded-3xl border border-pink-100">
           <div className="section-header p-4 flex flex-row-reverse justify-between">
             <h2 className="text-2xl font-bold mb-4 text-right font-title">
               {title}
             </h2>
             <div className="relative flex items-center gap-2">
               <button
                 className={`swiper-next-${id} bg-gray-200 text-gray-800 border border-gray-300 rounded-full p-2 shadow`}
               >
                 <ChevronLeft size={18} />
               </button>
               <button
                 className={`swiper-prev-${id} bg-gray-200 text-gray-800 border border-gray-300 rounded-full p-2 shadow`}
               >
                 <ChevronRight size={18} />
               </button>
             </div>
           </div>

           <div className="relative rounded-lg p-2">
             {/* Shadow on right side */}
             <div className="absolute top-0 right-0 bottom-16 w-5 bg-gradient-to-l from-white  to-transparent pointer-events-none z-10"></div>

             {/* Shadow on left side */}
             <div className="absolute top-0 left-0 bottom-16 w-5 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10"></div>

             <Swiper
               style={{
                 "--swiper-pagination-bullet-size": "13px",
               }}
               modules={[Navigation, Pagination]}
               slidesPerView={4}
               spaceBetween={16}
               rewind={true}
               navigation={{
                 nextEl: `.swiper-next-${id}`,
                 prevEl: `.swiper-prev-${id}`,
                 disabledClass: "bg-gray-300",
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
                 750: {slidesPerView: 3.2},
                 1024: { slidesPerView: 4.2 },
               }}
               className="!overflow-hidden"
             >
               {products.map((p) => (
                 <SwiperSlide key={p.id}>
                   <ProductCard product={p} onOpenCart={onOpenCart} />
                 </SwiperSlide>
               ))}
               <div className="swiper-pagination relative flex gap-1 items-center justify-center m-4"></div>
             </Swiper>
           </div>
         </div>
       </section>
     );
};

export default ProductCarousel;
