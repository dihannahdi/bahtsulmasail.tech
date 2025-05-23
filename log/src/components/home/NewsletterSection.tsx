import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState<null | "success" | "error">(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    setSubscribeStatus(null);

    try {
      // Here you would add actual API call to subscribe
      // For now, just simulate a successful subscription
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubscribeStatus("success");
      setEmail("");
    } catch (error) {
      console.error("Error subscribing:", error);
      setSubscribeStatus("error");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <section className="py-20 bg-islamic-dark text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-serif font-bold text-islamic-gold mb-4">
            Newsletter
          </h2>
          <p className="text-xl mb-8">
            Berlangganan untuk mendapatkan informasi terbaru tentang konten dan fitur baru.
          </p>
          
          <form onSubmit={handleSubscribe} className="max-w-xl mx-auto">
            <div className="relative">
              <Input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Anda" 
                className="w-full bg-[#2E3441] border-0 rounded-full px-6 py-6 text-lg focus:outline-none focus:ring-2 focus:ring-islamic-gold placeholder:text-gray-400 pr-36"
              />
              <Button 
                type="submit"
                disabled={isSubscribing}
                className="absolute right-1 top-1 bottom-1 bg-islamic-gold text-islamic-dark px-6 py-2 rounded-full text-lg font-medium hover:bg-islamic-gold/90 transition-colors"
              >
                {isSubscribing ? "..." : "Langganan"}
              </Button>
            </div>
            
            {subscribeStatus === "success" && (
              <p className="text-green-400 mt-4">Berhasil berlangganan. Terima kasih!</p>
            )}
            {subscribeStatus === "error" && (
              <p className="text-red-400 mt-4">Gagal berlangganan. Silakan coba lagi.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection; 