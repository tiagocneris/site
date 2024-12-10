import React from 'react';
import { MessageCircle, RefreshCcw, Download, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Order } from '../../store/orderHistoryStore';
import { generateOrderPDF } from '../../utils/orderUtils';
import { useCartStore } from '../../store/cartStore';

interface OrderActionsProps {
  order: Order;
  onContactSeller: (sellerId: string) => void;
}

export default function OrderActions({ order, onContactSeller }: OrderActionsProps) {
  const addItems = useCartStore(state => state.addItem);

  const handleRepeatOrder = () => {
    order.items.forEach(item => {
      addItems({
        id: item.id.toString(),
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      });
    });
  };

  return (
    <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
      <div className="flex gap-4">
        <button
          onClick={() => onContactSeller(order.seller.id)}
          className="flex items-center gap-2 text-[#36c6c6] hover:text-[#B2FFFF] transition-colors"
        >
          <MessageCircle className="h-5 w-5" />
          <span>Contatar Vendedor</span>
        </button>
        <button
          onClick={handleRepeatOrder}
          className="flex items-center gap-2 text-[#36c6c6] hover:text-[#B2FFFF] transition-colors"
        >
          <RefreshCcw className="h-5 w-5" />
          <span>Comprar Novamente</span>
        </button>
        <button
          onClick={() => generateOrderPDF(order)}
          className="flex items-center gap-2 text-[#36c6c6] hover:text-[#B2FFFF] transition-colors"
        >
          <Download className="h-5 w-5" />
          <span>Baixar Pedido</span>
        </button>
      </div>
      <Link
        to={`/order-tracking/${order.id}`}
        className="flex items-center gap-2 text-[#36c6c6] hover:text-[#B2FFFF] transition-colors"
      >
        <span>Ver Detalhes</span>
        <ChevronRight className="h-5 w-5" />
      </Link>
    </div>
  );
}