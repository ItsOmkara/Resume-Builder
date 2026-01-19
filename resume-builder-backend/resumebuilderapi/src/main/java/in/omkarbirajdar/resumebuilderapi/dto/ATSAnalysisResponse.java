package in.omkarbirajdar.resumebuilderapi.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ATSAnalysisResponse {
    private int overallScore;
    private int formatScore;
    private int contentScore;
    private List<String> keywordSuggestions;
    private Map<String, Integer> repetitiveWords;
    private List<String> issues;
    private List<String> suggestions;
}
