import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:noteng/constants/colors.dart';
import 'package:url_launcher/url_launcher_string.dart';
import 'package:youtube_player_flutter/youtube_player_flutter.dart';

class VideoListWidget extends StatefulWidget {
  VideoListWidget({
    Key? key,
    this.vLink,
    this.vThumbnail,
    this.vTitle,
  }) : super(key: key);

  final String? vTitle;
  final String? vThumbnail;
  final String? vLink;

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
      initialVideoId: YoutubePlayer.convertUrlToId(widget.vLink!)!,
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
      padding: const EdgeInsets.fromLTRB(20, 15, 20, 10),
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
                  widget.vTitle!,
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 13.0,
                    fontWeight: FontWeight.w800,
                  ),
                ),
              ),
              InkWell(
                onTap: () {
                  launchUrlString(widget.vLink!,
                      mode: LaunchMode.externalApplication);
                },
                child: FaIcon(
                  FontAwesomeIcons.link,
                  size: 16,
                ),
              ),
            ],
          ),
          Divider(
            color: Colors.grey,
            thickness: 1.0,
            height: 20.0,
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
