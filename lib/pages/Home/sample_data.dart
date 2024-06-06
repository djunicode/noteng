import 'package:noteng/data/Notes/notesModel.dart';
import 'package:noteng/data/Posts/postModel.dart';

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

List<Posts> SamplePostList = [
  Posts(
    title: "Web Dev Workshop",
    dateUpdated: DateTime(2024, 3, 20, 14, 30).toString(),
    description:
        "Join us for an interactive web development workshop focusing on the latest trends and technologies.",
    likes: 150,
    // isLiked: true,
    subtype: "Workshop",
    image:
        "https://res.infoq.com/articles/hackathon-developer-innovation/en/headerimage/generatedHeaderImage-1662578814159.jpg",
  ),
  Posts(
    title: "Mobile App Hackathon",
    dateUpdated: DateTime(2024, 4, 5, 10, 0).toString(),
    description:
        "Participate in our Mobile App Hackathon and showcase your innovative app ideas.",
    likes: 200,
    subtype: "Hackathon",
  ),
  Posts(
    title: "Data Science Bootcamp",
    dateUpdated: DateTime(2024, 4, 15, 9, 0).toString(),
    description:
        "Learn the fundamentals of data science and machine learning in our intensive bootcamp.",
    likes: 120,
    subtype: "Bootcamp",
    // isLiked: true,
    image:
        "https://res.infoq.com/articles/hackathon-developer-innovation/en/headerimage/generatedHeaderImage-1662578814159.jpg",
  ),
  Posts(
    title: "Cybersecurity Seminar",
    dateUpdated: DateTime(2024, 3, 28, 15, 0).toString(),
    description:
        "Discover the latest cybersecurity threats and prevention techniques in our informative seminar.",
    likes: 180,
    subtype: "Seminar",
    image:
        "https://res.infoq.com/articles/hackathon-developer-innovation/en/headerimage/generatedHeaderImage-1662578814159.jpg",
  ),
  Posts(
    title: "UI/UX Design Workshop",
    dateUpdated: DateTime(2024, 4, 10, 11, 30).toString(),
    description:
        "Improve your design skills and create user-friendly interfaces in our UI/UX Design Workshop.",
    likes: 160,
    subtype: "Workshop",
    image:
        "https://res.infoq.com/articles/hackathon-developer-innovation/en/headerimage/generatedHeaderImage-1662578814159.jpg",
  )
];

List<Notes> SampleNoteList = [
  Notes(
    noteTitle: "Introduction to Programming",
    averageRating: 4.5,
    noteDescription:
        "Comprehensive notes covering the basics of programming concepts.",
    subject: "Computer Science",
    department: "Information Technology",
  ),
  Notes(
    noteTitle: "Data Structures and Algorithms",
    averageRating: 4.8,
    noteDescription:
        "Detailed notes on various data structures and algorithms with examples.",
    subject: "Computer Science",
    department: "Computer Engineering",
  ),
  Notes(
    noteTitle: "Organic Chemistry Basics",
    averageRating: 4.2,
    noteDescription:
        "Fundamental notes explaining organic chemistry principles and reactions.",
    subject: "Chemistry",
    department: "Science",
  ),
  Notes(
    noteTitle: "World History Timeline",
    averageRating: 4.7,
    noteDescription: "Chronological notes on major events in world history.",
    subject: "History",
    department: "Social Sciences",
  ),
  Notes(
    noteTitle: "Microeconomics Fundamentals",
    averageRating: 4.6,
    noteDescription:
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
