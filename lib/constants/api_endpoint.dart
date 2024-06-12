class ApiEndpoint {
  static const String baseUrl = 'https://monilmeh.pythonanywhere.com';

  //User
  static const String registerUser = '$baseUrl/auth/register';
  static const String loginUser = '$baseUrl/auth/token';
  static const String refreshAccessToken = '$baseUrl/auth/token/refresh';
  static const String getUserDetails = '$baseUrl/auth/user';
  static const String editUserDetails = '$baseUrl/auth/user/';
  static const String forgotPassword = '$baseUrl/auth/forgot-password/';
  static const String verifyOTP = '$baseUrl/auth/verify-otp/';
  static const String isAdmin = '$baseUrl/api/isAdmin/';

  //Posts
  static const String posts = '$baseUrl/api/posts';

  //Notes
  static const String notes = '$baseUrl/api/notes';

  //Calendar
  static const String calendar = '$baseUrl/api/calendar';

  //Job
  static const String job = '$baseUrl/api/jobboard';

  //Video
  static const String video = '$baseUrl/api/videolinks';
}
