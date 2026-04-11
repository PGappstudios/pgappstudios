
import React from 'react';

const AppsCTA: React.FC = () => {
  return (
    <section className="py-20 px-6 relative overflow-hidden mt-10">
      <div className="absolute inset-0 bg-gradient-to-br from-pg-purple/10 to-pg-blue/10"></div>
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-on-scroll opacity-0">
          Need a Custom Solution?
        </h2>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto animate-on-scroll opacity-0">
          We create tailored applications to meet your specific business needs. Get in touch to discuss your project.
        </p>
        <a
          href="/contact"
          className="neon-button"
        >
          <span className="z-10 relative">Contact Us</span>
        </a>
      </div>
    </section>
  );
};

export default AppsCTA;
