import 'package:noteng/models/notesListModel.dart';
import 'package:noteng/models/postListModel.dart';

import '../../models/jobListModel.dart';

List<JobListModel> SampleJobList = [
  JobListModel(
      jobType: "Internship",
      cName: "Google",
      cDesc: "Software Development Internship focused on web technologies.",
      duration: "12",
      jobMode: "Online",
      mode: "Full-time",
      dateTime: DateTime.now().toString()),
  JobListModel(
      jobType: "Full-time",
      cName: "Apple",
      cDesc: "Marketing Specialist role focused on brand promotion.",
      duration: "24",
      jobMode: "Online",
      mode: "Remote",
      dateTime: DateTime.now().toString()),
  JobListModel(
      jobType: "Part-time",
      cName: "Microsoft",
      cDesc: "Customer Support Representative for cloud services.",
      duration: "20",
      jobMode: "Online",
      mode: "On-site",
      dateTime: DateTime.now().toString()),
  JobListModel(
      jobType: "Contract",
      cName: "Amazon",
      cDesc: "Project Manager for e-commerce initiatives.",
      duration: "6",
      jobMode: "Online",
      mode: "Hybrid",
      dateTime: DateTime.now().toString()),
  JobListModel(
      jobType: "Temporary",
      cName: "Netflix",
      cDesc: "Event Coordinator for global marketing events.",
      duration: "3",
      jobMode: "Online",
      mode: "Part-time",
      dateTime: DateTime.now().toString())
];

List<PostListModel> SamplePostList = [
  PostListModel(
    pTitle: "Web Dev Workshop",
    pDate: DateTime(2024, 3, 20, 14, 30).toString(),
    pDesc:
        "Join us for an interactive web development workshop focusing on the latest trends and technologies.",
    pLikes: 150,
    isLiked: true,
    pCategory: "Workshop",
    pImg:
        "https://res.infoq.com/articles/hackathon-developer-innovation/en/headerimage/generatedHeaderImage-1662578814159.jpg",
  ),
  PostListModel(
    pTitle: "Mobile App Hackathon",
    pDate: DateTime(2024, 4, 5, 10, 0).toString(),
    pDesc:
        "Participate in our Mobile App Hackathon and showcase your innovative app ideas.",
    pLikes: 200,
    pCategory: "Hackathon",
    pImg:
        "https://res.infoq.com/articles/hackathon-developer-innovation/en/headerimage/generatedHeaderImage-1662578814159.jpg",
  ),
  PostListModel(
    pTitle: "Data Science Bootcamp",
    pDate: DateTime(2024, 4, 15, 9, 0).toString(),
    pDesc:
        "Learn the fundamentals of data science and machine learning in our intensive bootcamp.",
    pLikes: 120,
    pCategory: "Bootcamp",
    isLiked: true,
    pImg:
        "https://res.infoq.com/articles/hackathon-developer-innovation/en/headerimage/generatedHeaderImage-1662578814159.jpg",
  ),
  PostListModel(
    pTitle: "Cybersecurity Seminar",
    pDate: DateTime(2024, 3, 28, 15, 0).toString(),
    pDesc:
        "Discover the latest cybersecurity threats and prevention techniques in our informative seminar.",
    pLikes: 180,
    pCategory: "Seminar",
    pImg:
        "https://res.infoq.com/articles/hackathon-developer-innovation/en/headerimage/generatedHeaderImage-1662578814159.jpg",
  ),
  PostListModel(
    pTitle: "UI/UX Design Workshop",
    pDate: DateTime(2024, 4, 10, 11, 30).toString(),
    pDesc:
        "Improve your design skills and create user-friendly interfaces in our UI/UX Design Workshop.",
    pLikes: 160,
    pCategory: "Workshop",
    pImg:
        "https://res.infoq.com/articles/hackathon-developer-innovation/en/headerimage/generatedHeaderImage-1662578814159.jpg",
  )
];

List<NotesListModel> SampleNoteList = [
  NotesListModel(
    title: "Introduction to Programming",
    rating: 4.5.toString(),
    description:
        "Comprehensive notes covering the basics of programming concepts.",
    subject: "Computer Science",
    department: "Information Technology",
  ),
  NotesListModel(
    title: "Data Structures and Algorithms",
    rating: 4.8.toString(),
    description:
        "Detailed notes on various data structures and algorithms with examples.",
    subject: "Computer Science",
    department: "Computer Engineering",
  ),
  NotesListModel(
    title: "Organic Chemistry Basics",
    rating: 4.2.toString(),
    description:
        "Fundamental notes explaining organic chemistry principles and reactions.",
    subject: "Chemistry",
    department: "Science",
  ),
  NotesListModel(
    title: "World History Timeline",
    rating: 4.7.toString(),
    description: "Chronological notes on major events in world history.",
    subject: "History",
    department: "Social Sciences",
  ),
  NotesListModel(
    title: "Microeconomics Fundamentals",
    rating: 4.6.toString(),
    description:
        "Comprehensive notes covering the basics of microeconomics theories and concepts.",
    subject: "Economics",
    department: "Business Administration",
  )
];

List SampleVideoList = [
  {
    'vLink': 'https://youtu.be/zOjov-2OZ0E?si=2cV8iJzG74lMvLp4',
    'vTitle': 'Introduction to Programming',
  },
  {
    'vLink': 'https://youtu.be/KJgsSFOSQv0?si=9sWnIVzm6It3yS0v',
    'vTitle': 'C Programming Tutorial for Beginners',
  }
];
