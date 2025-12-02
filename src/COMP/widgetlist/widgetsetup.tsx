// widgetsetup.ts
import { absMan } from "ACTR/RACT_absman_V00.04"; 

export const setupDefaultWidgets = () => {
  console.log("🔄 Setting up default widgets...");
  
  // ابتدا ویجت‌های قدیمی را پاک کن
  absMan.clearWidgets();
  
  // ویجت‌های پیش‌فرض
  const defaultWidgets = [
    {
      name: "Button",
      type: "button",
      version: "2025.11.16",
      status: "active" as const,
      description: "Responsive button with various features",
      author: "aEmami",
      tags: ["ui", "button", "interactive", "form"],
      meta: {
        model_type: "component",
        model_owner: "aEmami",
        origin_model: "RWDG_button",
        origin_model_Ver: "2025.11.16"
      },
      geo: {
        width: "auto",
        height: "40px",
        padding: "8px 16px"
      },
      logic: {
        disabled: {
          value: false,
          type: "boolean" as const,
          description: "Button disabled state"
        },
        loading: {
          value: false,
          type: "boolean" as const,
          description: "Loading state"
        }
      },
      events: [
        {
          id: "click",
          event: "onClick",
          handler: "handleClick",
          description: "Button click"
        }
      ],
      methods: [
        {
          id: "focus",
          name: "focus",
          type: "function" as const,
          description: "Focus on button",
          enabled: true
        }
      ]
    },
    {
      name: "ButtonGroup",
      type: "button-group",
      version: "2025.11.16",
      status: "active" as const,
      description: "Related button group",
      author: "aEmami",
      tags: ["ui", "group", "navigation", "tabs"],
      meta: {
        model_type: "container",
        model_owner: "aEmami",
        origin_model: "RWDG_buttonGroup",
        origin_model_Ver: "2025.11.16"
      },
      geo: {
        width: "100%",
        height: "auto"
      },
      logic: {
        vertical: {
          value: false,
          type: "boolean" as const,
          description: "Vertical layout"
        }
      },
      events: [
        {
          id: "change",
          event: "onChange",
          handler: "handleChange",
          description: "Selection change"
        }
      ]
    },
    {
      name: "Avatar",
      type: "avatar",
      version: "2025.11.16",
      status: "active" as const,
      description: "User avatar display with image or initials",
      author: "aEmami",
      tags: ["ui", "profile", "user", "image"],
      meta: {
        model_type: "component",
        model_owner: "aEmami",
        origin_model: "RWDG_avatar",
        origin_model_Ver: "2025.11.16"
      },
      geo: {
        width: "40px",
        height: "40px",
        borderRadius: "50%"
      },
      logic: {
        size: {
          value: "medium",
          type: "string" as const,
          description: "Avatar size"
        },
        src: {
          value: "",
          type: "string" as const,
          description: "Image URL"
        }
      },
      events: [
        {
          id: "click",
          event: "onClick",
          handler: "handleAvatarClick",
          description: "Avatar click"
        }
      ]
    },
    {
      name: "Input",
      type: "input",
      version: "2025.11.16",
      status: "active" as const,
      description: "Text input field",
      author: "aEmami",
      tags: ["ui", "form", "text", "input"],
      meta: {
        model_type: "component",
        model_owner: "aEmami",
        origin_model: "RWDG_input",
        origin_model_Ver: "2025.11.16"
      },
      geo: {
        width: "100%",
        height: "40px",
        padding: "8px 12px"
      },
      logic: {
        type: {
          value: "text",
          type: "string" as const,
          description: "Input type"
        },
        placeholder: {
          value: "",
          type: "string" as const,
          description: "Placeholder text"
        },
        required: {
          value: false,
          type: "boolean" as const,
          description: "Required field"
        }
      },
      events: [
        {
          id: "change",
          event: "onChange",
          handler: "handleInputChange",
          description: "Value change"
        },
        {
          id: "focus",
          event: "onFocus",
          handler: "handleFocus",
          description: "Field focus"
        }
      ]
    },
    {
      name: "Badge",
      type: "badge",
      version: "2025.11.16",
      status: "active" as const,
      description: "Status indicator or counter",
      author: "aEmami",
      tags: ["ui", "notification", "status", "counter"],
      meta: {
        model_type: "component",
        model_owner: "aEmami",
        origin_model: "RWDG_badge_",
        origin_model_Ver: "2025.11.16"
      },
      geo: {
        width: "auto",
        height: "20px",
        padding: "2px 6px"
      },
      logic: {
        count: {
          value: 0,
          type: "number" as const,
          description: "Display count"
        },
        maxCount: {
          value: 99,
          type: "number" as const,
          description: "Maximum display number"
        },
        showZero: {
          value: false,
          type: "boolean" as const,
          description: "Show zero"
        }
      },
      events: [
        {
          id: "click",
          event: "onClick",
          handler: "handleBadgeClick",
          description: "Badge click"
        }
      ]
    }
  ];

  const widgetIds: string[] = [];
  defaultWidgets.forEach((widget:any) => {
    const widgetId = absMan.addWidget(widget);
    widgetIds.push(widgetId);
    console.log(`✅ Widget added: ${widget.name} (ID: ${widgetId})`);
  });

  console.log(`🎉 ${widgetIds.length} default widgets set up successfully`);
  return widgetIds;
};

export default setupDefaultWidgets;