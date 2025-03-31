package com.example.demo.controller;

import com.example.demo.dto.PostRequestDto;
import com.example.demo.dto.PostResponseDto;
import com.example.demo.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/posts")
@CrossOrigin(origins = "http://localhost:3000")
public class PostController {

    private final PostService postService;

    // 게시글 등록
    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public ResponseEntity<PostResponseDto> createPost(@RequestBody PostRequestDto requestDto,
                                                    @AuthenticationPrincipal String username) {
        PostResponseDto response = postService.createPost(requestDto, username);
        return ResponseEntity.ok(response);
    }

    // 게시글 조회
    @GetMapping
    public ResponseEntity<List<PostResponseDto>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    //게시글 단일 조회
    @GetMapping("/{id}")
    public PostResponseDto getPostById(@PathVariable Long id) {
        return postService.getPostById(id);
    }

    // 게시글 수정
    @PreAuthorize("isAuthenticated()")
    @PutMapping("/{id}")
    public PostResponseDto updatePost(@PathVariable Long id, 
                                        @RequestBody PostRequestDto requestDto,
                                        @AuthenticationPrincipal String username) {
        return postService.updatePost(id, requestDto, username);
    }

    // 게시글 삭제
    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id,
                        @AuthenticationPrincipal String username) {
        postService.deletePost(id, username);
    }

}

