import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Shield, Lock, Eye, Database, Mail, Globe, UserCheck, AlertCircle } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section id="main-content" className="relative overflow-hidden pt-20 pb-12 sm:pt-24 sm:pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50"></div>
        
        <div className="container-fluid content-width-lg relative z-10 container-px">
          <div className="pb-3 border-b border-neutral-200">
            <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
          </div>
          
          <div className="mt-4 text-center max-w-4xl mx-auto">
            <ScrollReveal direction="up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 border border-primary-200 mb-6">
                <Shield className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-semibold text-primary-700">Your Privacy Matters</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl font-bold leading-tight text-foreground mb-6">
                Privacy Policy
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
                    <Eye className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-neutral-900 mb-4">Introduction</h2>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-4">
                      Welcome to UnifyO ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform, website, and mobile applications (collectively, the "Services").
                    </p>
                    <p className="text-lg text-neutral-700 leading-relaxed">
                      Please read this Privacy Policy carefully. By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy. If you do not agree with this Privacy Policy, please do not use our Services.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Information We Collect */}
            <ScrollReveal direction="up">
              <div className="bg-white p-8 rounded-2xl shadow-medium mb-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-premium flex items-center justify-center flex-shrink-0">
                    <Database className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-neutral-900 mb-6">Information We Collect</h2>
                    
                    <h3 className="text-2xl font-bold text-neutral-900 mb-4">1. Information You Provide to Us</h3>
                    
                    <h4 className="text-xl font-semibold text-neutral-900 mb-3">Account Information</h4>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-4">
                      When you create an account, we collect:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-neutral-700">
                      <li>Full name</li>
                      <li>Email address</li>
                      <li>Password (encrypted)</li>
                      <li>Date of birth</li>
                      <li>Phone number (optional)</li>
                      <li>Profile picture (optional)</li>
                    </ul>

                    <h4 className="text-xl font-semibold text-neutral-900 mb-3">Profile Information</h4>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-4">
                      To help you connect with other students, we collect:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-neutral-700">
                      <li>Home country and city</li>
                      <li>Destination country and university</li>
                      <li>Field of study</li>
                      <li>Student status (prospective, current, alumni)</li>
                      <li>Languages spoken</li>
                      <li>Interests and hobbies</li>
                      <li>Bio and personal description</li>
                    </ul>

                    <h4 className="text-xl font-semibold text-neutral-900 mb-3">Verification Information</h4>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-4">
                      To maintain a safe community, we may collect:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-neutral-700">
                      <li>University email address for verification</li>
                      <li>Student ID or enrollment documents</li>
                      <li>Acceptance letters (for prospective students)</li>
                    </ul>

                    <h4 className="text-xl font-semibold text-neutral-900 mb-3">Communications</h4>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                      When you communicate with us or other users, we collect the content of those communications, including messages, posts, comments, and any files or media you share.
                    </p>

                    <h3 className="text-2xl font-bold text-neutral-900 mb-4 mt-8">2. Information Collected Automatically</h3>
                    
                    <h4 className="text-xl font-semibold text-neutral-900 mb-3">Device Information</h4>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-neutral-700">
                      <li>Device type and model</li>
                      <li>Operating system and version</li>
                      <li>Browser type and version</li>
                      <li>IP address</li>
                      <li>Device identifiers (such as IDFA or Android ID)</li>
                      <li>Mobile network information</li>
                    </ul>

                    <h4 className="text-xl font-semibold text-neutral-900 mb-3">Usage Information</h4>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-neutral-700">
                      <li>Pages or features you access</li>
                      <li>Time and date of your visits</li>
                      <li>Time spent on pages</li>
                      <li>Links you click</li>
                      <li>Search queries</li>
                      <li>Actions taken within the Services</li>
                    </ul>

                    <h4 className="text-xl font-semibold text-neutral-900 mb-3">Location Information</h4>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                      With your permission, we may collect precise location data from your device to help you find students near you. You can disable location services through your device settings at any time.
                    </p>

                    <h4 className="text-xl font-semibold text-neutral-900 mb-3">Cookies and Tracking Technologies</h4>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-4">
                      We use cookies, web beacons, and similar technologies to:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-neutral-700">
                      <li>Remember your preferences and settings</li>
                      <li>Authenticate your account</li>
                      <li>Analyze usage patterns and trends</li>
                      <li>Deliver targeted advertising</li>
                      <li>Improve our Services</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-neutral-900 mb-4 mt-8">3. Information from Third Parties</h3>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-4">
                      We may receive information about you from:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-neutral-700">
                      <li><strong>Social Media:</strong> If you link your social media accounts, we may receive profile information</li>
                      <li><strong>Universities:</strong> Verification of enrollment status (with your consent)</li>
                      <li><strong>Analytics Providers:</strong> Aggregated usage data and analytics</li>
                      <li><strong>Other Users:</strong> Information shared about you in messages or posts</li>
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* How We Use Your Information */}
            <ScrollReveal direction="up">
              <div className="bg-white p-8 rounded-2xl shadow-medium mb-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-premium flex items-center justify-center flex-shrink-0">
                    <UserCheck className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-neutral-900 mb-6">How We Use Your Information</h2>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-4">
                      We use the information we collect for the following purposes:
                    </p>

                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">1. Provide and Improve Our Services</h3>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-neutral-700">
                      <li>Create and manage your account</li>
                      <li>Match you with other students based on your profile</li>
                      <li>Enable communication between users</li>
                      <li>Personalize your experience</li>
                      <li>Develop new features and improve existing ones</li>
                      <li>Provide customer support</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">2. Safety and Security</h3>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-neutral-700">
                      <li>Verify user identities</li>
                      <li>Detect and prevent fraud, spam, and abuse</li>
                      <li>Enforce our Terms of Service</li>
                      <li>Protect the rights and safety of our users</li>
                      <li>Investigate and respond to violations</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">3. Communications</h3>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-neutral-700">
                      <li>Send you service-related notifications</li>
                      <li>Respond to your inquiries and requests</li>
                      <li>Send you updates about new features</li>
                      <li>Provide marketing communications (with your consent)</li>
                      <li>Send you community updates and newsletters</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">4. Analytics and Research</h3>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-neutral-700">
                      <li>Analyze usage patterns and trends</li>
                      <li>Conduct research to improve student experiences</li>
                      <li>Generate aggregated, anonymized statistics</li>
                      <li>Measure the effectiveness of our Services</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">5. Legal Compliance</h3>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-neutral-700">
                      <li>Comply with legal obligations</li>
                      <li>Respond to legal requests and court orders</li>
                      <li>Protect our legal rights</li>
                      <li>Enforce our policies and agreements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* How We Share Your Information */}
            <ScrollReveal direction="up">
              <div className="bg-white p-8 rounded-2xl shadow-medium mb-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-premium flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-neutral-900 mb-6">How We Share Your Information</h2>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-4">
                      We may share your information in the following circumstances:
                    </p>

                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">1. With Other Users</h3>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-4">
                      Your profile information (name, photo, bio, home city, destination university, field of study) is visible to other verified users to facilitate connections. You control what information appears on your profile.
                    </p>

                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">2. With Service Providers</h3>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-4">
                      We share information with trusted third-party service providers who help us operate our Services, including:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-neutral-700">
                      <li>Cloud hosting providers (AWS, Google Cloud)</li>
                      <li>Email service providers</li>
                      <li>Analytics providers (Google Analytics)</li>
                      <li>Payment processors</li>
                      <li>Customer support tools</li>
                      <li>Security and fraud prevention services</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">3. For Legal Reasons</h3>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-4">
                      We may disclose your information if required to do so by law or if we believe such action is necessary to:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-neutral-700">
                      <li>Comply with legal obligations or court orders</li>
                      <li>Protect and defend our rights or property</li>
                      <li>Prevent or investigate fraud or security issues</li>
                      <li>Protect the safety of our users or the public</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">4. Business Transfers</h3>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                      If UnifyO is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you of any such change and the choices you may have.
                    </p>

                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">5. With Your Consent</h3>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                      We may share your information for any other purpose with your explicit consent.
                    </p>

                    <div className="bg-primary-50 border-l-4 border-primary-500 p-6 rounded-r-xl">
                      <p className="text-lg font-semibold text-primary-900">
                        We do not sell your personal information to third parties for their marketing purposes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Your Rights and Choices */}
            <ScrollReveal direction="up">
              <div className="bg-white p-8 rounded-2xl shadow-medium mb-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-premium flex items-center justify-center flex-shrink-0">
                    <Lock className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-neutral-900 mb-6">Your Rights and Choices</h2>
                    
                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">1. Access and Update</h3>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                      You can access and update your account information at any time through your profile settings.
                    </p>

                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">2. Delete Your Account</h3>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                      You can delete your account at any time. When you delete your account, we will remove your profile and personal information from our active databases. Some information may be retained in backup systems for a limited period or as required by law.
                    </p>

                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">3. Data Portability</h3>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                      You have the right to request a copy of your personal data in a structured, commonly used, and machine-readable format.
                    </p>

                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">4. Marketing Communications</h3>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                      You can opt out of marketing emails by clicking the "unsubscribe" link in any marketing email or by adjusting your notification settings.
                    </p>

                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">5. Cookies</h3>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                      You can control cookies through your browser settings. Note that disabling cookies may affect the functionality of our Services.
                    </p>

                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">6. Location Data</h3>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                      You can disable location services through your device settings at any time.
                    </p>

                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">Regional Rights</h3>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-4">
                      Depending on your location, you may have additional rights:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-neutral-700">
                      <li><strong>EU/EEA (GDPR):</strong> Right to access, rectification, erasure, restriction of processing, data portability, and objection</li>
                      <li><strong>California (CCPA):</strong> Right to know, delete, and opt-out of sale of personal information</li>
                      <li><strong>Other Regions:</strong> Rights as provided by applicable local laws</li>
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Data Security */}
            <ScrollReveal direction="up">
              <div className="bg-white p-8 rounded-2xl shadow-medium mb-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-premium flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-neutral-900 mb-6">Data Security</h2>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-4">
                      We implement appropriate technical and organizational security measures to protect your information, including:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-neutral-700">
                      <li>Encryption of data in transit and at rest</li>
                      <li>Regular security assessments and audits</li>
                      <li>Access controls and authentication</li>
                      <li>Secure data centers and infrastructure</li>
                      <li>Employee training on data protection</li>
                      <li>Incident response procedures</li>
                    </ul>
                    <p className="text-lg text-neutral-700 leading-relaxed">
                      However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Data Retention */}
            <ScrollReveal direction="up">
              <div className="bg-white p-8 rounded-2xl shadow-medium mb-8">
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">Data Retention</h2>
                <p className="text-lg text-neutral-700 leading-relaxed mb-4">
                  We retain your information for as long as necessary to:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-neutral-700">
                  <li>Provide our Services</li>
                  <li>Comply with legal obligations</li>
                  <li>Resolve disputes</li>
                  <li>Enforce our agreements</li>
                </ul>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  When you delete your account, we will delete or anonymize your information within 30 days, except where we are required to retain it for legal or operational purposes.
                </p>
              </div>
            </ScrollReveal>

            {/* Children's Privacy */}
            <ScrollReveal direction="up">
              <div className="bg-white p-8 rounded-2xl shadow-medium mb-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-premium flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-neutral-900 mb-6">Children's Privacy</h2>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-4">
                      Our Services are intended for users who are at least 16 years old (or the minimum age required in your country to use such services). We do not knowingly collect personal information from children under this age.
                    </p>
                    <p className="text-lg text-neutral-700 leading-relaxed">
                      If we become aware that we have collected personal information from a child under the applicable age without parental consent, we will take steps to delete that information as soon as possible.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* International Data Transfers */}
            <ScrollReveal direction="up">
              <div className="bg-white p-8 rounded-2xl shadow-medium mb-8">
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">International Data Transfers</h2>
                <p className="text-lg text-neutral-700 leading-relaxed mb-4">
                  UnifyO operates globally, and your information may be transferred to, stored, and processed in countries other than your own. These countries may have different data protection laws.
                </p>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  When we transfer your information internationally, we ensure appropriate safeguards are in place, such as standard contractual clauses approved by the European Commission or other legally recognized transfer mechanisms.
                </p>
              </div>
            </ScrollReveal>

            {/* Third-Party Links */}
            <ScrollReveal direction="up">
              <div className="bg-white p-8 rounded-2xl shadow-medium mb-8">
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">Third-Party Links and Services</h2>
                <p className="text-lg text-neutral-700 leading-relaxed mb-4">
                  Our Services may contain links to third-party websites, applications, or services. We are not responsible for the privacy practices of these third parties.
                </p>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  We encourage you to read the privacy policies of any third-party services you access through our platform.
                </p>
              </div>
            </ScrollReveal>

            {/* Changes to This Policy */}
            <ScrollReveal direction="up">
              <div className="bg-white p-8 rounded-2xl shadow-medium mb-8">
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">Changes to This Privacy Policy</h2>
                <p className="text-lg text-neutral-700 leading-relaxed mb-4">
                  We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors.
                </p>
                <p className="text-lg text-neutral-700 leading-relaxed mb-4">
                  When we make material changes, we will notify you by:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-neutral-700">
                  <li>Posting the updated policy on our website</li>
                  <li>Updating the "Last Updated" date</li>
                  <li>Sending you an email notification (for significant changes)</li>
                  <li>Displaying a prominent notice within our Services</li>
                </ul>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  Your continued use of our Services after the effective date of the updated Privacy Policy constitutes your acceptance of the changes.
                </p>
              </div>
            </ScrollReveal>

            {/* Contact Us */}
            <ScrollReveal direction="up">
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-8 rounded-2xl border-2 border-primary-200 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-md">
                    <Mail className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-neutral-900 mb-6">Contact Us</h2>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                      If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                    </p>
                    <div className="space-y-3 text-lg text-neutral-700">
                      <p><strong>Email:</strong> <a href="mailto:privacy@unifyo.com" className="text-primary-600 hover:text-primary-700 underline">privacy@unifyo.com</a></p>
                      <p><strong>Mail:</strong> UnifyO Privacy Team<br />
                      [Company Address]<br />
                      [City, State, ZIP]<br />
                      [Country]</p>
                      <p><strong>Phone:</strong> +91 6261786931</p>
                    </div>
                    <p className="text-lg text-neutral-700 leading-relaxed mt-6">
                      We will respond to your inquiry within 30 days.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Effective Date */}
            <ScrollReveal direction="up">
              <div className="bg-neutral-900 text-white p-8 rounded-2xl text-center">
                <p className="text-lg mb-2">This Privacy Policy is effective as of</p>
                <p className="text-2xl font-bold">January 1, 2026</p>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
