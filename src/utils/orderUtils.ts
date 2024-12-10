import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Order } from '../store/orderHistoryStore';

export const getStatusColor = (status: string) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

export const getStatusText = (status: string) => {
  const texts = {
    pending: 'Pendente',
    processing: 'Em Processamento',
    shipped: 'Enviado',
    delivered: 'Entregue',
    cancelled: 'Cancelado'
  };
  return texts[status as keyof typeof texts] || status;
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const sortOrders = (orders: Order[], sortBy: string) => {
  return [...orders].sort((a, b) => {
    switch (sortBy) {
      case 'date-desc':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'date-asc':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'total-desc':
        return b.total - a.total;
      case 'total-asc':
        return a.total - b.total;
      default:
        return 0;
    }
  });
};

export const generateOrderPDF = (order: Order) => {
  const content = `
    Pedido #${order.id}
    Data: ${format(order.date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
    Status: ${getStatusText(order.status)}
    
    Itens:
    ${order.items.map(item => `
      - ${item.name}
      Quantidade: ${item.quantity}
      Preço: ${formatCurrency(item.price)}
    `).join('\n')}
    
    Total: ${formatCurrency(order.total)}
    
    Vendedor: ${order.seller.name}
  `;

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `pedido-${order.id}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};