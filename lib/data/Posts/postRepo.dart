import 'dart:io';

import 'package:dio/dio.dart';
import 'package:noteng/constants/api_endpoint.dart';
import 'package:noteng/data/Posts/postModel.dart';
import 'package:noteng/data/User/userModel.dart';
import 'package:shared_preferences/shared_preferences.dart';

class PostsRepo {
  //Method to Get All Posts
  static Future<List<Posts>> getAllPosts() async {
    final dio = Dio();
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    var access_token = await prefs.getString('access');

    try {
      List<Posts> posts = [];

      final response = await dio.get(
        ApiEndpoint.posts,
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
        List<dynamic> responseData = response.data;
        posts =
            responseData.map((postJson) => Posts.fromJson(postJson)).toList();

        print('All Posts fetched successfully: ${response.data}');
      } else {
        print(
            'Failed to fetch all posts: ${response.data} ${response.statusCode}');
      }
      return posts;
    } catch (e) {
      print('Error occurred: $e');
      return [];
    }
  }

  //Method to Get Single Post
  static Future<Posts> getSinglePost(int post_id) async {
    final dio = Dio();
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    var access_token = await prefs.getString('access');

    try {
      final response = await dio.get(
        "${ApiEndpoint.posts}/$post_id",
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
        Posts post = Posts.fromJson(response.data);
        print('Post fetched successfully: ${response.data}');
        return post;
      } else {
        print('Failed to fetch post: ${response.data} ${response.statusCode}');
        return Posts();
      }
    } catch (e) {
      print('Error occurred: $e');
      return Posts();
    }
  }

  //Method to Delete Post
  static Future<void> deletePost(int post_id) async {
    final dio = Dio();
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    var access_token = await prefs.getString('access');

    try {
      final response = await dio.delete(
        "${ApiEndpoint.posts}/$post_id",
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
        Posts post = Posts.fromJson(response.data);
        print('Post deleted successfully: ${response.data}');
      } else {
        print('Failed to delete post: ${response.data} ${response.statusCode}');
      }
    } catch (e) {
      print('Error occurred: $e');
    }
  }

  //Method to Create Post
  static Future<Posts> createPost(Posts post, File file) async {
    final dio = Dio();
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    var access_token = await prefs.getString('access');

    var data = post.toJson();
    FormData formData = FormData.fromMap({
      ...data,
      'image': await MultipartFile.fromFile(file.path,
          filename: file.path.split('/').last),
    });

    try {
      final response = await dio.post(
        ApiEndpoint.posts,
        data: formData,
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
        Posts post = Posts.fromJson(response.data);
        print('Post created successfully: ${response.data}');
        return post;
      } else {
        print('Failed to create post: ${response.data} ${response.statusCode}');
        return Posts();
      }
    } catch (e) {
      print('Error occurred: $e');
      return Posts();
    }
  }

  //Method to Update Post
  static Future<Posts> updatePost(Posts post, File? file) async {
    final dio = Dio();
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    var access_token = await prefs.getString('access');
    FormData formData;

    var data = post.toJson();
    if (file != null) {
      formData = FormData.fromMap({
        ...data,
        'image': await MultipartFile.fromFile(file.path,
            filename: file.path.split('/').last),
      });
    } else {
      formData = FormData.fromMap({...data});
    }
    try {
      final response = await dio.patch(
        "${ApiEndpoint.posts}/${post.postId}",
        data: formData,
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
        Posts post = Posts.fromJson(response.data);
        print('Post updated successfully: ${response.data}');
        return post;
      } else {
        print('Failed to update post: ${response.data} ${response.statusCode}');
        return Posts();
      }
    } catch (e) {
      print('Error occurred: $e');
      return Posts();
    }
  }
}
