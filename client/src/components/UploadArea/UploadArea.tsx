import { useRef, useState, DragEvent, ChangeEvent } from 'react';
import './UploadArea.css';

type Props = {
  onFileSelect: (file: File) => void;
};

export default function UploadArea({ onFileSelect }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (file.type === 'application/pdf') {
      onFileSelect(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  };

  return (
    <div
      className={`upload-area${isDragging ? ' upload-area--dragging' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <label className="upload-area__label" htmlFor="pdf-upload">
        <svg
          className="upload-area__icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
          />
        </svg>
        <p className="upload-area__text">
          <span>Click to upload</span> or drag and drop
        </p>
        <p className="upload-area__hint">PDF files only</p>
      </label>
      <input
        id="pdf-upload"
        ref={inputRef}
        className="upload-area__input"
        type="file"
        accept="application/pdf"
        onChange={handleChange}
      />
    </div>
  );
}
