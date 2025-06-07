'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { Linkedin, Github } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.95 },
  visible: { y: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100 } },
};

const teamMembers = [
  {
    name: "Farid Dihan Nahdi",
    role: "Architect & Technical Lead",
    image: "/images/team/Dihan Nahdi.jpg",
    social: {
      linkedin: "https://www.linkedin.com/in/farid-dihan-nahdi/",
      github: "https://github.com/dihan-nahdi",
    },
  },
  {
    name: "M. Ibrar Rasyid",
    role: "Islamic Scholarship Lead",
    image: "/images/team/Ibrar Rasyid.jpeg",
    social: {
      linkedin: "https://www.linkedin.com/in/m-ibrar-rasyid/",
      github: "https://github.com/ibrarrasyid",
    },
  },
  {
    name: "M. Fachry Alfareeza",
    role: "AI Research Lead",
    image: "/images/team/M. Fachry Alfareeza.png",
    social: {
      linkedin: "https://www.linkedin.com/in/fachry-alfareeza/",
      github: "https://github.com/fachry-alfareeza",
    },
  },
];

export default function Section10Team() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="w-full max-w-7xl mx-auto px-6"
    >
      {/* Section Header */}
      <motion.div variants={itemVariants} className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white">The Team Behind The Vision</h2>
        <div className="w-24 h-1 bg-emerald-500 rounded-full mx-auto mt-4"></div>
        <p className="text-lg md:text-xl text-gray-300 mt-6 max-w-3xl mx-auto">
          A fusion of deep technical expertise, Islamic scholarship, and AI innovation.
        </p>
      </motion.div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-black/40 backdrop-blur-md p-6 rounded-xl border border-emerald-900/50 text-center group"
          >
            <div className="relative w-32 h-32 mx-auto mb-6">
              <Image
                src={member.image}
                alt={member.name}
                width={128}
                height={128}
                className="rounded-full object-cover border-4 border-emerald-700/50 group-hover:border-emerald-500 transition-all duration-300"
              />
            </div>
            <h3 className="text-xl font-bold text-emerald-400 mb-1">{member.name}</h3>
            <p className="text-gray-300 mb-4">{member.role}</p>
            <div className="flex justify-center gap-4">
              <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Linkedin size={24} />
              </a>
              <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Github size={24} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 