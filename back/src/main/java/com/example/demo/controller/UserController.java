package com.example.demo.controller;

import com.example.demo.dto.LoginResponse;
import com.example.demo.dto.UserLoginRequestDto;
import com.example.demo.dto.UserSignUpRequestDto;
import com.example.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public String signup(@RequestBody UserSignUpRequestDto requestDto) {
        userService.signup(requestDto);
        return "회원가입 성공!";
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginRequestDto requestDto) {
        String token = userService.login(requestDto);

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.AUTHORIZATION, "Bearer " + token);

        return ResponseEntity.ok()
                            .headers(headers)
                            .body(new LoginResponse("로그인 성공", token));
    }

    @GetMapping("/me")
    public String getMyUsername(@AuthenticationPrincipal String username) {
        return username;
    }
}
