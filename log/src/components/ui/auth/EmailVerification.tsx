import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { verifyEmail, resendVerificationEmail } from '@/lib/api';
import { Loader2 } from 'lucide-react';

const EmailVerification = () => {
  const { token } = useParams<{ token: string }>();
  const [verifying, setVerifying] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [resendEmail, setResendEmail] = useState('');
  const [resendingEmail, setResendingEmail] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setVerifying(false);
        setError('Token verifikasi tidak valid');
        return;
      }

      try {
        const response = await verifyEmail(token);
        setSuccess(true);
        setVerifying(false);
      } catch (err: any) {
        setVerifying(false);
        setError(err.response?.data?.detail || 'Terjadi kesalahan saat memverifikasi email');
      }
    };

    verifyToken();
  }, [token]);

  const handleResendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resendEmail) {
      return;
    }

    setResendingEmail(true);
    try {
      await resendVerificationEmail(resendEmail);
      setResendSuccess(true);
    } catch (err) {
      console.error('Failed to resend verification email', err);
    } finally {
      setResendingEmail(false);
    }
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  if (verifying) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-md">
          <div className="flex flex-col items-center">
            <Loader2 className="h-16 w-16 animate-spin text-islamic-green" />
            <h2 className="mt-4 text-2xl font-semibold">Memverifikasi Email</h2>
            <p className="mt-2 text-center text-gray-600">
              Mohon tunggu sementara kami memverifikasi email Anda...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-md">
          <div className="flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mt-4 text-2xl font-semibold">Email Berhasil Diverifikasi</h2>
            <p className="mt-2 text-center text-gray-600">
              Terima kasih telah memverifikasi email Anda. Sekarang Anda dapat masuk ke akun Anda.
            </p>
            <Button onClick={handleGoToLogin} className="mt-6 w-full bg-islamic-green hover:bg-islamic-green/90">
              Masuk ke Akun
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-md">
        <div className="flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="mt-4 text-2xl font-semibold">Verifikasi Gagal</h2>
          <p className="mt-2 text-center text-gray-600">
            {error}
          </p>

          {!resendSuccess && (
            <div className="mt-6 w-full">
              <h3 className="text-lg font-medium">Kirim Ulang Email Verifikasi</h3>
              <form onSubmit={handleResendEmail} className="mt-4">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={resendEmail}
                      onChange={(e) => setResendEmail(e.target.value)}
                      placeholder="Masukkan email Anda"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-islamic-green focus:outline-none focus:ring-islamic-green"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-islamic-green hover:bg-islamic-green/90"
                    disabled={resendingEmail}
                  >
                    {resendingEmail ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Mengirim...
                      </>
                    ) : (
                      'Kirim Ulang Email Verifikasi'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {resendSuccess && (
            <div className="mt-6 rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    Email verifikasi telah dikirim. Silakan periksa inbox Anda.
                  </p>
                </div>
              </div>
            </div>
          )}

          <Button variant="outline" onClick={handleGoToLogin} className="mt-4 w-full">
            Kembali ke Halaman Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification; 