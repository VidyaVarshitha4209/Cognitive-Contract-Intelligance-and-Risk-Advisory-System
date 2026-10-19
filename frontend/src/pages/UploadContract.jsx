import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import axios from 'axios';

export default function UploadContract({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
      setUploadResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/contracts/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setUploadResult(response.data);
      setUploading(false);
      
      // Auto move to dashboard/report after 2 seconds
      setTimeout(() => {
        onUploadSuccess();
      }, 2000);
    } catch (err) {
      console.error(err);
      setError('Failed to process contract PDF. Make sure backend is running.');
      setUploading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h3 className="text-xl font-bold text-brand-heading">Upload Contract Agreement</h3>
        <p className="text-xs text-gray-400">Upload PDF or DOCX file to extract clauses, evaluate risks, and perform policy checks.</p>
      </div>

      <div className="border-2 border-dashed border-brand-border rounded-xl p-10 text-center hover:border-brand-orange transition-all bg-brand-card/50">
        <input 
          type="file" 
          accept=".pdf,.docx,.txt" 
          onChange={handleFileChange}
          className="hidden" 
          id="contract-upload" 
        />
        <label htmlFor="contract-upload" className="cursor-pointer space-y-3 block">
          <div className="w-12 h-12 bg-orange-500/10 text-brand-orange border border-orange-500/20 rounded-full flex items-center justify-center mx-auto">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-brand-heading">
              {file ? file.name : "Click to upload or drag & drop"}
            </p>
            <p className="text-xs text-gray-400">PDF, DOCX up to 25MB</p>
          </div>
        </label>
      </div>

      {file && (
        <div className="flex flex-col gap-3 bg-brand-card p-4 rounded-xl border border-brand-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-brand-orange" />
              <div>
                <p className="text-xs font-semibold text-brand-heading">{file.name}</p>
                <p className="text-[10px] text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="bg-brand-orange hover:bg-brand-orangeHover text-white px-5 py-2 rounded-lg text-xs font-semibold shadow-md transition-all disabled:opacity-50"
            >
              {uploading ? "Parsing & Analyzing PDF..." : "Start Analysis"}
            </button>
          </div>

          {uploadResult && (
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-2 text-green-400 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Parsed {uploadResult.extracted_character_count} characters from PDF! Redirecting to report...</span>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 text-xs font-bold">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}