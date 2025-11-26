import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SEO } from "@/components/SEO";
import { FileText, Shield, AlertTriangle, Users, Ban, Scale, Globe, CheckCircle } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Terms of Service"
        description="Read our Terms of Service to understand the rules and regulations for using UnifyO."
        url="https://unify0.com/terms"
        keywords={[
          "unifyo terms",
          "app terms of service",
          "user agreement",
          "student platform rules"
        ]}
      />
      <Navbar />
      
      {/* Hero Section */}
      <section id="main-content" className="relative overflow-hidden pt-20 pb-12 sm:pt-24 sm:pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50"></div>
        
        <div className="container-fluid content-width-lg relative z-10 container-px">
          <div className="pb-3 border-b border-neutral-200">
            <Breadcrumbs items={[{ label: "Terms of Service" }]} />
          </div>
          
          <div className="mt-4 text-center max-w-4xl mx-auto">
            <ScrollReveal direction="up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 border border-primary-200 mb-6">
                <FileText className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-semibold text-primary-700">Legal Agreement</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl font-bold leading-tight text-foreground mb-6">
                Terms of Service
            </h1>
              
              <p className="text-xl text-neutral-600 leading-relaxed">
                Last Updated: January 1, 2026
            </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-py layer-shade-1">
        <div className="container-fluid content-width container-px">
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <ScrollReveal direction="up">
              <div className="bg-white p-8 rounded-2xl shadow-medium mb-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-premium flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-neutral-900 mb-4">Agreement to Terms</h2>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-4">
                      Welcome to UnifyO! These Terms of Service ("Terms") constitute a legally binding agreement between you ("User," "you," or "your") and UnifyO ("Company," "we," "us," or "our") governing your access to and use of our platform, website, mobile applications, and related services (collectively, the "Services").
                    </p>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-4">
                      By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you must not access or use our Services.
                    </p>
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-xl mt-6">
                      <p className="text-lg font-semibold text-amber-900">
                        IMPORTANT: These Terms contain an arbitration clause and class action waiver that affect your legal rights. Please read Section 15 carefully.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Eligibility */}
            <ScrollReveal direction="up">
              <div className="bg-white p-8 rounded-2xl shadow-medium mb-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-premium flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-neutral-900 mb-6">1. Eligibility</h2>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-4">
                      To use our Services, you must:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-neutral-700">
                      <li>Be at least 16 years old (or the minimum age required in your jurisdiction)</li>
                      <li>Be a current, prospective, or former international student</li>
                      <li>Have the legal capacity to enter into a binding contract</li>
                      <li>Not be prohibited from using the Services under applicable laws</li>
                      <li>Provide accurate and complete registration information</li>
                      <li>Maintain the security of your account credentials</li>
                    </ul>
                    <p className="text-lg text-neutral-700 leading-relaxed">
                      By creating an account, you represent and warrant that you meet all eligibility requirements. We reserve the right to verify your eligibility and may request additional documentation.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Account Registration */}
            <ScrollReveal direction="up">
              <div className="bg-white p-8 rounded-2xl shadow-medium mb-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-premium flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-neutral-900 mb-6">2. Account Registration and Security</h2>
                    
                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">2.1 Account Creation</h3>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                      To access certain features, you must create an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.
                    </p>

                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">2.2 Account Security</h3>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-4">
                      You are responsible for:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-neutral-700">
                      <li>Maintaining the confidentiality of your password</li>
                      <li>All activities that occur under your account</li>
                      <li>Notifying us immediately of any unauthorized access</li>
                      <li>Ensuring your account is not used by others</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">2.3 Verification</h3>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                      We may require you to verify your identity and student status through university email addresses, student IDs, or other documentation. Failure to complete verification may result in limited access to certain features.
                    </p>

                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">2.4 One Account Per Person</h3>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                      You may only create and maintain one account. Creating multiple accounts may result in suspension or termination of all your accounts.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* User Conduct */}
            <ScrollReveal direction="up">
              <div className="bg-white p-8 rounded-2xl shadow-medium mb-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-premium flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-neutral-900 mb-6">3. User Conduct and Prohibited Activities</h2>
                    
                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">3.1 Acceptable Use</h3>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-4">
                      You agree to use the Services only for lawful purposes and in accordance with these Terms. You agree to:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-neutral-700">
                      <li>Treat other users with respect and courtesy</li>
                      <li>Provide accurate information in your profile</li>
                      <li>Respect the intellectual property rights of others</li>
                      <li>Comply with all applicable laws and regulations</li>
                      <li>Report any violations of these Terms</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">3.2 Prohibited Activities</h3>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-4">
                      You agree NOT to:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-neutral-700">
                      <li><strong>Harassment:</strong> Harass, bully, stalk, intimidate, or threaten any user</li>
                      <li><strong>Hate Speech:</strong> Post content that promotes hatred, violence, or discrimination based on race, ethnicity, national origin, religion, gender, sexual orientation, disability, or age</li>
                      <li><strong>Impersonation:</strong> Impersonate any person or entity, or falsely represent your affiliation</li>
                      <li><strong>Spam:</strong> Send unsolicited messages, advertisements, or promotional materials</li>
                      <li><strong>Fraud:</strong> Engage in fraudulent, deceptive, or misleading activities</li>
                      <li><strong>Illegal Content:</strong> Post, share, or distribute illegal content or content that violates others' rights</li>
                      <li><strong>Malware:</strong> Upload viruses, malware, or any malicious code</li>
                      <li><strong>Scraping:</strong> Use automated systems to access or collect data from the Services</li>
                      <li><strong>Reverse Engineering:</strong> Reverse engineer, decompile, or disassemble any part of the Services</li>
                      <li><strong>Interference:</strong> Interfere with or disrupt the Services or servers</li>
                      <li><strong>Unauthorized Access:</strong> Access areas of the Services you are not authorized to access</li>
                      <li><strong>Commercial Use:</strong> Use the Services for unauthorized commercial purposes</li>
                      <li><strong>Sexual Content:</strong> Post sexually explicit or suggestive content</li>
                      <li><strong>Violence:</strong> Post content that depicts or promotes violence</li>
                      <li><strong>Privacy Violations:</strong> Share others' personal information without consent</li>
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Content */}
            <ScrollReveal direction="up">
              <div className="bg-white p-8 rounded-2xl shadow-medium mb-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-premium flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-neutral-900 mb-6">4. User Content</h2>
                    
                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">4.1 Your Content</h3>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                      You retain ownership of all content you post, upload, or share through the Services ("User Content"). By posting User Content, you grant UnifyO a worldwide, non-exclusive, royalty-free, transferable license to use, reproduce, modify, distribute, and display your User Content in connection with operating and providing the Services.
                    </p>

                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">4.2 Content Responsibility</h3>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-4">
                      You are solely responsible for your User Content and the consequences of posting it. You represent and warrant that:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-neutral-700">
                      <li>You own or have the necessary rights to your User Content</li>
                      <li>Your User Content does not violate these Terms or any laws</li>
                      <li>Your User Content does not infringe on others' rights</li>
                      <li>Your User Content is accurate and not misleading</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">4.3 Content Moderation</h3>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                      We reserve the right (but have no obligation) to monitor, review, and remove User Content that violates these Terms or is otherwise objectionable. We may remove content without notice and at our sole discretion.
                    </p>

                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">4.4 Backup</h3>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                      You are responsible for maintaining backups of your User Content. We are not responsible for any loss or corruption of User Content.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Intellectual Property */}
            <ScrollReveal direction="up">
              <div className="bg-white p-8 rounded-2xl shadow-medium mb-8">
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">5. Intellectual Property Rights</h2>
                
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">5.1 UnifyO's Rights</h3>
                <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                  The Services, including all content, features, functionality, software, and design, are owned by UnifyO and are protected by copyright, trademark, patent, trade secret, and other intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of our Services without our express written permission.
                </p>

                <h3 className="text-xl font-semibold text-neutral-900 mb-3">5.2 Trademarks</h3>
                <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                  UnifyO, our logo, and other marks are trademarks of UnifyO. You may not use our trademarks without our prior written consent.
                </p>

                <h3 className="text-xl font-semibold text-neutral-900 mb-3">5.3 Feedback</h3>
                <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                  If you provide us with feedback, suggestions, or ideas, you grant us the right to use them without any obligation to compensate you.
                </p>
              </div>
            </ScrollReveal>

            {/* Privacy */}
            <ScrollReveal direction="up">
              <div className="bg-white p-8 rounded-2xl shadow-medium mb-8">
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">6. Privacy and Data Protection</h2>
                <p className="text-lg text-neutral-700 leading-relaxed mb-4">
                  Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using the Services, you consent to our collection and use of your information as described in our Privacy Policy.
                </p>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  You can read our full Privacy Policy at <a href="/legal/privacy-policy" className="text-primary-600 hover:text-primary-700 underline">/legal/privacy-policy</a>.
                </p>
              </div>
            </ScrollReveal>

            {/* Payments */}
            <ScrollReveal direction="up">
              <div className="bg-white p-8 rounded-2xl shadow-medium mb-8">
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">7. Payments and Subscriptions</h2>
                
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">7.1 Free Services</h3>
                <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                  UnifyO is currently free to use. We reserve the right to introduce paid features or subscriptions in the future.
                </p>

                <h3 className="text-xl font-semibold text-neutral-900 mb-3">7.2 Future Paid Features</h3>
                <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                  If we introduce paid features, we will provide clear pricing information and obtain your consent before charging you. All payments will be processed through secure third-party payment processors.
                </p>

                <h3 className="text-xl font-semibold text-neutral-900 mb-3">7.3 Refunds</h3>
                <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                  Any refund policies for future paid features will be clearly communicated at the time of purchase.
                </p>
              </div>
            </ScrollReveal>

            {/* Third-Party Services */}
            <ScrollReveal direction="up">
              <div className="bg-white p-8 rounded-2xl shadow-medium mb-8">
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">8. Third-Party Services and Links</h2>
                <p className="text-lg text-neutral-700 leading-relaxed mb-4">
                  Our Services may contain links to third-party websites, applications, or services that are not owned or controlled by UnifyO. We are not responsible for:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-neutral-700">
                  <li>The content, privacy policies, or practices of third-party services</li>
                  <li>Any damage or loss caused by your use of third-party services</li>
                  <li>The availability or accuracy of third-party services</li>
                </ul>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  Your use of third-party services is at your own risk and subject to their terms and policies.
                </p>
              </div>
            </ScrollReveal>

            {/* Termination */}
            <ScrollReveal direction="up">
              <div className="bg-white p-8 rounded-2xl shadow-medium mb-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-premium flex items-center justify-center flex-shrink-0">
                    <Ban className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-neutral-900 mb-6">9. Termination and Suspension</h2>
                    
                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">9.1 Your Right to Terminate</h3>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                      You may terminate your account at any time by following the account deletion process in your settings or by contacting us at support@unifyo.com.
                    </p>

                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">9.2 Our Right to Terminate</h3>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-4">
                      We may suspend or terminate your account immediately, without prior notice or liability, for any reason, including if you:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-neutral-700">
                      <li>Violate these Terms</li>
                      <li>Engage in prohibited activities</li>
                      <li>Provide false or misleading information</li>
                      <li>Infringe on others' rights</li>
                      <li>Pose a security or legal risk</li>
                      <li>Fail to respond to verification requests</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">9.3 Effect of Termination</h3>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                      Upon termination, your right to use the Services will immediately cease. We may delete your account and User Content, though some information may be retained as required by law or for legitimate business purposes.
                    </p>

                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">9.4 Survival</h3>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                      Sections of these Terms that by their nature should survive termination will survive, including intellectual property rights, disclaimers, limitations of liability, and dispute resolution provisions.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Disclaimers */}
            <ScrollReveal direction="up">
              <div className="bg-white p-8 rounded-2xl shadow-medium mb-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-premium flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-neutral-900 mb-6">10. Disclaimers and Warranties</h2>
                    
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-xl mb-6">
                      <p className="text-lg font-semibold text-amber-900 uppercase mb-4">
                        IMPORTANT LEGAL NOTICE
                      </p>
                      <p className="text-lg text-amber-900 leading-relaxed">
                        THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
                      </p>
                    </div>

                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">10.1 No Warranties</h3>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-4">
                      TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, INCLUDING:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-neutral-700">
                      <li>Warranties of merchantability, fitness for a particular purpose, and non-infringement</li>
                      <li>Warranties regarding the accuracy, reliability, or availability of the Services</li>
                      <li>Warranties that the Services will be uninterrupted, secure, or error-free</li>
                      <li>Warranties regarding the quality or safety of connections made through the Services</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">10.2 User Responsibility</h3>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-4">
                      You acknowledge that:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-neutral-700">
                      <li>You use the Services at your own risk</li>
                      <li>We do not conduct background checks on users</li>
                      <li>We are not responsible for user conduct or interactions</li>
                      <li>You should exercise caution when meeting users in person</li>
                      <li>You should verify information provided by other users</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">10.3 No Professional Advice</h3>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                      The Services do not provide professional advice (legal, financial, medical, or otherwise). Any information provided through the Services is for informational purposes only and should not be relied upon as professional advice.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Limitation of Liability */}
            <ScrollReveal direction="up">
              <div className="bg-white p-8 rounded-2xl shadow-medium mb-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-premium flex items-center justify-center flex-shrink-0">
                    <Scale className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-neutral-900 mb-6">11. Limitation of Liability</h2>
                    
                    <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl mb-6">
                      <p className="text-lg font-semibold text-red-900 uppercase mb-4">
                        LIMITATION OF LIABILITY
                      </p>
                      <p className="text-lg text-red-900 leading-relaxed">
                        TO THE FULLEST EXTENT PERMITTED BY LAW, UNIFYO SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
                      </p>
                    </div>

                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">11.1 Scope of Limitation</h3>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-4">
                      Our liability is limited for claims arising from:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-neutral-700">
                      <li>Your use or inability to use the Services</li>
                      <li>Unauthorized access to your account or data</li>
                      <li>User conduct or content</li>
                      <li>Errors, mistakes, or inaccuracies in the Services</li>
                      <li>Personal injury or property damage from your use of the Services</li>
                      <li>Interruption or cessation of the Services</li>
                      <li>Bugs, viruses, or malicious code</li>
                      <li>Loss of data or content</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">11.2 Maximum Liability</h3>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                      IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL DAMAGES EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID TO US IN THE TWELVE MONTHS PRIOR TO THE EVENT GIVING RISE TO LIABILITY, OR (B) ONE HUNDRED DOLLARS ($100 USD).
                    </p>

                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">11.3 Exceptions</h3>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                      Some jurisdictions do not allow the exclusion or limitation of certain warranties or liabilities. In such jurisdictions, our liability will be limited to the maximum extent permitted by law.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Indemnification */}
            <ScrollReveal direction="up">
              <div className="bg-white p-8 rounded-2xl shadow-medium mb-8">
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">12. Indemnification</h2>
                <p className="text-lg text-neutral-700 leading-relaxed mb-4">
                  You agree to indemnify, defend, and hold harmless UnifyO, its officers, directors, employees, agents, and affiliates from and against any claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-neutral-700">
                  <li>Your use or misuse of the Services</li>
                  <li>Your violation of these Terms</li>
                  <li>Your violation of any rights of another party</li>
                  <li>Your User Content</li>
                  <li>Your conduct in connection with the Services</li>
                </ul>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  We reserve the right to assume the exclusive defense and control of any matter subject to indemnification by you, and you agree to cooperate with our defense of such claims.
                </p>
              </div>
            </ScrollReveal>

            {/* Governing Law */}
            <ScrollReveal direction="up">
              <div className="bg-white p-8 rounded-2xl shadow-medium mb-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-premium flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-neutral-900 mb-6">13. Governing Law and Jurisdiction</h2>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                      These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
                    </p>
                    <p className="text-lg text-neutral-700 leading-relaxed">
                      You agree to submit to the personal jurisdiction of the courts located in [Your Jurisdiction] for the purpose of litigating all such claims or disputes.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Dispute Resolution */}
            <ScrollReveal direction="up">
              <div className="bg-white p-8 rounded-2xl shadow-medium mb-8">
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">14. Dispute Resolution</h2>
                
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">14.1 Informal Resolution</h3>
                <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                  Before filing a claim, you agree to contact us at legal@unifyo.com to attempt to resolve the dispute informally. We will attempt to resolve the dispute within 60 days.
                </p>

                <h3 className="text-xl font-semibold text-neutral-900 mb-3">14.2 Binding Arbitration</h3>
                <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                  If we cannot resolve the dispute informally, any dispute arising from these Terms or the Services shall be resolved through binding arbitration in accordance with the rules of [Arbitration Organization]. The arbitration shall take place in [Location], and judgment on the award may be entered in any court having jurisdiction.
                </p>

                <h3 className="text-xl font-semibold text-neutral-900 mb-3">14.3 Class Action Waiver</h3>
                <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-xl mb-6">
                  <p className="text-lg font-semibold text-amber-900 uppercase mb-4">
                    CLASS ACTION WAIVER
                  </p>
                  <p className="text-lg text-amber-900 leading-relaxed">
                    YOU AND UNIFYO AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING.
                  </p>
                </div>

                <h3 className="text-xl font-semibold text-neutral-900 mb-3">14.4 Exceptions</h3>
                <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                  Either party may bring a claim in small claims court if it qualifies. Additionally, either party may seek injunctive or other equitable relief in court to prevent infringement of intellectual property rights.
                </p>
              </div>
            </ScrollReveal>

            {/* Changes to Terms */}
            <ScrollReveal direction="up">
              <div className="bg-white p-8 rounded-2xl shadow-medium mb-8">
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">15. Changes to These Terms</h2>
                <p className="text-lg text-neutral-700 leading-relaxed mb-4">
                  We reserve the right to modify these Terms at any time. When we make material changes, we will:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-neutral-700">
                  <li>Update the "Last Updated" date</li>
                  <li>Post the revised Terms on our website</li>
                  <li>Notify you via email or through the Services</li>
                  <li>Provide you with an opportunity to review the changes</li>
                </ul>
                <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                  Your continued use of the Services after the effective date of the revised Terms constitutes your acceptance of the changes. If you do not agree to the revised Terms, you must stop using the Services.
                </p>
              </div>
            </ScrollReveal>

            {/* General Provisions */}
            <ScrollReveal direction="up">
              <div className="bg-white p-8 rounded-2xl shadow-medium mb-8">
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">16. General Provisions</h2>
                
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">16.1 Entire Agreement</h3>
                <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                  These Terms, together with our Privacy Policy, constitute the entire agreement between you and UnifyO regarding the Services and supersede all prior agreements.
                </p>

                <h3 className="text-xl font-semibold text-neutral-900 mb-3">16.2 Severability</h3>
                <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                  If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect.
                </p>

                <h3 className="text-xl font-semibold text-neutral-900 mb-3">16.3 Waiver</h3>
                <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                  Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                </p>

                <h3 className="text-xl font-semibold text-neutral-900 mb-3">16.4 Assignment</h3>
                <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                  You may not assign or transfer these Terms or your account without our prior written consent. We may assign these Terms without restriction.
                </p>

                <h3 className="text-xl font-semibold text-neutral-900 mb-3">16.5 Force Majeure</h3>
                <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                  We shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, including acts of God, natural disasters, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, pandemics, strikes, or shortages of transportation, facilities, fuel, energy, labor, or materials.
                </p>

                <h3 className="text-xl font-semibold text-neutral-900 mb-3">16.6 No Agency</h3>
                <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                  No agency, partnership, joint venture, or employment relationship is created between you and UnifyO as a result of these Terms or your use of the Services.
                </p>

                <h3 className="text-xl font-semibold text-neutral-900 mb-3">16.7 Notices</h3>
                <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                  We may provide notices to you via email, regular mail, or postings on the Services. Notices to us should be sent to legal@unifyo.com.
                </p>
              </div>
            </ScrollReveal>

            {/* Contact Information */}
            <ScrollReveal direction="up">
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-8 rounded-2xl border-2 border-primary-200 mb-8">
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">17. Contact Information</h2>
                <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                  If you have any questions about these Terms, please contact us:
                </p>
                <div className="space-y-3 text-lg text-neutral-700">
                  <p><strong>Email:</strong> <a href="mailto:legal@unifyo.com" className="text-primary-600 hover:text-primary-700 underline">legal@unifyo.com</a></p>
                  <p><strong>Support:</strong> <a href="mailto:support@unifyo.com" className="text-primary-600 hover:text-primary-700 underline">support@unifyo.com</a></p>
                  <p><strong>Mail:</strong> UnifyO Legal Department<br />
                  [Company Address]<br />
                  [City, State, ZIP]<br />
                  [Country]</p>
                  <p><strong>Phone:</strong> +91 6261786931</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Acknowledgment */}
            <ScrollReveal direction="up">
              <div className="bg-neutral-900 text-white p-8 rounded-2xl text-center">
                <p className="text-lg mb-4">
                  BY USING OUR SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS OF SERVICE.
                </p>
                <p className="text-xl font-bold">Effective Date: January 1, 2026</p>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsOfService;
