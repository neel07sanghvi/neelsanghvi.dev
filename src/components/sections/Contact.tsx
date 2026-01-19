import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, FileText, Send, ExternalLink } from 'lucide-react';
import { z } from 'zod';
import { SOCIAL_LINKS, RESUME_LINK, CONTACT_INFO } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import HCaptcha from '@/components/ui/HCaptcha';
import TextReveal from '@/components/ui/TextReveal';

// Web3Forms access key
const WEB3FORMS_ACCESS_KEY = '666d3304-971f-4b09-995c-2439231d25ba';

const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255, { message: "Email must be less than 255 characters" }),
  message: z.string().trim().min(1, { message: "Message is required" }).max(1000, { message: "Message must be less than 1000 characters" })
});

const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: CONTACT_INFO.email,
    href: SOCIAL_LINKS.EMAIL,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: CONTACT_INFO.phone,
    href: SOCIAL_LINKS.PHONE,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: `linkedin.com/in/${CONTACT_INFO.linkedinHandle}`,
    href: SOCIAL_LINKS.LINKEDIN,
  },
  {
    icon: Github,
    label: 'GitHub',
    value: `github.com/${CONTACT_INFO.githubHandle}`,
    href: SOCIAL_LINKS.GITHUB,
  },
];

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: { name?: string; email?: string; message?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof typeof fieldErrors] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    const hCaptchaToken = document.querySelector<HTMLTextAreaElement>('textarea[name="h-captcha-response"]')?.value;
    if (!hCaptchaToken) {
      toast({
        title: "Please complete the captcha",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('access_key', WEB3FORMS_ACCESS_KEY);
      formDataToSend.append('h-captcha-response', hCaptchaToken);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Message sent!",
          description: "Thank you for reaching out. I'll get back to you soon.",
        });
        setFormData({ name: '', email: '', message: '' });
        
        if (window.hcaptcha) {
          window.hcaptcha.reset();
        }
      } else {
        toast({
          title: "Error",
          description: data.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: 'hsl(var(--contact-bg))' }}
    >
      {/* Ambient glow - matching other sections */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full opacity-10"
        style={{ 
          background: 'radial-gradient(circle, hsl(var(--accent-pink)) 0%, transparent 70%)' 
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full opacity-10"
        style={{ 
          background: 'radial-gradient(circle, hsl(var(--accent-purple)) 0%, transparent 70%)' 
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.08, 0.12, 0.08]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative z-10 mx-auto px-6 max-w-5xl">
        {/* Section Header - matching Experience section style */}
        <div className="text-center mb-16 md:mb-24">
          <TextReveal>
            <motion.span 
              className="inline-block px-4 py-1.5 text-sm font-mono text-accent-pink border border-accent-pink/30 rounded-full mb-6"
              style={{ color: 'hsl(var(--accent-pink))' }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              The Invitation
            </motion.span>
          </TextReveal>
          
          <TextReveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground">
              Get In Touch
            </h2>
          </TextReveal>
          
          <TextReveal delay={0.2}>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Feel free to contact me for any work or suggestions
            </p>
          </TextReveal>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {/* Contact Links - styled like About section achievements */}
            {contactLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.label !== 'Phone' ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group block p-4 rounded-lg border border-accent-pink/20 bg-accent-pink/5 hover:bg-accent-pink/10 hover:border-accent-pink/40 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: 'hsl(var(--accent-pink) / 0.15)' }}
                  >
                    <link.icon className="w-5 h-5" style={{ color: 'hsl(var(--accent-pink))' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground">{link.label}</p>
                    <p className="text-foreground truncate group-hover:text-accent-pink transition-colors" style={{ ['--tw-text-opacity' as string]: 1 }}>
                      {link.value}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.a>
            ))}

            {/* Resume Section - styled consistently */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-6 rounded-lg border border-accent-purple/20 bg-accent-purple/5"
            >
              <div className="flex items-center gap-3 mb-3">
                <FileText className="w-5 h-5" style={{ color: 'hsl(var(--accent-purple))' }} />
                <h3 className="text-lg font-semibold font-heading">Resume</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                View or download my resume from the link below:
              </p>
              <Button
                asChild
                variant="outline"
                className="w-full border-accent-purple/30 hover:bg-accent-purple/10 hover:border-accent-purple/50"
              >
                <a href={RESUME_LINK} target="_blank" rel="noopener noreferrer">
                  <FileText className="w-4 h-4 mr-2" />
                  View Resume
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Contact Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="p-6 md:p-8 rounded-lg border border-accent-blue/20 bg-accent-blue/5">
              <h3 className="text-xl font-semibold mb-6 font-heading">
                Send Me a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="bg-background/50 border-border/50 focus:border-accent-blue/50 placeholder:text-muted-foreground/50"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-destructive">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="bg-background/50 border-border/50 focus:border-accent-blue/50 placeholder:text-muted-foreground/50"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    rows={5}
                    className="bg-background/50 border-border/50 focus:border-accent-blue/50 placeholder:text-muted-foreground/50 resize-none"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-destructive">{errors.message}</p>
                  )}
                </div>

                <div className="pt-2">
                  <HCaptcha />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="outline"
                  className="w-full py-6 border-accent-blue/30 hover:bg-accent-blue/10 hover:border-accent-blue/50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-foreground/30 border-t-foreground rounded-full"
                      />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Bottom text - matching other sections */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-16"
        >
          <p className="text-sm text-muted-foreground/50 uppercase tracking-widest font-mono">
            Let's build something great together
          </p>
        </motion.div>
      </div>
    </section>
  );
}
