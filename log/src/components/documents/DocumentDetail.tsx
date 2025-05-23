import React from 'react';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface DocumentProps {
  document: any; // Use your document type here
}

export function DocumentDetail({ document }: DocumentProps) {
  // Determine document type
  const isBahtsulMasail = document.is_bahtsul_masail;

  return (
    <div className="document-detail space-y-6">
      <h1 className="text-2xl font-bold mb-4">{document.title}</h1>
      
      {isBahtsulMasail ? (
        <BahtsulMasailDocument document={document} />
      ) : (
        <StandardDocument document={document} />
      )}
    </div>
  );
}

function StandardDocument({ document }: { document: any }) {
  return (
    <div className="space-y-4">
      <Card>
        <div className="p-4">
          <h2 className="font-semibold text-lg">Question</h2>
          <div className="prose mt-2">{document.question}</div>
        </div>
      </Card>
      
      <Card>
        <div className="p-4">
          <h2 className="font-semibold text-lg">Answer</h2>
          <div className="prose mt-2">{document.answer}</div>
        </div>
      </Card>
      
      {document.dalil && (
        <Card>
          <div className="p-4">
            <h2 className="font-semibold text-lg">Dalil (Evidence)</h2>
            <div className="prose mt-2">{document.dalil}</div>
          </div>
        </Card>
      )}
      
      {document.mushoheh_verification && (
        <Card>
          <div className="p-4">
            <h2 className="font-semibold text-lg">Verification</h2>
            <div className="prose mt-2">{document.mushoheh_verification}</div>
          </div>
        </Card>
      )}
    </div>
  );
}

function BahtsulMasailDocument({ document }: { document: any }) {
  return (
    <div className="space-y-4">
      <Card className="bg-emerald-50 dark:bg-emerald-950">
        <div className="p-4">
          <h2 className="font-semibold text-lg">Judul Bahtsul Masail</h2>
          <div className="prose mt-2">{document.judul_bahtsul_masail}</div>
        </div>
      </Card>
      
      <Tabs defaultValue="masalah" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="masalah">Masalah & Jawaban</TabsTrigger>
          <TabsTrigger value="referensi">Referensi & Dalil</TabsTrigger>
          <TabsTrigger value="info">Informasi Lainnya</TabsTrigger>
        </TabsList>
        
        <TabsContent value="masalah" className="space-y-4">
          {document.muqaddimah && (
            <Card>
              <div className="p-4">
                <h2 className="font-semibold text-lg">Muqaddimah (Pendahuluan)</h2>
                <div className="prose mt-2">{document.muqaddimah}</div>
              </div>
            </Card>
          )}
          
          <Card>
            <div className="p-4">
              <h2 className="font-semibold text-lg">Nash al-Mas'alah (Redaksi Masalah)</h2>
              <div className="prose mt-2">{document.nash_masalah}</div>
            </div>
          </Card>
          
          <Card>
            <div className="p-4">
              <h2 className="font-semibold text-lg">Jawaban (Al-Jawab)</h2>
              <div className="prose mt-2">{document.jawaban}</div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="referensi" className="space-y-4">
          {document.talil_jawab && (
            <Card>
              <div className="p-4">
                <h2 className="font-semibold text-lg">Ta'lil al-Jawab (Argumentasi Jawaban)</h2>
                <div className="prose mt-2">{document.talil_jawab}</div>
              </div>
            </Card>
          )}
          
          {document.referensi && (
            <Card>
              <div className="p-4">
                <h2 className="font-semibold text-lg">Referensi (Al-Maraji')</h2>
                <div className="prose mt-2">{document.referensi}</div>
              </div>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="info" className="space-y-4">
          {document.hadirin && (
            <Card>
              <div className="p-4">
                <h2 className="font-semibold text-lg">Hadirin (Al-Hadhirin)</h2>
                <div className="prose mt-2">{document.hadirin}</div>
              </div>
            </Card>
          )}
          
          {document.panitia && (
            <Card>
              <div className="p-4">
                <h2 className="font-semibold text-lg">Panitia (Al-Lajnah)</h2>
                <div className="prose mt-2">{document.panitia}</div>
              </div>
            </Card>
          )}
          
          {document.tanggal_tempat && (
            <Card>
              <div className="p-4">
                <h2 className="font-semibold text-lg">Tanggal dan Tempat</h2>
                <div className="prose mt-2">{document.tanggal_tempat}</div>
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 