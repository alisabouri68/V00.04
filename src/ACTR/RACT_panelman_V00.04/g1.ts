export class BundlBuilder {
  constructor() {}

  public generateBundlForRoute(): Record<string, object> {
    return {
      header: {
        consoles:{
          component:"consoleSwitcher",

        },
        theme:{
          component:"theme",

        },
        lang:{
          component:"language",

        },
        profile:{
          component:"profile",

        },
      },
      menu: {navigator1:{ component:"navigator1"}},
      jini: {},
      actionMenu: {},
      actionContent: {},
      assistantMenu: {},
      assistantContent: {},
      auxiliary: {},
    };
  }
}
