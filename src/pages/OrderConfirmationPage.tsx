import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, Package, Truck, Calendar, ArrowLeft, Home,
  MapPin, CreditCard, Receipt, AlertCircle 
} from 'lucide-react';

export default function OrderConfirmationPage() {
  // In a real app, this would come from your order management system
  const orderDetails = {
    orderNumber: "PED123456",
    status: "Pagamento Confirmado",
    date: "14/04/2024",
    estimatedDelivery: "17/04/2024",
    items: [
      {
        id: 1,
        name: "Ração Premium Adulto",
        quantity: 2,
        price: 189.90,
        image: "https://images.unsplash.com/photo-1585499193151-0f50d54c4e54?auto=format&fit=crop&q=80"
      },
      {
        id: 2,
        name: "Kit Brinquedos Interativos",
        quantity: 1,
        price: 79.90,
        image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80"
      }
    ],
    shipping: {
      address: "Rua das Flores, 123",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-567",
      recipient: "Maria Silva"
    },
    payment: {
      method: "Cartão de Crédito",
      last4: "4242",
      installments: "1x"
    },
    summary: {
      subtotal: 459.70,
      shipping: 15.90,
      discount: 20.00,
      total: 455.60
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="flex items-center gap-2 text-neutral-600 hover:text-[#36c6c6] transition-colors"
            >
              <Home className="h-5 w-5" />
              <span>Voltar para Home</span>
            </Link>
            <img 
              src="https://storage.googleapis.com/imagensapp/modelo%20novo-Photoroom%20(1).png" 
              alt="Love&Connection Logo" 
              className="h-[68px] w-auto"
            />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#B2FFFF] rounded-full mb-6">
            <CheckCircle className="h-12 w-12 text-[#36c6c6]" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-800 mb-4">
            Pedido Confirmado!
          </h1>
          <p className="text-lg text-neutral-600">
            Obrigado por comprar conosco. Seu pedido está sendo processado.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          {/* Order Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-sm text-neutral-600">Número do Pedido</p>
              <p className="text-lg font-semibold text-neutral-800">{orderDetails.orderNumber}</p>
            </div>
            <Link
              to="/account/orders"
              className="text-[#36c6c6] hover:text-[#B2FFFF] font-medium"
            >
              Ver Detalhes
            </Link>
          </div>

          {/* Order Items */}
          <div className="border-t border-b border-gray-200 py-6 mb-6">
            <h2 className="text-lg font-semibold text-neutral-800 mb-4">Itens do Pedido</h2>
            <div className="space-y-4">
              {orderDetails.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-neutral-800">{item.name}</h3>
                    <p className="text-sm text-neutral-600">Quantidade: {item.quantity}</p>
                  </div>
                  <span className="font-medium text-neutral-800">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Shipping Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-neutral-800 font-medium">
                <MapPin className="h-5 w-5 text-[#36c6c6]" />
                <span>Endereço de Entrega</span>
              </div>
              <div className="text-sm text-neutral-600">
                <p>{orderDetails.shipping.recipient}</p>
                <p>{orderDetails.shipping.address}</p>
                <p>{orderDetails.shipping.city}, {orderDetails.shipping.state}</p>
                <p>CEP: {orderDetails.shipping.zipCode}</p>
              </div>
            </div>

            {/* Payment Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-neutral-800 font-medium">
                <CreditCard className="h-5 w-5 text-[#36c6c6]" />
                <span>Pagamento</span>
              </div>
              <div className="text-sm text-neutral-600">
                <p>{orderDetails.payment.method}</p>
                <p>Final {orderDetails.payment.last4}</p>
                <p>{orderDetails.payment.installments}</p>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-neutral-800 font-medium">
                <Truck className="h-5 w-5 text-[#36c6c6]" />
                <span>Entrega</span>
              </div>
              <div className="text-sm text-neutral-600">
                <p>Previsão de entrega:</p>
                <p className="font-medium text-[#36c6c6]">{orderDetails.estimatedDelivery}</p>
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span>R$ {orderDetails.summary.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Frete</span>
                <span>R$ {orderDetails.summary.shipping.toFixed(2)}</span>
              </div>
              {orderDetails.summary.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Desconto</span>
                  <span>- R$ {orderDetails.summary.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold text-neutral-800">
                <span>Total</span>
                <span>R$ {orderDetails.summary.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="text-center space-y-6">
          <h2 className="text-xl font-semibold text-neutral-800">Próximos Passos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-[#B2FFFF] rounded-full flex items-center justify-center mx-auto mb-4">
                <Receipt className="h-6 w-6 text-[#36c6c6]" />
              </div>
              <h3 className="font-medium text-neutral-800 mb-2">Acompanhe seu Pedido</h3>
              <p className="text-sm text-neutral-600">
                Receba atualizações sobre o status da entrega
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-[#B2FFFF] rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-6 w-6 text-[#36c6c6]" />
              </div>
              <h3 className="font-medium text-neutral-800 mb-2">Prepare-se</h3>
              <p className="text-sm text-neutral-600">
                Organize o espaço para receber seus produtos
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-[#B2FFFF] rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-6 w-6 text-[#36c6c6]" />
              </div>
              <h3 className="font-medium text-neutral-800 mb-2">Precisa de Ajuda?</h3>
              <p className="text-sm text-neutral-600">
                Nossa equipe está disponível para te ajudar
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Link
            to="/products"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-[#36c6c6] text-[#36c6c6] rounded-full hover:bg-[#B2FFFF] transition-colors"
          >
            Continuar Comprando
          </Link>
          <Link
            to="/order-tracking"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#36c6c6] text-white rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors"
          >
            Acompanhar Pedido
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12 flex justify-center gap-8 text-neutral-600">
          <Link
            to="/help"
            className="hover:text-[#36c6c6] transition-colors"
          >
            Ajuda
          </Link>
          <Link
            to="/privacy"
            className="hover:text-[#36c6c6] transition-colors"
          >
            Política de Privacidade
          </Link>
          <Link
            to="/terms"
            className="hover:text-[#36c6c6] transition-colors"
          >
            Termos e Condições
          </Link>
        </div>
      </div>
    </div>
  );
}