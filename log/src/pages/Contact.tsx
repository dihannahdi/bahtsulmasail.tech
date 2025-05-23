import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Here you would add actual API call to send the contact form
      // For now, just simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-6">
              Hubungi Kami
            </h1>
            <p className="text-center text-foreground/70 max-w-2xl mx-auto mb-16">
              Punya pertanyaan, saran, atau ingin berkolaborasi? Kami sangat senang mendengar dari Anda. 
              Gunakan salah satu metode kontak di bawah atau isi formulir untuk menghubungi kami.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              <div className="bg-background rounded-lg shadow-md p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-islamic-green/10 rounded-full flex items-center justify-center mb-4">
                  <Phone className="h-5 w-5 text-islamic-green" />
                </div>
                <h2 className="font-medium text-lg mb-2">Telepon</h2>
                <p className="text-foreground/70 mb-3">Senin - Jumat, 09:00 - 17:00 WIB</p>
                <a
                  href="tel:+6285643349455"
                  className="font-medium text-islamic-green hover:underline"
                >
                  +62 856 4334 9455
                </a>
              </div>

              <div className="bg-background rounded-lg shadow-md p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-islamic-green/10 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-5 w-5 text-islamic-green" />
                </div>
                <h2 className="font-medium text-lg mb-2">Email</h2>
                <p className="text-foreground/70 mb-3">
                  Kami akan merespons dalam 1-2 hari kerja
                </p>
                <a
                  href="mailto:dihannahdii@gmail.com"
                  className="font-medium text-islamic-green hover:underline"
                >
                  dihannahdii@gmail.com
                </a>
              </div>

              <div className="bg-background rounded-lg shadow-md p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-islamic-green/10 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-5 w-5 text-islamic-green" />
                </div>
                <h2 className="font-medium text-lg mb-2">Alamat</h2>
                <p className="text-foreground/70 mb-3">
                  Kantor Pusat Bahtsul Masail
                </p>
                <p className="text-foreground/70">
                  Panggungharjo, Bantul, Yogyakarta.
                </p>
              </div>
            </div>

            <div className="bg-background rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-serif font-semibold text-center mb-8">
                Kirim Pesan
              </h2>

              <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                {submitStatus === "success" && (
                  <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md mb-6">
                    Pesan Anda telah berhasil terkirim. Kami akan menghubungi Anda segera!
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
                    Terjadi kesalahan saat mengirim pesan. Silakan coba lagi nanti atau hubungi kami melalui telepon/email.
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Masukkan nama lengkap Anda"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="nama@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <Label htmlFor="subject">Subjek</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    placeholder="Judul pesan Anda"
                    required
                  />
                </div>

                <div className="space-y-2 mb-6">
                  <Label htmlFor="message">Pesan</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Tulis pesan Anda di sini..."
                    rows={6}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-islamic-green hover:bg-islamic-green/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Mengirim...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send className="mr-2 h-4 w-4" /> Kirim Pesan
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Contact; 