import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/hooks/use-auth';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirm: '',
    role: 'reader',
    accept_terms: false,
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { register, isLoading, user } = useAuth();
  // Check if the current user is an admin
  const isAdmin = user?.role === 'admin';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({ ...prev, role: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    if (formData.password !== formData.password_confirm) {
      setError('Kata sandi tidak cocok');
      return;
    }

    if (!formData.accept_terms) {
      setError('Anda harus menyetujui Syarat dan Ketentuan');
      return;
    }
    
    try {
      const response = await register(formData);
      setSuccessMessage('Pendaftaran berhasil! Silakan periksa email Anda untuk verifikasi.');
      // Don't close modal to show success message
    } catch (err: any) {
      if (err.response && err.response.data) {
        // Extract error message from API response
        const errorData = err.response.data;
        if (typeof errorData === 'object') {
          const firstError = Object.values(errorData)[0];
          setError(Array.isArray(firstError) ? firstError[0] : String(firstError));
        } else {
          setError(String(errorData.detail || 'Pendaftaran gagal. Silakan coba lagi.'));
        }
      } else {
        setError('Pendaftaran gagal. Silakan coba lagi dengan kredensial yang berbeda.');
      }
      console.error('Registration error:', err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">Daftar</DialogTitle>
          <DialogDescription>
            Buat akun untuk mengakses semua fitur dan konten.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {error && (
            <div className="bg-red-100 text-red-800 p-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          {successMessage && (
            <div className="bg-green-100 text-green-800 p-3 rounded-md text-sm">
              {successMessage}
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="username">Nama Pengguna</Label>
            <Input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Pilih nama pengguna"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="nama@example.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Kata Sandi</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Buat kata sandi"
              required
            />
            <p className="text-xs text-muted-foreground">
              Kata sandi minimal 8 karakter dengan huruf dan angka
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password_confirm">Konfirmasi Kata Sandi</Label>
            <Input
              id="password_confirm"
              name="password_confirm"
              type="password"
              value={formData.password_confirm}
              onChange={handleChange}
              placeholder="Ketik ulang kata sandi"
              required
            />
          </div>
          
          {/* Only show role selection if the current user is an admin */}
          {isAdmin && (
            <div className="space-y-2">
              <Label htmlFor="role">Peran Pengguna</Label>
              <Select value={formData.role} onValueChange={handleRoleChange}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Pilih peran" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reader">Pembaca</SelectItem>
                  <SelectItem value="mushoheh">Mushoheh</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="accept_terms"
              name="accept_terms"
              checked={formData.accept_terms}
              onChange={handleChange}
              className="rounded border-gray-300 text-islamic-green focus:ring-islamic-green"
              required
            />
            <label htmlFor="accept_terms" className="text-sm">
              Dengan mendaftar, Anda menyetujui <a href="/terms" className="text-islamic-green hover:underline">Syarat dan Ketentuan</a> serta <a href="/privacy" className="text-islamic-green hover:underline">Kebijakan Privasi</a> kami.
            </label>
          </div>
          
          <Button type="submit" className="w-full bg-islamic-green hover:bg-islamic-green/90" disabled={isLoading}>
            {isLoading ? 'Memproses...' : 'Daftar'}
          </Button>
        </form>
        
        <DialogFooter className="flex flex-col sm:flex-row sm:space-x-2">
          <span className="text-sm text-center text-foreground/70">
            Sudah punya akun?
          </span>
          <Button 
            type="button" 
            variant="link" 
            onClick={onSwitchToLogin}
            className="px-0 h-auto text-sm"
          >
            Masuk
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal; 