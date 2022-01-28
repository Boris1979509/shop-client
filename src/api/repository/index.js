import fetch from "@/api/fetch";

export default {
  createSession() {
    return fetch("csrf-cookie");
  },

  login(params) {
    return fetch("auth/login", params);
  },

  signup(params) {
    return fetch("auth/register", params);
  },

  passwordReset(params) {
    return fetch("auth/password-reset", params);
  },

  logout(params) {
    return fetch("auth/logout", params);
  },

  check(params) {
    return fetch("check", params);
  },

  purchase(params) {
    return fetch("purchase", params);
  },

  authorization(params) {
    return fetch("authorization", params);
  },

  getProducts(page) {
    let path = "products";
    if (page) {
      path += "?page=" + page;
    }
    return fetch(path);
  },

  getProductsAdmin(page, params) {
    let path = "admin/products";
    if (page) {
      path += "?page=" + page;
    }
    return fetch(path, params);
  },

  createProduct(params) {
    return fetch("admin/products", params);
  },

  updateProduct(id, params) {
    return fetch(`admin/products/${id}`, params);
  },

  deleteProductImage(productId, imageId, params) {
    return fetch(`admin/products/${productId}/images/${imageId}`, params);
  },

  updateProductImage(productId, params) {
    return fetch(`admin/products/${productId}/images`, params);
  },

  getProductCategories(page, params) {
    let path = "admin/products/categories";
    if (page) {
      path += "?page=" + page;
    }
    return fetch(path, params);
  },

  getProductBySlug(slug) {
    return fetch(`product/${slug}`);
  },

  tags() {
    return fetch("admin/dashboard");
  },

  sidebar() {
    return fetch("admin/sidebar");
  },

  profile() {
    return fetch("cabinet/profile");
  },

  users(page, params) {
    let path = "admin/users";
    if (page) {
      path += "?page=" + page;
    }
    return fetch(path, params);
  },

  createUser(params) {
    return fetch("admin/users", params);
  },

  storeCategory(params) {
    return fetch("admin/products/categories", params);
  },

  setOrderCategory(id, params) {
    return fetch(`admin/products/categories/${id}/order`, params);
  },

  deleteProductCategory(id, params) {
    return fetch(`admin/products/categories/${id}`, params);
  },

  deleteProduct(id, params) {
    return fetch(`admin/products/${id}`, params);
  },

  getProductForAdmin(id) {
    return fetch(`admin/products/${id}`);
  },

  updateProductCategory(id, params) {
    return fetch(`admin/products/categories/${id}`, params);
  },

  getParentCategories() {
    return fetch("admin/products/categories/parents");
  },

  updateUser(id, params) {
    return fetch(`admin/users/${id}`, params);
  },

  showUser(id) {
    return fetch(`admin/users/${id}`);
  },

  deleteUser(id, params) {
    return fetch(`admin/users/${id}`, params);
  },

  verifyUser(id) {
    return fetch(`admin/user/verify/${id}`);
  },

  roles() {
    return fetch("admin/roles");
  },

  feedback(params) {
    return fetch("feedback", params);
  },

  upload(prefix, params) {
    let path = "api/";
    if (prefix) {
      path += prefix + "/";
    }
    return fetch(`${path}upload`, params);
  },

  removeTemporaryFile(prefix, params) {
    let path = "api/";
    if (prefix) {
      path += prefix + "/";
    }
    return fetch(`${path}remove`, params);
  },
};
