
interface ColorChipProps {
  color: string; // 컬러칩 색상 (hex 값)
}

export default function ColorChip({ color }: ColorChipProps) {
  return (
    <div className="w-[8px] h-[8px] rounded-full" style={{ backgroundColor: color }} />
  );
}
