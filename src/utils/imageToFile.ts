export default async function imageToFile(
  imageSrc: string,
  fileName: string
): Promise<File> {
  const res = await fetch(imageSrc);
  const blob = await res.blob();
  return new File([blob], fileName, { type: blob.type });
}
