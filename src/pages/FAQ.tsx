import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqSections = [
    {
      title: "Getting Started",
      items: [
        {
          question: "What is UnifyO?",
          answer: "UnifyO is a social app for international students. Match with students from your country studying at your destination. Join communities. Chat, meet, and build your network before you land."
        },
        {
          question: "Is it free?",
          answer: "Yes! UnifyO is completely free. No hidden fees, no premium tiers. We believe every international student deserves access to a supportive community."
        },
        {
          question: "Can I use it before I get my visa?",
          answer: "Absolutely! Many students join as soon as they're accepted to a university. It's the perfect time to start building connections and asking questions about the visa process."
        },
        {
          question: "Who can join?",
          answer: "UnifyO is for international students only. You'll need a university email address to verify your student status and create an account."
        }
      ]
    },
    {
      title: "Safety & Verification",
      items: [
        {
          question: "How do you verify students?",
          answer: "All users must verify their account with a university email address. This ensures our community is exclusively students and creates a safer environment for everyone."
        },
        {
          question: "Is my data safe?",
          answer: "Yes. We use industry-standard encryption and never share your personal information with third parties. You control what information is visible on your profile."
        },
        {
          question: "What if I encounter inappropriate behavior?",
          answer: "You can report and block any user directly in the app. Our team reviews all reports within 24 hours and takes appropriate action to keep the community safe."
        }
      ]
    },
    {
      title: "Using the App",
      items: [
        {
          question: "How does matching work?",
          answer: "Our algorithm suggests students based on your country, destination university, major, and interests. You can filter matches and connect with students who make sense for your journey."
        },
        {
          question: "Can I message anyone?",
          answer: "You can message students you've matched with or who are in your communities. This keeps conversations relevant and reduces spam."
        },
        {
          question: "What are communities?",
          answer: "Communities are group chats organized by country, university, city, or interests. Join 'Indians at Toronto' or 'Computer Science Students in Boston' to find your people."
        },
        {
          question: "Can I join multiple communities?",
          answer: "Yes! Join as many communities as you want. Most students are in 3-5 communities based on their country, university, city, and interests."
        }
      ]
    },
    {
      title: "Features & Availability",
      items: [
        {
          question: "Is there a mobile app?",
          answer: "We're launching on web first in Fall 2026, with iOS and Android apps coming shortly after. Join the waitlist to get notified when the apps are available."
        },
        {
          question: "Can I use it after I arrive?",
          answer: "Absolutely! Many students continue using UnifyO after arriving to stay connected, find roommates, organize meetups, and help incoming students."
        },
        {
          question: "Do you have events and meetups?",
          answer: "Yes! We organize virtual coffee chats, pre-departure meetups, and arrival day gatherings. Community members also organize their own events."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section - Editorial Style matching About page */}
      <section id="main-content" className="relative overflow-hidden pt-20 pb-12 sm:pt-24 sm:pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 opacity-60"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary-200/20 rounded-full blur-3xl"></div>
        
        <div className="container-fluid content-width relative z-10 container-px">
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
              Frequently Asked
              <span className="block mt-2 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                Questions
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-neutral-700 leading-relaxed font-light max-w-3xl">
              Find answers to common questions about UnifyO and your study abroad journey
            </p>
          </div>
        </div>
      </section>
      
      {/* FAQ Content Section */}
      <section className="section-py layer-shade-1">
        <div className="container-fluid content-width container-px">

          <div className="space-y-8">
            {faqSections.map((section, sectionIndex) => (
              <Card key={sectionIndex} className="border-2">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-6">{section.title}</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {section.items.map((item, itemIndex) => (
                      <AccordionItem key={itemIndex} value={`item-${sectionIndex}-${itemIndex}`}>
                        <AccordionTrigger className="text-left font-semibold hover:text-primary">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground leading-relaxed">
                            {item.answer}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-2 mt-12 shadow-lg">
            <CardContent className="pt-6 text-center">
              <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
              <p className="text-neutral-600 mb-6 leading-relaxed">
                Can't find the answer you're looking for? Our support team is here to help you with your study abroad journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-lg hover:bg-primary/90 transition-all hover:scale-105"
                >
                  Contact Support
                </a>
                <a 
                  href="mailto:11astitvajha@gmail.com" 
                  className="border-2 border-primary text-primary font-semibold px-8 py-3 rounded-lg hover:bg-primary hover:text-white transition-all hover:scale-105"
                >
                  Email Us
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
