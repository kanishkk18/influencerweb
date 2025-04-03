'use client';
import { SignUp } from '@clerk/nextjs';

export default function BrandSignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignUp 
        path="/sign-up/brand"
        routing="path"
        signInUrl="/sign-in"
        appearance={{
          elements: {
            formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
          }
        }}
        afterSignUpUrl="/redirect"
        metadata={{ role: 'brand' }}
      />
    </div>
  );
}