import { create } from 'zustand';

interface UserSettings {
  notifications: {
    email: boolean;
    push: boolean;
    promotions: boolean;
    orderUpdates: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private';
    activityHistory: boolean;
    locationSharing: boolean;
  };
  language: string;
  theme: 'light' | 'dark' | 'system';
}

interface SettingsState {
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  resetSettings: () => void;
}

const defaultSettings: UserSettings = {
  notifications: {
    email: true,
    push: true,
    promotions: false,
    orderUpdates: true
  },
  privacy: {
    profileVisibility: 'public',
    activityHistory: true,
    locationSharing: true
  },
  language: 'pt-BR',
  theme: 'system'
};

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: defaultSettings,
  updateSettings: (newSettings) => 
    set((state) => ({
      settings: {
        ...state.settings,
        ...newSettings
      }
    })),
  resetSettings: () => set({ settings: defaultSettings })
}));