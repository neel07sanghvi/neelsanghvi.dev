import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Github, FileText, Send, ExternalLink } from "lucide-react";
import { z } from "zod";
import { SOCIAL_LINKS, RESUME_LINK, CONTACT_INFO } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import HCaptcha from "@/components/ui/HCaptcha";
import TextReveal from "@/components/ui/TextReveal";

// Web3Forms access key
const WEB3FORMS_ACCESS_KEY = "666d3304-971f-4b09-995c-2439231d25ba";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  message: z
    .string()
    .trim()
    .min(1, { message: "Message is required" })
    .max(1000, { message: "Message must be less than 1000 characters" }),
});

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: CONTACT_INFO.email,
    href: SOCIAL_LINKS.EMAIL,
  },
  {
    icon: Phone,
    label: "Phone",
    value: CONTACT_INFO.phone,
    href: SOCIAL_LINKS.PHONE,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: SOCIAL_LINKS.LINKEDIN,
    href: SOCIAL_LINKS.LINKEDIN,
  },
  {
    icon: Github,
    label: "GitHub",
    value: SOCIAL_LINKS.GITHUB,
    href: SOCIAL_LINKS.GITHUB,
  },
];

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
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
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("message", formData.message);
      formDataToSend.append("access_key", WEB3FORMS_ACCESS_KEY);
      formDataToSend.append("h-captcha-response", hCaptchaToken);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Message sent!",
          description: "Thank you for reaching out. I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "" });

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
      className="relative min-h-screen py-16 md:py-24 lg:py-32 overflow-hidden bg-section-contact"
    >
      {/* Static distant stars background - matching Skills section */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white/30 rounded-full"
            style={{
              left: `${(i * 41) % 100}%`,
              top: `${(i * 29) % 100}%`,
            }}
          />
        ))}
      </div>

      {/* Nebula glow - matching Skills section style */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] lg:w-[800px] h-[400px] md:h-[600px] lg:h-[800px] rounded-full opacity-20 blur-3xl bg-gradient-radial from-accent-purple/30 via-accent-blue/20 to-transparent" />

      {/* Ambient glow - matching other sections */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-48 md:w-72 lg:w-96 h-48 md:h-72 lg:h-96 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, hsl(var(--accent-blue)) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-5xl">
        {/* Section Header - matching other sections */}
        <div className="text-center mb-10 md:mb-16 lg:mb-24">
          <TextReveal>
            <motion.span
              className="inline-block px-3 md:px-4 py-1 md:py-1.5 text-xs md:text-sm font-mono border rounded-full mb-4 md:mb-6"
              style={{
                color: "hsl(var(--accent-cyan))",
                borderColor: "hsl(var(--accent-cyan) / 0.3)",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              The Invitation
            </motion.span>
          </TextReveal>

          <TextReveal delay={0.1}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-foreground">Get In Touch</h2>
          </TextReveal>

          <TextReveal delay={0.2}>
            <p className="mt-3 md:mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              Feel free to contact me for any work or suggestions
            </p>
          </TextReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Contact Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3 md:space-y-4"
          >
            {/* Contact Links - styled like About section achievements */}
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.label !== "Phone" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group block p-3 md:p-4 rounded-lg border transition-all duration-300"
                style={{
                  borderColor: "hsl(var(--accent-blue) / 0.2)",
                  backgroundColor: "hsl(var(--accent-blue) / 0.05)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "hsl(var(--accent-blue) / 0.1)";
                  e.currentTarget.style.borderColor = "hsl(var(--accent-blue) / 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "hsl(var(--accent-blue) / 0.05)";
                  e.currentTarget.style.borderColor = "hsl(var(--accent-blue) / 0.2)";
                }}
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <div
                    className="flex-shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: "hsl(var(--accent-blue) / 0.15)" }}
                  >
                    <link.icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: "hsl(var(--accent-blue))" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm text-muted-foreground">{link.label}</p>
                    <p className="text-sm md:text-base text-foreground truncate group-hover:text-accent-blue transition-colors">
                      {link.value}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground opacity-50 md:opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </div>
              </a>
            ))}

            {/* Resume Section - styled consistently */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-4 md:p-6 rounded-lg border mt-4 md:mt-6"
              style={{
                borderColor: "hsl(var(--accent-cyan) / 0.2)",
                backgroundColor: "hsl(var(--accent-cyan) / 0.05)",
              }}
            >
              <div className="flex items-center gap-3 mb-2 md:mb-3">
                <FileText className="w-4 h-4 md:w-5 md:h-5" style={{ color: "hsl(var(--accent-cyan))" }} />
                <h3 className="text-base md:text-lg font-semibold font-heading">Resume</h3>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">View or download my resume from the link below:</p>
              <Button
                asChild
                variant="outline"
                className="w-full transition-all duration-300"
                style={{
                  borderColor: "hsl(var(--accent-cyan) / 0.3)",
                }}
              >
                <a href={RESUME_LINK} target="_blank" rel="noopener noreferrer" className="hover:bg-accent-cyan/10">
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
            <div
              className="p-4 md:p-6 lg:p-8 rounded-lg border"
              style={{
                borderColor: "hsl(var(--accent-blue) / 0.2)",
                backgroundColor: "hsl(var(--accent-blue) / 0.05)",
              }}
            >
              <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 font-heading">Send Me a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs md:text-sm font-medium text-muted-foreground mb-1.5 md:mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="bg-background/50 border-border/50 focus:border-accent-blue/50 placeholder:text-muted-foreground/50 text-sm md:text-base"
                  />
                  {errors.name && <p className="mt-1 text-xs md:text-sm text-destructive">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs md:text-sm font-medium text-muted-foreground mb-1.5 md:mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="bg-background/50 border-border/50 focus:border-accent-blue/50 placeholder:text-muted-foreground/50 text-sm md:text-base"
                  />
                  {errors.email && <p className="mt-1 text-xs md:text-sm text-destructive">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs md:text-sm font-medium text-muted-foreground mb-1.5 md:mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    rows={4}
                    className="bg-background/50 border-border/50 focus:border-accent-blue/50 placeholder:text-muted-foreground/50 resize-none text-sm md:text-base"
                  />
                  {errors.message && <p className="mt-1 text-xs md:text-sm text-destructive">{errors.message}</p>}
                </div>

                <div className="pt-1 md:pt-2 flex justify-center">
                  <div className="transform scale-90 md:scale-100 origin-center">
                    <HCaptcha />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="outline"
                  className="w-full py-5 md:py-6 transition-all duration-300 hover:bg-accent-blue/10"
                  style={{
                    borderColor: "hsl(var(--accent-blue) / 0.3)",
                  }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2 text-sm md:text-base">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-foreground/30 border-t-foreground rounded-full"
                      />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-sm md:text-base">
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
          className="flex justify-center mt-10 md:mt-16"
        >
          <span className="text-xs md:text-sm font-mono text-muted-foreground/50">Let's build something great together</span>
        </motion.div>
      </div>
    </section>
  );
}
