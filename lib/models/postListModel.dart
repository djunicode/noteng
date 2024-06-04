class PostListModel {
  final String? pTitle;
  final String? pDate;
  final String? pDesc;
  final int? pLikes;
  final String? pCategory;
  final String? pImg;
  final bool isLiked;

  PostListModel({
    required this.pTitle,
    required this.pDate,
    required this.pDesc,
    required this.pLikes,
    required this.pCategory,
    this.isLiked = false,
    this.pImg,
  });
}
