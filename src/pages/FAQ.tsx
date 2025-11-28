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
          answer: "UnifyO is a social networking platform for international students that actually gets it. Think of it as your mate who's already been through the chaos and is now sharing the cheat codes. We connect you with students who've walked your path, faced your struggles, and figured out the shortcuts. No corporate speak. No unhelpful FAQs. Just real students helping real students."
        },
        {
          question: "When is UnifyO launching?",
          answer: "Soon. Very soon. We're testing everything to make sure it actually works properly. Join the waitlist at unifyo.in and you'll be the first to know when we launch."
        },
        {
          question: "Is UnifyO free?",
          answer: "We're building this to help students, not empty your pockets. Core features will be accessible to everyone. No hidden fees, no premium tiers that lock away essential features."
        },
        {
          question: "Who can join UnifyO?",
          answer: "You're in the right place if you're an Indian student heading abroad for university, you're tired of getting vague advice from random internet forums, you want to connect with real people (not just read blog posts), and you need practical help, not motivational quotes."
        },
        {
          question: "Can I use it before I get my visa?",
          answer: "Absolutely! Many students join as soon as they're accepted to a university. It's the perfect time to start building connections and asking questions about the visa process. The best time to build your network is before you need it."
        }
      ]
    },
    {
      title: "Platform & Features",
      items: [
        {
          question: "How is UnifyO different from Facebook groups?",
          answer: "Facebook groups are great until you need to find that one post from three weeks ago about bank accounts. UnifyO organises information properly, connects you with the right people faster, and doesn't bombard you with unrelated content. We're a single platform where everything is structured and searchable."
        },
        {
          question: "What will I get when UnifyO launches?",
          answer: "You'll get instant access to our growing community, all essential guides unlocked immediately, direct connection with students at your university, and regular updates on everything that matters. Plus, you can connect with students heading to the same university before you even land."
        },
        {
          question: "Will UnifyO help me find accommodation?",
          answer: "Not directly, but you'll connect with students who can share their experiences with different accommodation options, landlords to avoid, and areas that are actually affordable. Real advice from people who've actually lived there."
        },
        {
          question: "What kind of guides does UnifyO offer?",
          answer: "We're creating essential guides written by students, for students. Short, practical, and actually useful. Topics include: opening a bank account, getting your National Insurance number, finding part-time work (legal stuff sorted), navigating the NHS, best SIM card deals, and where to find Indian grocery stores near you."
        },
        {
          question: "Can I contribute guides to help other students?",
          answer: "Absolutely. That's the whole point. We're building this together. If you've figured something out, share it. Help the next person avoid the same confusion."
        }
      ]
    },
    {
      title: "Safety & Verification",
      items: [
        {
          question: "How do you verify students?",
          answer: "All users must verify their account with a university email address or enrollment documents. This ensures our community is exclusively students and creates a safer environment for everyone. No scammers, no spam, no bots."
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
      title: "Availability & Expansion",
      items: [
        {
          question: "I'm not going to the UK. Can I still use UnifyO?",
          answer: "Right now we're focusing on students heading to the UK, US, Canada, Australia, and other major destinations since that's where we can provide the most value. But we're planning to expand to more countries based on demand. We currently support 15+ destination countries."
        },
        {
          question: "Is there a mobile app?",
          answer: "We're launching on web first in Fall 2026, with iOS and Android apps coming shortly after. Join the waitlist to get notified when the apps are available."
        },
        {
          question: "Can I use it after I arrive?",
          answer: "Absolutely! Many students continue using UnifyO after arriving to stay connected, find roommates, organize meetups, and help incoming students. The community grows stronger when experienced students help newcomers."
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
