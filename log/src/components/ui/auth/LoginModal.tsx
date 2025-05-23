import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/hooks/use-auth';
import { resendVerificationEmail } from '@/lib/api';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

const LoginModal = ({ isOpen, onClose, onSwitchToRegister }: LoginModalProps) => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [adminSetupData, setAdminSetupData] = useState({
    username: 'admin',
    email: 'admin@example.com',
    password: '',
    password_confirm: '',
  });
  const [error, setError] = useState('');
  const [verificationEmail, setVerificationEmail] = useState('');
  const [needsVerification, setNeedsVerification] = useState(false);
  const [resendingVerification, setResendingVerification] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const { login, register, isLoading } = useAuth();

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleAdminSetupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminSetupData(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setNeedsVerification(false);
    
    try {
      await login(loginData.username, loginData.password);
      onClose();
    } catch (err: any) {
      // Check if this is an email verification error
      if (err.response?.status === 403 && 
          err.response?.data?.detail?.includes('Email not verified')) {
        setNeedsVerification(true);
        setVerificationEmail(loginData.username); // Use username which could be email
      } else {
        setError('Gagal masuk. Silakan periksa kredensial Anda.');
      }
      console.error('Login error:', err);
    }
  };

  const handleResendVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationEmail) return;
    
    setResendingVerification(true);
    try {
      await resendVerificationEmail(verificationEmail);
      setResendSuccess(true);
    } catch (err) {
      console.error('Failed to resend verification email', err);
    } finally {
      setResendingVerification(false);
    }
  };

  const handleAdminSetupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (adminSetupData.password !== adminSetupData.password_confirm) {
      setError('Kata sandi tidak cocok');
      return;
    }
    
    if (adminSetupData.password.length < 8) {
      setError('Kata sandi minimal harus 8 karakter');
      return;
    }
    
    try {
      // Register the admin user with admin role
      await register({
        username: adminSetupData.username,
        email: adminSetupData.email,
        password: adminSetupData.password,
        password_confirm: adminSetupData.password_confirm,
        role: 'admin'
      });
      
      onClose();
    } catch (err) {
      setError('Pengaturan admin gagal. Silakan coba lagi.');
      console.error('Admin setup error:', err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Masuk</TabsTrigger>
            <TabsTrigger value="admin-setup">Pengaturan Admin Awal</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <DialogHeader>
              <DialogTitle>Masuk ke akun Anda</DialogTitle>
              <DialogDescription>
                Masukkan kredensial Anda untuk mengakses repositori.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleLoginSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Nama Pengguna</Label>
                  <Input
                    id="username"
                    name="username"
                    value={loginData.username}
                    onChange={handleLoginChange}
                    placeholder="Masukkan nama pengguna Anda"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Kata Sandi</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    placeholder="Masukkan kata sandi Anda"
                    required
                  />
                </div>
                
                {needsVerification && !resendSuccess && (
                  <div className="bg-yellow-100 p-3 rounded-md text-sm my-3">
                    <p className="text-yellow-800 mb-2">Email Anda belum diverifikasi. Silakan verifikasi untuk melanjutkan.</p>
                    <form onSubmit={handleResendVerification} className="mt-2">
                      <div className="flex gap-2">
                        <Input
                          type="email"
                          value={verificationEmail}
                          onChange={(e) => setVerificationEmail(e.target.value)}
                          placeholder="Konfirmasi email Anda"
                          required
                        />
                        <Button 
                          type="submit" 
                          size="sm" 
                          variant="secondary"
                          disabled={resendingVerification}
                        >
                          {resendingVerification ? 'Mengirim...' : 'Kirim Ulang'}
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
                
                {resendSuccess && (
                  <div className="bg-green-100 p-3 rounded-md text-sm my-3">
                    <p className="text-green-800">Email verifikasi telah dikirim. Silakan periksa email Anda.</p>
                  </div>
                )}
                
                {error && !needsVerification && (
                  <p className="text-destructive text-sm">{error}</p>
                )}
              </div>
              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                <Button variant="secondary" type="button" onClick={onSwitchToRegister}>
                  Belum punya akun?
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Sedang masuk...' : 'Masuk'}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="admin-setup">
            <DialogHeader>
              <DialogTitle>Pengaturan Admin Awal</DialogTitle>
              <DialogDescription>
                Buat akun administrator pertama untuk sistem.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAdminSetupSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="admin-username">Nama Pengguna</Label>
                  <Input
                    id="admin-username"
                    name="username"
                    value={adminSetupData.username}
                    onChange={handleAdminSetupChange}
                    placeholder="Nama pengguna admin"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="admin-email">Email</Label>
                  <Input
                    id="admin-email"
                    name="email"
                    type="email"
                    value={adminSetupData.email}
                    onChange={handleAdminSetupChange}
                    placeholder="Email admin"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="admin-password">Kata Sandi</Label>
                  <Input
                    id="admin-password"
                    name="password"
                    type="password"
                    value={adminSetupData.password}
                    onChange={handleAdminSetupChange}
                    placeholder="Buat kata sandi yang aman"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="admin-password_confirm">Konfirmasi Kata Sandi</Label>
                  <Input
                    id="admin-password_confirm"
                    name="password_confirm"
                    type="password"
                    value={adminSetupData.password_confirm}
                    onChange={handleAdminSetupChange}
                    placeholder="Konfirmasi kata sandi Anda"
                    required
                  />
                </div>
                {error && <p className="text-destructive text-sm">{error}</p>}
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Membuat Admin...' : 'Buat Akun Admin'}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal; 