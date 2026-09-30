import { useEffect, useRef, useState } from 'react';

function LazyImage({ src, alt, style, className, aspectRatio }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const baseStyle = {
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    transition: 'opacity 0.5s ease',
    opacity: visible ? 1 : 0,
    ...(aspectRatio ? { aspectRatio } : {}),
    ...style,
  };

  if (src && visible) {
    baseStyle.backgroundImage = `url(${src})`;
  }

  return (
    <div ref={ref} className={className} style={baseStyle}>
      {!visible && <div className="placeholder-img" style={{ position: 'absolute', inset: 0 }}>{alt}</div>}
    </div>
  );
}

export default LazyImage;
