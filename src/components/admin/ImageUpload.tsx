import { useState, useRef } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  bucket?: string;
  folder?: string;
}

export function ImageUpload({ value, onChange, bucket = 'portfolio', folder = 'thumbnails' }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setIsUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from(bucket).upload(fileName, file, { upsert: true });
      if (error) throw error;
      const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(fileName);
      onChange(urlData.publicUrl);
    } catch (err: any) {
      console.error('Upload error:', err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  };

  const handleRemove = async () => {
    if (value) {
      // Try to delete from storage
      const path = value.split('/storage/v1/object/public/portfolio/')[1];
      if (path) {
        await supabase.storage.from(bucket).remove([path]);
      }
    }
    onChange('');
  };

  if (value) {
    return (
      <div className="relative group">
        <img src={value} alt="Thumbnail" className="h-40 w-full rounded-lg object-cover border border-border" />
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`flex flex-col items-center justify-center h-32 rounded-lg border-2 border-dashed cursor-pointer transition-colors ${
          dragOver ? 'border-foreground bg-accent' : 'border-border hover:border-foreground/50'
        }`}
      >
        {isUploading ? (
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        ) : (
          <>
            <Upload className="h-6 w-6 text-muted-foreground mb-2" />
            <p className="text-xs text-muted-foreground">Drop image or click to upload</p>
          </>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) uploadFile(file);
          }}
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">or paste URL:</span>
        <Input
          placeholder="https://example.com/image.jpg"
          className="text-xs h-8"
          onBlur={(e) => { if (e.target.value) onChange(e.target.value); }}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onChange((e.target as HTMLInputElement).value); }}}
        />
      </div>
    </div>
  );
}
