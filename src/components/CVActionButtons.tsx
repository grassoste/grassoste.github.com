import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Mail } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';

const CVActionButtons: React.FC = () => {
  const handleDownload = () => {
    try {
      const link = document.createElement('a');
      link.href = '/cv.pdf';
      link.download = 'Stefano_Grasso_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showSuccess('CV downloaded successfully!');
    } catch (error) {
      showError('Failed to download CV. Please try again.');
    }
  };

  const handleEmail = () => {
    try {
      window.location.href = 'mailto:stefano@2000e.it?subject=Inquiry from your portfolio&body=Dear Stefano,%0D%0A%0D%0AI am writing to you regarding your portfolio.%0D%0A%0D%0ABest regards,';
      showSuccess('Opening email client to contact Stefano...');
    } catch (error) {
      showError('Failed to open email client. Please try again.');
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      <Button 
        onClick={handleDownload}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full"
      >
        <Download className="mr-2 h-5 w-5" />
        Download CV
      </Button>
      <Button 
        onClick={handleEmail}
        variant="outline"
        className="border-blue-500 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950 px-6 py-3 rounded-full"
      >
        <Mail className="mr-2 h-5 w-5" />
        Email Me
      </Button>
    </div>
  );
};

export default CVActionButtons;