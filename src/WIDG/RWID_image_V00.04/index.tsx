import { useState,CSSProperties } from 'react';

interface ImageProps {
    src: string;
    alt?: string;
    width?: string | number;
    height?: string | number;
    className?: string;
    style?: CSSProperties;
    fallbackSrc?: string;
    lazy?: boolean;
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
    shimmerColor?: string;
    shimmerToColor?: string;
}

const Image = ({
    src,
    alt = '',
    width = '100%',
    height = 'auto',
    className = '',
    style = {},
    fallbackSrc = '/default-image.jpg',
    lazy = true,
    objectFit = 'cover',
    shimmerColor = '#f0f0f0',
    shimmerToColor = '#e0e0e0',
    ...props
}: ImageProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleError = () => {
        setHasError(true);
        setIsLoading(false);
    };

    const handleLoad = () => {
        setIsLoading(false);
        setTimeout(() => setImageLoaded(true), 100);
    };

    const objectFitClasses = {
        'contain': 'object-contain',
        'cover': 'object-cover',
        'fill': 'object-fill',
        'none': 'object-none',
        'scale-down': 'object-scale-down'
    };

    // استایل‌های سفارشی برای افکت شیمر
    const shimmerStyle: CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(90deg, ${shimmerColor} 25%, ${shimmerToColor} 50%, ${shimmerColor} 75%)`,
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite linear',
        zIndex: 10,
    };

    return (
        <div
            className={`relative overflow-hidden ${className}`}
            style={{ width, height, ...style }}
        >
            {/* افکت لودینگ حرفه‌ای */}
            {isLoading && (
                <div
                    className="absolute inset-0"
                    style={shimmerStyle}
                />
            )}

            {/* تصویر اصلی با افکت fade-in */}
            <img
                {...props}
                src={hasError ? fallbackSrc : src}
                alt={alt}
                className={`
          w-full h-full 
          ${objectFitClasses[objectFit]} 
          transition-opacity duration-500 ease-out
          ${imageLoaded ? 'opacity-100' : 'opacity-0'}
        `}
                loading={lazy ? 'lazy' : 'eager'}
                onLoad={handleLoad}
                onError={handleError}
            />
        </div>
    );
};

export default Image;