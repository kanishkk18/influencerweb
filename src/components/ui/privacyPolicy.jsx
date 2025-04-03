"use client";

import React from "react";
import { useTheme } from "next-themes";

const PrivacyPolicy = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen py-16 px-6 lg:px-24 ${isDark ? "bg-gray-900 text-gray-300" : "bg-gray-50 text-gray-800"}`}>
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold text-center mb-8">Privacy Policy</h1>

        <p className="text-lg leading-relaxed">
          At <span className="font-semibold">InfluWebHub.com</span>, we deeply value your privacy and are committed to safeguarding your personal information. 
          This Privacy Policy explains how we collect, use, and protect your data while ensuring transparency and compliance with applicable laws.
        </p>

        <Section title="📌 Information We Collect">
          <p>We may collect the following types of data when you interact with our platform:</p>
          <ul className="list-disc pl-6 space-y-3 mt-4">
            <li><strong>Personal Information:</strong> Name, email, contact details, payment info, and social media profiles.</li>
            <li><strong>User-Generated Content:</strong> Messages, media, and shared information.</li>
            <li><strong>Technical Data:</strong> IP address, browser type, and device details (via cookies and tracking).</li>
          </ul>
        </Section>

        <Section title="🔍 How We Use Your Information">
          <p>We process and use your data to:</p>
          <ul className="list-disc pl-6 space-y-3 mt-4">
            <li>Facilitate influencer-brand collaborations.</li>
            <li>Process payments securely and prevent fraud.</li>
            <li>Enhance user experience with personalized recommendations.</li>
            <li>Maintain platform security and compliance.</li>
            <li>Send platform updates, offers, and notifications (with your consent).</li>
          </ul>
          <p className="mt-4"><strong>We do not sell or rent personal data.</strong> Any data shared is solely for service improvement or legal compliance.</p>
        </Section>

        <Section title="🔐 How We Protect Your Data">
          <p>We implement strict security measures, including:</p>
          <ul className="list-disc pl-6 space-y-3 mt-4">
            <li>Encryption protocols for secure data storage.</li>
            <li>Firewalls and monitoring systems to prevent unauthorized access.</li>
            <li>Regular security audits to maintain compliance.</li>
          </ul>
          <p className="mt-4">Despite our best efforts, no digital platform can guarantee absolute security. We encourage caution when sharing sensitive data online.</p>
        </Section>

        <Section title="🤝 Data Sharing & Third Parties">
          <p>We only share data when necessary:</p>
          <ul className="list-disc pl-6 space-y-3 mt-4">
            <li><strong>Payment Processing:</strong> Secure transactions via trusted providers.</li>
            <li><strong>Legal Compliance:</strong> Disclosure if required by law.</li>
            <li><strong>Service Providers:</strong> Third-party vendors for analytics, hosting, and customer support.</li>
          </ul>
          <p className="mt-4">All third parties adhere to strict confidentiality agreements.</p>
        </Section>

        <Section title="🍪 Cookies & Tracking">
          <p>We use cookies and tracking technologies to:</p>
          <ul className="list-disc pl-6 space-y-3 mt-4">
            <li>Analyze website performance and user behavior.</li>
            <li>Personalize content and improve user experience.</li>
            <li>Store user preferences for a smoother experience.</li>
          </ul>
          <p className="mt-4">You can adjust your cookie preferences in browser settings, but disabling them may affect functionality.</p>
        </Section>

        <Section title="🔄 Your Rights & Choices">
          <p>You have full control over your personal data:</p>
          <ul className="list-disc pl-6 space-y-3 mt-4">
            <li><strong>Access & Correction:</strong> View and update your personal details.</li>
            <li><strong>Data Deletion:</strong> Request removal of your data.</li>
            <li><strong>Marketing Preferences:</strong> Opt out of promotional emails anytime.</li>
          </ul>
          <p className="mt-4">To exercise these rights, contact us at <span className="text-pink-500"><a href="mailto:Support@Influwebhub.com" className="hover:underline">Support@Influwebhub.com</a></span>.</p>
        </Section>

        <Section title="📧 Contact Us">
          <p>If you have any privacy concerns, reach out to:</p>
          <p className="text-lg font-semibold mt-2 text-pink-500"><a href="mailto:Support@Influwebhub.com" className="hover:underline">Support@Influwebhub.com</a></p>
        </Section>

        <p className="mt-10 text-center text-sm">
          By continuing to use <span className="font-semibold">InfluWebHub.com</span>, you agree to this Privacy Policy.
        </p>
      </div>
    </div>
  );
};

// ✅ Improved Section Component with Padding & Spacing
const Section = ({ title, children }) => (
  <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

export default PrivacyPolicy;
