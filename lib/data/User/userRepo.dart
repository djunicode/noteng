import 'package:dio/dio.dart';
import 'package:noteng/constants/api_endpoint.dart';
import 'package:noteng/data/User/userModel.dart';
import 'package:shared_preferences/shared_preferences.dart';

class UserRepo {
  //Method to Register User
  static Future<void> registerUser(User user) async {
    final dio = Dio();

    try {
      final response = await dio.post(
        ApiEndpoint.registerUser,
        data: user.toJson(),
        options: Options(
          validateStatus: (status) {
            return true;
          },
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        ),
      );
      if (response.statusCode == 201) {
        print('User registered successfully: ${response.data}');
      } else {
        print(
            'Failed to register user: ${response.data} ${response.statusCode}');
      }
    } catch (e) {
      print('Error occurred: $e');
    }
  }

  //Method to Login User
  static Future<void> loginUser(User user) async {
    final dio = Dio();

    try {
      final response = await dio.post(
        ApiEndpoint.loginUser,
        data: user.toJson(),
        options: Options(
          validateStatus: (status) {
            return true;
          },
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        ),
      );
      if (response.statusCode == 200) {
        final SharedPreferences prefs = await SharedPreferences.getInstance();
        await prefs.setString('refresh', response.data['refresh']);
        await prefs.setString('access', response.data['access']);

        print('User logged in successfully: ${response.data}');
      } else {
        print('Failed to login user: ${response.data} ${response.statusCode}');
      }
    } catch (e) {
      print('Error occurred: $e');
    }
  }

  //Method to Refresh Token
  static Future<void> refreshToken() async {
    final dio = Dio();
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    var refresh_token = await prefs.getString('refresh');

    try {
      final response = await dio.post(
        ApiEndpoint.refreshAccessToken,
        data: {'refresh': refresh_token},
        options: Options(
          validateStatus: (status) {
            return true;
          },
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        ),
      );
      if (response.statusCode == 200) {
        await prefs.setString('access', response.data['access']);

        print('Token refreshed successfully: ${response.data}');
      } else {
        print(
            'Failed to refresh token: ${response.data} ${response.statusCode}');
      }
    } catch (e) {
      print('Error occurred: $e');
    }
  }

  //Method to Get User Details
  static Future<User> getUserDetails() async {
    final dio = Dio();
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    var access_token = await prefs.getString('access');

    try {
      final response = await dio.get(
        ApiEndpoint.getUserDetails,
        options: Options(
          validateStatus: (status) {
            return true;
          },
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer $access_token'
          },
        ),
      );
      if (response.statusCode == 200) {
        User user = User.fromJson(response.data);
        await prefs.setString("sapid", user.sapid ?? '');
        await prefs.setString("email", user.email ?? '');
        await prefs.setString("fname", user.fname ?? '');
        await prefs.setString("lname", user.lname ?? '');
        await prefs.setString("contactNumber", user.contactNumber ?? '');
        await prefs.setString("expertise", user.expertise ?? '');

        print('User Data fetched successfully: ${response.data}');

        return user;
      } else {
        print(
            'Failed to fetch user data: ${response.data} ${response.statusCode}');
        return User();
      }
    } catch (e) {
      print('Error occurred: $e');
      return User();
    }
  }

  //Method to Edit User Details
  static Future<User> editUserDetails(User user) async {
    final dio = Dio();
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    var access_token = await prefs.getString('access');

    try {
      final response = await dio.patch(
        ApiEndpoint.editUserDetails,
        data: user.toJson(),
        options: Options(
          validateStatus: (status) {
            return true;
          },
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer $access_token'
          },
        ),
      );
      if (response.statusCode == 200) {
        User user = User.fromJson(response.data);
        await prefs.setString("sapid", user.sapid ?? '');
        await prefs.setString("email", user.email ?? '');
        await prefs.setString("fname", user.fname ?? '');
        await prefs.setString("lname", user.lname ?? '');
        await prefs.setString("contactNumber", user.contactNumber ?? '');
        await prefs.setString("expertise", user.expertise ?? '');

        print('User Data updated successfully: ${response.data}');
        return user;
      } else {
        print(
            'Failed to update user data: ${response.data} ${response.statusCode}');
        return User();
      }
    } catch (e) {
      print('Error occurred: $e');
      return User();
    }
  }
}
