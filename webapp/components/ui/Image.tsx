import { ImageOff } from "lucide-react";
import NextImage from "next/image";
import styles from "./ui.module.css";

export default function Image({
  image_url,
  alt,
  style,
  className,
  sizes,
}: {
  image_url: string | null;
  alt: string;
  style?: React.CSSProperties;
  className?: string;
  sizes?: string;
}) {
  return (
    <>
      {image_url ? (
        <NextImage
          className={className}
          src={image_url ?? ""}
          alt={alt}
          fill
          style={style}
          loading="lazy"
          sizes={
            sizes ??
            "(max-width: 768px) 600px, (max-width: 1200px) 600px, 600px"
          }
        />
      ) : (
        <div className={`${className} ${styles.placeholderContainer}`}>
          <div className={styles.placeholderImageWrapper}>
            <ImageOff size={32} />
          </div>
        </div>
      )}
    </>
  );
}
