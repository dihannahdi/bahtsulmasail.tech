import MainLayout from "@/components/layout/MainLayout";

const PrivacyPolicy = () => {
  return (
    <MainLayout>
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-12">
              Kebijakan Privasi
            </h1>
            
            <div className="bg-background rounded-lg shadow-md p-8">
              <div className="space-y-8">
                <div>
                  <p className="text-sm text-foreground/70 mb-6">
                    Terakhir diperbarui: 1 November 2023
                  </p>
                  
                  <p className="mb-4">
                    Bahtsul Masail ("kami," "kita," atau "milik kami") menghormati privasi Anda dan 
                    berkomitmen untuk melindungi informasi pribadi Anda. Kebijakan Privasi ini menjelaskan 
                    bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi yang Anda berikan 
                    saat menggunakan platform kami.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-xl font-serif font-medium mb-4">1. Informasi yang Kami Kumpulkan</h2>
                  
                  <p className="mb-3">Kami dapat mengumpulkan informasi berikut:</p>
                  
                  <ul className="list-disc pl-6 space-y-2 text-foreground/70">
                    <li>
                      <strong>Informasi Identitas Pribadi</strong>: Nama, alamat email, dan informasi 
                      profil lainnya yang Anda berikan saat mendaftar.
                    </li>
                    <li>
                      <strong>Informasi Penggunaan</strong>: Data tentang bagaimana Anda berinteraksi 
                      dengan platform kami, termasuk riwayat pencarian, dokumen yang dilihat, dan 
                      preferensi pengguna.
                    </li>
                    <li>
                      <strong>Konten yang Diunggah</strong>: Dokumen atau konten lain yang Anda unggah 
                      ke platform kami.
                    </li>
                    <li>
                      <strong>Data Teknis</strong>: Alamat IP, jenis perangkat, browser, informasi 
                      perangkat, dan data teknis lainnya yang dikumpulkan secara otomatis saat Anda 
                      menggunakan layanan kami.
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-xl font-serif font-medium mb-4">2. Bagaimana Kami Menggunakan Informasi Anda</h2>
                  
                  <p className="mb-3">Kami menggunakan informasi yang dikumpulkan untuk:</p>
                  
                  <ul className="list-disc pl-6 space-y-2 text-foreground/70">
                    <li>Menyediakan, memelihara, dan meningkatkan layanan kami</li>
                    <li>Memproses dan mengelola akun Anda</li>
                    <li>Menyesuaikan pengalaman pengguna dan konten yang ditampilkan</li>
                    <li>Menganalisis tren penggunaan dan mengoptimalkan fitur platform</li>
                    <li>Berkomunikasi dengan Anda tentang pembaruan, fitur baru, atau informasi terkait</li>
                    <li>Melindungi keamanan dan integritas platform kami</li>
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-xl font-serif font-medium mb-4">3. Keamanan Data</h2>
                  
                  <p className="mb-4">
                    Kami menerapkan langkah-langkah keamanan yang wajar untuk melindungi informasi 
                    pribadi Anda dari akses, penggunaan, atau pengungkapan yang tidak sah. Namun, 
                    tidak ada metode transmisi melalui internet atau metode penyimpanan elektronik 
                    yang 100% aman. Oleh karena itu, meskipun kami berusaha menggunakan cara yang 
                    dapat diterima secara komersial untuk melindungi informasi pribadi Anda, kami 
                    tidak dapat menjamin keamanan absolutnya.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-xl font-serif font-medium mb-4">4. Berbagi Informasi</h2>
                  
                  <p className="mb-4">
                    Kami tidak menjual atau menyewakan informasi pribadi Anda kepada pihak ketiga. 
                    Namun, kami dapat membagikan informasi Anda dalam situasi berikut:
                  </p>
                  
                  <ul className="list-disc pl-6 space-y-2 text-foreground/70">
                    <li>Dengan persetujuan Anda</li>
                    <li>Dengan penyedia layanan dan mitra bisnis yang membantu kami menjalankan platform</li>
                    <li>Jika diwajibkan oleh hukum atau dalam menanggapi permintaan yang sah dari otoritas publik</li>
                    <li>Untuk melindungi hak, properti, atau keselamatan kami, pengguna kami, atau orang lain</li>
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-xl font-serif font-medium mb-4">5. Hak Privasi Anda</h2>
                  
                  <p className="mb-3">Anda memiliki hak-hak tertentu terkait informasi pribadi Anda, termasuk:</p>
                  
                  <ul className="list-disc pl-6 space-y-2 text-foreground/70">
                    <li>Mengakses dan memperbarui informasi pribadi Anda</li>
                    <li>Meminta penghapusan data Anda (dengan batasan tertentu)</li>
                    <li>Menolak penggunaan data Anda untuk tujuan tertentu</li>
                    <li>Mengekspor data Anda dalam format yang dapat dibaca mesin</li>
                  </ul>
                  
                  <p className="mt-3">
                    Untuk menggunakan hak-hak ini, silakan hubungi kami melalui informasi kontak yang 
                    disediakan di bawah.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-xl font-serif font-medium mb-4">6. Perubahan pada Kebijakan Privasi Ini</h2>
                  
                  <p className="mb-4">
                    Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Kami akan 
                    memberi tahu Anda tentang perubahan signifikan dengan memposting kebijakan baru 
                    di platform kami dan, jika diperlukan, mengirimkan pemberitahuan langsung kepada Anda.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-xl font-serif font-medium mb-4">7. Hubungi Kami</h2>
                  
                  <p className="mb-4">
                    Jika Anda memiliki pertanyaan atau kekhawatiran tentang Kebijakan Privasi ini 
                    atau praktik privasi kami, silakan hubungi kami di:
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

export default PrivacyPolicy; 