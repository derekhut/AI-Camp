import Markdown from "@/components/markdown";
import { MdOutlineHome } from "react-icons/md";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Privacy Policy",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_URL}/privacy-policy`,
    },
  };
}

export default function () {
  const content = `# Privacy Policy for ShipAny

## Introduction

Welcome to ShipAny, the **NextJS Boilerplate** designed to help you build AI SaaS startups quickly and efficiently. At ShipAny, your privacy is of utmost importance to us, and this privacy policy outlines how we collect, use, and protect your personal information when you use our services.

## Information Collection and Use

We collect the following types of data to provide you with a better experience while using ShipAny:

1. **Account Information**
   - **What We Collect**: This includes your name, email address, and any other information you provide when creating an account.
   - **Purpose**: To manage your account and provide customer support.

2. **Usage Details**
   - **What We Collect**: Information about how you use ShipAny, including your interactions, features accessed, and usage frequency.
   - **Purpose**: To analyze user engagement and improve our services.

3. **Device Information**
   - **What We Collect**: Data regarding the devices you use to access ShipAny, such as device type, operating system, and browser type.
   - **Purpose**: To optimize our services for different devices and ensure compatibility.

4. **Cookies**
   - **What We Collect**: Small data files placed on your device that help us track user preferences and improve user experience.
   - **Purpose**: To enhance the functionality of our services and personalize your experience.

5. **Payment and Billing Information**
   - **What We Collect**: Information regarding your payment methods, such as credit card number, billing address, and any details required for transaction processing.
   - **Purpose**: To facilitate billing and payment processing for our services.

## Data Storage and Security

We take the security of your personal information seriously. The data we collect is stored securely on our servers, and we implement a variety of security measures including encryption and access controls to protect against unauthorized access, alteration, disclosure, or destruction of your personal information. However, please be aware that no method of transmission over the Internet, or method of electronic storage, is 100% secure, and we cannot guarantee its absolute security.

## Information Sharing and Disclosure

We do not sell, trade, or otherwise transfer your personal information to outside parties, except in the following circumstances:

- To comply with legal obligations or respond to lawful requests from public authorities.
- To protect our rights, property, or safety, or that of our users or others.
- To provide services through trusted third-party partners who assist us in operating our website or conducting our business, subject to confidentiality agreements.

## Changes to This Policy

We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "effective date" at the top of this policy. You are advised to review this privacy policy periodically for any changes. Changes to this privacy policy are effective when they are posted on this page.

## Contact Us

If you have any questions or concerns about this privacy policy or our data practices, please contact us at:

**Copyright Owner**: [shipany.ai](http://shipany.ai)
**Email**: [support@shipany.ai](mailto:support@shipany.ai)

By using ShipAny, you consent to our privacy policy and agree to its terms. Thank you for trusting us with your information!
`;
  return (
    <div>
      <a className="text-base-content cursor-pointer" href="/">
        <MdOutlineHome className="text-2xl mx-8 my-8" />
        {/* <img className="w-10 h-10 mx-4 my-4" src="/logo.png" /> */}
      </a>
      <div className="max-w-3xl mx-auto leading-loose pt-4 pb-8 px-8">
        <Markdown content={content} />
      </div>
    </div>
  );
}
