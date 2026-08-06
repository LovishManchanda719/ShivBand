"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig';
import { useTheme } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Logo from '@/components/Logo';
import Link from 'next/link';
import { FirebaseError } from 'firebase/app';
import { User, Mail, Lock, UserPlus, ArrowRight } from 'lucide-react';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      router.push('/');
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="flex-grow flex items-center justify-center container mx-auto px-4 pt-28 pb-16 relative">
        
        {/* Background Ambient Glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md relative z-10"
        >
          {/* Card Container */}
          <div className={`p-6 sm:p-8 rounded-2xl shadow-2xl border backdrop-blur-xl ${
            isDarkMode 
              ? 'bg-gray-900/90 border-gray-800 text-white' 
              : 'bg-white/95 border-gray-200 text-gray-900'
          }`}>
            
            {/* Header / Brand */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <Logo size="md" variant="inline" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-1">
                Create an Account
              </h1>
              <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Join Shiv Band to save bookings & review events
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div>
                <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-gray-400">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full p-3 pl-10 rounded-xl border text-sm transition-all outline-none ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-700 text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-teal-500 focus:ring-1 focus:ring-teal-500'
                    }`}
                    required
                  />
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-gray-400">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full p-3 pl-10 rounded-xl border text-sm transition-all outline-none ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-700 text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-teal-500 focus:ring-1 focus:ring-teal-500'
                    }`}
                    required
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-gray-400">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full p-3 pl-10 rounded-xl border text-sm transition-all outline-none ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-700 text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-teal-500 focus:ring-1 focus:ring-teal-500'
                    }`}
                    required
                  />
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Error Box */}
              {error && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold text-center">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white shadow-lg flex items-center justify-center gap-2 transition-all ${
                  loading
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-500 via-teal-500 to-emerald-500 hover:from-amber-600 hover:to-emerald-600 shadow-teal-500/20'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span>{loading ? 'Creating account...' : 'Create Account'}</span>
              </motion.button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-800/60 text-center">
              <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Already have an account?{' '}
                <Link href="/login" className="text-teal-500 hover:text-teal-400 font-bold inline-flex items-center gap-1 ml-1">
                  Log in now <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </p>
            </div>

          </div>
        </motion.div>
      </main>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}
