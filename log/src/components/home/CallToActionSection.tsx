import { Button } from "@/components/ui/button";

const CallToActionSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-islamic-blue to-islamic-purple text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
          Mulai Jelajahi Pengetahuan Hukum Islam
        </h2>
        <p className="max-w-2xl mx-auto text-white/80 mb-8">
          Bergabunglah dengan ribuan ulama, santri, dan peneliti yang menggunakan platform kami untuk mengakses, memahami, dan menganalisis teks-teks hukum Islam.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-white text-islamic-blue hover:bg-white/90">
            Buat Akun Gratis
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-white border-white/80 hover:bg-white/20 hover:border-white font-medium border-2"
          >
            <span className="text-black dark:text-white">Pelajari Lebih Lanjut</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
