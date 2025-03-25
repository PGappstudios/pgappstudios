import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const { toast } = useToast();
  const form = useRef<HTMLFormElement>(null);
  
  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.current) return;

    // Get form data
    const formData = new FormData(form.current);
    const templateParams = {
      from_name: formData.get('user_name'),
      from_email: formData.get('user_email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
      to_email: 'pgmetastudios@gmail.com'
    };

    try {
      // Send email using EmailJS
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      console.log('Email sent successfully:', result);
      
      toast({
        title: "Message Sent Successfully",
        description: "Thank you for your message. We'll get back to you soon!",
        duration: 5000,
      });

      // Reset form
      form.current.reset();
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error Sending Message",
        description: "There was an error sending your message. Please try again later.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const observerRef = React.useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up');
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      if (observerRef.current) {
        animatedElements.forEach((el) => {
          observerRef.current?.unobserve(el);
        });
      }
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-20 px-6 bg-hero-pattern">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">Get in Touch</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto animate-fade-in-delay-1">
            Have a question or interested in our services? Reach out to us.
          </p>
        </div>
      </section>
      
      {/* Contact Form */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="opacity-0 animate-on-scroll">
              <h2 className="text-3xl font-bold text-white mb-6">Contact Information</h2>
              <p className="text-gray-400 mb-8">
                Our team is here to help you with any questions or inquiries. Fill out the form or use the contact details below to get in touch.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-pg-purple/20 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pg-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Email</h3>
                    <a href="mailto:pgmetastudios@gmail.com" className="text-gray-400 hover:text-pg-purple transition-colors">pgmetastudios@gmail.com</a>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 text-center">
                <h2 className="text-4xl font-bold text-white mb-12">Connect With Us</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                  <a 
                    href="https://x.com/PG_App_Studios" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full p-4 rounded-lg bg-white/5 flex items-center justify-center hover:bg-pg-purple/20 transition-colors duration-300 group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white group-hover:text-pg-purple transition-colors" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  
                  <a 
                    href="https://www.linkedin.com/in/pg-studios-5b0434353/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full p-4 rounded-lg bg-white/5 flex items-center justify-center hover:bg-pg-purple/20 transition-colors duration-300 group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white group-hover:text-pg-purple transition-colors" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  
                  <a 
                    href="https://www.instagram.com/pg_app_studios" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full p-4 rounded-lg bg-white/5 flex items-center justify-center hover:bg-pg-purple/20 transition-colors duration-300 group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white group-hover:text-pg-purple transition-colors" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  
                  <a 
                    href="https://www.threads.net/@pg_app_studios?xmt=AQGzhur3DF_F0Ou3H8ixj_3tqq1TUXntqjqFYoAzTtafwug" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full p-4 rounded-lg bg-white/5 flex items-center justify-center hover:bg-pg-purple/20 transition-colors duration-300 group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white group-hover:text-pg-purple transition-colors" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717-1.346 1.67-2.024 4.097-2.024 7.22 0 3.126.678 5.551 2.024 7.22 1.43 1.783 3.631 2.696 6.54 2.717 2.924-.022 5.13-.934 6.567-2.717.57-.71 1.043-1.554 1.406-2.514.686-1.682.94-3.674.76-5.946h-8.733v-2.073h11.223l.035.347c.116 1.114.157 2.185.127 3.219-.071 2.461-.597 4.915-1.564 7.132-.99 2.005-2.483 3.608-4.44 4.773C15.31 23.5 13.69 24 12.186 24z"/>
                    </svg>
                  </a>
                  
                  <a 
                    href="https://www.tiktok.com/@pg_app_studios" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full p-4 rounded-lg bg-white/5 flex items-center justify-center hover:bg-pg-purple/20 transition-colors duration-300 group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white group-hover:text-pg-purple transition-colors" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                  </a>
                  
                  <a 
                    href="https://www.facebook.com/profile.php?id=61572233339159" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full p-4 rounded-lg bg-white/5 flex items-center justify-center hover:bg-pg-purple/20 transition-colors duration-300 group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white group-hover:text-pg-purple transition-colors" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-8 opacity-0 animate-on-scroll">
              <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
              <form ref={form} onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="user_name" className="block text-gray-400 text-sm mb-2">Name</label>
                    <input
                      id="user_name"
                      name="user_name"
                      type="text"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pg-purple"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="user_email" className="block text-gray-400 text-sm mb-2">Email</label>
                    <input
                      id="user_email"
                      name="user_email"
                      type="email"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pg-purple"
                      placeholder="Your email"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-gray-400 text-sm mb-2">Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pg-purple"
                    placeholder="Subject"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-400 text-sm mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pg-purple resize-none"
                    placeholder="Your message"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-full bg-pg-purple hover:bg-pg-purple/80 text-white font-semibold transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
