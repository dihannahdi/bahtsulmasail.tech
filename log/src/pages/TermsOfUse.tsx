import MainLayout from "@/components/layout/MainLayout";

const TermsOfUse = () => {
  return (
    <MainLayout>
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-12">
              Syarat dan Ketentuan Penggunaan
            </h1>
            
            <div className="bg-background rounded-lg shadow-md p-8">
              <div className="space-y-8">
                <div>
                  <p className="text-sm text-foreground/70 mb-6">
                    Terakhir diperbarui: 1 November 2023
                  </p>
                  
                  <p className="mb-4">
                    Selamat datang di Bahtsul Masail. Dengan mengakses atau menggunakan platform kami, 
                    Anda menyetujui untuk terikat oleh Syarat dan Ketentuan Penggunaan ini. Jika Anda 
                    tidak setuju dengan syarat-syarat ini, mohon untuk tidak menggunakan layanan kami.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-xl font-serif font-medium mb-4">1. Definisi</h2>
                  
                  <ul className="list-disc pl-6 space-y-2 text-foreground/70">
                    <li>
                      <strong>Platform</strong> mengacu pada situs web, aplikasi, dan layanan Bahtsul Masail.
                    </li>
                    <li>
                      <strong>Pengguna</strong> mengacu pada individu atau entitas yang mengakses atau menggunakan Platform.
                    </li>
                    <li>
                      <strong>Konten</strong> mengacu pada dokumen, teks, gambar, audio, video, dan materi lain yang tersedia di Platform.
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-xl font-serif font-medium mb-4">2. Akun Pengguna</h2>
                  
                  <p className="mb-3">Saat membuat akun di platform kami:</p>
                  
                  <ul className="list-disc pl-6 space-y-2 text-foreground/70">
                    <li>
                      Anda bertanggung jawab untuk menjaga kerahasiaan informasi akun Anda, termasuk kata sandi.
                    </li>
                    <li>
                      Anda bertanggung jawab atas semua aktivitas yang terjadi di bawah akun Anda.
                    </li>
                    <li>
                      Anda harus segera memberi tahu kami tentang penggunaan tidak sah akun Anda.
                    </li>
                    <li>
                      Kami berhak menolak layanan, menghapus akun, atau mengubah/menghentikan layanan tanpa pemberitahuan sebelumnya.
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-xl font-serif font-medium mb-4">3. Penggunaan yang Diizinkan</h2>
                  
                  <p className="mb-3">Anda diizinkan untuk:</p>
                  
                  <ul className="list-disc pl-6 space-y-2 text-foreground/70">
                    <li>
                      Mengakses dan melihat Konten untuk penggunaan pribadi, non-komersial, atau pendidikan.
                    </li>
                    <li>
                      Mencari dan mengunduh dokumen yang tersedia sesuai izin yang diberikan.
                    </li>
                    <li>
                      Menggunakan fitur dan alat yang disediakan dalam batas-batas yang ditentukan.
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-xl font-serif font-medium mb-4">4. Batasan</h2>
                  
                  <p className="mb-3">Anda tidak diizinkan untuk:</p>
                  
                  <ul className="list-disc pl-6 space-y-2 text-foreground/70">
                    <li>
                      Menggunakan Platform untuk aktivitas ilegal atau melanggar hukum yang berlaku.
                    </li>
                    <li>
                      Mengunggah atau mendistribusikan konten yang melanggar hak kekayaan intelektual pihak lain.
                    </li>
                    <li>
                      Memodifikasi, mendekompilasi, atau merekayasa balik bagian mana pun dari Platform.
                    </li>
                    <li>
                      Menggunakan metode otomatis (seperti bot, scraper) untuk mengakses atau mengumpulkan data dari Platform.
                    </li>
                    <li>
                      Menyebarkan konten yang bersifat menyinggung, memfitnah, pornografi, atau melanggar norma.
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-xl font-serif font-medium mb-4">5. Konten dan Hak Kekayaan Intelektual</h2>
                  
                  <ul className="list-disc pl-6 space-y-2 text-foreground/70">
                    <li>
                      Konten yang disediakan di Platform dilindungi oleh hak cipta, merek dagang, dan hukum kekayaan intelektual lainnya.
                    </li>
                    <li>
                      Dengan mengunggah konten ke Platform, Anda memberikan kami lisensi non-eksklusif untuk menggunakan, mereproduksi, dan menampilkan konten tersebut.
                    </li>
                    <li>
                      Anda menjamin bahwa konten yang Anda unggah tidak melanggar hak pihak ketiga mana pun.
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-xl font-serif font-medium mb-4">6. Penafian dan Batasan Tanggung Jawab</h2>
                  
                  <ul className="list-disc pl-6 space-y-2 text-foreground/70">
                    <li>
                      Platform disediakan "sebagaimana adanya" tanpa jaminan apa pun.
                    </li>
                    <li>
                      Kami tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan Platform.
                    </li>
                    <li>
                      Kami tidak menjamin keakuratan, kelengkapan, atau kegunaan konten yang tersedia di Platform.
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-xl font-serif font-medium mb-4">7. Perubahan pada Syarat dan Ketentuan</h2>
                  
                  <p className="mb-4">
                    Kami berhak mengubah Syarat dan Ketentuan ini kapan saja. Perubahan akan efektif setelah 
                    diposting di Platform. Penggunaan berkelanjutan Anda atas Platform setelah perubahan tersebut 
                    merupakan penerimaan Anda terhadap Syarat dan Ketentuan yang direvisi.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-xl font-serif font-medium mb-4">8. Hukum yang Berlaku</h2>
                  
                  <p className="mb-4">
                    Syarat dan Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Indonesia, 
                    tanpa memperhatikan prinsip konflik hukum.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-xl font-serif font-medium mb-4">9. Hubungi Kami</h2>
                  
                  <p className="mb-4">
                    Jika Anda memiliki pertanyaan tentang Syarat dan Ketentuan ini, silakan hubungi kami di:
                  </p>
                  
                  <div className="pl-6 text-foreground/70">
                    <p>Email: <a href="mailto:dihannahdii@gmail.com" className="text-islamic-green hover:underline">dihannahdii@gmail.com</a></p>
                    <p>Telepon: 085643349455</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default TermsOfUse; 