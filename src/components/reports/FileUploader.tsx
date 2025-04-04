
import { useState, useRef } from "react";
import { Upload, X, Check, FileText, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

interface FileUploaderProps {
  onFilesUploaded: (files: File[]) => void;
}

export const FileUploader = ({ onFilesUploaded }: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    
    // Filter for CSV, XLS, XLSX, PDF, etc. files that might be water test results
    const validFiles = droppedFiles.filter(file => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      return ['csv', 'xls', 'xlsx', 'pdf', 'txt', 'json'].includes(extension || '');
    });
    
    if (validFiles.length === 0) {
      toast({
        title: "Invalid file format",
        description: "Please upload CSV, Excel, PDF, or text files containing water test results",
        variant: "destructive",
      });
      return;
    }
    
    if (validFiles.length !== droppedFiles.length) {
      toast({
        title: "Some files were skipped",
        description: "Only valid water test result formats were accepted",
        variant: "default",
      });
    }
    
    handleFiles(validFiles);
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
    }
  };
  
  const handleFiles = (newFiles: File[]) => {
    setFiles([...files, ...newFiles]);
    toast({
      title: `${newFiles.length} file${newFiles.length > 1 ? 's' : ''} added`,
      description: "Ready for processing",
    });
  };
  
  const removeFile = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };
  
  const uploadFiles = () => {
    if (files.length === 0) {
      toast({
        title: "No files to upload",
        description: "Please select at least one file",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate file upload with progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // After "upload" complete, pass files to parent component
          onFilesUploaded(files);
          
          toast({
            title: "Upload complete",
            description: `${files.length} file${files.length > 1 ? 's' : ''} processed successfully`,
            variant: "default",
          });
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 300);
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging 
            ? 'border-water-dark bg-water-light/30' 
            : 'border-gray-200 bg-gray-50 hover:border-gray-300'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
          multiple
          accept=".csv,.xls,.xlsx,.pdf,.txt,.json"
        />
        
        <Upload className={`h-10 w-10 mx-auto mb-4 ${isDragging ? 'text-water-dark' : 'text-gray-400'}`} />
        <h3 className="text-lg font-medium mb-1">Upload Lab Results</h3>
        <p className="text-sm text-gray-500">
          Drag and drop your water test results or click to browse
        </p>
        <Button className="mt-4" onClick={triggerFileInput}>
          Select Files
        </Button>
      </div>
      
      {files.length > 0 && (
        <div className="p-4 rounded-md bg-white border border-gray-200">
          <h4 className="font-medium mb-2 text-gray-900">
            Selected Files ({files.length})
          </h4>
          <div className="space-y-2 max-h-40 overflow-y-auto mb-4">
            {files.map((file, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-2 rounded bg-gray-50"
              >
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="text-sm truncate max-w-[200px] text-gray-900">
                    {file.name}
                  </span>
                  <span className="text-xs ml-2 text-gray-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full"
                  onClick={() => removeFile(index)}
                  disabled={isUploading}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          
          {isUploading ? (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{Math.min(100, Math.floor(uploadProgress))}%</span>
              </div>
              <Progress value={Math.min(100, uploadProgress)} className="h-2" />
            </div>
          ) : (
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setFiles([])}
                className="text-xs"
              >
                Clear All
              </Button>
              <Button onClick={uploadFiles}>
                Process Files
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
