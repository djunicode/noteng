class ApiEndpoint {
  static const String baseUrl = 'https://monilmeh.pythonanywhere.com';

  //User
  static const String registerUser = '$baseUrl/auth/register';
  static const String loginUser = '$baseUrl/auth/token';
  static const String refreshAccessToken = '$baseUrl/auth/token/refresh';
  static const String getUserDetails = '$baseUrl/auth/user';
  static const String editUserDetails = '$baseUrl/auth/user/';

  //Posts
  static const String posts = '$baseUrl/api/posts';

  //Notes
  static const String notes = '$baseUrl/api/notes';

  //Calendar
  static const String calendar = '$baseUrl/api/calendar';
}
