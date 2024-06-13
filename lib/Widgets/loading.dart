import 'package:flutter/material.dart';

class LoadingBar {
  static void loadingDialog(BuildContext context) {
    showDialog(
        barrierDismissible: false,
        context: context,
        builder: (context) {
          return Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                height: 100,
                width: 100,
                decoration: BoxDecoration(
                  color: Colors.white.withAlpha(180),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Center(
                  child: CircularProgressIndicator(),
                ),
              ),
            ],
          );
        });
  }

  static Widget loadingWidget() {
    return SizedBox(
      width: double.infinity,
      // color: Colors.black.withAlpha(50),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Container(
            height: 100,
            width: 100,
            margin: EdgeInsets.only(bottom: 50),
            decoration: BoxDecoration(
              color: Colors.grey.shade100,
              borderRadius: BorderRadius.circular(10),
            ),
            child: const Center(
              child: CircularProgressIndicator(),
            ),
          ),
          SizedBox()
        ],
      ),
    );
  }
}
