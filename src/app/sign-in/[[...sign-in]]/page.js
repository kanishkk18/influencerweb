import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-600/20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-blue-600/20 blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 right-1/4 w-72 h-72 rounded-full bg-indigo-600/20 blur-3xl animate-pulse delay-500"></div>
      </div>
      
      {/* Stars in background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-px h-px bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          ></div>
        ))}
      </div>
      
      {/* Floating logo/icon above signin */}
      <div className="relative mb-8 animate-bounce">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/50">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      </div>

      {/* Sign In Container */}
      <div className="relative z-10 w-full max-w-md p-6 md:p-8">
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          {/* Header text */}
          <div className="mb-6 p-6 pb-0 text-center">
            <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-200 inline-block text-transparent bg-clip-text">
              Welcome Back
            </h1>
            <p className="text-center text-gray-300 mt-2">
              Sign in to continue to your account
            </p>
          </div>
          
          {/* Clerk SignIn component with custom appearance */}
          <SignIn appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-transparent shadow-none",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton: "bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all duration-200",
              socialButtonsBlockButtonText: "text-white font-medium",
              socialButtonsIconButton: "text-white hover:bg-white/20",
              dividerLine: "bg-white/20",
              dividerText: "text-gray-400",
              formFieldLabel: "text-gray-300",
              formFieldInput: "bg-white/10 border border-white/10 text-white placeholder:text-gray-400 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-500/20",
              formButtonPrimary: "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 focus:ring focus:ring-indigo-500/50",
              footerActionText: "text-gray-400",
              footerActionLink: "text-indigo-400 hover:text-indigo-300",
              alertText: "text-white",
              identityPreviewTextContainer: "text-white",
              formFieldAction: "text-indigo-400 hover:text-indigo-300",
            }
          }} />
        </div>
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-5 text-gray-400 text-sm">
        Protected by Cosmic Auth Gateway
      </div>
    </div>
  );
};

export default SignInPage;