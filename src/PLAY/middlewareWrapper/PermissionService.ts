// routes/layers/auth/PermissionService.ts
export class PermissionService {
  static canAccessPage(user: any, pageConfig: any): boolean {
    if (!pageConfig?.status?.deciplines) return false;
    
    const userPermissions = pageConfig.status.deciplines[user.role];
    return userPermissions && userPermissions.includes('read');
  }

  static canPerformAction(user: any, action: string, pageConfig: any): boolean {
    if (!pageConfig?.status?.deciplines) return false;
    
    const userPermissions = pageConfig.status.deciplines[user.role];
    return userPermissions && userPermissions.includes(action);
  }

  static getAccessiblePages(user: any, allPages: any[]): string[] {
    return allPages.filter(page => 
      this.canAccessPage(user, page.config)
    ).map(page => page.key);
  }

  static getAvailableActions(user: any, pageConfig: any): string[] {
    if (!pageConfig?.status?.deciplines) return [];
    
    return pageConfig.status.deciplines[user.role] || [];
  }
}