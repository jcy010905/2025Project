package com.example.demo.service;

import com.example.demo.dto.UserLoginRequestDto;
import com.example.demo.dto.UserSignUpRequestDto;
import com.example.demo.entity.User;
import com.example.demo.exception.UserAlreadyExistsException;
import com.example.demo.jwt.JwtUtil;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public void signup(UserSignUpRequestDto dto) {
        log.info("회원가입 시도: username = {}", dto.getUsername());

        if (userRepository.findByUsername(dto.getUsername()).isPresent()) {
            log.warn("이미 존재하는 사용자 시도: username = {}", dto.getUsername());
            throw new UserAlreadyExistsException("이미 존재하는 사용자입니다.");
        }

        User user = User.builder()
            .username(dto.getUsername())
            .password(passwordEncoder.encode(dto.getPassword()))
            .build();

        userRepository.save(user);
        log.info("회원가입 성공: username = {}", dto.getUsername());
    }

    public String login(UserLoginRequestDto requestDto) {
        User user = userRepository.findByUsername(requestDto.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        if (!passwordEncoder.matches(requestDto.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        return jwtUtil.createToken(user.getUsername());
    }
}
