import 'package:dio/dio.dart';
import 'package:noteng/constants/api_endpoint.dart';
import 'package:noteng/data/Video/videoModel.dart';
import 'package:shared_preferences/shared_preferences.dart';

class VideoRepo {
  //Method to Get All Videos
  static Future<List<Video>> getAllVideos() async {
    final dio = Dio();
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    var access_token = await prefs.getString('access');

    try {
      List<Video> jobs = [];

      final response = await dio.get(
        ApiEndpoint.video,
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
        print('All Videos fetched successfully: ${response.data}');
        List<dynamic> responseData = response.data;
        jobs =
            responseData.map((videoJson) => Video.fromJson(videoJson)).toList();
      } else {
        print(
            'Failed to fetch all Videos: ${response.data} ${response.statusCode}');
      }
      return jobs;
    } catch (e) {
      print('Error occurred in video: $e');
      return [];
    }
  }

  //Method to Get Single Video
  static Future<Video> getSingleVideo(int video_id) async {
    final dio = Dio();
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    var access_token = await prefs.getString('access');

    try {
      final response = await dio.get(
        "${ApiEndpoint.video}/$video_id",
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
        Video job = Video.fromJson(response.data);
        print('Video fetched successfully: ${response.data}');
        return job;
      } else {
        print('Failed to fetch Video: ${response.data} ${response.statusCode}');
        return Video();
      }
    } catch (e) {
      print('Error occurred: $e');
      return Video();
    }
  }

  //Method to Delete Videdo
  static Future<void> deleteVideo(int video_id) async {
    final dio = Dio();
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    var access_token = await prefs.getString('access');

    try {
      final response = await dio.delete(
        "${ApiEndpoint.job}/$video_id/",
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
      if (response.statusCode == 204) {
        print('Video deleted successfully: ${response.data}');
      } else {
        print(
            'Failed to delete Video: ${response.data} ${response.statusCode}');
      }
    } catch (e) {
      print('Error occurred: $e');
    }
  }

  //Method to Create Video
  static Future<Video> createVideo(Video video) async {
    final dio = Dio();
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    var access_token = await prefs.getString('access');

    var data = video.toJson();

    try {
      final response = await dio.post(
        "${ApiEndpoint.video}/",
        data: data,
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
      if (response.statusCode == 201) {
        Video video = Video.fromJson(response.data);
        print('Video created successfully: ${response.data}');
        return video;
      } else {
        print(
            'Failed to create Video: ${response.data} ${response.statusCode}');
        return Video();
      }
    } catch (e) {
      print('Error occurred: $e');
      return Video();
    }
  }

  //Method to Update Video

  static Future<Video> updateJob(int video_id, Video video) async {
    final dio = Dio();
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    var access_token = await prefs.getString('access');

    var data = video.toJson();

    try {
      final response = await dio.patch(
        "${ApiEndpoint.job}/${video_id}/",
        data: data,
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
        Video video = Video.fromJson(response.data);
        print('Video updated successfully: ${response.data}');
        return video;
      } else {
        print(
            'Failed to update video: ${response.data} ${response.statusCode}');
        return Video();
      }
    } catch (e) {
      print('Error occurred: $e');
      return Video();
    }
  }
}
