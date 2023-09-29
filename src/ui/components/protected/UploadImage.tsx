import React, { FC, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

interface FileWithPreview extends File {
  preview: string;
}

interface UploadImageProps {
  onFilesChanged: (acceptedFiles: File[], previewUrl?: string) => void;
  resetPreview?: () => void;
}
const UploadImage: FC<UploadImageProps> = ({
  onFilesChanged,
  resetPreview,
}) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const resetFiles = () => setFiles([]);

  useEffect(() => {
    if (resetPreview) {
      resetFiles();
      onFilesChanged([]);
    }
  }, [resetPreview, onFilesChanged]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*" as any,
    onDrop: (acceptedFiles) => {
      const mappedFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setFiles(mappedFiles);

      if (acceptedFiles.length > 0) {
        // Pasando el archivo y su URL de vista previa al componente padre
        onFilesChanged(acceptedFiles, mappedFiles[0].preview);
      }
    },
  });

  useEffect(() => {
    console.log("El componente se ha montado.");
    // Resto del código
  }, []);

  const thumbs = files.map((file) => (
    <div className="thumb" key={file.name}>
      <div className="thumb-inner">
        <img
          src={file.preview}
          className="img"
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Arrastra tu imagen o pulsa para cargar una.</p>
      </div>
      <aside className="thumbs-container">{thumbs}</aside>
    </section>
  );
};

export default UploadImage;
