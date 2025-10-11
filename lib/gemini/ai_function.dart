import 'dart:io';

import 'package:firebase_ai/firebase_ai.dart';

class AiFunction {
  Future<String?> summarizePdf(String pdfPath) async {
    try {
      // Validate file exists
      final file = File(pdfPath);
      if (!await file.exists()) {
        throw Exception('PDF file not found');
      }

      final model = FirebaseAI.googleAI().generativeModel(
        model: 'gemini-1.5-flash',
      );

      final prompt = TextPart(
        '''Please analyze this document and provide a concise summary that includes:
        - Key points and main ideas
        - Important findings or conclusions
        - Any significant data or statistics
        Keep the summary clear and well-structured.''',
      );

      final doc = await file.readAsBytes();
      final docPart = InlineDataPart('application/pdf', doc);
      
      final response = await model.generateContent([
        Content.multi([prompt, docPart])
      ]);

      if (response.text == null || response.text!.isEmpty) {
        throw Exception('Failed to generate summary');
      }

      return response.text;
    } catch (e) {
      print('Error summarizing PDF: $e');
      return null;
    }
  }
}
