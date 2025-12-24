package in.omkarbirajdar.resume_builder.service;

import in.omkarbirajdar.resume_builder.document.User;
import in.omkarbirajdar.resume_builder.dto.AuthResponse;
import in.omkarbirajdar.resume_builder.dto.RegisterRequest;
import in.omkarbirajdar.resume_builder.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;

    public AuthResponse register(RegisterRequest request){
        log.info("Inside AuthService: register() {} ",request);
        if(userRepository.existsByEmail(request.getEmail())){
            throw new RuntimeException("User already Exists in email");
        }
        User.builder()
                User newUser = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(request.getPassword())
                .profileImageUrl(request.getProfileImageUrl())
                .subscriptionPlan("Basic")
                .emailVerified(false)
                .verificationToken(UUID.randomUUID().toString())
                .verificationExpires(LocalDateTime.now().plusHours(24))
                .build();

        UserRepository.save(newUser);

        //TODO : send verification email

        return AuthResponse.builder()
                .id(newUser.getId())
                .name(newUser.getName())
                .email(newUser.getEmail())
                .profileImageUrl(newUser.getProfileImageUrl())
                .emailVerified(newUser.isEmailVerified())
                .subscriptionPlan(newUser.getSubscriptionPlan())
                .build();
    }

    private AuthResponse toResponse(User newUser){
        return AuthResponse.builder()
                .id(newUser.getId())
                .name(newUser.getName())
                .email(newUser.getEmail())
                .profileImageUrl(newUser.getProfileImageUrl())
                .emailVerified(newUser.isEmailVerified())
                .subscriptionPlan(newUser.getSubscriptionPlan())
    }

}
