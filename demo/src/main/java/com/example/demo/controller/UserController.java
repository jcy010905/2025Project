package com.example.demo.controller;

import com.example.demo.dto.UserLoginRequestDto;
import com.example.demo.dto.UserSignUpRequestDto;
import com.example.demo.service.UserService;
import lombok.RequiredArgsConstructor;
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
        public String login(@RequestBody UserLoginRequestDto requestDto) {
            boolean result = userService.login(requestDto);
            return result ? "로그인 성공!" : "비밀번호가 틀렸습니다.";
        }
}
