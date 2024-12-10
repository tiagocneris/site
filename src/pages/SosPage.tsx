import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { useAuth } from '../components/auth/AuthProvider';
import { useLocationStore } from '../store/locationStore';
import EmergencyContacts from '../components/sos/EmergencyContacts';
import ReportForm from '../components/sos/ReportForm';
import ReportMap from '../components/sos/ReportMap';
import ReportList from '../components/sos/ReportList';
import LocationPermissionRequest from '../components/location/LocationPermissionRequest';
import { supabase } from '../lib/supabase';

export default function SosPage() {
  const { user } = useAuth();
  const { currentLocation, setLocation, error: locationError } = useLocationStore();
  const [showReportForm, setShowReportForm] = useState(false);
  const [showLocationRequest, setShowLocationRequest] = useState(!currentLocation);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const { data, error } = await supabase
          .from('reports')
          .select(`
            *,
            reporter:users(name),
            images
          `)
          .order('created_at', { ascending: false })
          .limit(10);

        if (error) throw error;
        setReports(data || []);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            address: ''
          });
          setShowLocationRequest(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="flex items-center gap-2 text-neutral-600 hover:text-[#36c6c6] transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
            <AlertTriangle className="h-10 w-10 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Central de Resgate (SOS Pet)
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ajude-nos a proteger os animais. Denuncie casos de maus-tratos ou abandono
            e contribua para um mundo mais seguro para nossos amigos de quatro patas.
          </p>
        </div>

        {/* Report Button */}
        <div className="text-center mb-16">
          <button
            onClick={() => setShowReportForm(true)}
            className="inline-flex items-center gap-2 bg-[#36c6c6] text-white px-8 py-4 rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors text-lg font-medium"
          >
            <AlertTriangle className="h-6 w-6" />
            <span>Fazer Denúncia</span>
          </button>
        </div>

        {/* Emergency Contacts Section */}
        <EmergencyContacts />

        {/* Reports Map */}
        <ReportMap reports={reports} loading={loading} />

        {/* Recent Reports */}
        <ReportList reports={reports} loading={loading} />

        {/* Report Form Modal */}
        {showReportForm && (
          <ReportForm onClose={() => setShowReportForm(false)} />
        )}

        {/* Location Permission Request */}
        {showLocationRequest && (
          <LocationPermissionRequest
            onRequestPermission={handleLocationPermission}
            onSkip={() => setShowLocationRequest(false)}
            error={locationError}
          />
        )}
      </div>
    </div>
  );
}