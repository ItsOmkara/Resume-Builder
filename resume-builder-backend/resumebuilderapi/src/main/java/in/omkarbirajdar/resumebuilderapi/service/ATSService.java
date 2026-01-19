package in.omkarbirajdar.resumebuilderapi.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import in.omkarbirajdar.resumebuilderapi.dto.ATSAnalysisResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Value;


import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class ATSService {
    @Value("${groq.api.key}")
    private String groqApiKey;


    private static final String GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
    private static final ObjectMapper objectMapper = new ObjectMapper();

    public ATSAnalysisResponse analyzeResume(MultipartFile file) throws Exception {
        // Extract text from the uploaded file
        String resumeText = extractTextFromFile(file);

        if (resumeText == null || resumeText.trim().isEmpty()) {
            throw new RuntimeException("Could not extract text from the uploaded file");
        }

        log.info("Extracted {} characters from resume", resumeText.length());

        // Call Anthropic API for analysis
        ATSAnalysisResponse response = callAnthropicAPI(resumeText);

        // Add 8 second delay for animation effect
        Thread.sleep(8000);

        return response;
    }

    private String extractTextFromFile(MultipartFile file) throws IOException {
        String fileName = file.getOriginalFilename();
        if (fileName == null) {
            throw new RuntimeException("File name is null");
        }

        String lowerFileName = fileName.toLowerCase();

        if (lowerFileName.endsWith(".pdf")) {
            return extractTextFromPDF(file.getInputStream());
        } else if (lowerFileName.endsWith(".docx")) {
            return extractTextFromDOCX(file.getInputStream());
        } else {
            throw new RuntimeException("Unsupported file type. Only PDF and DOCX are allowed.");
        }
    }

    private String extractTextFromPDF(InputStream inputStream) throws IOException {
        try (PDDocument document = PDDocument.load(inputStream)) {
            PDFTextStripper stripper = new PDFTextStripper();
            return stripper.getText(document);
        }
    }

    private String extractTextFromDOCX(InputStream inputStream) throws IOException {
        try (XWPFDocument document = new XWPFDocument(inputStream)) {
            StringBuilder text = new StringBuilder();
            for (XWPFParagraph paragraph : document.getParagraphs()) {
                text.append(paragraph.getText()).append("\n");
            }
            return text.toString();
        }
    }

//    private ATSAnalysisResponse callAnthropicAPI(String resumeText) throws Exception {
//        String prompt = """
//                Analyze this resume and return ONLY valid JSON (no markdown, no code blocks, just pure JSON):
//                {
//                    "overallScore": <number 0-100>,
//                    "formatScore": <number 0-100>,
//                    "contentScore": <number 0-100>,
//                    "keywordSuggestions": ["keyword1", "keyword2", ...],
//                    "repetitiveWords": {"word1": count1, "word2": count2, ...},
//                    "issues": ["issue1", "issue2", ...],
//                    "suggestions": ["suggestion1", "suggestion2", ...]
//                }
//
//                Evaluate the resume for:
//                1. ATS compatibility (proper formatting, no tables/graphics descriptions)
//                2. Presence of key sections (Contact, Summary, Experience, Education, Skills)
//                3. Contact information completeness
//                4. Use of action verbs
//                5. Resume length appropriateness
//                6. Keyword optimization for job searches
//                7. Repeated/overused words
//                8. Grammar and formatting issues
//
//                Resume text:
//                %s
//                """.formatted(resumeText.length() > 8000 ? resumeText.substring(0, 8000) : resumeText);
//
//        String requestBody = objectMapper.writeValueAsString(Map.of(
//                "model", "claude-sonnet-4-20250514",
//                "max_tokens", 2048,
//                "messages", List.of(Map.of(
//                        "role", "user",
//                        "content", prompt))));
//
//        HttpClient client = HttpClient.newHttpClient();
//        HttpRequest request = HttpRequest.newBuilder()
//                .uri(URI.create(ANTHROPIC_API_URL))
//                .header("Content-Type", "application/json")
//                .header("anthropic-version", "2023-06-01")
//                .header("x-api-key", anthropicApiKey)
//                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
//                .build();
//
//        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
//
//        log.info("Anthropic API response status: {}", response.statusCode());
//
//        if (response.statusCode() != 200) {
//            log.error("Anthropic API error: {}", response.body());
//            // Return a default response if API fails
//            return getDefaultResponse();
//        }
//
//        // Parse the response
//        JsonNode responseJson = objectMapper.readTree(response.body());
//        String content = responseJson.path("content").get(0).path("text").asText();
//
//        // Clean up the content - remove markdown code blocks if present
//        content = content.trim();
//        if (content.startsWith("```json")) {
//            content = content.substring(7);
//        } else if (content.startsWith("```")) {
//            content = content.substring(3);
//        }
//        if (content.endsWith("```")) {
//            content = content.substring(0, content.length() - 3);
//        }
//        content = content.trim();
//
//        try {
//            JsonNode analysisJson = objectMapper.readTree(content);
//
//            List<String> keywordSuggestions = new ArrayList<>();
//            analysisJson.path("keywordSuggestions").forEach(node -> keywordSuggestions.add(node.asText()));
//
//            Map<String, Integer> repetitiveWords = new HashMap<>();
//            analysisJson.path("repetitiveWords").fields()
//                    .forEachRemaining(entry -> repetitiveWords.put(entry.getKey(), entry.getValue().asInt()));
//
//            List<String> issues = new ArrayList<>();
//            analysisJson.path("issues").forEach(node -> issues.add(node.asText()));
//
//            List<String> suggestions = new ArrayList<>();
//            analysisJson.path("suggestions").forEach(node -> suggestions.add(node.asText()));
//
//            return ATSAnalysisResponse.builder()
//                    .overallScore(analysisJson.path("overallScore").asInt(70))
//                    .formatScore(analysisJson.path("formatScore").asInt(70))
//                    .contentScore(analysisJson.path("contentScore").asInt(70))
//                    .keywordSuggestions(keywordSuggestions)
//                    .repetitiveWords(repetitiveWords)
//                    .issues(issues)
//                    .suggestions(suggestions)
//                    .build();
//        } catch (Exception e) {
//            log.error("Failed to parse AI response: {}", content, e);
//            return getDefaultResponse();
//        }
//    }

    private ATSAnalysisResponse callAnthropicAPI(String resumeText) throws Exception {

         String prompt = """
         Analyze this resume and return ONLY valid JSON (no markdown, no code blocks, just pure JSON):
       {
         "overallScore": <number 0-100>,
         "formatScore": <number 0-100>,
         "contentScore": <number 0-100>,
         "keywordSuggestions": ["keyword1", "keyword2", ...],
         "repetitiveWords": {"word1": count1, "word2": count2, ...},
         "issues": ["issue1", "issue2", ...],
          "suggestions": ["suggestion1", "suggestion2", ...]
       }

        Rules:
        1. Only suggest keywords that are NOT already present in the resume text (case-insensitive).
        2. Before adding any keyword to "keywordSuggestions", check if it already exists in the resume. If it exists, do NOT include it.
        3. Do NOT mark technical skills as repetitive if they appear across Skills, Projects, and Experience sections.
        4. Only flag repetition in descriptive bullet sentences, not in section headers or skill lists.

      Resume text:
      %s
      """.formatted(resumeText.length() > 8000 ? resumeText.substring(0, 8000) : resumeText);

        String requestBody = objectMapper.writeValueAsString(Map.of(
                "model", "llama-3.1-8b-instant",
                "messages", List.of(Map.of(
                        "role", "user",
                        "content", prompt)),
                "temperature", 0.2
        ));

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(GROQ_API_URL))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + groqApiKey)
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        log.info("Groq API response status: {}", response.statusCode());

        if (response.statusCode() != 200) {
            log.error("Groq API error: {}", response.body());
            return getDefaultResponse();
        }

        // Groq response format
        JsonNode responseJson = objectMapper.readTree(response.body());
        String content = responseJson.path("choices").get(0).path("message").path("content").asText();

        content = content.trim();

        try {
            JsonNode analysisJson = objectMapper.readTree(content);

            List<String> keywordSuggestions = new ArrayList<>();
            analysisJson.path("keywordSuggestions").forEach(node -> keywordSuggestions.add(node.asText()));

            Map<String, Integer> repetitiveWords = new HashMap<>();
            analysisJson.path("repetitiveWords").fields()
                    .forEachRemaining(entry -> repetitiveWords.put(entry.getKey(), entry.getValue().asInt()));

            List<String> issues = new ArrayList<>();
            analysisJson.path("issues").forEach(node -> issues.add(node.asText()));

            List<String> suggestions = new ArrayList<>();
            analysisJson.path("suggestions").forEach(node -> suggestions.add(node.asText()));

            return ATSAnalysisResponse.builder()
                    .overallScore(analysisJson.path("overallScore").asInt(70))
                    .formatScore(analysisJson.path("formatScore").asInt(70))
                    .contentScore(analysisJson.path("contentScore").asInt(70))
                    .keywordSuggestions(keywordSuggestions)
                    .repetitiveWords(repetitiveWords)
                    .issues(issues)
                    .suggestions(suggestions)
                    .build();
        } catch (Exception e) {
            log.error("Failed to parse Groq response: {}", content, e);
            return getDefaultResponse();
        }
    }


    private ATSAnalysisResponse getDefaultResponse() {
        return ATSAnalysisResponse.builder()
                .overallScore(65)
                .formatScore(70)
                .contentScore(60)
                .keywordSuggestions(List.of("leadership", "teamwork", "problem-solving", "communication", "analytical"))
                .repetitiveWords(Map.of("responsible", 3, "worked", 4))
                .issues(List.of(
                        "Consider adding more quantifiable achievements",
                        "Some sections may benefit from stronger action verbs",
                        "Ensure contact information is complete"))
                .suggestions(List.of(
                        "Add measurable results to your experience bullet points",
                        "Include relevant industry keywords",
                        "Consider adding a professional summary section",
                        "Ensure consistent formatting throughout the document"))
                .build();
    }
}
