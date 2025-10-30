import React, { createContext, useContext, useReducer, useEffect } from "react";
import { authService, postService, categoryService } from "../services/api";

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  posts: [],
  categories: [],
  currentPost: null,
  error: null,
};

// Action types
const actionTypes = {
  SET_LOADING: "SET_LOADING",
  SET_USER: "SET_USER",
  LOGOUT: "LOGOUT",
  SET_POSTS: "SET_POSTS",
  SET_CATEGORIES: "SET_CATEGORIES",
  SET_CURRENT_POST: "SET_CURRENT_POST",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        loading: false,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    case actionTypes.SET_POSTS:
      return { ...state, posts: action.payload };
    case actionTypes.SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case actionTypes.SET_CURRENT_POST:
      return { ...state, currentPost: action.payload };
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    case actionTypes.CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

// Context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load user on app start
  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = authService.getCurrentUser();
        if (user) {
          dispatch({ type: actionTypes.SET_USER, payload: user });
        } else {
          dispatch({ type: actionTypes.SET_LOADING, payload: false });
        }
      } catch (error) {
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
      }
    };

    loadUser();
  }, []);

  // Auth actions
  const login = async (credentials) => {
    try {
      dispatch({ type: actionTypes.SET_LOADING, payload: true });
      const response = await authService.login(credentials);
      dispatch({ type: actionTypes.SET_USER, payload: response.data.user });
      return response;
    } catch (error) {
      dispatch({
        type: actionTypes.SET_ERROR,
        payload: error.response?.data?.error || "Login failed",
      });
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      dispatch({ type: actionTypes.SET_LOADING, payload: true });
      const response = await authService.register(userData);
      dispatch({ type: actionTypes.SET_USER, payload: response.data.user });
      return response;
    } catch (error) {
      dispatch({
        type: actionTypes.SET_ERROR,
        payload: error.response?.data?.error || "Registration failed",
      });
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    dispatch({ type: actionTypes.LOGOUT });
  };

  // Post actions
  const fetchPosts = async (params = {}) => {
    try {
      dispatch({ type: actionTypes.SET_LOADING, payload: true });
      const response = await postService.getAllPosts(
        params.page,
        params.limit,
        params.category
      );
      dispatch({ type: actionTypes.SET_POSTS, payload: response.data });
      return response;
    } catch (error) {
      dispatch({
        type: actionTypes.SET_ERROR,
        payload: error.response?.data?.error || "Failed to fetch posts",
      });
      throw error;
    }
  };

  const fetchPost = async (id) => {
    try {
      dispatch({ type: actionTypes.SET_LOADING, payload: true });
      const response = await postService.getPost(id);
      dispatch({ type: actionTypes.SET_CURRENT_POST, payload: response.data });
      return response;
    } catch (error) {
      dispatch({
        type: actionTypes.SET_ERROR,
        payload: error.response?.data?.error || "Failed to fetch post",
      });
      throw error;
    }
  };

  const createPost = async (postData) => {
    try {
      dispatch({ type: actionTypes.SET_LOADING, payload: true });
      const response = await postService.createPost(postData);
      dispatch({ type: actionTypes.CLEAR_ERROR });
      return response;
    } catch (error) {
      dispatch({
        type: actionTypes.SET_ERROR,
        payload: error.response?.data?.error || "Failed to create post",
      });
      throw error;
    }
  };

  const updatePost = async (id, postData) => {
    try {
      dispatch({ type: actionTypes.SET_LOADING, payload: true });
      const response = await postService.updatePost(id, postData);
      dispatch({ type: actionTypes.SET_CURRENT_POST, payload: response.data });
      return response;
    } catch (error) {
      dispatch({
        type: actionTypes.SET_ERROR,
        payload: error.response?.data?.error || "Failed to update post",
      });
      throw error;
    }
  };

  const deletePost = async (id) => {
    try {
      dispatch({ type: actionTypes.SET_LOADING, payload: true });
      await postService.deletePost(id);
      dispatch({ type: actionTypes.CLEAR_ERROR });
      return true;
    } catch (error) {
      dispatch({
        type: actionTypes.SET_ERROR,
        payload: error.response?.data?.error || "Failed to delete post",
      });
      throw error;
    }
  };

  // Category actions
  const fetchCategories = async () => {
    try {
      const response = await categoryService.getAllCategories();
      dispatch({ type: actionTypes.SET_CATEGORIES, payload: response.data });
      return response;
    } catch (error) {
      dispatch({
        type: actionTypes.SET_ERROR,
        payload: error.response?.data?.error || "Failed to fetch categories",
      });
      throw error;
    }
  };

  const createCategory = async (categoryData) => {
    try {
      dispatch({ type: actionTypes.SET_LOADING, payload: true });
      const response = await categoryService.createCategory(categoryData);
      dispatch({ type: actionTypes.CLEAR_ERROR });
      return response;
    } catch (error) {
      dispatch({
        type: actionTypes.SET_ERROR,
        payload: error.response?.data?.error || "Failed to create category",
      });
      throw error;
    }
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: actionTypes.CLEAR_ERROR });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    fetchPosts,
    fetchPost,
    createPost,
    updatePost,
    deletePost,
    fetchCategories,
    createCategory,
    clearError,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
