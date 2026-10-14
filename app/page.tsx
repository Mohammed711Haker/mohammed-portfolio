export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500 selection:text-white overflow-hidden">
      
      {/* Header */}
      <header className="bg-slate-950/70 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-slate-800/50 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer">
            Mohammed Humaidhah
          </h1>
          <nav className="hidden md:flex space-x-8 text-sm font-medium text-slate-300">
            <a href="#about" className="hover:text-blue-400 hover:-translate-y-0.5 transition-all duration-300">About</a>
            <a href="#resume" className="hover:text-blue-400 hover:-translate-y-0.5 transition-all duration-300">Experience</a>
            <a href="#projects" className="hover:text-blue-400 hover:-translate-y-0.5 transition-all duration-300">Projects</a>
            <a href="#gallery" className="hover:text-blue-400 hover:-translate-y-0.5 transition-all duration-300">Gallery</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-28 flex flex-col-reverse md:flex-row items-center gap-12 relative">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="md:w-3/5 text-center md:text-left z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-white leading-tight tracking-tight">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Mohammed</span> <br/>
            IT Student & Entrepreneur
          </h2>
          <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl">
            A Yemeni Information Technology undergraduate at Universitas Islam Negeri Salatiga, Indonesia. 
            Passionate about software development, AI, and building practical solutions.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <a href="#projects" className="px-8 py-3.5 rounded-full bg-blue-600 text-white font-semibold shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto text-center">
              Discover My Work
            </a>
            <a href="#contact" className="px-8 py-3.5 rounded-full bg-slate-800 text-slate-200 font-semibold border border-slate-700 hover:bg-slate-700 hover:border-slate-600 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto text-center">
              Get In Touch
            </a>
          </div>
        </div>
        
        <div className="md:w-2/5 flex justify-center z-10">
          <div className="group relative w-64 h-64 md:w-80 md:h-80 rounded-full p-2 bg-gradient-to-tr from-blue-600 to-indigo-400 shadow-[0_0_40px_rgba(59,130,246,0.2)] hover:shadow-[0_0_60px_rgba(59,130,246,0.4)] transition-all duration-500 hover:-translate-y-2 cursor-pointer">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-slate-900 bg-slate-900">
              <img 
                src="/mohammed-humaidhah.jpg" 
                alt="Mohammed Humaidhah" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 border-t border-slate-800/50 bg-slate-900/50 relative">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h3 className="text-3xl font-bold text-white mb-10 text-center md:text-left flex items-center gap-4">
            <span className="w-8 h-1 bg-blue-500 rounded-full hidden md:block"></span>
            Professional Profile
          </h3>
          <div className="bg-slate-800/30 border border-slate-700/50 p-8 rounded-3xl backdrop-blur-sm shadow-xl hover:shadow-blue-500/5 transition-all duration-500">
            <div className="text-slate-300 leading-relaxed space-y-6 text-lg">
              <p>
                I am interested in software development, artificial intelligence, machine learning, computer vision, cybersecurity, and Internet of Things (IoT) technologies. Alongside my academic studies, I have explored practical technology projects involving web development, image processing, cloud computing, and connected systems.
              </p>
              <p>
                I am also the founder of <strong className="text-blue-400 font-semibold hover:text-blue-300 transition-colors cursor-pointer">Abu Hilal Sky</strong>, a service-oriented business initiative focused on travel-related services and educational guidance for students seeking study opportunities abroad. 
              </p>
              <p>
                My experience includes administrative management, educational support, and team leadership. I aim to strengthen my technical abilities through hands-on projects, academic research, and international learning opportunities while contributing positively to the communities in which I study and work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Experience Section */}
      <section id="resume" className="py-24 bg-slate-950 border-t border-slate-800/50">
        <div className="max-w-5xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-white mb-12 text-center flex items-center justify-center gap-4">
            Education & Experience
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="group bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:border-blue-500/50 hover:bg-slate-800/80 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(59,130,246,0.1)] transition-all duration-300 cursor-default">
              <div className="flex flex-col mb-4">
                <span className="text-blue-400 text-sm font-bold tracking-wider uppercase mb-2">2024 - Present</span>
                <h4 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">Bachelor of Information Technology</h4>
              </div>
              <p className="text-slate-300 font-medium mb-3">Universitas Islam Negeri Salatiga — Indonesia</p>
              <p className="text-slate-400 text-sm leading-relaxed">Focusing on software engineering, web application development, and modern technologies. Active in international programs and student organizations.</p>
            </div>

            <div className="group bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:border-blue-500/50 hover:bg-slate-800/80 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(59,130,246,0.1)] transition-all duration-300 cursor-default">
              <div className="flex flex-col mb-4">
                <span className="text-blue-400 text-sm font-bold tracking-wider uppercase mb-2">Ongoing</span>
                <h4 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">Founder & Manager</h4>
              </div>
              <p className="text-slate-300 font-medium mb-3">Abu Hilal Sky</p>
              <p className="text-slate-400 text-sm leading-relaxed">Established an initiative providing travel services, visa procedures assistance, and educational consultancy for international students.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 border-t border-slate-800/50 bg-slate-900/50">
        <div className="max-w-5xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-white mb-12 text-center flex items-center justify-center gap-4">
            Technical Projects & Research
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="group bg-slate-800/40 border border-slate-700/50 p-6 rounded-3xl hover:bg-slate-800 hover:border-blue-500/40 hover:-translate-y-2 transition-all duration-300">
              <h4 className="text-xl font-bold text-white mb-3">VisionCheck AI</h4>
              <p className="text-slate-400 text-sm leading-relaxed">A conceptual research project aimed at developing a mobile application for initial visual acuity screening using computer vision and AI techniques.</p>
            </div>
            
            <div className="group bg-slate-800/40 border border-slate-700/50 p-6 rounded-3xl hover:bg-slate-800 hover:border-blue-500/40 hover:-translate-y-2 transition-all duration-300">
              <h4 className="text-xl font-bold text-white mb-3">Smart Parking System</h4>
              <p className="text-slate-400 text-sm leading-relaxed">An academic concept utilizing ultrasonic sensors, ESP32, and Wi-Fi to monitor and report available parking spaces via a dashboard.</p>
            </div>

            <div className="group bg-slate-800/40 border border-slate-700/50 p-6 rounded-3xl hover:bg-slate-800 hover:border-blue-500/40 hover:-translate-y-2 transition-all duration-300">
              <h4 className="text-xl font-bold text-white mb-3">Cloud Computing & Linux</h4>
              <p className="text-slate-400 text-sm leading-relaxed">Configured a web server using Debian Linux, Nginx, and PHP-FPM within a virtual environment for hosting and managing cloud resources.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery & Activities Section */}
      <section id="gallery" className="py-24 bg-slate-950 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-white mb-4 text-center">Global Engagement</h3>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">Highlights from my participation in international conferences, public speaking events, and cultural exchange programs.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Loop through images pic1.jpeg to pic7.jpeg */}
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <div key={num} className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-800 cursor-pointer shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                <img 
                  src={`/pic${num}.jpeg`} 
                  alt={`Activity ${num}`} 
                  className="w-full h-full object-cover group-hover:scale-110 group-hover:opacity-80 transition-all duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white text-sm font-medium">Activity & Event</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Footer */}
      <section id="contact" className="py-16 border-t border-slate-800/50 bg-slate-900/80 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
          <a href="mailto:hmydt5026@gmail.com" className="inline-block px-8 py-4 rounded-full bg-blue-600/10 text-blue-400 border border-blue-500/30 hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold mb-8">
            hmydt5026@gmail.com
          </a>
          <p className="text-slate-500 text-sm">
            © 2026 Mohammed Abdullah Hussein Humaidhah. All rights reserved.
          </p>
        </div>
      </section>

    </main>
  );
}