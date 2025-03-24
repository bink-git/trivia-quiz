
import { useState } from "react";
import { SectionHeading } from "../ui/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { MotionDiv } from "../ui/motion-div";
import { toast } from "sonner";

interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  details: string;
  href?: string;
}

const contactInfo: ContactInfo[] = [
  {
    icon: <Mail className="h-6 w-6 text-primary" />,
    title: "Email",
    details: "alex@example.com",
    href: "mailto:alex@example.com",
  },
  {
    icon: <Phone className="h-6 w-6 text-primary" />,
    title: "Phone",
    details: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: <MapPin className="h-6 w-6 text-primary" />,
    title: "Location",
    details: "San Francisco, CA",
  },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully!", {
        description: "I'll get back to you as soon as possible.",
      });
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="section bg-secondary/50">
      <div className="container">
        <SectionHeading
          subtitle="Get In Touch"
          title="Let's Work Together"
          description="Have a project in mind or want to discuss potential opportunities? Feel free to reach out."
        />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-start">
          <MotionDiv 
            animation="slide-up" 
            className="md:col-span-2 space-y-6"
          >
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 rounded-lg bg-card border"
              >
                <div className="rounded-full bg-primary/10 p-3">{info.icon}</div>
                <div>
                  <h3 className="font-medium">{info.title}</h3>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      {info.details}
                    </a>
                  ) : (
                    <p className="text-muted-foreground">{info.details}</p>
                  )}
                </div>
              </div>
            ))}
          </MotionDiv>

          <MotionDiv 
            animation="slide-up" 
            delay={200}
            className="md:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-4 p-6 rounded-lg bg-card border"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full rounded-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
