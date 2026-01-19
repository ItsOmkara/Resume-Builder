package in.omkarbirajdar.resumebuilderapi.controller;

import in.omkarbirajdar.resumebuilderapi.dto.ATSAnalysisResponse;
import in.omkarbirajdar.resumebuilderapi.service.ATSService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/ats")
@RequiredArgsConstructor
@Slf4j
public class ATSController {

    private final ATSService atsService;

    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

    @PostMapping("/analyze")
    public ResponseEntity<?> analyzeResume(@RequestParam("file") MultipartFile file) {
        try {
            // Validate file
            if (file.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Please upload a file"));
            }

            // Validate file size
            if (file.getSize() > MAX_FILE_SIZE) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "File size must be less than 5MB"));
            }

            // Validate file type
            String fileName = file.getOriginalFilename();
            if (fileName == null ||
                    (!fileName.toLowerCase().endsWith(".pdf") &&
                            !fileName.toLowerCase().endsWith(".docx"))) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Only PDF and DOCX files are allowed"));
            }

            log.info("Analyzing resume: {}, size: {} bytes", fileName, file.getSize());

            // Perform analysis
            ATSAnalysisResponse response = atsService.analyzeResume(file);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error analyzing resume", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to analyze resume: " + e.getMessage()));
        }
    }
}
