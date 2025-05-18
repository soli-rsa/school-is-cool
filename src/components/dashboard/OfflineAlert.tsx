
import React from "react";

interface OfflineAlertProps {
  visible: boolean;
}

const OfflineAlert: React.FC<OfflineAlertProps> = ({ visible }) => {
  if (!visible) return null;
  
  return (
    <div className="bg-muted border border-primary/30 rounded-lg p-4 mb-6 flex items-center">
      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
        <span className="text-lg">📶</span>
      </div>
      <div>
        <h3 className="font-medium">You're currently offline</h3>
        <p className="text-sm text-gray-700">You can still access your saved content and continue learning!</p>
      </div>
    </div>
  );
};

export default OfflineAlert;
