export const initialState = {
  data: [],
  prefetchedData: [],
  results: [],
  correctAnswers: 0,
  totalQuestions: 0,
  step: 0,
  token: "",
  userEmail: "",
  difficulty: "easy",
  anonymous: false,
  showResults: false,
  showModal: false,
  showStatisic: false,
  isLoading: false,
  isHistory: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DIFFICULTY":
      return { ...state, difficulty: action.payload };
    case "RESET_GAME":
      return { ...initialState };
    case "RESET_SCORES":
      return { ...state, correctAnswers: 0, totalQuestions: 0 };
    case "SET_DATA":
      return { ...state, data: action.payload };
    case "SET_PREFETCHED_DATA":
      return { ...state, prefetchedData: action.payload };
    case "SET_TOKEN":
      return { ...state, token: action.payload };
    case "SET_USER_EMAIL":
      return { ...state, userEmail: action.payload };
    case "SET_STEP":
      return { ...state, step: action.payload };
    case "SET_CORRECT_ANSWERS":
      return { ...state, correctAnswers: action.payload };
    case "SET_TOTAL_QUESTIONS":
      return { ...state, totalQuestions: action.payload };
    case "SET_RESULTS":
      return { ...state, results: action.payload };
    case "SHOW_RESULTS":
      return { ...state, showResults: true };
    case "TOGGLE_HISTORY":
      return { ...state, isHistory: !state.isHistory };
    case "HIDE_HISTORY":
      return { ...state, isHistory: false };
    case "SET_ANONYMOUS":
      return { ...state, anonymous: true };
    case "DISABLE_ANONYMOUS":
      return { ...state, anonymous: false };
    case "SHOW_REGISTER_MODAL":
      return { ...state, showModal: true };
    case "HIDE_REGISTER_MODAL":
      return { ...state, showModal: false };
    case "LOADING_TRUE":
      return { ...state, isLoading: true };
    case "LOADING_FALSE":
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
