"use client";

import React from "react";
import { useTheme } from "next-themes";

const RefundPolicy = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen py-12 px-6 lg:px-24 ${isDark ? "bg-gray-900 text-gray-300" : "bg-gray-50 text-gray-800"}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Refund Policy</h1>
        <p className="mb-6">
          At <span className="font-semibold">InfluWebHub.com</span>, we recognize that circumstances may arise where a refund is necessary.
          Our Refund Policy ensures a clear, fair, and efficient process for handling refund requests, prioritizing transparency and customer satisfaction.
        </p>

        <Section title="Eligibility for Refunds">
          <ul className="list-disc pl-6 space-y-2">
            <li>Cancellation of a campaign or service before it has commenced.</li>
            <li>Failure to receive the agreed-upon services due to technical issues or platform-related errors.</li>
            <li>Dissatisfaction with the services provided, subject to evaluation per our terms and conditions.</li>
          </ul>
          <p className="mt-4">Each refund request is assessed on a case-by-case basis to ensure fairness and compliance with our policies.</p>
        </Section>

        <Section title="Submitting a Refund Request">
          <p>To request a refund, users must submit a formal refund request through our designated support channels:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Contact our support team via <a href="mailto:Support@Influwebhub.com" className="text-pink-500 hover:underline">Support@Influwebhub.com</a></li>
            <li>Submit a refund request through the Help Center on our website.</li>
          </ul>
          <p className="mt-4">Users must provide relevant details, including transaction ID, reason for the refund, and any supporting documentation to facilitate the review process.</p>
        </Section>

        <Section title="Assessment and Processing">
          <p>Once a refund request is submitted, our team will:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Review the request based on the platform’s terms and conditions.</li>
            <li>Investigate the circumstances surrounding the request, including discussions with involved parties.</li>
            <li>Provide a resolution within a reasonable timeframe, typically within 7–14 business days depending on the case complexity.</li>
          </ul>
          <p className="mt-4">Our goal is to process refund requests promptly and efficiently.</p>
        </Section>

        <Section title="Refund Methods">
          <p>Approved refunds will be processed using the original payment method used during the transaction.</p>
          <p className="mt-2">Processing times may vary based on the payment provider and financial institution. Users will receive a confirmation email once the refund has been successfully processed.</p>
        </Section>

        <Section title="Communication and Support">
          <p>Throughout the refund process, we ensure transparent communication by:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Providing status updates on refund requests.</li>
            <li>Offering customer support for inquiries or concerns related to refunds.</li>
            <li>Ensuring a smooth resolution of disputes regarding refunds.</li>
          </ul>
          <p className="mt-4">Our dedicated support team is available to assist users with refund-related issues.</p>
        </Section>

        <Section title="Important Considerations">
          <ul className="list-disc pl-6">
            <li>Refunds are not guaranteed and are subject to evaluation under our policies.</li>
            <li>Requests submitted beyond the specified timeframe may not be eligible.</li>
            <li>Users found to be abusing the refund system may face account suspension or further investigation.</li>
            <li>Certain services, once delivered, may be non-refundable, as outlined in the specific service agreement.</li>
          </ul>
        </Section>

        <Section title="Changes to the Refund Policy">
          <p>We reserve the right to modify this Refund Policy at any time to reflect changes in our services or legal requirements.</p>
          <p className="mt-2">Updates will be posted on our website, and users are encouraged to review the policy periodically.</p>
        </Section>

        <p className="mt-6 text-center">
          For further assistance, please contact our support team at <a href="mailto:Support@Influwebhub.com" className="text-pink-500 hover:underline">Support@Influwebhub.com</a>.
        </p>

        <p className="mt-4 text-center text-sm">
          By using <span className="font-semibold">InfluWebHub.com</span>, you agree to abide by this Refund Policy and our Terms and Conditions.
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

export default RefundPolicy;
