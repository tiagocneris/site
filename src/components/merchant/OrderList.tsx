import React, { useState } from 'react';
import { Package, Clock, AlertTriangle, CheckCircle, Truck, Eye } from 'lucide-react';
import OrderDetails from './OrderDetails';

interface OrderListProps {
  searchTerm: string;
  statusFilter: string;
  onMessageCustomer: (customerId: string) => void;
}

// Rest of the component remains the same...