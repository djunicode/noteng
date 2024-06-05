import 'dart:io';

import 'package:dio/dio.dart';
import 'package:noteng/constants/api_endpoint.dart';
import 'package:noteng/data/Notes/notesModel.dart';
import 'package:noteng/data/User/userModel.dart';
import 'package:shared_preferences/shared_preferences.dart';

class NotesRepo {
  //Method to Get All Notes
  static Future<List<Notes>> getAllNotes() async {
    final dio = Dio();
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    var access_token = await prefs.getString('access');

    try {
      List<Notes> notes = [];

      final response = await dio.get(
        ApiEndpoint.notes,
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
        notes =
            responseData.map((postJson) => Notes.fromJson(postJson)).toList();

        print('All Notes fetched successfully: ${response.data}');
      } else {
        print(
            'Failed to fetch all notes: ${response.data} ${response.statusCode}');
      }
      return notes;
    } catch (e) {
      print('Error occurred: $e');
      return [];
    }
  }

  //Method to Get Single Note
  static Future<Notes> getSingleNote(int notes_id) async {
    final dio = Dio();
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    var access_token = await prefs.getString('access');

    try {
      final response = await dio.get(
        "${ApiEndpoint.notes}/$notes_id",
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
        Notes note = Notes.fromJson(response.data);
        print('Note fetched successfully: ${response.data}');
        return note;
      } else {
        print('Failed to fetch Note: ${response.data} ${response.statusCode}');
        return Notes();
      }
    } catch (e) {
      print('Error occurred: $e');
      return Notes();
    }
  }

  //Method to Delete Note
  static Future<void> deleteNote(int note_id) async {
    final dio = Dio();
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    var access_token = await prefs.getString('access');

    try {
      final response = await dio.delete(
        "${ApiEndpoint.notes}/$note_id/",
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
        print('Note deleted successfully: ${response.data}');
      } else {
        print('Failed to delete note: ${response.data} ${response.statusCode}');
      }
    } catch (e) {
      print('Error occurred: $e');
    }
  }

  //Method to Create Note
  static Future<Notes> createNote(Notes note, File file) async {
    final dio = Dio();
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    var access_token = await prefs.getString('access');

    var data = note.toJson();
    FormData formData = FormData.fromMap({
      ...data,
      'document': await MultipartFile.fromFile(file.path,
          filename: file.path.split('/').last),
    });

    try {
      final response = await dio.post(
        "${ApiEndpoint.notes}/",
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
        Notes post = Notes.fromJson(response.data);
        print('Note created successfully: ${response.data}');
        return post;
      } else {
        print('Failed to create note: ${response.data} ${response.statusCode}');
        return Notes();
      }
    } catch (e) {
      print('Error occurred: $e');
      return Notes();
    }
  }

  //Method to Update Note
  static Future<Notes> updateNote(Notes note, File? file) async {
    final dio = Dio();
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    var access_token = await prefs.getString('access');
    FormData formData;

    var data = note.toJson();
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
        "${ApiEndpoint.notes}/${note.noteId}/",
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
        Notes post = Notes.fromJson(response.data);
        print('Note updated successfully: ${response.data}');
        return post;
      } else {
        print('Failed to update note: ${response.data} ${response.statusCode}');
        return Notes();
      }
    } catch (e) {
      print('Error occurred: $e');
      return Notes();
    }
  }
}
