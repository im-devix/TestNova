import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Palette, 
  Bell, 
  Shield, 
  Download,
  Trash2,
  Moon,
  Sun,
  Volume2,
  VolumeX
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import useQuizStore from '../store/quizStore';

const SettingsPage = () => {
  const { quizHistory } = useQuizStore();
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    sounds: true,
    autoAdvance: false,
    showExplanations: true,
    saveHistory: true
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast.success('Setting updated!');
  };

  const exportData = () => {
    const data = {
      quizHistory,
      settings,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quizmaster-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Data exported successfully!');
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      localStorage.clear();
      toast.success('All data cleared!');
      window.location.reload();
    }
  };

  const ToggleSwitch = ({ enabled, onChange, disabled = false }) => (
    <button
      onClick={() => !disabled && onChange(!enabled)}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
        enabled ? 'bg-primary-500' : 'bg-neutral-300'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="min-h-screen py-8 lg:py-16">
      <div className="container-max section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-primary-50 rounded-full px-4 py-2 border border-primary-200/50 mb-6">
              <Settings className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium text-primary-700">Settings</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
              Preferences
            </h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Customize your QuizMaster experience to suit your preferences
            </p>
          </div>

          <div className="space-y-8">
            {/* Appearance Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Palette className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-neutral-900">Appearance</h2>
                    <p className="text-sm text-neutral-600">Customize the look and feel</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-neutral-900">Theme</h3>
                      <p className="text-sm text-neutral-600">Choose your preferred theme</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleSettingChange('theme', 'light')}
                        className={`p-2 rounded-lg transition-colors ${
                          settings.theme === 'light' 
                            ? 'bg-primary-100 text-primary-700' 
                            : 'text-neutral-600 hover:bg-neutral-100'
                        }`}
                      >
                        <Sun className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleSettingChange('theme', 'dark')}
                        className={`p-2 rounded-lg transition-colors ${
                          settings.theme === 'dark' 
                            ? 'bg-primary-100 text-primary-700' 
                            : 'text-neutral-600 hover:bg-neutral-100'
                        }`}
                        disabled
                      >
                        <Moon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Quiz Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-neutral-900">Quiz Experience</h2>
                    <p className="text-sm text-neutral-600">Configure how quizzes behave</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-neutral-900">Auto-advance questions</h3>
                      <p className="text-sm text-neutral-600">Automatically move to next question after answering</p>
                    </div>
                    <ToggleSwitch
                      enabled={settings.autoAdvance}
                      onChange={(value) => handleSettingChange('autoAdvance', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-neutral-900">Show explanations</h3>
                      <p className="text-sm text-neutral-600">Display explanations after each question</p>
                    </div>
                    <ToggleSwitch
                      enabled={settings.showExplanations}
                      onChange={(value) => handleSettingChange('showExplanations', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-neutral-900">Sound effects</h3>
                      <p className="text-sm text-neutral-600">Play sounds for correct/incorrect answers</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      {settings.sounds ? (
                        <Volume2 className="w-5 h-5 text-neutral-400" />
                      ) : (
                        <VolumeX className="w-5 h-5 text-neutral-400" />
                      )}
                      <ToggleSwitch
                        enabled={settings.sounds}
                        onChange={(value) => handleSettingChange('sounds', value)}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Privacy Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-neutral-900">Privacy & Data</h2>
                    <p className="text-sm text-neutral-600">Control your data and privacy settings</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-neutral-900">Save quiz history</h3>
                      <p className="text-sm text-neutral-600">Store your quiz results locally for progress tracking</p>
                    </div>
                    <ToggleSwitch
                      enabled={settings.saveHistory}
                      onChange={(value) => handleSettingChange('saveHistory', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-neutral-900">Notifications</h3>
                      <p className="text-sm text-neutral-600">Receive notifications about quiz updates</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Bell className="w-5 h-5 text-neutral-400" />
                      <ToggleSwitch
                        enabled={settings.notifications}
                        onChange={(value) => handleSettingChange('notifications', value)}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Data Management */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                    <Download className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-neutral-900">Data Management</h2>
                    <p className="text-sm text-neutral-600">Export or clear your data</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                    <div>
                      <h3 className="font-medium text-neutral-900">Export data</h3>
                      <p className="text-sm text-neutral-600">Download all your quiz data and settings</p>
                    </div>
                    <Button
                      variant="secondary"
                      onClick={exportData}
                      icon={Download}
                      size="sm"
                    >
                      Export
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-error-50 rounded-xl border border-error-200">
                    <div>
                      <h3 className="font-medium text-error-900">Clear all data</h3>
                      <p className="text-sm text-error-700">Permanently delete all quiz history and settings</p>
                    </div>
                    <Button
                      variant="error"
                      onClick={clearAllData}
                      icon={Trash2}
                      size="sm"
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* App Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    QuizMaster Pro
                  </h3>
                  <p className="text-sm text-neutral-600 mb-4">
                    Version 2.0.0 • Built with React & Tailwind CSS
                  </p>
                  <div className="text-xs text-neutral-500">
                    Made with ❤️ for better learning experiences
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;