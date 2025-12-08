import { UtensilsCrossed, Home, RefreshCw, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RestaurantNotFoundProps {
  restaurantId?: string;
  onRetry?: () => void;
}

const RestaurantNotFound: React.FC<RestaurantNotFoundProps> = ({
  restaurantId,
  onRetry,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50/30 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {/* Main Icon */}
        <div className="relative mx-auto mb-8">
          <div className="h-40 w-40 mx-auto rounded-full bg-gradient-to-br from-[#FF5B35]/5 via-white to-[#FF5B35]/10 flex items-center justify-center border-2 border-[#FF5B35]/20 shadow-lg">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[#FF5B35]/10 to-[#FF5B35]/20 flex items-center justify-center">
              <UtensilsCrossed className="h-12 w-12 text-[#FF5B35]" />
            </div>
          </div>
          
          {/* Animated decorative dots */}
          <div className="absolute -top-2 -right-2 h-10 w-10 rounded-full bg-[#FF5B35]/10 animate-pulse"></div>
          <div className="absolute -bottom-2 -left-2 h-8 w-8 rounded-full bg-[#FF5B35]/10 animate-pulse delay-500"></div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Restaurant Not Found
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-lg mb-4">
          {restaurantId ? (
            <>
              The restaurant with ID{" "}
              <span className="font-mono font-semibold text-[#FF5B35] bg-[#FFF5F2] px-2 py-1 rounded">
                {restaurantId}
              </span>{" "}
              doesn't exist or is no longer available.
            </>
          ) : (
            "The restaurant you're trying to access doesn't exist or has been removed."
          )}
        </p>

        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
          This could be because the restaurant has closed, the link is outdated, or there was an error in the URL.
        </p>

        {/* Error Details Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-8 text-left">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-8 w-8 rounded-full bg-[#FF5B35]/10 flex items-center justify-center">
              <MapPin className="h-4 w-4 text-[#FF5B35]" />
            </div>
            <h3 className="font-semibold text-gray-700">Possible Reasons</h3>
          </div>
          
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-[#FF5B35] mt-2 flex-shrink-0"></div>
              <span className="text-gray-600">The restaurant has been deleted or removed</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-[#FF5B35] mt-2 flex-shrink-0"></div>
              <span className="text-gray-600">Incorrect or outdated restaurant ID</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-[#FF5B35] mt-2 flex-shrink-0"></div>
              <span className="text-gray-600">Access permissions have changed</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900"
          >
            <Home className="h-4 w-4 mr-2" />
            Go to Homepage
          </Button>
          
          {onRetry && (
            <Button
              onClick={onRetry}
              className="bg-gradient-to-r from-[#FF5B35] to-[#FF5B35]/90 hover:from-[#FF5B35]/90 hover:to-[#FF5B35] text-white shadow-sm hover:shadow"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          )}
        </div>

        {/* Support Section */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Phone className="h-4 w-4 text-[#FF5B35]" />
            <span className="text-sm font-medium text-gray-700">Need Help?</span>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Contact our support team if you believe this is an error
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:support@restaurant-system.com"
              className="text-sm text-[#FF5B35] hover:text-[#FF5B35]/80 hover:underline"
            >
              support@restaurant-system.com
            </a>
            <span className="text-gray-300">•</span>
            <a
              href="tel:+18005551234"
              className="text-sm text-[#FF5B35] hover:text-[#FF5B35]/80 hover:underline"
            >
              +1 (800) 555-1234
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantNotFound;