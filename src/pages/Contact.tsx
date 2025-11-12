// @ts-nocheck
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Instagram, Linkedin, Send, MapPin, Phone } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { PageLayout } from '@/components/PageLayout';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: '#', color: 'hover:text-gray-600' },
    { icon: Instagram, label: 'Instagram', href: '#', color: 'hover:text-pink-500' },
    { icon: Linkedin, label: 'LinkedIn', href: '#', color: 'hover:text-blue-600' },
    { icon: Mail, label: 'Gmail', href: 'mailto:contact@ahmadfauzan.com', color: 'hover:text-red-500' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically send the data to a backend
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });

    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'rgba(255, 240, 240, 0.95)' }}>Get In Touch</h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255, 220, 220, 0.85)' }}>
              Let's collaborate! Whether you have a design project, writing opportunity, creative venture, or tech collaboration in mind
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Card className="p-8 shadow-card">
                <h2 className="text-2xl font-bold mb-6" style={{ color: 'rgba(255, 240, 240, 0.95)' }}>Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Your message..."
                      rows={5}
                      className="mt-2"
                    />
                  </div>
                  <Button type="submit" className="w-full primary-button">
                    Send Message
                    <Send className="ml-2 w-4 h-4 button-icon-primary" />
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-8"
            >
              {/* Contact Details */}
              <Card className="p-6 shadow-card">
                <h3 className="text-xl font-bold mb-4" style={{ color: 'rgba(255, 240, 240, 0.95)' }}>Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: 'rgba(255, 240, 240, 0.95)' }}>Location</p>
                      <p className="text-sm" style={{ color: 'rgba(255, 220, 220, 0.85)' }}>
                        Kirana Cibitung Block C6/6<br />
                        Bekasi 17520, Indonesia
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: 'rgba(255, 240, 240, 0.95)' }}>Email</p>
                      <p className="text-sm" style={{ color: 'rgba(255, 220, 220, 0.85)' }}>
                        contact@ahmadfauzan.com
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Social Links */}
              <Card className="p-6 shadow-card">
                <h3 className="text-xl font-bold mb-4" style={{ color: 'rgba(255, 240, 240, 0.95)' }}>Connect With Me</h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-3 p-4 rounded-lg bg-muted hover:bg-muted/70 transition-smooth ${social.color}`}
                      style={{ color: 'rgba(255, 220, 220, 0.85)' }}
                    >
                      <social.icon className="w-5 h-5" />
                      <span className="font-medium text-sm">{social.label}</span>
                    </motion.a>
                  ))}
                </div>
              </Card>

              {/* Map */}
              <Card className="p-6 shadow-card">
                <h3 className="text-xl font-bold mb-4" style={{ color: 'rgba(255, 240, 240, 0.95)' }}>Location</h3>
                <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126922.28083978!2d107.08893!3d-6.1351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698b9db7d83ba1%3A0x28f32cc88c5c29c3!2sCibitung%2C%20Bekasi%20Regency%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Contact;
