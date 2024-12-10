import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatDate = (date: Date | string, pattern: string = "dd 'de' MMMM 'de' yyyy") => {
  return format(new Date(date), pattern, { locale: ptBR });
};

export const formatDateTime = (date: Date | string) => {
  return format(new Date(date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
};