import { useRef, type ChangeEvent, type Dispatch, type SetStateAction } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

interface ProfilePhotoProps {
  image: File | null;
  setImage: Dispatch<SetStateAction<File | null>>;
  preview?: string | null;
  setPreview?: Dispatch<SetStateAction<string | null>>;
}

const ProfilePhoto = ({ image, setImage, preview, setPreview }: ProfilePhotoProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onChooseFile = () => inputRef.current?.click();

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      if (setPreview) setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (setPreview) setPreview(null);
  };

  return (
    <div className="flex justify-center mb-6">
      <input type="file" accept="image/*" ref={inputRef} onChange={handleImageChange} className="hidden" />

      {!image ? (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center bg-surface rounded-full border border-border cursor-pointer group">
          <LuUser className="text-3xl text-text-muted" />
          <button
            type="button"
            onClick={onChooseFile}
            className="absolute -bottom-1 -right-1 w-8 h-8 flex items-center justify-center bg-accent text-white rounded-full shadow-lg shadow-accent/20 hover:brightness-110 transition-all"
          >
            <LuUpload size={14} />
          </button>
        </div>
      ) : (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24">
          <img src={preview || ""} alt="profile" className="w-full h-full rounded-full object-cover ring-2 ring-border" />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -bottom-1 -right-1 w-8 h-8 flex items-center justify-center bg-danger text-white rounded-full shadow-lg hover:brightness-110 transition-all"
          >
            <LuTrash size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhoto;
