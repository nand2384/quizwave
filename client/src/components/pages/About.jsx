import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import NavbarLoggedIn from "../navbar/NavbarLoggedIn";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

function About() {
  const [navComponent, setNavComponent] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) setNavComponent(<NavbarLoggedIn />);
    else setNavComponent(<Navbar />);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-emerald-50 dark:from-gray-950 dark:to-gray-900 transition-colors duration-500 overflow-hidden">
      {navComponent}

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
      </div>

      <motion.main
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 pt-32 pb-20 px-4"
      >
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.section variants={itemVariants} className="mb-32 text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-500 text-xs font-black uppercase tracking-widest mb-6"
            >
              Our Philosophy
            </motion.div>
            <h1 className="text-5xl md:text-8xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter">
              Learning is the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">Ultimate Adventure</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
              QuizWave was born out of a simple idea: that knowledge should be shareable, competitive, and above all, fun. We're building a community-driven platform where anyone can become a master of their favorite topics.
            </p>
          </motion.section>

          {/* Feature Grid */}
          <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
            {[
              { title: "Fast & Fun", icon: "⚡", desc: "Experience lightning-fast gameplay with instant feedback and seamless transitions.", color: "from-amber-500/20 to-orange-500/20" },
              { title: "Creator First", icon: "🎨", desc: "Our intuitive editor makes it incredibly easy to create and share your own challenges with the world.", color: "from-emerald-500/20 to-teal-500/20" },
              { title: "Rise Together", icon: "🎖️", desc: "Compete on global leaderboards, earn achievements, and join a community of lifelong learners.", color: "from-blue-500/20 to-purple-500/20" },
            ].map((f, i) => (
              <div key={i} className="group relative p-1 rounded-[2.5rem] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent dark:from-white/10 dark:to-transparent group-hover:from-black/10 dark:group-hover:from-white/20 transition-all duration-500" />
                <div className="relative p-10 rounded-[calc(2.5rem-4px)] glass border-black/5 dark:border-white/5 h-full flex flex-col items-center text-center">
                  <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${f.color} flex items-center justify-center text-4xl mb-8 transform group-hover:scale-110 transition-transform duration-500`}>
                    {f.icon}
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4">{f.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </motion.section>

          {/* Mission & Values */}
          <motion.section variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8">Our <span className="text-emerald-600 dark:text-emerald-500">Mission</span></h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 shrink-0 rounded-2xl glass border-black/5 dark:border-white/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500 font-black">01</div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Empowering Creators</h4>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">We provide the tools for anyone to turn their knowledge into an engaging interactive experience.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 shrink-0 rounded-2xl glass border-black/5 dark:border-white/10 flex items-center justify-center text-blue-600 dark:text-blue-500 font-black">02</div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Privacy First</h4>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">Your data stays yours. We prioritize minimal collection and maximum transparency in everything we do.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 shrink-0 rounded-2xl glass border-black/5 dark:border-white/10 flex items-center justify-center text-amber-600 dark:text-amber-500 font-black">03</div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Universal Access</h4>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">Education and entertainment should be available to everyone, everywhere, on any device.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-emerald-500/10 blur-[100px] rounded-full group-hover:bg-emerald-500/20 transition-all duration-700" />
              <div className="relative glass border-black/5 dark:border-white/10 rounded-[3rem] p-12 overflow-hidden shadow-2xl">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-8">The Wave Makers</h3>
                <div className="space-y-6">
                  {[
                    { name: "Nand Patel", role: "Product & Frontend", initial: "NP", color: "bg-emerald-500" },
                    { name: "Mira Jain", role: "Backend & Systems", initial: "MJ", color: "bg-blue-500" },
                    { name: "Alex Roy", role: "Community Design", initial: "AR", color: "bg-amber-500" },
                  ].map((m, i) => (
                    <div key={i} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-default">
                      <div className={`w-14 h-14 rounded-2xl ${m.color} flex items-center justify-center text-white font-black text-xl shadow-lg`}>
                        {m.initial}
                      </div>
                      <div>
                        <div className="text-lg font-black text-gray-900 dark:text-white">{m.name}</div>
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">{m.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section variants={itemVariants}>
            <div className="relative rounded-[3rem] overflow-hidden p-20 text-center glass border-black/5 dark:border-white/10 shadow-2xl bg-linear-to-br from-emerald-500/5 to-blue-500/5 group">
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8">Become part of the story</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 font-medium mb-12">Join thousands of players and start your journey today. Create, discover, and conquer.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <Link to="/signUp" className="px-10 py-5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-[1.5rem] font-black shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:scale-105 active:scale-95">
                    JOIN THE WAVE
                  </Link>
                  <Link to="/quizzes" className="px-10 py-5 glass border-black/5 dark:border-white/10 text-gray-900 dark:text-white rounded-[1.5rem] font-black hover:bg-black/5 dark:hover:bg-white/10 transition-all">
                    BROWSE LIBRARY
                  </Link>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] -mr-32 -mt-32 rounded-full group-hover:bg-emerald-500/20 transition-all duration-700" />
            </div>
          </motion.section>
        </div>
      </motion.main>
    </div>
  );
}

export default About;
