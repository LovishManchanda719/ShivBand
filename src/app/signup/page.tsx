"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { FirebaseError } from 'firebase/app';
export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { isDarkMode } = useTheme();

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
        setError(err.message); // Access the message property of the FirebaseError
      } else {
        setError('An unexpected error occurred'); // In case it's not a FirebaseError
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'
    }`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className={isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}>
          <CardHeader>
            <CardTitle>Create an Account</CardTitle>
            <CardDescription className={isDarkMode ? 'text-gray-300' : 'text-gray-500'}>
              Enter your details to sign up
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={isDarkMode ? 'bg-gray-700 text-white border-gray-600' : ''}
                  required
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={isDarkMode ? 'bg-gray-700 text-white border-gray-600' : ''}
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={isDarkMode ? 'bg-gray-700 text-white border-gray-600' : ''}
                  required
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}
              <Button 
  type="submit" 
  className="w-full bg-white text-black border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
  disabled={loading}
>
  {loading ? 'Creating account...' : 'Sign Up'}
</Button>
            </form>

            <p className={`mt-4 text-center text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
              Already have an account?{' '}
              <Link href="/login" className="text-blue-500 hover:text-blue-600">
                Log in
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
