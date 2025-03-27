import { useEffect, useState } from "react";

export default function useCardImageVisibility(
  imageUrl: string | null | undefined
) {
  const [isCardImageVisible, setIsCardImageVisible] = useState(false);

  useEffect(() => {
    if (!imageUrl) {
      setIsCardImageVisible(false);
      return;
    }

    const img = new window.Image();
    img.src = imageUrl;

    img.onload = () => {
      const isInvisibleSize = img.naturalWidth === 1 && img.naturalHeight === 1;
      setIsCardImageVisible(!isInvisibleSize);
    };

    img.onerror = () => {
      setIsCardImageVisible(false);
    };
  }, [imageUrl]);

  return isCardImageVisible;
}
