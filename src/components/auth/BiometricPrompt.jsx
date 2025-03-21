import { motion } from 'framer-motion';
import { RiFingerprint2Line } from 'react-icons/ri';

const BiometricPrompt = ({ onVerify }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <div className="text-center">
          <RiFingerprint2Line className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Biometric Verification</h2>
          <p className="text-gray-600 mb-6">Please verify your identity to continue</p>
          
          <button
            onClick={onVerify}
            className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Verify Identity
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default BiometricPrompt;