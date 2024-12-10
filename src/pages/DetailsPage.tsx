import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Heart, Share2, Star, MapPin, Clock, Calendar,
  ShoppingCart, AlertTriangle, Check, Info 
} from 'lucide-react';
import ImageGallery from '../components/details/ImageGallery';
import ReviewSection from '../components/details/ReviewSection';
import RelatedItems from '../components/details/RelatedItems';
import ServiceBooking from '../components/details/ServiceBooking';
import ProductOptions from '../components/details/ProductOptions';
import { useFavoriteStore } from '../store/favoriteStore';

// Mock data - in a real app, this would come from your API
const mockProduct = {
  id: '1',
  type: 'product',
  name: 'Ração Premium Adulto',
  brand: 'Royal Canin',
  rating: 4.8,
  reviews: 128,
  price: 189.90,
  description: 'Ração premium para cães adultos, desenvolvida com ingredientes selecionados para uma nutrição completa e balanceada.',
  images: [
    'https://images.unsplash.com/photo-1585499193151-0f50d54c4e54?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?auto=format&fit=crop&q=80'
  ],
  features: [
    'Proteína de alta qualidade',
    'Vitaminas e minerais essenciais',
    'Ômega 3 e 6',
    'Sem corantes artificiais'
  ],
  variants: [
    { id: 1, size: '3kg', price: 89.90 },
    { id: 2, size: '7kg', price: 189.90 },
    { id: 3, size: '15kg', price: 349.90 }
  ],
  stock: 15,
  discount: 10
};

const mockService = {
  id: '2',
  type: 'service',
  name: 'Consulta Veterinária',
  provider: 'Pet Care Plus',
  rating: 4.9,
  reviews: 256,
  price: 150.00,
  description: 'Consulta veterinária completa com profissionais especializados. Inclui avaliação geral, verificação de vacinas e orientações de cuidados.',
  images: [
    'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80'
  ],
  location: 'São Paulo, SP',
  distance: '2.5 km',
  availability: {
    days: ['Segunda à Sexta'],
    hours: ['09:00', '18:00']
  },
  services: [
    'Consulta de rotina',
    'Vacinação',
    'Exames laboratoriais',
    'Cirurgias'
  ]
};

export default function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedVariant, setSelectedVariant] = useState(mockProduct.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const { addItem, removeItem, isFavorite } = useFavoriteStore();

  // In a real app, you'd fetch this based on the ID and type
  const item = id === '1' ? mockProduct : mockService;
  const isProduct = item.type === 'product';
  const favorite = isFavorite(item.id);

  const handleAddToCart = () => {
    // Add to cart logic
    navigate('/cart');
  };

  const handleShare = () => {
    // Share logic
    if (navigator.share) {
      navigator.share({
        title: item.name,
        text: item.description,
        url: window.location.href
      });
    }
  };

  const handleFavorite = () => {
    if (favorite) {
      removeItem(item.id);
    } else {
      addItem({
        id: item.id,
        type: item.type,
        name: item.name,
        image: item.images[0]
      });
    }
  };

  const handleBookService = () => {
    // Book service logic
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-neutral-600 hover:text-[#36c6c6] transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Voltar</span>
            </button>
            <div className="flex items-center gap-4">
              <button
                onClick={handleShare}
                className="p-2 text-neutral-600 hover:text-[#36c6c6] rounded-full hover:bg-gray-100"
              >
                <Share2 className="h-5 w-5" />
              </button>
              <button
                onClick={handleFavorite}
                className={`p-2 rounded-full hover:bg-gray-100 ${
                  favorite ? 'text-[#36c6c6]' : 'text-neutral-600 hover:text-[#36c6c6]'
                }`}
              >
                <Heart className={`h-5 w-5 ${favorite ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <ImageGallery images={item.images} name={item.name} />

          {/* Product/Service Info */}
          <div className="space-y-6">
            <div>
              {isProduct && (
                <span className="text-sm text-neutral-600">{item.brand}</span>
              )}
              <h1 className="text-3xl font-bold text-neutral-800 mt-1">{item.name}</h1>
              
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-medium">{item.rating}</span>
                  <span className="text-neutral-600">
                    ({item.reviews} avaliações)
                  </span>
                </div>
                {!isProduct && (
                  <div className="flex items-center gap-1 text-neutral-600">
                    <MapPin className="h-5 w-5" />
                    <span>{item.location}</span>
                    <span className="mx-1">•</span>
                    <span>{item.distance}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Price Section */}
            <div className="border-t border-b border-gray-200 py-6">
              {isProduct ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    {item.discount && (
                      <span className="text-sm text-neutral-600 line-through">
                        R$ {item.price.toFixed(2)}
                      </span>
                    )}
                    <span className="text-3xl font-bold text-neutral-800">
                      R$ {(item.price * (1 - (item.discount || 0) / 100)).toFixed(2)}
                    </span>
                    {item.discount && (
                      <span className="bg-[#B2FFFF] text-[#36c6c6] px-2 py-1 rounded-full text-sm font-medium">
                        {item.discount}% OFF
                      </span>
                    )}
                  </div>
                  <ProductOptions
                    variants={item.variants}
                    selectedVariant={selectedVariant}
                    onVariantChange={setSelectedVariant}
                    quantity={quantity}
                    onQuantityChange={setQuantity}
                    stock={item.stock}
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <span className="text-3xl font-bold text-neutral-800">
                    R$ {item.price.toFixed(2)}
                  </span>
                  <div className="flex items-center gap-4 text-neutral-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-5 w-5" />
                      <span>{item.availability.hours.join(' - ')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-5 w-5" />
                      <span>{item.availability.days}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold text-neutral-800 mb-3">
                {isProduct ? 'Descrição do Produto' : 'Sobre o Serviço'}
              </h2>
              <p className="text-neutral-600">{item.description}</p>
              
              <div className="mt-6">
                <h3 className="font-medium text-neutral-800 mb-3">
                  {isProduct ? 'Características' : 'Serviços Inclusos'}
                </h3>
                <ul className="space-y-2">
                  {(isProduct ? item.features : item.services).map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-neutral-600">
                      <Check className="h-5 w-5 text-[#36c6c6]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6">
              {isProduct ? (
                <div className="flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#36c6c6] text-white px-6 py-3 rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Adicionar ao Carrinho</span>
                  </button>
                  <button
                    onClick={() => navigate('/checkout')}
                    className="flex-1 border-2 border-[#36c6c6] text-[#36c6c6] px-6 py-3 rounded-full hover:bg-[#B2FFFF] transition-colors"
                  >
                    Comprar Agora
                  </button>
                </div>
              ) : (
                <ServiceBooking onBook={handleBookService} />
              )}
            </div>

            {/* Additional Info */}
            {isProduct && (
              <div className="bg-[#B2FFFF]/10 rounded-xl p-4 flex items-start gap-3">
                <Info className="h-5 w-5 text-[#36c6c6] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-neutral-600">
                  Este produto possui garantia contra defeitos de fabricação.
                  Em caso de dúvidas, consulte nossa política de trocas e devoluções.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <ReviewSection rating={item.rating} reviews={item.reviews} />

        {/* Related Items */}
        <RelatedItems type={item.type} />
      </div>
    </div>
  );
}