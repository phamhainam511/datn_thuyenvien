// Define roles
const ROLES = {
  ADMIN: 1,      // Can access all routes
  MANAGER: 2,    // Can access crew, certificates, contracts, documents
  FINANCE: 3     // Can only access payroll
};

// Define route permissions map
const routePermissions = {
  // Dashboard route accessible by all authenticated users
  '/': [ROLES.ADMIN, ROLES.MANAGER, ROLES.FINANCE],
  '/doi-mat-khau': [ROLES.ADMIN, ROLES.MANAGER, ROLES.FINANCE],
  
  // Admin-only routes
  '/danh-sach-user': [ROLES.ADMIN],
  '/post-user': [ROLES.ADMIN],
  '/edit-user': [ROLES.ADMIN],
  '/put-user': [ROLES.ADMIN],
  '/reset-user': [ROLES.ADMIN],
  
  // Manager routes (crew, certificates, contracts, documents)
  //crew
  '/danh-sach-thuyen-vien': [ROLES.ADMIN, ROLES.MANAGER],
  '/cap-nhat-thuyen-vien': [ROLES.ADMIN, ROLES.MANAGER],
  '/cap-nhat-than-nhan/': [ROLES.ADMIN, ROLES.MANAGER],
  '/thuyen-vien': [ROLES.ADMIN, ROLES.MANAGER],
  '/them-lich-su-di-tau': [ROLES.ADMIN, ROLES.MANAGER],
  '/cap-nhat-lich-su-di-tau': [ROLES.ADMIN, ROLES.MANAGER],
  '/them-thuyen-vien': [ROLES.ADMIN, ROLES.MANAGER],
  '/thuyenvien/export-word/': [ROLES.ADMIN, ROLES.MANAGER],
  '/thuyenvien/export-excel/': [ROLES.ADMIN, ROLES.MANAGER],
  '/thuyenvien/export-excel/': [ROLES.ADMIN, ROLES.MANAGER],
  '/lich-su-di-tau': [ROLES.ADMIN, ROLES.MANAGER],
  

  '/them-hoc-van': [ROLES.ADMIN, ROLES.MANAGER],
  '/cap-nhat-hoc-van': [ROLES.ADMIN, ROLES.MANAGER],
  '/xoa-hoc-van': [ROLES.ADMIN, ROLES.MANAGER],

  '/them-ngoai-ngu': [ROLES.ADMIN, ROLES.MANAGER],
  '/cap-nhat-ngoai-ngu': [ROLES.ADMIN, ROLES.MANAGER],
  '/xoa-ngoai-ngu': [ROLES.ADMIN, ROLES.MANAGER],

  '/them-chung-chi': [ROLES.ADMIN, ROLES.MANAGER],
  '/cap-nhat-chung-chi': [ROLES.ADMIN, ROLES.MANAGER],
  '/xoa-chung-chi': [ROLES.ADMIN, ROLES.MANAGER],

  '/upload-tai-lieu/': [ROLES.ADMIN, ROLES.MANAGER],
  '/xoa-tai-lieu': [ROLES.ADMIN, ROLES.MANAGER],

  '/cap-nhat-trang-thai': [ROLES.ADMIN, ROLES.MANAGER],
  '/upload-anh-thuyen-vien': [ROLES.ADMIN, ROLES.MANAGER],
  '/api/crew-with-certificates': [ROLES.ADMIN, ROLES.MANAGER],

  //contracts
  '/danh-sach-hop-dong': [ROLES.ADMIN, ROLES.MANAGER],
  '/hop-dong-cho-thanh-ly': [ROLES.ADMIN, ROLES.MANAGER],
  '/hop-dong-da-thanh-ly': [ROLES.ADMIN, ROLES.MANAGER],
  '/post-hop-dong': [ROLES.ADMIN, ROLES.MANAGER],
  '/edit-hop-dong': [ROLES.ADMIN, ROLES.MANAGER],
  '/delete-hop-dong': [ROLES.ADMIN, ROLES.MANAGER],
  '/thuc-hien-thanh-ly': [ROLES.ADMIN, ROLES.MANAGER],

  //documents
  '/danh-sach-chuc-vu': [ROLES.ADMIN, ROLES.MANAGER],
  '/post-chucvu': [ROLES.ADMIN, ROLES.MANAGER],
  '/edit-chucvu': [ROLES.ADMIN, ROLES.MANAGER],
  '/put-chucvu': [ROLES.ADMIN, ROLES.MANAGER],
  '/delete-chucvu': [ROLES.ADMIN, ROLES.MANAGER],

  '/danh-sach-tau': [ROLES.ADMIN, ROLES.MANAGER],
  '/post-tau': [ROLES.ADMIN, ROLES.MANAGER],
  '/edit-tau': [ROLES.ADMIN, ROLES.MANAGER],
  '/put-tau': [ROLES.ADMIN, ROLES.MANAGER],
  '/delete-tau': [ROLES.ADMIN, ROLES.MANAGER],

  '/danh-sach-chung-chi': [ROLES.ADMIN, ROLES.MANAGER],
  '/post-chungchi': [ROLES.ADMIN, ROLES.MANAGER],
  '/edit-chungchi': [ROLES.ADMIN, ROLES.MANAGER],
  '/put-chungchi': [ROLES.ADMIN, ROLES.MANAGER],
  '/delete-chungchi': [ROLES.ADMIN, ROLES.MANAGER],
  
  //chung - chi
  '/cer-expiring': [ROLES.ADMIN, ROLES.MANAGER],
  '/cer-expired': [ROLES.ADMIN, ROLES.MANAGER],
  '/api/chung-chi': [ROLES.ADMIN, ROLES.MANAGER],
  
  
  // Finance routes
  '/danh-sach-thuyen-vien-luong': [ROLES.ADMIN, ROLES.FINANCE],
  '/danh-sach-bang-luong': [ROLES.ADMIN, ROLES.FINANCE],
  '/bang-luong-chi-tiet': [ROLES.ADMIN, ROLES.FINANCE],
  '/edit-bangluong': [ROLES.ADMIN, ROLES.FINANCE],
  '/delete-bangluong': [ROLES.ADMIN, ROLES.FINANCE],
  '/put-bangluong': [ROLES.ADMIN, ROLES.FINANCE],
  '/put-nganhang': [ROLES.ADMIN, ROLES.FINANCE],
  '/xuly-thanhtoan': [ROLES.ADMIN, ROLES.FINANCE],
  '/post-bangluong': [ROLES.ADMIN, ROLES.FINANCE],
};

// Helper function to check if a role has access to a route
const hasAccess = (role, path) => {
  // Admin can access everything
  if (Number(role) === ROLES.ADMIN) return true;
  
  // For specific paths like /thuyen-vien/{id}, we need to check the base route
  const basePath = '/' + path.split('/')[1];
  console.log('Base Path:', basePath);
  console.log('Role:', role);
  console.log('Path:', path);
  console.log('Route Permissions:', routePermissions);
  
  // Check if the route is defined in permissions
  if (routePermissions[path]) {
    return routePermissions[path].includes(Number(role));
  }
  
  // Check if the base path is defined in permissions
  if (routePermissions[basePath]) {
    return routePermissions[basePath].includes(Number(role));
  }
  
  // Default: deny access
  return false;
};

module.exports = {
  ROLES,
  hasAccess
};
