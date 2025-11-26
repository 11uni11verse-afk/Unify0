import { Mail, CheckCircle, Users, MessageSquare, Calendar, MapPin } from "lucide-react";

export const SignUpDecorations = () => (
  <>
    {/* Email icon floating */}
    <div className="absolute top-8 right-12 animate-float" style={{ animationDelay: '0.5s' }}>
      <div className="bg-white rounded-lg p-2 shadow-lg">
        <Mail className="w-5 h-5 text-primary-600" />
      </div>
    </div>

    {/* Checkmark */}
    <div className="absolute bottom-12 left-12 animate-float" style={{ animationDelay: '1s' }}>
      <div className="bg-green-50 rounded-full p-2 border-2 border-green-200">
        <CheckCircle className="w-6 h-6 text-green-600" />
      </div>
    </div>

    {/* .edu badge */}
    <div className="absolute top-16 left-8 animate-float" style={{ animationDelay: '0.3s' }}>
      <div className="bg-primary-50 px-3 py-1 rounded-full border border-primary-200 shadow-sm">
        <span className="text-xs font-bold text-primary-700">.edu</span>
      </div>
    </div>
  </>
);

export const MatchingDecorations = () => (
  <>
    {/* Profile cards connecting */}
    <div className="absolute top-6 left-6 animate-slide-in-left">
      <div className="bg-white rounded-lg p-2 shadow-lg border border-neutral-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-bold">
            PR
          </div>
          <div>
            <p className="text-xs font-semibold">Priya</p>
            <p className="text-[10px] text-neutral-500">🇮🇳 Mumbai</p>
          </div>
        </div>
      </div>
    </div>

    <div className="absolute top-6 right-6 animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
      <div className="bg-white rounded-lg p-2 shadow-lg border border-neutral-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary-400 to-secondary-600 flex items-center justify-center text-white text-xs font-bold">
            RK
          </div>
          <div>
            <p className="text-xs font-semibold">Rahul</p>
            <p className="text-[10px] text-neutral-500">🇨🇦 Toronto</p>
          </div>
        </div>
      </div>
    </div>

    {/* Connection line */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-0.5 bg-gradient-to-r from-primary-400 to-secondary-400 animate-pulse" />

    {/* Sparkles */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float" style={{ animationDelay: '0.6s' }}>
      <div className="text-2xl">✨</div>
    </div>
  </>
);

export const ConnectDecorations = () => (
  <>
    {/* Chat bubbles */}
    <div className="absolute top-8 left-8 animate-slide-in-left">
      <div className="bg-primary-500 text-white rounded-2xl rounded-tl-none px-3 py-2 shadow-lg max-w-[120px]">
        <p className="text-xs">Need a roommate?</p>
      </div>
    </div>

    <div className="absolute top-20 right-8 animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
      <div className="bg-white text-neutral-800 rounded-2xl rounded-tr-none px-3 py-2 shadow-lg border border-neutral-200 max-w-[120px]">
        <p className="text-xs">I'm looking too!</p>
      </div>
    </div>

    {/* Calendar icon */}
    <div className="absolute bottom-12 left-12 animate-float" style={{ animationDelay: '0.8s' }}>
      <div className="bg-accent-50 rounded-lg p-2 shadow-lg border border-accent-200">
        <Calendar className="w-5 h-5 text-accent-600" />
      </div>
    </div>

    {/* Location pin */}
    <div className="absolute bottom-8 right-12 animate-float" style={{ animationDelay: '1.2s' }}>
      <div className="bg-secondary-50 rounded-lg p-2 shadow-lg border border-secondary-200">
        <MapPin className="w-5 h-5 text-secondary-600" />
      </div>
    </div>

    {/* Message notification */}
    <div className="absolute top-1/2 right-4 animate-float" style={{ animationDelay: '0.5s' }}>
      <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg">
        3
      </div>
    </div>
  </>
);

