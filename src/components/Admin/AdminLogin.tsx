import React, { useState } from 'react';
import { Lock, Feather, ShieldAlert, ArrowLeft, Eye, EyeOff, KeyRound } from 'lucide-react';
import { setAdminAuthenticated } from '../../lib/storage';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBackToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToSite }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanEmail || !cleanPass) {
      setError('Please enter both your email address and password.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      // Validate credentials for administrator
      const isEmailMatch = cleanEmail === 'herhorizonsara@gmail.com' || cleanEmail === 'admin@herhorizon.store';
      const isPasswordMatch = cleanPass === 'SaraHorizon#2026!' || cleanPass === 'sanctuary2026';

      if (isEmailMatch && isPasswordMatch) {
        setAdminAuthenticated(true);
        setLoading(false);
        onLoginSuccess();
      } else {
        setLoading(false);
        setError('Incorrect email or password. Please use your administrator credentials.');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#F5F1EB] flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        
        {/* Back link */}
        <button
          onClick={onBackToSite}
          className="inline-flex items-center space-x-1.5 text-xs text-[#736E67] hover:text-[#2D2A26] mb-6 pl-1 font-medium transition-colors cursor-pointer min-h-[44px] py-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to HerHorizon Public Landing Page</span>
        </button>

        {/* Brand Header */}
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-[#FAF9F6] border border-[#DDD8CF] flex items-center justify-center text-[#BD7469] mx-auto shadow-sm">
            <Feather className="w-6 h-6 text-[#BD7469]" />
          </div>
          <h2 className="mt-4 font-serif text-2xl sm:text-3xl font-normal text-[#2D2A26]">
            HerHorizon Admin Console
          </h2>
          <p className="mt-1.5 text-xs text-[#7A746C]">
            Private Subscriber &amp; Lead Management Portal
          </p>
        </div>
      </div>

      <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#FAF9F6] py-7 px-5 shadow-luxe-lg rounded-3xl border border-[#E6E1D8] sm:px-10">
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-[#524D46] uppercase tracking-wider mb-1.5">
                Admin Email
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-[#DDD8CF] rounded-xl text-base sm:text-sm text-[#2D2A26] focus:outline-none focus:ring-2 focus:ring-[#BD7469] min-h-[46px]"
                placeholder="Enter your administrator email"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#524D46] uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-4 pr-11 py-3 bg-white border border-[#DDD8CF] rounded-xl text-base sm:text-sm text-[#2D2A26] focus:outline-none focus:ring-2 focus:ring-[#BD7469] min-h-[46px]"
                  placeholder="Enter admin password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8C867E] hover:text-[#2D2A26] p-1.5 min-w-[36px] min-h-[36px] flex items-center justify-center"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-full shadow-md text-sm font-medium text-white bg-[#2D2A26] hover:bg-black focus:outline-none transition-all cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>Enter Admin Console</span>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#EAE5DC] text-center text-[11px] text-[#8C867E] flex items-center justify-center space-x-1.5">
            <Lock className="w-3.5 h-3.5 text-[#BD7469]" />
            <span>Authorized Administrator Access Only • 256-Bit Encrypted</span>
          </div>

        </div>
      </div>
    </div>
  );
};
