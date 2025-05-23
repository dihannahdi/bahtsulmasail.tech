import MainLayout from "@/components/layout/MainLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <MainLayout>
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-12">
              Pertanyaan yang Sering Diajukan
            </h1>

            <Accordion type="single" collapsible className="bg-background rounded-lg shadow-md p-6">
              <AccordionItem value="item-1" className="border-b">
                <AccordionTrigger className="text-lg font-medium py-4">
                  Apa itu BahtsulMasail.tech?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 pb-4">
                  BahtsulMasail.tech adalah platform digital yang berisi kumpulan dokumen hukum Islam, fatwa, dan pendapat ulama khususnya dari hasil Bahtsul Masail Pondok Pesantren yang telah diproses secara digital untuk memudahkan pencarian, pembelajaran, dan pemanfaatan bagi masyarakat umum maupun akademisi.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-b">
                <AccordionTrigger className="text-lg font-medium py-4">
                  Bagaimana cara menggunakan fitur pencarian?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 pb-4">
                  Anda dapat menggunakan fitur pencarian dengan mengetikkan kata kunci, frasa, atau pertanyaan terkait topik yang ingin Anda cari di kolom pencarian. Sistem kami akan menampilkan dokumen-dokumen yang relevan dengan pencarian Anda. Anda juga dapat memfilter hasil berdasarkan kategori, tahun, atau sumber untuk mempersempit pencarian.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-b">
                <AccordionTrigger className="text-lg font-medium py-4">
                  Dari mana sumber dokumen yang ada di platform ini?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 pb-4">
                  Dokumen yang tersedia di platform kami berasal dari berbagai sumber terpercaya, termasuk Hasil Bahtsul Masail Pondok Pesantren yang telah diverifikasi dan divalidasi, kitab-kitab klasik, publikasi lembaga fatwa resmi, karya ilmiah dari para ulama terkemuka, serta jurnal dan publikasi akademik di bidang hukum Islam. Setiap dokumen dilengkapi dengan informasi sumber untuk memastikan validitas dan otentisitasnya. Selain itu, khusus untuk Hasil Bahtsul Masail, kami lakukan proses verifikasi dan validasi secara manual untuk memastikan kebenaran dan kesahihannya.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-b">
                <AccordionTrigger className="text-lg font-medium py-4">
                  Apakah saya perlu mendaftar untuk menggunakan platform ini?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 pb-4">
                  Tidak, Anda dapat menjelajahi dan mencari dokumen tanpa perlu mendaftar. Namun, pendaftaran akun akan memberikan Anda akses ke fitur tambahan seperti menyimpan dokumen favorit, mendapatkan rekomendasi personalisasi, serta mengunggah dan berbagi dokumen (untuk pengguna tertentu).
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-b">
                <AccordionTrigger className="text-lg font-medium py-4">
                  Bisakah saya mengunggah dokumen saya sendiri?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 pb-4">
                  Ya, pengguna terdaftar dengan izin khusus (seperti mushoheh atau admin) dapat mengunggah dokumen. Setiap dokumen yang diunggah akan melalui proses verifikasi untuk memastikan kualitas dan reliabilitasnya sebelum dipublikasikan di platform.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-b">
                <AccordionTrigger className="text-lg font-medium py-4">
                  Bagaimana cara menghubungi tim dukungan?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 pb-4">
                  Anda dapat menghubungi tim dukungan kami melalui halaman Kontak kami, mengirim email ke dihannahdii@gmail.com, atau menghubungi nomor 085643349455. Kami akan merespons pertanyaan Anda secepat mungkin.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="text-lg font-medium py-4">
                  Apakah platform ini tersedia dalam bahasa lain?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 pb-4">
                  Saat ini platform kami tersedia dalam Bahasa Indonesia dan sebagian dokumen tersedia dalam Bahasa Arab. Kami berencana untuk menambahkan dukungan bahasa lain di masa mendatang untuk menjangkau lebih banyak pengguna.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-12 text-center">
              <p className="text-foreground/70">
                Masih punya pertanyaan? Hubungi kami di{" "}
                <a href="mailto:dihannahdii@gmail.com" className="text-islamic-green hover:underline">
                  dihannahdii@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default FAQ; 