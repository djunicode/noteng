import 'package:dio/dio.dart';
import 'package:noteng/constants/api_endpoint.dart';
import 'package:shared_preferences/shared_preferences.dart';

class NotesRatingRepo {
  //Method to Add Note Rating
  static Future<bool> setRating(int note_id, int rating) async {
    final dio = Dio();
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    var access_token = await prefs.getString('access');
    var sap_id = await prefs.getString('sapid');

    try {
      final response = await dio.post(
        "${ApiEndpoint.notes}/$note_id/ratings/",
        data: {"user": sap_id, "rating": rating},
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
        print('Note Rating added successfully: ${response.data}');
        return true;
      } else {
        print(
            'Failed to add note rating: ${response.data} ${response.statusCode}');
        return false;
      }
    } catch (e) {
      print('Error occurred: $e');
      return false;
    }
  }

  //Method to Update Note Rating
  static Future<bool> updateRating(int note_id, int rating) async {
    final dio = Dio();
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    var access_token = await prefs.getString('access');
    var sap_id = await prefs.getString('sapid');

    try {
      final response = await dio.patch(
        "${ApiEndpoint.notes}/$note_id/ratings/",
        data: {"user": sap_id, "rating": rating},
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
        print('Note Rating updated successfully: ${response.data}');
        return true;
      } else {
        print(
            'Failed to update note rating: ${response.data} ${response.statusCode}');
        return false;
      }
    } catch (e) {
      print('Error occurred: $e');
      return false;
    }
  }
}
