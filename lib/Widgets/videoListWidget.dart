import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:noteng/constants/colors.dart';
import 'package:noteng/data/Video/videoModel.dart';
import 'package:shimmer/shimmer.dart';
import 'package:url_launcher/url_launcher_string.dart';
import 'package:youtube_player_flutter/youtube_player_flutter.dart';

class VideoListWidget extends StatefulWidget {
  VideoListWidget({
    Key? key,
    required this.video,
  }) : super(key: key);

  final Video video;

  @override
  _VideoListWidgetState createState() => _VideoListWidgetState();
}

class _VideoListWidgetState extends State<VideoListWidget> {
  late YoutubePlayerController _controller;

  @override
  void initState() {
    super.initState();
    // Replace with your YouTube video ID
    _controller = YoutubePlayerController(
      initialVideoId: YoutubePlayer.convertUrlToId(widget.video.links!)!,
      flags: YoutubePlayerFlags(
          autoPlay: false, mute: false, showLiveFullscreenButton: false),
    );
  }

  @override
  void dispose() {
    super.dispose();
    _controller.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.fromLTRB(20, 10, 20, 10),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(10.0),
        color: secondaryAccentColor.withAlpha(100),
        // border: Border.all(
        //   color: secondaryColor.withOpacity(0.3),
        //   width: 1.0,
        // ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Expanded(
                child: Text(
                  widget.video.topics!,
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 13.0,
                    fontWeight: FontWeight.w800,
                  ),
                ),
              ),
              InkWell(
                onTap: () {
                  launchUrlString(widget.video.links!,
                      mode: LaunchMode.externalApplication);
                },
                child: FaIcon(
                  FontAwesomeIcons.link,
                  size: 16,
                ),
              ),
            ],
          ),
          Row(
            children: [
              Text(
                "${widget.video.subject!} | SEM ${widget.video.sem!}",
                style: TextStyle(
                  color: secondaryColor,
                  fontSize: 11.0,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
          Divider(
            color: Colors.grey,
            thickness: 1.0,
            height: 5.0,
            indent: 0,
            endIndent: 0,
          ),
          YoutubePlayer(
            controller: _controller,
            showVideoProgressIndicator: true,
            progressColors: ProgressBarColors(
              playedColor: primaryColor,
              handleColor: primaryColor,
            ),
            onReady: () {
              print('Player is ready.');
            },
          ),
        ],
      ),
    );
  }
}

class VideoListWidget_Shimmer extends StatelessWidget {
  VideoListWidget_Shimmer({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.fromLTRB(20, 10, 20, 10),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(10.0),
        color: secondaryAccentColor.withAlpha(100),
        // border: Border.all(
        //   color: secondaryColor.withOpacity(0.3),
        //   width: 1.0,
        // ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Expanded(
                child: Shimmer.fromColors(
                    baseColor: secondaryColor.withAlpha(50),
                    highlightColor: secondaryAccentColor,
                    child: Container(
                      margin: EdgeInsets.only(right: 10, bottom: 5),
                      height: 20,
                      decoration: BoxDecoration(
                          color: Colors.grey.shade400,
                          borderRadius: BorderRadius.circular(10)),
                    )),
              ),
              Shimmer.fromColors(
                baseColor: secondaryColor.withAlpha(200),
                highlightColor: secondaryAccentColor,
                child: FaIcon(
                  FontAwesomeIcons.link,
                  size: 16,
                ),
              ),
            ],
          ),
          Shimmer.fromColors(
              baseColor: secondaryColor.withAlpha(50),
              highlightColor: secondaryAccentColor,
              child: Container(
                margin: EdgeInsets.only(bottom: 5),
                height: 15,
                width: 100,
                decoration: BoxDecoration(
                    color: Colors.grey.shade400,
                    borderRadius: BorderRadius.circular(8)),
              )),
          Divider(
            color: Colors.grey,
            thickness: 1.0,
            height: 5.0,
            indent: 0,
            endIndent: 0,
          ),
          Expanded(
            child: Shimmer.fromColors(
              baseColor: secondaryColor.withAlpha(50),
              highlightColor: secondaryAccentColor,
              child: Container(
                margin: const EdgeInsets.fromLTRB(0, 10, 0, 5),
                height: 90,
                width: double.infinity,
                decoration: BoxDecoration(
                  color: secondaryColor,
                  borderRadius: BorderRadius.circular(10.0),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
