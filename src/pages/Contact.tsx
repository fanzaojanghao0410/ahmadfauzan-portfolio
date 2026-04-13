// @ts-nocheck
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Instagram, Linkedin, Send, MapPin, MessageCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { PageLayout } from '@/components/PageLayout';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/fanzaojanghao0410', color: 'hover:text-foreground' },
    { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/aahmd.fznn', color: 'hover:text-foreground' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com', color: 'hover:text-foreground' },
    { icon: Mail, label: 'Gmail', href: 'mailto:fanzaojanghao@gmail.com', color: 'hover:text-foreground' },
    { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/6281234567890', color: 'hover:text-foreground' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({ title: "Missing Information", description: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('https://formsubmit.co/ajax/fanzaojanghao@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name: formData.name, email: formData.email, message: formData.message, _subject: `Portfolio Contact: ${formData.name}` }),
      });
      if (response.ok) {
        toast({ title: "Message Sent! ✉️", description: "Thank you for reaching out. I'll get back to you soon." });
        setFormData({ name: '', email: '', message: '' });
      } else { throw new Error('Failed'); }
    } catch {
      toast({ title: "Failed to Send", description: "Please try again or email me directly.", variant: "destructive" });
    } finally { setIsSubmitting(false); }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-6 py-20 pb-28 lg:pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-5xl mx-auto">

          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Get In Touch</h1>
            <p className="text-lg max-w-2xl mx-auto text-muted-foreground">Open for collaborations, opportunities, and creative ventures</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card className="glass-card p-8">
                <h2 className="text-2xl font-bold mb-6 text-foreground">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="name" className="text-foreground">Name</Label>
                    <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Your name" className="mt-2 glass-input" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-foreground">Email</Label>
                    <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="your.email@example.com" className="mt-2 glass-input" />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-foreground">Message</Label>
                    <Textarea id="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Your message..." rows={5} className="mt-2 glass-input" />
                  </div>
                  <Button type="submit" className="w-full primary-button" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                    ) : (
                      <>Send Message <Send className="ml-2 w-4 h-4" /></>
                    )}
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-6">
              <Card className="glass-card p-6">
                <h3 className="text-xl font-bold mb-4 text-foreground">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/10"><MapPin className="w-5 h-5 text-primary" /></div>
                    <div>
                      <p className="font-medium text-foreground">Location</p>
                      <p className="text-sm text-muted-foreground">Bekasi, Indonesia</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/10"><Mail className="w-5 h-5 text-primary" /></div>
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <p className="text-sm text-muted-foreground">fanzaojanghao@gmail.com</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="glass-card p-6">
                <h3 className="text-xl font-bold mb-4 text-foreground">Connect With Me</h3>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((social) => (
                    <motion.a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all text-muted-foreground ${social.color} bg-muted/50 border border-border/50 hover:border-border`}>
                      <social.icon className="w-5 h-5" />
                      <span className="font-medium text-sm">{social.label}</span>
                    </motion.a>
                  ))}
                </div>
              </Card>

              <Card className="glass-card p-6">
                <h3 className="text-xl font-bold mb-4 text-foreground">Location</h3>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126922.28083978!2d107.08893!3d-6.1351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698b9db7d83ba1%3A0x28f32cc88c5c29c3!2sCibitung%2C%20Bekasi%20Regency%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1234567890"
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
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
