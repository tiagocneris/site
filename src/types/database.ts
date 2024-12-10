export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          phone: string | null;
          address: string | null;
          avatar_url: string | null;
          role: 'USER' | 'ADMIN' | 'ONG';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          phone?: string;
          address?: string;
          avatar_url?: string;
          role?: 'USER' | 'ADMIN' | 'ONG';
        };
        Update: {
          email?: string;
          name?: string;
          phone?: string;
          address?: string;
          avatar_url?: string;
          role?: 'USER' | 'ADMIN' | 'ONG';
        };
      };
      settings: {
        Row: {
          id: string;
          user_id: string;
          notifications: boolean;
          email_updates: boolean;
          language: string;
          theme: string;
          privacy_enabled: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          notifications?: boolean;
          email_updates?: boolean;
          language?: string;
          theme?: string;
          privacy_enabled?: boolean;
        };
        Update: {
          notifications?: boolean;
          email_updates?: boolean;
          language?: string;
          theme?: string;
          privacy_enabled?: boolean;
        };
      };
      reports: {
        Row: {
          id: string;
          type: 'abuse' | 'abandonment' | 'injury' | 'other';
          description: string;
          location: {
            lat: number;
            lng: number;
            address: string;
          };
          images: string[];
          status: 'pending' | 'in_progress' | 'resolved' | 'cancelled';
          reporter_id: string | null;
          anonymous: boolean;
          contact_info: {
            name?: string;
            phone?: string;
            email?: string;
          } | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          type: 'abuse' | 'abandonment' | 'injury' | 'other';
          description: string;
          location: {
            lat: number;
            lng: number;
            address: string;
          };
          images?: string[];
          status?: 'pending' | 'in_progress' | 'resolved' | 'cancelled';
          reporter_id?: string;
          anonymous: boolean;
          contact_info?: {
            name?: string;
            phone?: string;
            email?: string;
          };
        };
        Update: {
          type?: 'abuse' | 'abandonment' | 'injury' | 'other';
          description?: string;
          location?: {
            lat: number;
            lng: number;
            address: string;
          };
          images?: string[];
          status?: 'pending' | 'in_progress' | 'resolved' | 'cancelled';
          contact_info?: {
            name?: string;
            phone?: string;
            email?: string;
          };
        };
      };
    };
    Functions: {
      init_database: {
        Args: Record<string, never>;
        Returns: void;
      };
      exec_sql: {
        Args: { sql: string };
        Returns: void;
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
}