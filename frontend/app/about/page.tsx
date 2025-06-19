'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, BookOpen, Search, Network } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function AboutPage() {
  return (
    <main className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-islamic-green/5 via-transparent to-islamic-green/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--islamic-green-rgb),0.1),transparent_70%)]" />
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-center mb-6">
            About BahtsulMasail.tech
            <br />
            <span className="text-gradient-title">Digitizing Heritage, Empowering the Future</span>
          </h1>
          
          <p className="text-lg md:text-xl text-center max-w-3xl mx-auto text-muted-foreground">
            Bahtsul Masail is an authentic pesantren product, an answer to the challenges of the ages. 
            BahtsulMasail.tech emerges as the digitization of these profound discussions, making them 
            accessible to all, preserving pesantren's original works, and serving as a beneficial 
            platform for the entire ummah.
          </p>
        </div>
      </section>

      {/* Heritage Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                The Unbroken Chain: Bahtsul Masail, Pesantren's Enduring Legacy
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                Bahtsul Masail, literally 'discussion of issues,' is an authentic scholarly tradition 
                born and flourishing within Indonesian pesantren. This forum is where ulama and santri 
                convene to discuss and formulate Islamic law on diverse contemporary issues, employing 
                comprehensive fiqh methodology.
              </p>
              <p className="text-lg text-muted-foreground">
                For centuries, the outcomes of Bahtsul Masail have been crucial references for Muslims 
                navigating their faith amidst ever-changing times. Yet, much of this precious treasury 
                remains in physical forms with limited access, scattered across various pesantren and 
                classical texts (kitab kuning), often beyond the reach of the wider community.
              </p>
            </div>
            
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-islamic-green/20 to-islamic-blue/20 animate-gradient-xy" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Network className="w-32 h-32 text-islamic-green/40" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-islamic-green/5 via-transparent to-islamic-green/10" />
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8">
              A Future Illuminated: Preserving Wisdom, Empowering Generations
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6">
              BahtsulMasail.tech was born from a deep concern for the potential loss of pesantren's 
              invaluable intellectual heritage. We envision a world where this treasury, especially 
              Bahtsul Masail outcomes, is widely accessible, meticulously organized, and presented in 
              a manner that honors pesantren's scholarly tradition while harnessing modern technology.
            </p>
            
            <p className="text-lg text-muted-foreground">
              By bridging pesantren's original works with contemporary needs, we aim to preserve and 
              expand the benefits of Bahtsul Masail for all Muslims—from pesantren circles to the 
              general public, from esteemed ulama to the younger generation.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/5">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-serif font-bold text-center mb-12"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Pillars of Enlightenment
          </motion.h2>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Pillar 1 */}
            <motion.div variants={itemVariants}>
              <Card className="h-full p-6 hover:shadow-lg transition-shadow">
                <BookOpen className="w-12 h-12 text-islamic-green mb-4" />
                <h3 className="text-xl font-semibold mb-2">Digital Sanctuary</h3>
                <p className="text-muted-foreground">
                  Digital archiving of Bahtsul Masail results from various pesantren and ulama forums, 
                  ensuring pesantren's original works are preserved and available for future generations.
                </p>
              </Card>
            </motion.div>

            {/* Pillar 2 */}
            <motion.div variants={itemVariants}>
              <Card className="h-full p-6 hover:shadow-lg transition-shadow">
                <Search className="w-12 h-12 text-islamic-green mb-4" />
                <h3 className="text-xl font-semibold mb-2">Wisdom at Your Fingertips</h3>
                <p className="text-muted-foreground">
                  Semantic search capabilities that understand context and meaning within Bahtsul Masail, 
                  enabling users to find answers to specific questions quickly and accurately.
                </p>
              </Card>
            </motion.div>

            {/* Pillar 3 */}
            <motion.div variants={itemVariants}>
              <Card className="h-full p-6 hover:shadow-lg transition-shadow">
                <BookOpen className="w-12 h-12 text-islamic-green mb-4" />
                <h3 className="text-xl font-semibold mb-2">Nurturing Intellectual Legacies</h3>
                <p className="text-muted-foreground">
                  Documentation and preservation of the thoughts of ulama and santri from various periods, 
                  ensuring pesantren's intellectual heritage remains alive and relevant.
                </p>
              </Card>
            </motion.div>

            {/* Pillar 4 */}
            <motion.div variants={itemVariants}>
              <Card className="h-full p-6 hover:shadow-lg transition-shadow">
                <Users className="w-12 h-12 text-islamic-green mb-4" />
                <h3 className="text-xl font-semibold mb-2">A Confluence of Minds</h3>
                <p className="text-muted-foreground">
                  A forum for discussion and development of fiqh thought in response to contemporary 
                  challenges, connecting ulama, santri, academics, and the public in constructive dialogue.
                </p>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-islamic-green/5 via-transparent to-islamic-green/10" />
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-serif font-bold text-center mb-12"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Meet the Architects
          </motion.h2>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Team Member 1 */}
            <motion.div variants={itemVariants}>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                  <img 
                    src="/images/team/Dihan Nahdi.jpg" 
                    alt="Farid Dihan Nahdi"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">Farid Dihan Nahdi</h3>
                <p className="text-sm text-muted-foreground mb-2">Lead Developer & Founder</p>
                <p className="text-muted-foreground">
                  Developing the BahtsulMasail.tech platform with a vision to preserve and digitize 
                  pesantren's original works for universal access and benefit.
                </p>
              </Card>
            </motion.div>

            {/* Team Member 2 */}
            <motion.div variants={itemVariants}>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                  <Image 
                    src="/images/team/Ibrar Rasyid.jpeg" 
                    alt="M. Ibrar Rasyid"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                    priority={false}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">M. Ibrar Rasyid</h3>
                <p className="text-sm text-muted-foreground mb-2">Lead of Content & Research</p>
                <p className="text-muted-foreground">
                  Leading content and research efforts for BahtsulMasail.tech, ensuring depth and 
                  accuracy of materials.
                </p>
              </Card>
            </motion.div>

            {/* Team Member 3 */}
            <motion.div variants={itemVariants}>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                  <Image 
                    src="/images/team/M. Fachry Alfareeza.png" 
                    alt="M. Fachry Alfareeza"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                    priority={false}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">M. Fachry Alfareeza</h3>
                <p className="text-sm text-muted-foreground mb-2">Lead of Quality Assurance</p>
                <p className="text-muted-foreground">
                  Guaranteeing the quality and accuracy of the BahtsulMasail.tech platform through 
                  meticulous testing and validation.
                </p>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/5">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-serif font-bold mb-6"
              variants={itemVariants}
            >
              Join Our Journey: Be Part of the Enlightenment
            </motion.h2>
            
            <motion.p 
              className="text-lg text-muted-foreground mb-8"
              variants={itemVariants}
            >
              Become part of the effort to preserve and disseminate Islamic wisdom through technology. 
              Follow our progress, utilize this platform for your research and learning, and share its 
              benefits with others.
            </motion.p>
            
            <motion.div variants={itemVariants}>
              <Button 
                size="lg" 
                className="bg-islamic-green hover:bg-islamic-green/90 text-white"
              >
                Contact Us
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
