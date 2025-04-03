"use client";

import React from "react";
import { useTheme } from "next-themes";

const TermsAndConditions = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen py-12 px-6 lg:px-24 ${isDark ? "bg-gray-900 text-gray-300" : "bg-gray-50 text-gray-800"}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Terms and Conditions</h1>
        <p className="mb-6">
          Welcome to <span className="font-semibold">InfluWebHub.com</span>! These Terms and Conditions govern your use of our platform, outlining your rights, responsibilities, and the rules for engaging with our services.
        </p>
        <p>By accessing or using our platform, you agree to comply with these terms and enter into a legally binding agreement with InfluWebHub.com.</p>

        <Section title="User Obligations and Account Security">
          <p>By creating an account, you agree to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Provide accurate, up-to-date information and maintain account security.</li>
            <li>Be responsible for all activities under your account.</li>
            <li>Notify us immediately of unauthorized access or security breaches.</li>
            <li>Use the platform only for its intended purpose—facilitating collaborations between influencers and brands.</li>
          </ul>
          <p className="mt-4">Misuse of the platform, including fraudulent activities or unauthorized access, may result in account suspension or termination.</p>
        </Section>

        <Section title="Prohibited Conduct">
          <p>Users are prohibited from engaging in activities such as:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Posting or distributing false, misleading, or harmful content.</li>
            <li>Engaging in harassment, discrimination, or abusive behavior.</li>
            <li>Attempting to manipulate ratings, reviews, or engagement metrics fraudulently.</li>
            <li>Using automated tools, bots, or software to disrupt platform functionality.</li>
            <li>Violating intellectual property rights by using copyrighted material without authorization.</li>
            <li>Engaging in spamming, phishing, or fraudulent activity.</li>
          </ul>
          <p className="mt-4">Violation of these rules may lead to suspension, permanent ban, or legal action.</p>
        </Section>

        <Section title="Ownership and Use of Content">
          <p><strong>User-Generated Content:</strong> You retain ownership of any content you upload, but grant us a non-exclusive, worldwide license to use and distribute it to promote and operate our services.</p>
          <p className="mt-2"><strong>Platform Content:</strong> All logos, trademarks, and branding on InfluWebHub.com are owned or licensed by us. Unauthorized use is strictly prohibited.</p>
          <p className="mt-2"><strong>Content Removal:</strong> We reserve the right to remove content that violates these Terms and Conditions.</p>
        </Section>

        <Section title="Payment Terms and Service Fees">
          <p>Certain services on InfluWebHub.com may require payment. Users agree to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Pay all applicable fees as per the pricing structure.</li>
            <li>Use secure third-party payment providers (we do not store sensitive payment details).</li>
            <li>Understand that non-payment may result in service suspension.</li>
          </ul>
          <p className="mt-4">We reserve the right to adjust pricing and modify payment terms with prior notice.</p>
        </Section>

        <Section title="Liability and Disclaimers">
          <p>While we strive for accuracy and reliability, we do not guarantee:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Uninterrupted access or error-free operation.</li>
            <li>Complete security of our platform.</li>
            <li>Liability for damages, lost revenue, or user disputes.</li>
          </ul>
          <p className="mt-4">Users assume full responsibility for their interactions and transactions conducted through our platform.</p>
        </Section>

        <Section title="Account Termination and Suspension">
          <p>We reserve the right to suspend or terminate accounts that:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Violate these Terms and Conditions.</li>
            <li>Engage in fraudulent activities.</li>
            <li>Disrupt platform operations.</li>
          </ul>
          <p className="mt-4">Users may request account deletion, but certain data may be retained for legal or security purposes.</p>
        </Section>

        <Section title="Governing Law and Dispute Resolution">
          <p>These Terms and Conditions shall be governed by the laws of <span className="font-semibold">Jurisdiction</span>.</p>
          <p className="mt-2">Any disputes shall be resolved through arbitration or litigation in the appropriate court.</p>
          <p className="mt-2">Users agree to resolve disputes amicably whenever possible before seeking legal action.</p>
        </Section>

        <Section title="Amendments and Updates">
          <p>We may update these Terms and Conditions periodically to reflect changes in our services, policies, or legal requirements.</p>
          <p className="mt-2">Users will be notified of significant changes via email or platform notifications.</p>
          <p className="mt-2">Continued use of our services after changes take effect constitutes acceptance of the revised terms.</p>
        </Section>

        <Section title="Contact Information">
          <p>For any questions regarding these Terms and Conditions, contact us at:</p>
          <p className="mt-2 text-pink-500"><a href="mailto:Support@Influwebhub.com" className="hover:underline">Support@Influwebhub.com</a></p>
        </Section>

        <p className="mt-6 text-center text-sm">
          By using <span className="font-semibold">InfluWebHub.com</span>, you acknowledge and agree to these Terms and Conditions.
        </p>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold mb-3">{title}</h2>
    {children}
  </div>
);

export default TermsAndConditions;
