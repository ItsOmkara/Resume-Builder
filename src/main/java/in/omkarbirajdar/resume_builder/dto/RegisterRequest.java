package in.omkarbirajdar.resume_builder.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {

    @Email(message = "Email should be Valid")
    @NotBlank(message = "Email is required")
    private String email;
    @NotBlank(message = "Name is required")
    @Size(min = 2,max = 15,message = "Name must be between 2 and 15 characters")
    private String name;
    @NotBlank(message = "Password is required")
    @Size(min = 6,max = 15,message = "Paasword must be between 6 and 15 characters")
    private String password;
    private String profileImageUrl;
}
