// 로그인 한 유저의 데이터 객체를 반환하는 함수
export const getLoginUserInfo = () => {
  return {
    token: sessionStorage.getItem("ACCESS_TOKEN"),
    email: sessionStorage.getItem("LOGIN_USEREMAIL"),
  };
};

export const isLogin = () => !!sessionStorage.getItem("ACCESS_TOKEN");
