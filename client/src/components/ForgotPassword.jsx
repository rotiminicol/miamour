import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { FaArrowLeft } from 'react-icons/fa';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email.trim());
      setMessage('Password reset email sent! Check your inbox.');
    } catch (err) {
      console.error('Password reset error:', err.message);
      setError(
        err.message.includes('user-not-found')
          ? 'No account found with this email.'
          : 'Failed to send reset email. Try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-br from-pink-100 to-purple-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 md:p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-pink-600 font-serif">
            Reset Your Password
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            Enter your email to receive a password reset link
          </p>
        </div>

        {message && (
          <p className="text-center text-green-600 bg-green-100/80 p-2 rounded-md mb-6 text-sm">
            {message}
          </p>
        )}
        {error && (
          <p className="text-center text-red-500 bg-red-100/80 p-2 rounded-md mb-6 text-sm">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              type="email"
              id="reset-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors peer"
              placeholder=" "
            />
            <label
              htmlFor="reset-email"
              className={`absolute left-3 top-2.5 text-gray-500 text-sm transition-all duration-200 peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-focus:-top-5 peer-focus:text-xs peer-focus:text-pink-600 peer-valid:-top-5 peer-valid:text-xs border-l-2 border-r-2 border-gray-300 px-2 ${
                email ? '-top-5 text-xs' : ''
              }`}
            >
              Your email
            </label>
          </div>

          <button
            type="submit"
            className={`w-full py-2.5 px-4 ${
              loading
                ? 'bg-pink-300 cursor-not-allowed'
                : 'bg-pink-600 hover:bg-pink-700'
            } text-white font-medium rounded-lg transition-colors duration-200`}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="text-center mt-6 text-sm">
          <Link
            to="/auth"
            className="text-pink-600 hover:text-pink-700 flex items-center justify-center transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;