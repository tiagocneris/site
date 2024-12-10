import React from 'react';
import { Star, ThumbsUp, MessageCircle } from 'lucide-react';

interface ReviewSectionProps {
  rating: number;
  reviews: number;
}

export default function ReviewSection({ rating, reviews }: ReviewSectionProps) {
  const mockReviews = [
    {
      id: 1,
      user: 'Maria Silva',
      rating: 5,
      date: '10/04/2024',
      comment: 'Excelente produto! Meu pet adorou e notei melhora significativa na disposição dele.',
      helpful: 12,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80'
    },
    {
      id: 2,
      user: 'João Santos',
      rating: 4,
      date: '08/04/2024',
      comment: 'Muito bom, mas achei o preço um pouco alto. De qualquer forma, a qualidade compensa.',
      helpful: 8,
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80'
    }
  ];

  return (
    <section className="mt-16 border-t border-gray-200 pt-16">
      <h2 className="text-2xl font-bold text-neutral-800 mb-8">Avaliações dos Clientes</h2>

      {/* Rating Summary */}
      <div className="flex items-start gap-12 mb-12">
        <div className="text-center">
          <div className="text-5xl font-bold text-neutral-800 mb-2">{rating}</div>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-neutral-600">{reviews} avaliações</p>
        </div>

        {/* Rating Bars */}
        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-20">
                <span className="text-sm text-neutral-600">{stars}</span>
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
              </div>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#36c6c6]"
                  style={{
                    width: `${
                      stars === 5 ? 70 :
                      stars === 4 ? 20 :
                      stars === 3 ? 7 :
                      stars === 2 ? 2 : 1
                    }%`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-8">
        {mockReviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-8">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={review.user}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium text-neutral-800">{review.user}</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-neutral-600">{review.date}</span>
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-1 text-neutral-600 hover:text-[#36c6c6]">
                <ThumbsUp className="h-4 w-4" />
                <span className="text-sm">{review.helpful}</span>
              </button>
            </div>
            <p className="text-neutral-600">{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Write Review Button */}
      <div className="mt-8 text-center">
        <button className="inline-flex items-center gap-2 bg-[#36c6c6] text-white px-6 py-3 rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors">
          <MessageCircle className="h-5 w-5" />
          <span>Escrever Avaliação</span>
        </button>
      </div>
    </section>
  );
}