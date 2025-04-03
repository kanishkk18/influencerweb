// import  Link  from "next/link"
// import { useEffect, useState } from "react"

// export default function Component() {
//   const [isVisible, setIsVisible] = useState(false)

//   useEffect(() => {
//     setIsVisible(true)
//   }, [])

//   return (
//     <footer className="bg-black border-t border-neutral-900 text-white py-12 px-4 md:px-6 relative overflow-hidden">
//       <div className="container mx-auto max-w-7xl relative z-10">
//         <div className="flex w-full justify-between items-start">
//           {/* Logo and Copyright Section */}
//           <div className="flex flex-col">
//             <Link href="/" className="inline-block">
//               <div className="flex items-center gap-2">
//                 <div className="h-auto md:w-40 rounded-sm" >
//                   <img className="rounded-sm" src="https://res.cloudinary.com/dna3hwzre/image/upload/v1741412694/karv81oea0dngca9xnvn.png" alt="" />
//                 </div>
//                 {/* <span className="text-lg font-semibold">POT
//                 </span> */}
//               </div>
//             </Link>
//             <p className="mt-4 text-sm text-gray-400">
//               © copyright Influwebhub 2025. All rights reserved.
//             </p>
//           </div>
// <div className="flex w-[50%] justify-between items-start ">
//           {/* Pages Links */}
//           <div>
//             <h3 className="font-semibold mb-3">Pages</h3>
//             <div className="flex flex-col gap-2">
//               <Link href="/" className="text-gray-400 hover:text-white transition-colors">
//                 Home
//               </Link>
//               <Link href="/features" className="text-gray-400 hover:text-white transition-colors">
//                 Features
//               </Link>
//               <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">
//                 Pricing
//               </Link>
//               <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
//                 Contact
//               </Link>
//               <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
//                 Blog
//               </Link>
//             </div>
//           </div>

//           {/* Social Links */}
//           <div>
//             <h3 className="font-semibold mb-3">Socials</h3>
//             <div className="flex flex-col gap-2">
//               <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                 Facebook
//               </a>
//               <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                 Instagram
//               </a>
//               <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                 Twitter
//               </a>
//               <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                 LinkedIn
//               </a>
//             </div>
//           </div>

//           {/* Legal Links */}
//           <div>
//             <h3 className="font-semibold mb-3">Legal</h3>
//             <div className="flex flex-col gap-2">
//               <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
//                 Privacy Policy
//               </Link>
//               <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
//                 Terms of Service
//               </Link>
//               <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
//                 Cookie Policy
//               </Link>
//             </div>
//           </div>

//           {/* Register Links */}
//           <div>
//             <h3 className="font-semibold mb-3">Register</h3>
//             <div className="flex flex-col gap-2">
//               <Link href="/signup" className="text-gray-400 hover:text-white transition-colors">
//                 Sign Up
//               </Link>
//               <Link href="/login" className="text-gray-400 hover:text-white transition-colors">
//                 Login
//               </Link>
//               <Link href="/demo" className="text-gray-400 hover:text-white transition-colors">
//                 Book a demo
//               </Link>
//             </div>
//           </div>
//         </div>
//         </div>
//       </div>

//       {/* Faded STARTUP text with fade-in effect */}
//       <p class="text-center uppercase mt-20 text-5xl md:text-7xl lg:text-[8rem] xl:text-[7rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-950 to-neutral-800 inset-x-0"
//       >INFLUWEBHUB
//       </p>
//     </footer>
//   )
// }

import { useState } from 'react';
import {  ChevronDown, ArrowRight, Mail } from 'lucide-react';
import { BsTelephone } from 'react-icons/bs';
import { FaAddressBook } from 'react-icons/fa';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import PrivacyPolicy from './privacyPolicy';
import  Link  from "next/link";
import RefundPolicy from './refundPolicy';
import Terms from "./terms";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

function Footer() {
  const [openIndex, setOpenIndex] = useState(null);

  const items = [
    {
      title: 'What is InfluWebHub.com?',
      content:
        'InfluWebHub.com is an online platform that connects brands with influencers for seamless collaborations. Our marketplace enables businesses to find and work with influencers to create impactful marketing campaigns.',
    },
    {
      title: 'How does InfluWebHub.com work?',
      content:
        'Brands can browse influencer profiles, initiate collaborations, and manage campaigns through our platform. Influencers can showcase their skills, connect with brands, and monetize their reach.',
    },
    {
      title: 'Who can use InfluWebHub.com?',
      content:
        'Our platform is open to brands, influencers, marketers, and agencies looking to collaborate on promotional campaigns.',
    },
    {
      title: 'Is there a fee to use InfluWebHub.com?',
      content:
        'Creating an account is free. However, certain premium features and services may require a subscription or commission-based payment.',
    },
    {
      title: 'Do I need to sign a contract?',
      content:
        'While using our platform, you agree to our Terms and Conditions. Any additional agreements between brands and influencers depend on the specific campaign.',
    },
    {
      title: 'How can I sign up as an influencer?',
      content:
        'Simply click on the “Sign Up” button, complete your profile, and submit your details for verification. Once approved, you can start collaborating with brands.',
    },
    {
      title: 'How do I get paid as an influencer?',
      content:
        'Payments are securely processed through our platform. Funds are held in escrow and released once the brand approves your work.',
    },
    {
      title: 'Can I set my own pricing?',
      content:
        'Yes, influencers can set their own rates. However, brands may negotiate pricing based on their campaign requirements.',
    },
    {
      title: 'What kind of content can I create?',
      content:
        'Influencers can create various types of content, including sponsored posts, product reviews, unboxing videos, and brand endorsements.',
    },
    {
      title: 'How do I increase my chances of getting collaborations?',
      content:
        'Ensure your profile is complete, engaging, and updated. Highlight past collaborations, maintain high engagement rates, and be responsive to brand inquiries.',
    },
    {
      title: 'How do brands collaborate with influencers?',
      content:
        'Brands can search for influencers by niche, audience demographics, and engagement metrics. Once they find a suitable match, they can initiate a collaboration directly.',
    },
    {
      title: 'How does InfluWebHub.com ensure influencer authenticity?',
      content:
        'We use AI-driven analytics, engagement audits, and manual verification to ensure influencers have genuine reach and authentic audiences.',
    },
    {
      title: 'Can brands track campaign performance?',
      content:
        'Yes, brands receive performance reports, analytics, and engagement insights to track their campaign’s success.',
    },
    {
      title: 'What payment methods are available for brands?',
      content:
        'We support credit/debit cards, online payment gateways, and bank transfers for seamless transactions.',
    },
    {
      title: 'What happens if an influencer doesn’t deliver as promised?',
      content:
        'If an influencer fails to meet the agreed terms, brands can report the issue, and funds will be held until a resolution is reached.',
    },
    {
      title: 'Is my personal information safe?',
      content:
        'Yes, we use advanced encryption and security protocols to protect your data. For more details, review our Privacy Policy.',
    },
    {
      title: 'Can I delete my account?',
      content:
        'Yes, you can request account deletion through the settings page or by contacting our support team.',
    },
    {
      title: 'What should I do if I suspect fraud or a fake influencer?',
      content:
        'If you come across suspicious activity, report it to us immediately. We investigate all reports and take necessary action.',
    },
    {
      title: 'Can I request a refund?',
      content:
        'Refunds are available under eligible circumstances, such as incomplete or unsatisfactory services. Please review our Refund Policy for more details.',
    },
    {
      title: 'How long does it take to process payments?',
      content:
        'Payments are typically processed within 3-7 business days, depending on the payment method and financial institution.',
    },
    {
      title: 'What fees does InfluWebHub.com charge?',
      content:
        'Our platform may charge transaction fees, commission fees, or subscription fees based on the service package you choose.',
    },
    {
      title: 'How can I contact customer support?',
      content:
        'You can reach our support team via [Insert Support Email] or through the Help Center on our website.',
    },
    {
      title: 'Do you offer dispute resolution?',
      content:
        'Yes, we provide a mediation service to resolve disputes between brands and influencers professionally.',
    },
    {
      title: 'Can I get personalized assistance for campaign management?',
      content:
        'Yes, we offer premium services where our team can help match influencers with brands, manage collaborations, and optimize campaigns.',
    },
    {
      title: 'Does InfluWebHub.com have an affiliate or referral program?',
      content:
        'Yes! We offer referral incentives for users who bring in new brands or influencers. Stay tuned for upcoming details.',
    },
  ];

  

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="">
    <div className="min-h-auto bg-transparent p-6 lg:p-12">
    <div className="mx-auto max-w-7xl">
    <Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger> <div className="space-y-6 flex flex-col justify-center w-full">
            <h1 className="text-4xl font-bold  text-center tracking-tight lg:text-5xl">
              Frequently asked questions
            </h1>
            <p className="text-lg text-muted-foreground pb-6">
              Contact us via support if you have any more questions.
            </p>
           
          </div></AccordionTrigger>
    <AccordionContent className="h-full">
    <div className="grid gap-12 md:grid-cols-1">
       
       <div className="">
         {items.map((item, index) => (
           <div key={index} className="w-full my-3">
           <button
             onClick={() => toggleAccordion(index)}
            className="[box-shadow:0_-10px_40px_-15px_rgba(0,0,0,0.05)_inset] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] darK:[border:1px_solid_rgba(255,255,255,.1)]   rounded-xl py-4 px-6 flex justify-between items-center w-full"
             aria-expanded={openIndex === index}
             aria-controls={`content-${index}`}
           >
             <span className="text-black dark:text-white text-start font-medium">
               {item.title}
             </span>
             <ChevronDown
               className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                 openIndex === index ? 'transform rotate-180' : ''
               }`}
             />
           </button>
           <div
             id={`content-${index}`}
             role="region"
             aria-labelledby={`heading-${index}`}
             className={`overflow-hidden transition-all duration-200 ease-in-out ${
               openIndex === index ? 'max-h-40' : 'max-h-0'
             }`}
           >
             <div className="px-4 py-3 text-gray-600 dark:text-gray-300">
               {item.content}
             </div>
           </div>
         </div>
         ))}
       </div>
     </div>
    </AccordionContent>
  </AccordionItem>
</Accordion>
     
      </div>
    </div>
    <section className="container px-2 mx-auto  text-center">
        <div className="bg-gradient-to-r from-blue-900 via-red-500 to-purple-900 rounded-t-3xl md:p-12 py-16 -z-10">
          
      {/* Footer */}
      <footer className="container  mx-auto px-4 py-12 rounded-2xl  bg-black/35">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
  {/* Brand Section */}
  <div className=''>

  <div className="flex items-center text-center pb-2 gap-2">
   <Link href="/" className="inline-block">
               <img
                 src="https://res.cloudinary.com/dna3hwzre/image/upload/v1741412694/karv81oea0dngca9xnvn.png"
                 className="h-10 w-10 md:h-40 md:w-40 rounded-md object-cover  transition-transform duration-300 hover:scale-105"
                 alt="Logo"
                 loading="eager"
               />
             </Link>
   
    </div>
    <p className="text-gray-400 text-sm text-start">
      Explore the modern way of Influencer marketing
    </p>
  </div>

  <div>
            <h3 className="font-semibold mb-3">Pages</h3>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/features" className="text-gray-400 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
              <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                Blog
              </Link>
            </div>
          </div>

  <div>
            <h3 className="font-semibold mb-3">Legal</h3>
            <div className="flex flex-col gap-2">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>

  {/* Export Import Software */}
             <div>
             <h3 className="font-semibold mb-3">Socials</h3>
             <div className="flex flex-col gap-2">
               <a href="#" className="text-gray-400 hover:text-white transition-colors">
                 Facebook
               </a>
               <a href="#" className="text-gray-400 hover:text-white transition-colors">
                 Instagram
               </a>
               <a href="#" className="text-gray-400 hover:text-white transition-colors">
                 Twitter
               </a>
               <a href="#" className="text-gray-400 hover:text-white transition-colors">
                 LinkedIn
               </a>
             </div>
           </div>

  {/* Top Custom House Agents */}
  <div>
    <div>
             <h3 className="font-semibold mb-3">Register</h3>
             <div className="flex flex-col gap-2">
               <Link href="/signup" className="text-gray-400 hover:text-white transition-colors">
               Sign Up
               </Link>
               <Link href="/login" className="text-gray-400 hover:text-white transition-colors">
                 Login
               </Link>
               <Link href="/demo" className="text-gray-400 hover:text-white transition-colors">
                 Book a demo
               </Link>
             </div>
           </div>
  </div>
</div>

        <div className=" border-t border-gray-600 mt-8 text-start pt-8 md:flex md:flex-col justify-center items-center gap-2">
          <h1 className='font-bold text-2xl text-white'>News and updates</h1>
          <p className='text-white pb-1 font-semibold'>Sign up for the regular updates from influwebhub</p>
          <form action="" className='space-x-2 md:flex justify-center gap-2 items-center'>
          <input type="email" placeholder='Email ' className='rounded-xl border border-neutral-700 p-2 md:pe-16 bg-black/20'/>
          <button className="bg-white  text-black hover:bg-gray-100 px-2  py-2 rounded-xl text-md font-medium inline-flex items-center gap-2 transition-all hover:gap-3">
                     Sign Up <ArrowRight size={20} />
                   </button>
        </form>
        </div>
      </footer>

      <div className=" mx-auto mt-2 px-4 py-4 rounded-2xl space-y-2 bg-black/35 md:flex justify-between items-center text-center">
     <p className='flex justify-center items-center gap-2 text-gray-300 text-sm '><BsTelephone  className='text-white text-lg'/> Mobile-1234567890</p>
    <p className='flex justify-center items-center gap-2 text-gray-300 text-sm '><FaAddressBook className='text-white md:h-6 md:w-6 h-10 w-10'/> Influwebhub
      Shaheen Bagh, Delhi</p> 
     <p className='flex justify-center items-center gap-2 text-gray-300 text-sm '><Mail className='text-white text-sm'/> Email-influwebhub@hmail.com</p>
      </div>

<div className="md:flex justify-between items-center mt-2">
      <Dialog>
      <DialogTrigger asChild>
      <DialogTitle>Terms & Conditions</DialogTitle>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[80vw] max-h-[90vh] overflow-auto">
      <DialogTitle></DialogTitle>
        <Terms/>
      </DialogContent>
    </Dialog>

 <div className="font-semi-bold md:flex text-center gap-2 justify-center items-center py-4"> <p>Influwebhub All Rights Reserved &copy; 2025</p>
      <Dialog>
      <DialogTrigger asChild>
      <DialogTitle>Privacy Policy</DialogTitle>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[80vw] max-h-[90vh] overflow-auto">
      <DialogTitle></DialogTitle>
        <PrivacyPolicy/>
      </DialogContent>
    </Dialog>

    
    </div><Dialog>
      <DialogTrigger asChild>
      <DialogTitle>Refund Policy</DialogTitle>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[80vw] max-h-[90vh] overflow-auto">
      <DialogTitle></DialogTitle>
        <RefundPolicy/>
      </DialogContent>
    </Dialog>
      </div>
      </div>
       {/* <p class="text-center uppercase mt-20 text-5xl md:text-7xl lg:text-[8rem] xl:text-[7rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-950 to-neutral-800 inset-x-0"
     >INFLUWEBHUB
      </p> */}
      </section>
     
    </div>
  );
}

export default Footer;