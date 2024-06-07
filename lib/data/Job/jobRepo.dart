import 'dart:io';

import 'package:dio/dio.dart';
import 'package:noteng/constants/api_endpoint.dart';
import 'package:noteng/data/Job/jobModel.dart';
import 'package:noteng/data/User/userModel.dart';
import 'package:shared_preferences/shared_preferences.dart';

class JobRepo {
  //Method to Get All Notes
  static Future<List<Job>> getAllJobs() async {
    final dio = Dio();
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    var access_token = await prefs.getString('access');

    try {
      List<Job> jobs = [];

      final response = await dio.get(
        ApiEndpoint.job,
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
        jobs = responseData.map((jobJson) => Job.fromJson(jobJson)).toList();

        print('All Jobs fetched successfully: ${response.data}');
      } else {
        print(
            'Failed to fetch all jobs: ${response.data} ${response.statusCode}');
      }
      return jobs;
    } catch (e) {
      print('Error occurred: $e');
      return [];
    }
  }

  //Method to Get Single Job
  static Future<Job> getSingleJob(int job_id) async {
    final dio = Dio();
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    var access_token = await prefs.getString('access');

    try {
      final response = await dio.get(
        "${ApiEndpoint.job}/$job_id",
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
        Job job = Job.fromJson(response.data);
        print('Job fetched successfully: ${response.data}');
        return job;
      } else {
        print('Failed to fetch Job: ${response.data} ${response.statusCode}');
        return Job();
      }
    } catch (e) {
      print('Error occurred: $e');
      return Job();
    }
  }

  //Method to Delete Note
  static Future<void> deleteJob(int job_id) async {
    final dio = Dio();
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    var access_token = await prefs.getString('access');

    try {
      final response = await dio.delete(
        "${ApiEndpoint.job}/$job_id/",
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
        print('Job deleted successfully: ${response.data}');
      } else {
        print('Failed to delete job: ${response.data} ${response.statusCode}');
      }
    } catch (e) {
      print('Error occurred: $e');
    }
  }

  //Method to Create Job
  static Future<Job> createJob(Job job) async {
    final dio = Dio();
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    var access_token = await prefs.getString('access');

    var data = job.toJson();

    try {
      final response = await dio.post(
        "${ApiEndpoint.job}/",
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
        Job job = Job.fromJson(response.data);
        print('Job created successfully: ${response.data}');
        return job;
      } else {
        print('Failed to create job: ${response.data} ${response.statusCode}');
        return Job();
      }
    } catch (e) {
      print('Error occurred: $e');
      return Job();
    }
  }

  //Method to Update Job
  static Future<Job> updateJob(Job job) async {
    final dio = Dio();
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    var access_token = await prefs.getString('access');

    var data = job.toJson();

    try {
      final response = await dio.patch(
        "${ApiEndpoint.job}/${job.jobId}/",
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
        Job job = Job.fromJson(response.data);
        print('Job updated successfully: ${response.data}');
        return job;
      } else {
        print('Failed to update job: ${response.data} ${response.statusCode}');
        return Job();
      }
    } catch (e) {
      print('Error occurred: $e');
      return Job();
    }
  }
}
