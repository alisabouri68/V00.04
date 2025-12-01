/** @jsxImportSource @emotion/react */
import React from "react";

// --- تعریف Props برای آواتار تکی ---
export interface AvatarProps {
  src?: string;
  alt?: string;
  placeholderInitials?: string;
  rounded?: boolean;
  size?: number | string;
  link?: string;
  children?: React.ReactNode;
  id?: string;
  data?: any;
  geometric?: {
    width?: string | number;
    height?: string | number;
  };
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}

// --- کامپوننت آواتار اصلی ---
const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  placeholderInitials,
  rounded = true,
  size = 40,
  link,
  children,
  data,
  geometric,
  style = {},
  className = '',
  onClick,
}) => {
  // گروه آواتار
  if (data && Array.isArray(data)) {
    const groupStyle: React.CSSProperties = {
      display: "flex",
      gap: "0.5rem",
      ...style,
    };
    
    // اضافه کردن هندسه اگر وجود دارد
    if (geometric?.width) {
      groupStyle.width = geometric.width;
    }
    if (geometric?.height) {
      groupStyle.height = geometric.height;
    }

    return (
      <div 
        style={groupStyle}
        className={className}
        onClick={onClick}
      >
        {data.map((avatar: any, index: number) => {
          const avatarItem = {
            src: avatar.src || avatar.image,
            alt: avatar.alt || avatar.name,
            placeholderInitials: avatar.placeholderInitials || 
              (avatar.name ? avatar.name.charAt(0) : "?"),
            rounded: avatar.rounded !== undefined ? avatar.rounded : rounded,
            size: avatar.size || size,
            link: avatar.link || avatar.url,
            children: avatar.children,
          };
          
          const itemStyle: React.CSSProperties = {
            width: avatarItem.size,
            height: avatarItem.size,
            borderRadius: avatarItem.rounded ? "50%" : "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#e5e7eb",
            fontWeight: "bold",
            overflow: "hidden",
          };

          return (
            <div 
              key={avatar.id || index.toString()}
              style={itemStyle}
            >
              {avatarItem.src ? (
                <img 
                  src={avatarItem.src} 
                  alt={avatarItem.alt} 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                />
              ) : avatarItem.children ? (
                <span>{avatarItem.children}</span>
              ) : (
                <span>{avatarItem.placeholderInitials}</span>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // آواتار تکی
  const avatarStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: rounded ? "50%" : "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e5e7eb",
    fontWeight: "bold",
    overflow: "hidden",
    cursor: onClick ? "pointer" : "default",
    ...style,
  };

  // اضافه کردن هندسه اگر وجود دارد
  if (geometric?.width) {
    avatarStyle.width = geometric.width;
  }
  if (geometric?.height) {
    avatarStyle.height = geometric.height;
  }

  // تعیین محتوای آواتار
  const content = src ? (
    <img 
      src={src} 
      alt={alt || "Avatar"} 
      style={{ 
        width: "100%", 
        height: "100%", 
        objectFit: "cover",
        borderRadius: rounded ? "50%" : "0" 
      }} 
    />
  ) : children ? (
    <span>{children}</span>
  ) : placeholderInitials ? (
    <span>{placeholderInitials}</span>
  ) : (
    <span>?</span>
  );

  const avatarElement = (
    <div 
      style={avatarStyle} 
      className={className}
      onClick={onClick}
    >
      {content}
    </div>
  );

  return link ? (
    <a href={link} style={{ display: "inline-block" }}>
      {avatarElement}
    </a>
  ) : (
    avatarElement
  );
};

export default Avatar;