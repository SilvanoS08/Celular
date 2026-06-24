import React from "react";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "../data";

export default function Testimonials() {
  return (
    <section id="depoimentos" className="py-24 bg-black relative border-t border-white/10">
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[130px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-white">
            Quem Já Comprou Recomenda
          </h2>
          <p className="mt-4 text-gray-400 text-base font-medium">
            Veja a opinião sincera de fotógrafos, desenvolvedores e clientes exigentes que elevaram sua experiência com a linha Aura.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Stars */}
                <div className="flex gap-1 mb-4 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 fill-current ${
                        i < review.rating ? "text-amber-400" : "text-white/10"
                      }`}
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-sm text-gray-400 font-medium leading-relaxed italic mb-6">
                  "{review.comment}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-white/10">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover border border-white/10"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{review.name}</h4>
                  <p className="text-xs text-gray-500 font-semibold">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
