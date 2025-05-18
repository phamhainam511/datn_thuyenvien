import { hasAccess } from '../utils/permissions';

const isAuthenticated = (req, res, next) => {
  // Check if session exists and user is authenticated
  if (req.session && req.session.isAuthenticated) {
    // Add user data to all views
    res.locals.user = req.session.user;
    return next();
  }
  
  // Redirect to login page if not authenticated
  return res.redirect('/login');
};

const checkPermission = (req, res, next) => {
  // Check authentication first
  if (!req.session || !req.session.isAuthenticated) {
    return res.redirect('/login');
  }
  
  // Get user role and requested path
  const role = req.session.user.phanquyen_id;
  const path = req.path;
  
  // Check if user has access to this route
  if (hasAccess(role, path)) {
    res.locals.user = req.session.user;
    return next();
  }
  
  // Access denied - render access denied page
  return res.render('access-denied', {
    message: 'Bạn không có quyền truy cập trang này',
    user: req.session.user,
    activeMenu: ''
  });
};

module.exports = {
  isAuthenticated,
  checkPermission
};
