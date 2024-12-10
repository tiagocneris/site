import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';

interface ServiceBookingProps {
  onBook: () => void;
}

export default function ServiceBooking({ onBook }: ServiceBookingProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const availableTimes = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'
  ];

  return (
    <div className="space-y-6">
      {/* Date Selection */}
      <div>
        <label className="block text-sm font-medium text-neutral-600 mb-2">
          Data
        </label>
        <div className="relative">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full pl-10 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
          />
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
        </div>
      </div>

      {/* Time Selection */}
      <div>
        <label className="block text-sm font-medium text-neutral-600 mb-2">
          Horário
        </label>
        <div className="grid grid-cols-3 gap-2">
          {availableTimes.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl text-sm font-medium transition-colors ${
                selectedTime === time
                  ? 'bg-[#36c6c6] text-white'
                  : 'bg-gray-50 text-neutral-600 hover:bg-[#B2FFFF] hover:text-[#36c6c6]'
              }`}
            >
              <Clock className="h-4 w-4" />
              <span>{time}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Book Button */}
      <button
        onClick={onBook}
        disabled={!selectedDate || !selectedTime}
        className="w-full bg-[#36c6c6] text-white px-6 py-3 rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Agendar Serviço
      </button>
    </div>
  );
}