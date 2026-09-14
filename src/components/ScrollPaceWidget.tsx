import { useScroll } from '../context/ScrollContext';

export default function ScrollPaceWidget() {
  const { scrollProgress } = useScroll();

  return (
    <>
      {/* Top persistent scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-transparent z-[60] pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#16a34a] to-[#15803d] transition-all duration-150 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
        />
      </div>
    </>
  );
}
