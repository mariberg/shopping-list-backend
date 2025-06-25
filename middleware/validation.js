/**
 * Validation middleware for API endpoints
 * Provides consistent validation across all controllers
 */

/**
 * Validates user registration data
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const validateUserRegistration = (req, res, next) => {
  const { username, password } = req.body;
  const errors = [];

  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: 'Request body is required'
    });
  }

  if (!username) {
    errors.push('Username is required');
  } else if (username.length < 3) {
    errors.push('Username must be at least 3 characters long');
  } else if (username.length > 30) {
    errors.push('Username cannot exceed 30 characters');
  } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    errors.push('Username can only contain letters, numbers, and underscores');
  }

  if (!password) {
    errors.push('Password is required');
  } else if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  } else if (password.length > 100) {
    errors.push('Password cannot exceed 100 characters');
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one uppercase letter, one lowercase letter, and one number');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    });
  }

  next();
};

/**
 * Validates user authentication data
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const validateUserAuthentication = (req, res, next) => {
  const { username, password } = req.body;
  const errors = [];

  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: 'Request body is required'
    });
  }

  if (!username) {
    errors.push('Username is required');
  }

  if (!password) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    });
  }

  next();
};

/**
 * Validates product search parameters
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const validateProductSearch = (req, res, next) => {
  if (!req.params.term) {
    return res.status(400).json({
      success: false,
      message: 'Search term parameter is required'
    });
  }

  if (req.params.term.length < 1) {
    return res.status(400).json({
      success: false,
      message: 'Search term cannot be empty'
    });
  }

  next();
};

/**
 * Validates product ID parameter
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const validateProductId = (req, res, next) => {
  if (!req.params._id) {
    return res.status(400).json({
      success: false,
      message: 'Product ID parameter is required'
    });
  }

  // Check if ID is a valid MongoDB ObjectId
  if (!/^[0-9a-fA-F]{24}$/.test(req.params._id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid product ID format'
    });
  }

  next();
};

/**
 * Validates new product data
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const validateProductData = (req, res, next) => {
  const { product, productGroup } = req.body;
  const errors = [];

  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: 'Request body is required'
    });
  }

  if (!product) {
    errors.push('Product name is required');
  } else if (product.length < 1) {
    errors.push('Product name cannot be empty');
  } else if (product.length > 100) {
    errors.push('Product name cannot exceed 100 characters');
  }

  if (!productGroup) {
    errors.push('Product group is required');
  } else if (productGroup.length < 1) {
    errors.push('Product group cannot be empty');
  } else if (productGroup.length > 50) {
    errors.push('Product group cannot exceed 50 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    });
  }

  next();
};

/**
 * Validates username parameter
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const validateUsername = (req, res, next) => {
  if (!req.params.username) {
    return res.status(400).json({
      success: false,
      message: 'Username parameter is required'
    });
  }

  next();
};

/**
 * Validates list item data
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const validateListItemData = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Item data is required'
    });
  }

  // For main list items
  if (req.body.product) {
    if (typeof req.body.product !== 'string' || req.body.product.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Product name is required and must be a non-empty string'
      });
    }

    if (req.body.productGroup && (typeof req.body.productGroup !== 'string' || req.body.productGroup.trim().length === 0)) {
      return res.status(400).json({
        success: false,
        message: 'Product group must be a non-empty string'
      });
    }
  }

  // For other list items
  if (req.body.item) {
    if (typeof req.body.item !== 'string' || req.body.item.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Item name is required and must be a non-empty string'
      });
    }
  }

  next();
};

/**
 * Validates item ID parameter
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const validateItemId = (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json({
      success: false,
      message: 'Item ID parameter is required'
    });
  }

  // Check if ID is a valid MongoDB ObjectId
  if (!/^[0-9a-fA-F]{24}$/.test(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid item ID format'
    });
  }

  next();
};

/**
 * Validates product group order data
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const validateProductGroupOrder = (req, res, next) => {
  if (!req.body || !Array.isArray(req.body) || req.body.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Product group order array is required'
    });
  }

  // Check that each item has a productGroup property
  const invalidItems = req.body.filter(item => !item.productGroup || typeof item.productGroup !== 'string' || item.productGroup.trim().length === 0);
  if (invalidItems.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Each item must have a valid productGroup property'
    });
  }

  // Check for duplicate product groups
  const productGroups = req.body.map(item => item.productGroup);
  const uniqueProductGroups = new Set(productGroups);
  
  if (productGroups.length !== uniqueProductGroups.size) {
    return res.status(400).json({
      success: false,
      message: 'Duplicate product groups are not allowed'
    });
  }

  next();
};

module.exports = {
  validateUserRegistration,
  validateUserAuthentication,
  validateProductSearch,
  validateProductId,
  validateProductData,
  validateUsername,
  validateListItemData,
  validateItemId,
  validateProductGroupOrder
};